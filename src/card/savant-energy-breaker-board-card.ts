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
import type { PartialSavantBreakerBoardConfig, SavantBreakerBoardConfig } from "../types/config";
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
  private discovery = new BreakerDiscoveryService();
  private statistics = new StatisticsManager();
  private discoveryKey = "";
  private resizeObserver?: ResizeObserver;
  private resizeTarget?: Element;
  private statsRefreshToken = 0;

  public setConfig(config: PartialSavantBreakerBoardConfig): void {
    this.config = normalizeConfig(config);
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
      layout: { group_by: "panel", density: "comfortable", mobile_view: "standard" },
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
        ${this.config.display.show_title && this.config.title
          ? html`<div class="board-header"><h2 class="board-title">${this.config.title}</h2></div>`
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
                .highLoadThresholdWatts=${this.config.controls.high_load_threshold_watts ?? 3500}
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
    return sortBreakers(
      this.breakers.filter((breaker) => !excluded.has(breaker.id)),
      this.config,
      this.hass,
      this.stats,
    );
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
    `,
  ];
}

function sortBreakers(
  breakers: DiscoveredBreaker[],
  config: SavantBreakerBoardConfig,
  hass?: HomeAssistant,
  stats = new Map<string, BreakerStatistics>(),
): DiscoveredBreaker[] {
  return [...breakers].sort((a, b) => {
    if (config.layout.sort_by === "name") return a.name.localeCompare(b.name);
    if (config.layout.sort_by === "current_power_descending") {
      const av = parseNumber(a.entities.power ? hass?.states[a.entities.power]?.state : undefined) ?? -Infinity;
      const bv = parseNumber(b.entities.power ? hass?.states[b.entities.power]?.state : undefined) ?? -Infinity;
      return bv - av;
    }
    if (config.layout.sort_by === "highest_usage") {
      const av = usageSortValue(a, stats, hass);
      const bv = usageSortValue(b, stats, hass);
      return bv - av || a.name.localeCompare(b.name);
    }
    if (config.layout.sort_by === "manual") return 0;
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
