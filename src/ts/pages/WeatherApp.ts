import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "../components/HeaderSection";
import "../components/SideBar";
import "../components/SelectLocation";
import "../components/AnalysisSection";

@customElement("weather-app")
export class WeatherApp extends LitElement {
    @property({ attribute: false, type: Boolean })
    declare collapseState: boolean;

    constructor() {
        super();
        this.collapseState = true;
    }

    static styles = [
        globalStyles,
        css`
            :host {
                width: 100%;
                height: 100vh;
                display: flex;
            }
            .main-section {
                width: 100%;
                height: (100% - 64px);
                margin-block-start: 64px;
                box-sizing: border-box;
                padding: 0px;
            }
        `,
    ];

    hCollapse(e: CustomEvent): void {
        this.collapseState = !e.detail.collapse;
    }

    render() {
        return html`
            <header-section title="Análisis del tiempo"></header-section>
            <div class="main-section">
                <side-bar @collapse=${this.hCollapse}>
                    <side-bar-item section-title="Locaciones">
                        <select-location></select-location>
                    </side-bar-item>
                </side-bar>
                <analysis-section
                    ?collapse-section="${this.collapseState}"
                ></analysis-section>
            </div>
        `;
    }
}
