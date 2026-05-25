import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../components/breaker-tile";
import "../components/breaker-tile-skeleton";
import "../components/board-empty-state";
import "../components/board-error-state";
import { BreakerDiscoveryService } from "../data/breaker-discovery-service";
import { StatisticsManager } from "../data/statistics-manager";
import { DEFAULT_CONFIG } from "../config/defaults";
import { getSavantBreakerBoardConfigForm } from "./config-form";
import { normalizeConfig, resolveBreakerDisplay } from "../config/normalize-config";
import { sharedStyles } from "../styles/shared-styles";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant } from "../types/home-assistant";
import type { PartialSavantBreakerBoardConfig, SavantBreakerBoardConfig, SortBy } from "../types/config";
import type { BreakerStatistics } from "../types/statistics";
import { parseNumber } from "../utilities/format-power";

@customElement("savant-energy-breaker-board-card")
export class SavantEnergyBreakerBoardCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config = DEFAULT_CONFIG;
  @state() private breakers: DiscoveredBreaker[] = [];
  @state() private loading = true;
  @state() private error = "";
  @state() private stats = new Map<string, BreakerStatistics>();
  @state() private pendingSwitches = new Set<string>();
  @state() private toggleErrors = new Map<string, string>();
  @state() private stacked = false;
  @state() private sortMenuOpen = false;
  @state() private searchOpen = false;
  @state() private searchQuery = "";
  @state() private runtimeSortBy: SortBy | undefined;
  private discovery = new BreakerDiscoveryService();
  private statistics = new StatisticsManager();
  private discoveryKey = "";
  private resizeObserver?: ResizeObserver;
  private resizeTarget?: Element;
  private statsRefreshToken = 0;

  public setConfig(config: PartialSavantBreakerBoardConfig): void {
    this.config = normalizeConfig(config);
    this.runtimeSortBy = this.loadPersistedSort() ?? this.config.layout.sort_by;
    this.setAttribute("density", this.config.layout.density);
    this.setAttribute("mobile-view", this.config.layout.mobile_view);
    this.discoveryKey = "";
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }

  public static getConfigForm() {
    return getSavantBreakerBoardConfigForm();
  }

  public static getStubConfig(): PartialSavantBreakerBoardConfig {
    return {
      title: "Electrical Panel",
      discovery: { enabled: true },
      layout: { group_by: "none", density: "comfortable", mobile_view: "standard" },
    };
  }

  public getCardSize(): number {
    const count = Math.max(this.breakers.length, 6);
    return Math.ceil(count / 2) + (this.config.display.show_title && this.config.title ? 1 : 0);
  }

  public getGridOptions() {
    const rows = Math.max(4, Math.ceil(Math.max(this.breakers.length, 6) / 3) * 4);
    return {
      columns: "full",
      min_columns: 6,
      rows,
      min_rows: 4,
    };
  }

  protected override firstUpdated(): void {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        this.stacked = false;
        return;
      }
      this.updateStackedLayout(entry.contentRect.width);
    });
    this.observeLayoutTarget();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  protected override updated(changed: Map<string, unknown>): void {
    this.observeLayoutTarget();
    if (changed.has("hass") || changed.has("config")) void this.ensureDiscovered();
  }

  private observeLayoutTarget(): void {
    if (!this.resizeObserver) return;
    const target = this.renderRoot.querySelector(".board-grid") ?? this.renderRoot.querySelector("ha-card") ?? this;
    if (target === this.resizeTarget) return;
    if (this.resizeTarget) this.resizeObserver.unobserve(this.resizeTarget);
    this.resizeTarget = target;
    this.resizeObserver.observe(target);
    this.updateStackedLayout(target.getBoundingClientRect().width);
  }

  private updateStackedLayout(width: number): void {
    if (!Number.isFinite(width) || width <= 0) return;
    if (this.stacked && width >= 560) this.stacked = false;
    if (!this.stacked && width <= 520) this.stacked = true;
  }

  protected override render() {
    return html`
      <ha-card>
        ${this.config.display.show_title
          ? this.renderHeader()
          : nothing}
        ${this.error
          ? html`<savant-board-error-state .message=${this.error}></savant-board-error-state>`
          : this.loading
            ? this.renderSkeletons()
            : this.visibleBreakers().length
              ? this.renderBreakers()
              : html`<savant-board-empty-state></savant-board-empty-state>`}
      </ha-card>
    `;
  }

  private renderSkeletons() {
    return html`<div class=${`board-grid ${this.stacked ? "stacked" : ""}`}>${Array.from(
      { length: 8 },
      () => html`<savant-breaker-tile-skeleton ?stacked=${this.stacked}></savant-breaker-tile-skeleton>`,
    )}</div>`;
  }

  private renderHeader() {
    return html`
      <div class="board-header">
        <div class="savant-wordmark" aria-label="Savant">SAVANT</div>
        <div class="board-tools">
          <div class="tool-wrap">
            <button class="chip-tool" type="button" @click=${() => (this.sortMenuOpen = !this.sortMenuOpen)}>
              <span aria-hidden="true">↕</span>
              <span class="sr-only">Sort</span>
            </button>
            ${this.sortMenuOpen
              ? html`<div class="tool-popover">
                  ${SORT_OPTIONS.map(
                    ({ value, label }) => html`
                      <button
                        class=${this.effectiveSortBy() === value ? "menu-option selected" : "menu-option"}
                        type="button"
                        @click=${() => this.setRuntimeSort(value)}
                      >
                        ${label}
                      </button>
                    `,
                  )}
                </div>`
              : nothing}
          </div>
          <div class="tool-wrap">
            <button class="chip-tool" type="button" @click=${() => (this.searchOpen = !this.searchOpen)}>
              <span aria-hidden="true">⌕</span>
              <span class="sr-only">Search</span>
            </button>
            ${this.searchOpen
              ? html`<div class="tool-popover search-popover">
                  <input
                    class="search-input"
                    type="search"
                    placeholder="Search loads"
                    .value=${this.searchQuery}
                    @input=${(event: Event) => (this.searchQuery = (event.target as HTMLInputElement).value)}
                  />
                </div>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private renderBreakers() {
    const grouped = groupBreakers(this.visibleBreakers(), this.config);
    return html`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${grouped.map(
          ([group, breakers]) => html`
            ${group ? html`<h3 class="group-title">${group}</h3>` : nothing}
            ${breakers.map((breaker) => {
              const display = resolveBreakerDisplay(this.config, breaker);
              const powerEntity = breaker.entities.power;
              const stat = powerEntity ? this.stats.get(powerEntity) : undefined;
              return html`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${breaker}
                .display=${display}
                .statistics=${stat}
                ?stacked=${this.stacked}
                .mobileLayout=${this.config.layout.mobile_view}
                .graphLoading=${Boolean(powerEntity && !stat)}
                .pending=${this.pendingSwitches.has(breaker.id)}
                .error=${this.toggleErrors.get(breaker.id) ?? ""}
                .warningLoadThresholdWatts=${this.config.controls.warning_load_threshold_watts ?? 1000}
                .highLoadThresholdWatts=${this.config.controls.high_load_threshold_watts ?? 2000}
              ></savant-breaker-tile>`;
            })}
          `,
        )}
      </div>
    `;
  }

  private async ensureDiscovered(): Promise<void> {
    if (!this.hass) return;
    const key = JSON.stringify({
      discovery: this.config.discovery,
      manual: this.config.manual_breakers,
    });
    if (key === this.discoveryKey && this.breakers.length) {
      void this.loadStatistics();
      return;
    }
    this.loading = true;
    this.error = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config);
      this.discoveryKey = key;
      this.loading = false;
      this.stats = new Map();
      void this.loadStatistics();
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Discovery failed";
      this.loading = false;
    }
  }

  private async loadStatistics(): Promise<void> {
    if (!this.hass) return;
    const token = ++this.statsRefreshToken;
    const entityIds = [
      ...new Set(
        this.visibleBreakers()
          .map((breaker) => breaker.entities.power)
          .filter((entityId): entityId is string => Boolean(entityId)),
      ),
    ];
    const entries = await Promise.all(
      entityIds.map(async (entityId) => [
        entityId,
        await this.statistics.getStatistics(
          this.hass!,
          entityId,
          this.config.graph.period,
          this.config.graph.refresh_interval_seconds,
        ),
      ] as const),
    );
    if (token !== this.statsRefreshToken) return;
    this.stats = new Map(entries);
  }

  private visibleBreakers(): DiscoveredBreaker[] {
    const excluded = new Set(this.config.excluded_breakers);
    const query = this.searchQuery.trim().toLowerCase();
    const filtered = this.breakers.filter((breaker) => {
      if (excluded.has(breaker.id)) return false;
      if (!query) return true;
      return [breaker.name, breaker.areaName, breaker.panelName]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));
    });
    return sortBreakers(
      filtered,
      this.config,
      this.hass,
      this.stats,
      this.effectiveSortBy(),
    );
  }

  private effectiveSortBy(): SortBy {
    return this.runtimeSortBy ?? this.config.layout.sort_by;
  }

  private setRuntimeSort(sortBy: SortBy): void {
    this.runtimeSortBy = sortBy;
    this.sortMenuOpen = false;
    window.localStorage?.setItem(this.persistedSortKey(), sortBy);
  }

  private loadPersistedSort(): SortBy | undefined {
    const value = window.localStorage?.getItem(this.persistedSortKey()) as SortBy | null;
    return SORT_OPTIONS.some((option) => option.value === value) ? value ?? undefined : undefined;
  }

  private persistedSortKey(): string {
    return `savant-breaker-board-sort:${this.config.title ?? "default"}`;
  }

  private handleToggle = async (event: CustomEvent<{ breakerId: string }>): Promise<void> => {
    event.stopPropagation();
    if (!this.hass) return;
    const breaker = this.breakers.find((item) => item.id === event.detail.breakerId);
    const entityId = breaker?.entities.switch;
    if (!breaker || !entityId || this.pendingSwitches.has(breaker.id)) return;
    this.pendingSwitches = new Set([...this.pendingSwitches, breaker.id]);
    this.toggleErrors.delete(breaker.id);
    try {
      const state = this.hass.states[entityId]?.state;
      await this.hass.callService("switch", state === "on" ? "turn_off" : "turn_on", { entity_id: entityId });
    } catch {
      const errors = new Map(this.toggleErrors);
      errors.set(breaker.id, "Failed to toggle");
      this.toggleErrors = errors;
    } finally {
      const next = new Set(this.pendingSwitches);
      next.delete(breaker.id);
      this.pendingSwitches = next;
    }
  };

  public static override styles = [
    sharedStyles,
    css`
      :host([density="compact"]) {
        --tile-height: 158px;
      }

      .board-tools {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }

      .savant-wordmark {
        font-size: 26px;
        line-height: 36px;
        height: 36px;
        font-weight: 800;
        letter-spacing: 0;
        color: var(--primary-text-color);
      }

      .tool-wrap {
        position: relative;
      }

      .chip-tool {
        height: 36px;
        width: 36px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--savant-tile-bg) 94%, white),
            var(--savant-tile-bg)
          );
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
      }

      .chip-tool:hover,
      .chip-tool:focus-visible {
        border-color: color-mix(in srgb, var(--savant-border) 70%, var(--primary-text-color));
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .tool-popover {
        position: absolute;
        right: 0;
        top: calc(100% + 6px);
        z-index: 10;
        display: grid;
        gap: 4px;
        min-width: 190px;
        padding: 8px;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        background: var(--ha-card-background, var(--card-background-color));
        box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.24));
      }

      .menu-option {
        padding: 8px 10px;
        border: 0;
        border-radius: 8px;
        color: var(--primary-text-color);
        background: transparent;
        text-align: left;
        cursor: pointer;
      }

      .menu-option.selected,
      .menu-option:hover {
        background: var(--savant-tile-bg);
      }

      .search-input {
        box-sizing: border-box;
        width: 220px;
        padding: 9px 10px;
        border: 1px solid var(--savant-border);
        border-radius: 8px;
        color: var(--primary-text-color);
        background: var(--savant-tile-bg);
      }
    `,
  ];
}

const SORT_OPTIONS: Array<{ value: SortBy; label: string }> = [
  { value: "circuit_number", label: "Circuit number" },
  { value: "name", label: "Name" },
  { value: "current_power_descending", label: "Current power" },
  { value: "highest_usage", label: "Highest usage" },
  { value: "manual", label: "Manual" },
];

function sortBreakers(
  breakers: DiscoveredBreaker[],
  config: SavantBreakerBoardConfig,
  hass?: HomeAssistant,
  stats = new Map<string, BreakerStatistics>(),
  sortBy: SortBy = config.layout.sort_by,
): DiscoveredBreaker[] {
  return [...breakers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "current_power_descending") {
      const av = parseNumber(a.entities.power ? hass?.states[a.entities.power]?.state : undefined) ?? -Infinity;
      const bv = parseNumber(b.entities.power ? hass?.states[b.entities.power]?.state : undefined) ?? -Infinity;
      return bv - av;
    }
    if (sortBy === "highest_usage") {
      const av = usageSortValue(a, stats, hass);
      const bv = usageSortValue(b, stats, hass);
      return bv - av || a.name.localeCompare(b.name);
    }
    if (sortBy === "manual") return 0;
    return (a.circuitNumber ?? 9999) - (b.circuitNumber ?? 9999) || a.name.localeCompare(b.name);
  });
}

function usageSortValue(
  breaker: DiscoveredBreaker,
  stats: Map<string, BreakerStatistics>,
  hass?: HomeAssistant,
): number {
  const powerEntity = breaker.entities.power;
  if (!powerEntity) return -Infinity;
  return stats.get(powerEntity)?.averageWatts ?? parseNumber(hass?.states[powerEntity]?.state) ?? -Infinity;
}

function groupBreakers(
  breakers: DiscoveredBreaker[],
  config: SavantBreakerBoardConfig,
): Array<[string, DiscoveredBreaker[]]> {
  if (config.layout.group_by === "none") return [["", breakers]];
  const groups = new Map<string, DiscoveredBreaker[]>();
  for (const breaker of breakers) {
    const key =
      config.layout.group_by === "panel_then_area"
        ? [breaker.panelName, breaker.areaName].filter(Boolean).join(" / ") || "Other"
        : config.layout.group_by === "area"
          ? breaker.areaName || "Other"
          : breaker.panelName || "Other";
    groups.set(key, [...(groups.get(key) ?? []), breaker]);
  }
  return [...groups.entries()];
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-energy-breaker-board-card": SavantEnergyBreakerBoardCard;
  }
}
