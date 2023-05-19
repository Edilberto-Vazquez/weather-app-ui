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

            .date-picker {
                width: 100%;
                height: auto;
                display: grid;
                grid-auto-rows: min-content;
                row-gap: 2px;
                font-size: 1.4rem;
            }

            .date-picker > label {
                height: 28px;
            }

            .date-picker > label > input {
                height: 100%;
                margin-inline-start: 4px;
                border: 1px solid var(--main-color-primary);
                border-radius: 4px;
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
        const { efmDates } = this.getDates();
        if (this.location.value === "default") {
            return;
        }
        this.urlEfmLineChart = this.createLineChartUrl(
            this.location.value,
            "EFMRecords",
            this.efmFields.map((field) => field.value),
            { startDate: efmDates.starDate, endDate: efmDates.endDate }
        );
    }

    handleClickWeatherStationLineChart() {
        const { wsDates } = this.getDates();
        if (this.location.value === "default") {
            return;
        }
        this.urlWeatherStationLineChart = this.createLineChartUrl(
            this.location.value,
            "WeatherRecords",
            this.weatherStationFields.map((field) => field.value),
            { startDate: wsDates.starDate, endDate: wsDates.endDate }
        );
    }

    handleClickRadialChart() {
        const { ranDates } = this.getDates();
        if (this.location.value === "default") {
            return;
        }
        this.urlRadialChart = this.createRadialChartUrl(this.location.value, {
            startDate: ranDates.starDate,
            endDate: ranDates.endDate,
        });
    }

    getDates() {
        const efmStartDate = this.shadowRoot?.querySelector(
            "#efm-start-date"
        ) as HTMLInputElement;

        const efmEndtDate = this.shadowRoot?.querySelector(
            "#efm-end-date"
        ) as HTMLInputElement;

        const wsStartDate = this.shadowRoot?.querySelector(
            "#ws-start-date"
        ) as HTMLInputElement;

        const wsEndtDate = this.shadowRoot?.querySelector(
            "#ws-end-date"
        ) as HTMLInputElement;

        const ranStartDate = this.shadowRoot?.querySelector(
            "#ran-start-date"
        ) as HTMLInputElement;

        const ranEndtDate = this.shadowRoot?.querySelector(
            "#ran-end-date"
        ) as HTMLInputElement;

        return {
            efmDates: { starDate: efmStartDate.value, endDate: efmEndtDate.value },
            wsDates: { starDate: wsStartDate.value, endDate: wsEndtDate.value },
            ranDates: { starDate: ranStartDate.value, endDate: ranEndtDate.value },
        };
    }

    // concatDates(phrase: string, type: string) {
    //     const dates = this.getDates();
    //     return `${phrase} - ${dates[type].startDate} - ${dates[type].endDate}`;
    // }

    firstUpdated() {
        const { efmDates, wsDates, ranDates } = this.getDates();

        this.urlEfmLineChart = this.createLineChartUrl(
            this.location.value,
            "EFMRecords",
            this.efmFields.map((field) => field.value),
            { startDate: efmDates.starDate, endDate: efmDates.endDate }
        );
        this.urlWeatherStationLineChart = this.createLineChartUrl(
            this.location.value,
            "WeatherRecords",
            this.weatherStationFields.map((field) => field.value),
            { startDate: wsDates.starDate, endDate: wsDates.endDate }
        );
        this.urlRadialChart = this.createRadialChartUrl(this.location.value, {
            startDate: ranDates.starDate,
            endDate: ranDates.endDate,
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
                            <div class="date-picker">
                                <label for="efm-start-date">
                                    Desde:
                                    <input
                                        type="date"
                                        id="efm-start-date"
                                        value="2019-01-01"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                                <label for="efm-end-date">
                                    Hasta:
                                    <input
                                        type="date"
                                        id="efm-end-date"
                                        value="2019-12-31"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                            </div>
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
                            <div class="date-picker">
                                <label for="ws-start-date">
                                    Desde:
                                    <input
                                        type="date"
                                        id="ws-start-date"
                                        value="2019-01-01"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                                <label for="ws-end-date">
                                    Hasta:
                                    <input
                                        type="date"
                                        id="ws-end-date"
                                        value="2019-12-31"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                            </div>
                            <div class="query-button">
                                <button @click=${this.handleClickWeatherStationLineChart}>
                                    Establecer
                                </button>
                            </div>
                        </select-fields>
                        <select-fields fields-title="Rayos detectados por rango">
                            <div class="date-picker">
                                <label for="ran-start-date">
                                    Desde:
                                    <input
                                        type="date"
                                        id="ran-start-date"
                                        value="2019-01-01"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                                <label for="ran-end-date">
                                    Hasta:
                                    <input
                                        type="date"
                                        id="ran-end-date"
                                        value="2019-12-31"
                                        min="2016-01-01"
                                        max="2019-12-31"
                                    />
                                </label>
                            </div>
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
