import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("side-bar")
export class SideBar extends LitElement {
    @property({ attribute: "collapse-side-bar", type: Boolean, reflect: true })
    declare collapseSideBar: boolean;

    @property({ type: Function })
    declare handleCollapseSideBar: ((e: Event) => void) | null;

    constructor() {
        super();
        this.collapseSideBar = false;
    }

    static styles = [
        globalStyles,
        css`
            :host {
                width: 264px;
                height: 100%;
                padding: 8px;
                position: fixed;
                top: 64px;
                left: 0px;
                z-index: 1;
                border-inline-end: 1px solid rgba(0, 0, 0, 0.12);
                background-color: white;
                transition: all 0.5s ease;
            }

            :host > .collapse-button {
                width: 40px;
                height: 56px;
                position: absolute;
                top: calc(50% - 38px);
                right: -40px;
                border: none;
                border-radius: 0px 16px 16px 0px;
                box-shadow: rgba(196, 202, 207, 0.5) 4px 0px 4px;
                background-color: white;
                background-image: url("../assets/icons/arrow-left.svg");
                background-repeat: no-repeat;
                background-position: center;
                background-size: auto;
                transition: all 0.5s ease;
            }

            :host([collapse-side-bar]) {
                left: -264px;
            }

            :host([collapse-side-bar]) > .collapse-button {
                background-image: url("../assets/icons/arrow-right.svg");
            }
        `,
    ];

    dispatchCollapse() {
        this.collapseSideBar = !this.collapseSideBar;
        const options = {
            detail: { collapse: this.collapseSideBar },
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent("collapse", options));
    }

    render() {
        return html`
            <button class="collapse-button" @click=${this.dispatchCollapse}></button>
        `;
    }
}
