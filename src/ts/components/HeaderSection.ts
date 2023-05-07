import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("header-section")
export class HeaderSection extends LitElement {
    @property({ attribute: true, type: String })
    declare title: string;

    constructor() {
        super();
        this.title = "";
    }

    static styles = css`
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
        :host > title {
            font-size: 2.4rem;
            text-align: center;
        }
    `;

    render() {
        return html` <h1 class="title">${this.title}</h1> `;
    }
}
