import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "../components/HeaderSection";
import "../components/SideBar";
import "../components/SelectLocation";
import "../components/AnalysisSection";
import "../components/SelectFields";
import {
    LOCATION_OPTIONS,
    WEATHER_STATIONS_FIELDS,
    EFM_FIELDS,
} from "../constants/constants";

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

    handleCollapse(e: CustomEvent): void {
        this.collapseState = !e.detail.collapse;
    }

    handleFields(e: CustomEvent): void {
        console.log(e.detail.fields);
    }

    render() {
        return html`
            <header-section header-title="Análisis del tiempo"></header-section>
            <div class="main-section">
                <side-bar @collapse=${this.handleCollapse}>
                    <side-bar-item section-title="Locaciones">
                        <select-location .options=${LOCATION_OPTIONS}></select-location>
                    </side-bar-item>
                    <side-bar-item section-title="Campos">
                        <select-fields
                            fields-title="Estación meteorológica"
                            .fields=${WEATHER_STATIONS_FIELDS}
                            @getSelected=${this.handleFields}
                        >
                        </select-fields>
                        <select-fields
                            fields-title="Medidor campo eléctrico"
                            .fields=${EFM_FIELDS}
                            @getSelected=${this.handleFields}
                        >
                        </select-fields>
                    </side-bar-item>
                    <side-bar-item section-title="Análisis"> </side-bar-item>
                </side-bar>
                <analysis-section
                    ?collapse-section="${this.collapseState}"
                ></analysis-section>
            </div>
        `;
    }
}
