import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import {
    LOCATION_OPTIONS,
    WEATHER_STATION_FIELDS,
    EFM_FIELDS,
    BASE_URL,
} from "../constants/constants";
import { Location, Field } from "../types/types";
import { StationType } from "../components/LineChart";

// components
import "../components/HeaderSection";
import "../components/SideBar";
import "../components/SelectLocation";
import "../components/AnalysisSection";
import "../components/SelectFields";
import "../components/LineChart";
import "../components/RadialChart";

@customElement("weather-app")
export class WeatherApp extends LitElement {
    @property({ attribute: false, type: Boolean })
    declare collapseState: boolean;

    @property({ attribute: false, type: Object })
    declare location: Location;

    @property({ attribute: false, type: Array<Field> })
    declare weatherStationFields: Field[];

    @property({ attribute: false, type: Array<Field> })
    declare efmFields: Field[];

    @property({ attribute: false, type: String })
    declare urlEfmLineChart: string;

    @property({ attribute: false, type: String })
    declare urlWeatherStationLineChart: string;

    @property({ attribute: false, type: String })
    declare urlRadialChart: string;

    constructor() {
        super();
        this.collapseState = true;
        this.location = { value: "inaoe", title: "INAOE" };
        this.weatherStationFields = WEATHER_STATION_FIELDS;
        this.efmFields = EFM_FIELDS;
        this.urlEfmLineChart = "";
        this.urlWeatherStationLineChart = "";
        this.urlRadialChart = "";
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

            .query-button {
                width: 100%;
                height: 28px;
                display: flex;
                justify-content: center;
            }

            .query-button > button {
                width: 124px;
                height: 28px;
                border: 1px solid var(--main-color-primary);
                border-radius: 4px;
                background: none;
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
        this.efmFields = e.detail.fields;
    }

    createLineChartUrl(
        location: string,
        collection: string,
        fields: string[],
        dates: { startDate: string; endDate: string }
    ): string {
        const url = new URL(`${BASE_URL}/${location}/${collection}/line-chart/`);
        url.searchParams.set("fields", fields.join(","));
        url.searchParams.set("dates", `${dates.startDate},${dates.endDate}`);
        return url.toString();
    }

    createRadialChartUrl(
        location: string,
        dates: { startDate: string; endDate: string }
    ): string {
        const url = new URL(`${BASE_URL}/${location}/radial-chart/`);
        url.searchParams.set("dates", `${dates.startDate},${dates.endDate}`);
        return url.toString();
    }

    handleClickEfmLineChart() {
        if (this.location.value === "default") {
            return;
        }
        this.urlEfmLineChart = this.createLineChartUrl(
            this.location.value,
            "EFMRecords",
            this.efmFields.map((field) => field.value),
            { startDate: "2019-01-01", endDate: "2019-05-01" }
        );
    }

    handleClickWeatherStationLineChart() {
        if (this.location.value === "default") {
            return;
        }
        this.urlWeatherStationLineChart = this.createLineChartUrl(
            this.location.value,
            "WeatherRecords",
            this.weatherStationFields.map((field) => field.value),
            { startDate: "2019-01-01", endDate: "2019-05-01" }
        );
    }

    handleClickRadialChart() {
        if (this.location.value === "default") {
            return;
        }
        this.urlRadialChart = this.createRadialChartUrl(this.location.value, {
            startDate: "2019-01-01",
            endDate: "2019-05-01",
        });
    }

    firstUpdated() {
        this.urlEfmLineChart = this.createLineChartUrl(
            this.location.value,
            "EFMRecords",
            this.efmFields.map((field) => field.value),
            { startDate: "2019-01-01", endDate: "2019-05-01" }
        );
        this.urlWeatherStationLineChart = this.createLineChartUrl(
            this.location.value,
            "WeatherRecords",
            this.weatherStationFields.map((field) => field.value),
            { startDate: "2019-01-01", endDate: "2019-05-01" }
        );
        this.urlRadialChart = this.createRadialChartUrl(this.location.value, {
            startDate: "2019-01-01",
            endDate: "2019-05-01",
        });
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
                    <side-bar-item section-title="Graficas">
                        <select-fields
                            fields-title="Medidor campo eléctrico"
                            .fields=${EFM_FIELDS}
                            @getSelected=${this.handleEfmFields}
                        >
                            <div class="query-button">
                                <button @click=${this.handleClickEfmLineChart}>
                                    Establecer
                                </button>
                            </div>
                        </select-fields>
                        <select-fields
                            fields-title="Estación meteorológica"
                            .fields=${WEATHER_STATION_FIELDS}
                            @getSelected=${this.handleWeatherStationFields}
                        >
                            <div class="query-button">
                                <button @click=${this.handleClickWeatherStationLineChart}>
                                    Establecer
                                </button>
                            </div>
                        </select-fields>
                    </side-bar-item>
                </side-bar>
                <analysis-section ?collapse-section="${this.collapseState}">
                    <line-chart
                        chart-title="Medidor campo eléctrico"
                        station-type=${StationType.EFM}
                        .seriesUrl=${this.urlEfmLineChart}
                    ></line-chart>
                    <line-chart
                        chart-title="Estación meteorológica"
                        station-type=${StationType.Weather}
                        .seriesUrl=${this.urlWeatherStationLineChart}
                    ></line-chart>
                    <radial-chart
                        chart-title="Número de rayos detectados por rango"
                        .seriesUrl=${this.urlRadialChart}
                    ></radial-chart>
                </analysis-section>
            </div>
        `;
    }
}
