import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import {
    LOCATION_OPTIONS,
    WEATHER_STATION_FIELDS,
    EFM_FIELDS,
} from "../constants/constants";
import { Location } from "../types/stations";
import { Field } from "../types/columns";

// components
import "../components/HeaderSection";
import "../components/SideBar";
import "../components/SelectLocation";
import "../components/AnalysisSection";
import "../components/SelectFields";
import "../components/LineChart";

@customElement("weather-app")
export class WeatherApp extends LitElement {
    @property({ attribute: false, type: Boolean })
    declare collapseState: boolean;

    @property({ attribute: false, type: Object })
    declare location: Location;

    @property({ attribute: false, type: Array<Field> })
    declare weatherStationFields: [];

    @property({ attribute: false, type: Array<Field> })
    declare efmFields: [];

    constructor() {
        super();
        this.collapseState = true;
        this.location = { value: "default", title: "Selecciona una locación" };
        this.weatherStationFields = [];
        this.efmFields = [];
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

    handleLocation(e: CustomEvent): void {
        this.location = e.detail.location;
    }

    handleCollapse(e: CustomEvent): void {
        this.collapseState = !e.detail.collapse;
    }

    handleWeatherStationFields(e: CustomEvent): void {
        this.weatherStationFields = e.detail.fields;
    }

    handleEfmFields(e: CustomEvent): void {
        this.weatherStationFields = e.detail.fields;
    }

    render() {
        return html`
            <header-section header-title="Análisis del tiempo"></header-section>
            <div class="main-section">
                <side-bar @collapse=${this.handleCollapse}>
                    <side-bar-item
                        section-title="Locaciones"
                        @getLocation=${this.handleLocation}
                    >
                        <select-location .options=${LOCATION_OPTIONS}></select-location>
                    </side-bar-item>
                    <side-bar-item section-title="Campos">
                        <select-fields
                            fields-title="Estación meteorológica"
                            .fields=${WEATHER_STATION_FIELDS}
                            @getSelected=${this.handleWeatherStationFields}
                        >
                        </select-fields>
                        <select-fields
                            fields-title="Medidor campo eléctrico"
                            .fields=${EFM_FIELDS}
                            @getSelected=${this.handleEfmFields}
                        >
                        </select-fields>
                    </side-bar-item>
                </side-bar>
                <analysis-section ?collapse-section="${this.collapseState}">
                    <line-chart></line-chart>
                    <line-chart></line-chart>
                    <line-chart></line-chart>
                    <line-chart></line-chart>
                </analysis-section>
            </div>
        `;
    }
}
