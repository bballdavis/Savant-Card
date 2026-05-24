import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fireEvent } from "../utilities/events";

@customElement("savant-hold-control-button")
export class SavantHoldControlButton extends LitElement {
  @property({ type: String }) public breakerId = "";
  @property({ type: String }) public label = "breaker";
  @property({ type: String }) public switchState = "off";
  @property({ type: String }) public mode: "hold" | "hold_confirm_off" = "hold_confirm_off";
  @property({ type: Boolean }) public disabled = false;
  @property({ type: Boolean }) public pending = false;
  @state() private holding = false;
  @state() private progress = 0;
  private timer?: number;
  private startedAt = 0;
  private readonly holdMs = 900;

  protected override render() {
    const aria = this.disabled
      ? `${this.label} breaker unavailable`
      : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return html`
      <button
        aria-label=${aria}
        title=${aria}
        ?disabled=${this.disabled || this.pending}
        class=${this.holding ? "holding" : ""}
        style=${`--progress:${this.progress * 360}deg`}
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointerleave=${this.cancelHold}
        @pointercancel=${this.cancelHold}
        @click=${this.preventClick}
      >
        <span class="icon">⏻</span>
      </button>
    `;
  }

  private preventClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    if (this.disabled || this.pending) return;
    this.holding = true;
    this.startedAt = performance.now();
    this.tick();
  }

  private onPointerUp(event: PointerEvent): void {
    event.stopPropagation();
    if (!this.holding) return;
    if (performance.now() - this.startedAt >= this.holdMs) this.requestToggle();
    this.cancelHold();
  }

  private tick(): void {
    const elapsed = performance.now() - this.startedAt;
    this.progress = Math.min(1, elapsed / this.holdMs);
    if (this.progress >= 1) return;
    this.timer = window.setTimeout(() => this.tick(), 16);
  }

  private cancelHold = (): void => {
    window.clearTimeout(this.timer);
    this.holding = false;
    this.progress = 0;
  };

  private requestToggle(): void {
    const turningOff = this.switchState === "on";
    const confirmed =
      !turningOff ||
      this.mode !== "hold_confirm_off" ||
      window.confirm(`Turn off ${this.label} breaker?`);
    if (!confirmed) return;
    fireEvent(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }

  public static override styles = css`
    :host {
      display: inline-grid;
      place-items: center;
    }

    button {
      width: 46px;
      height: 46px;
      border-radius: 999px;
      border: 2px solid currentColor;
      background:
        conic-gradient(currentColor var(--progress, 0deg), transparent 0),
        color-mix(in srgb, var(--savant-tile-bg) 78%, transparent);
      color: var(--control-color, var(--savant-success));
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
      box-shadow: 0 0 18px color-mix(in srgb, currentColor 18%, transparent);
    }

    button[disabled] {
      cursor: default;
      color: var(--savant-disabled);
      box-shadow: none;
      opacity: 0.7;
    }

    .icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: var(--savant-tile-bg);
      font-size: 19px;
      line-height: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-hold-control-button": SavantHoldControlButton;
  }
}
