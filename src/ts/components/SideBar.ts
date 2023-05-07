import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("side-bar")
export class SideBar extends LitElement {
    @property({ attribute: true, type: Boolean, reflect: true })
    declare collapse: boolean;

    constructor() {
        super();
        this.collapse = false;
    }

    static styles = [
        globalStyles,
        css`
            :host {
                width: 264px;
                height: calc(100vh - 64px);
                padding: 8px;
                position: fixed;
                top: 64px;
                left: 0px;
                transition: all 0.5s ease;
                border-inline-end: 1px solid rgba(0, 0, 0, 0.12);
                background-color: white;
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
            }
            :host([collapse]) {
                left: -264px;
            }
        `,
    ];

    collapseSideBar(e: Event) {
        this.collapse = !this.collapse;
    }

    render() {
        return html`
            <button class="collapse-button" @click=${this.collapseSideBar}>
                ${this.collapse ? ">" : "<"}
            </button>
        `;
    }
}
