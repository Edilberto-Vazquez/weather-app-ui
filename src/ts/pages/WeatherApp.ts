import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import {
  LOCATION_OPTIONS,
  CULTIVATION_OPTIONS,
  DATES_OPTIONS,
  WEATHER_STATION_FIELDS,
  BASE_URL,
} from "../constants/constants";
import { Location, Field, Dates } from "../types/types";
import { StationType } from "../components/LineChart";

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

  @property({ attribute: false, type: Object })
  declare cultivation: Location;

  @property({ attribute: false, type: Object })
  declare startDate: Location;

  @property({ attribute: false, type: Array<Field> })
  declare weatherStationFields: Field[];

  @property({ attribute: false, type: String })
  declare urlWeatherStationLineChart: string;

  constructor() {
    super();
    this.collapseState = true;
    this.location = { value: "", title: "" };
    this.cultivation = { value: "", title: "" };
    this.weatherStationFields = WEATHER_STATION_FIELDS;
    this.urlWeatherStationLineChart = "";
    this.startDate = { value: "", title: "" };
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
        height: calc(100% - 64px);
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

  handleCultivation(e: CustomEvent): void {
    this.cultivation = e.detail.location;
  }

  handleStartDate(e: CustomEvent): void {
    this.startDate = e.detail.location;
  }

  handleCollapse(e: CustomEvent): void {
    this.collapseState = !e.detail.collapse;
  }

  handleWeatherStationFields(e: CustomEvent): void {
    this.weatherStationFields = e.detail.fields;
  }

  createLineChartUrl(
    location: string,
    collection: string,
    fields: string[]
  ): string {
    // const url = new URL(`${BASE_URL}/${location}/${collection}/line-chart/`);
    // url.searchParams.set("fields", fields.join(","));
    // url.searchParams.set("dates", `${dates.startDate},${dates.endDate}`);
    // return url.toString();
    return BASE_URL;
  }

  handleClickWeatherStationLineChart() {
    if (this.location.value === "default") {
      return;
    }

    this.urlWeatherStationLineChart = this.createLineChartUrl(
      this.location.value,
      "WeatherRecords",
      this.weatherStationFields.map((field) => field.value)
    );
  }

  firstUpdated() {
    this.urlWeatherStationLineChart = BASE_URL;
    this.startDate = DATES_OPTIONS[0];
  }

  render() {
    return html`
      <header-section header-title="Estados fenológicos"></header-section>
      <div class="main-section">
        <side-bar @collapse=${this.handleCollapse}>
          <side-bar-item
            section-title="Locaciones"
            @getLocation=${this.handleLocation}
          >
            <select-location .options=${LOCATION_OPTIONS}></select-location>
          </side-bar-item>
          <side-bar-item
            section-title="Cultivos"
            @getLocation=${this.handleCultivation}
          >
            <select-location .options=${CULTIVATION_OPTIONS}></select-location>
          </side-bar-item>
          <side-bar-item
            section-title="Fecha de inicio año 2023"
            @getLocation=${this.handleStartDate}
          >
            <select-location .options=${DATES_OPTIONS}></select-location>
          </side-bar-item>
          <side-bar-item section-title="Graficas">
            <select-fields
              fields-title="Variables"
              .fields=${WEATHER_STATION_FIELDS}
              @getSelected=${this.handleWeatherStationFields}
            >
            </select-fields>
          </side-bar-item>
          <div class="query-button">
            <button @click=${this.handleClickWeatherStationLineChart}>
              Establecer
            </button>
          </div>
        </side-bar>
        <analysis-section ?collapse-section="${this.collapseState}">
          <line-chart
            chart-title="Datos Agroclimaticos copernicus"
            station-type=${StationType.Weather}
            .seriesUrl=${this.urlWeatherStationLineChart}
            .startDate=${this.startDate}
          ></line-chart>
          <div class="map-section">
            <h2>Region de México</h2>
            <img src="../../assets/imgs/mapa.png" width="100%" height="500px" />
          </div>
        </analysis-section>
      </div>
    `;
  }
}
