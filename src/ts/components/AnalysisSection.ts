import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("analysis-section")
export class AnalysisSection extends LitElement {
    @property({ attribute: "collapse-section", type: Boolean, reflect: true })
    declare collapseSection: boolean;

    constructor() {
        super();
        this.collapseSection = false;
    }

    static styles = css`
        :host {
            width: 100%;
            height: calc(100% - 64px);
            padding: 24px;
            display: grid;
            align-items: flex-start;
            grid-template-columns: repeat(auto-fit, minmax(272px, 100%));
            grid-auto-rows: min-content;
            gap: 24px;
            position: fixed;
            left: 0px;
            z-index: 0;
            transition: all 0.5s ease;
            background-color: whitesmoke;
            overflow-y: scroll;
        }

        @media (min-width: 900px) {
            :host {
                width: 100%;
                left: 0px;
            }
            :host([collapse-section]) {
                width: calc(100% - 264px);
                left: 264px;
            }
        }
    `;

    render() {
        return html` <slot></slot> `;
    }
}
