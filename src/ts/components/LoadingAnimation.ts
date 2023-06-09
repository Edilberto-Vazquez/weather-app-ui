import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("loading-animation")
export class Loading extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid var(--main-color-primary);
            border-color: var(--main-color-primary) transparent var(--main-color-primary)
                transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    render() {
        return html`<div class="lds-dual-ring"></div>`;
    }
}
