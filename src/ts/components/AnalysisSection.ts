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

    static styles = [
        globalStyles,
        css`
            :host {
                width: 100%;
                height: 100%;
                padding: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                left: 0px;
                z-index: 0;
                transition: all 0.5s ease;
                background-color: whitesmoke;
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
        `,
    ];

    render() {
        return html` hola `;
    }
}
