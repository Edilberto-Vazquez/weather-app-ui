import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import {
    LOCATION_OPTIONS,
    WEATHER_STATION_FIELDS,
    EFM_FIELDS,
    BASE_URL,
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
    declare weatherStationFields: Field[];

    @property({ attribute: false, type: Array<Field> })
    declare efmFields: Field[];

    @property({ attribute: false, type: Map })
    declare urls: Map<string, string>;

    @property({ attribute: false, type: String })
    declare url: string;

    constructor() {
        super();
        this.collapseState = true;
        this.location = { value: "default", title: "Selecciona una locación" };
        this.weatherStationFields = WEATHER_STATION_FIELDS;
        this.efmFields = EFM_FIELDS;
        this.urls = new Map([
            ["efmLineChart", ""],
            ["weatherStationLineChart", ""],
            ["radialChart", ""],
        ]);
        this.url = "";
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

    handleClick() {
        if (this.location.value === "default") {
            return;
        }

        this.urls = new Map<string, string>([
            [
                "efmLineChart",
                this.createLineChartUrl(
                    this.location.value,
                    "EFMRecords",
                    this.efmFields.map((field) => field.value),
                    { startDate: "2019-01-01", endDate: "2019-05-01" }
                ),
            ],
            [
                "weatherStationLineChart",
                this.createLineChartUrl(
                    this.location.value,
                    "WeatherRecords",
                    this.weatherStationFields.map((field) => field.value),
                    { startDate: "2019-01-01", endDate: "2019-05-01" }
                ),
            ],
            [
                "radialChart",
                this.createRadialChartUrl(this.location.value, {
                    startDate: "2019-01-01",
                    endDate: "2019-05-01",
                }),
            ],
        ]);
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
                            <div class="query-button">
                                <button @click=${this.handleClick}>Establecer</button>
                            </div>
                        </select-fields>
                        <select-fields
                            fields-title="Medidor campo eléctrico"
                            .fields=${EFM_FIELDS}
                            @getSelected=${this.handleEfmFields}
                        >
                            <div class="query-button">
                                <button @click=${this.handleClick}>Establecer</button>
                            </div>
                        </select-fields>
                    </side-bar-item>
                </side-bar>
                <analysis-section ?collapse-section="${this.collapseState}">
                    <line-chart .seriesUrl=${this.urls.get("efmLineChart")}></line-chart>
                    <line-chart
                        .seriesUrl=${this.urls.get("weatherStationLineChart")}
                    ></line-chart>
                </analysis-section>
            </div>
        `;
    }
}
