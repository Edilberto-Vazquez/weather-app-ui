import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("header-section")
export class HeaderSection extends LitElement {
    static styles = [
        globalStyles,
        css`
            :host {
                width: 100%;
                height: 64px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                border-block-end: 1px solid rgba(0, 0, 0, 0.12);
                background-color: white;
            }
            .title {
                font-size: 2.4rem;
                text-align: center;
            }
        `,
    ];

    render() {
        return html` <h1 class="header__title">Análisis del tiempo</h1> `;
    }
}
