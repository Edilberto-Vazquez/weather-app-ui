import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import ApexCharts from "https://cdn.skypack.dev/apexcharts";
import { EFM_CHART_NAMES, WEATHER_STATION_CHART_NAMES } from "../constants/constants";

import "./LoadingAnimation";

export enum StationType {
    EFM = "EFM",
    Weather = "Weather",
}

@customElement("line-chart")
export class LineChart extends LitElement {
    @property({ attribute: "chart-title", type: String })
    declare chartTitle: string;

    @property({ attribute: "station-type", type: StationType })
    declare stationType: StationType;

    @property({ attribute: true, type: Array<any> })
    declare series: any[];

    @property({ attribute: true, type: String })
    declare seriesUrl: string;

    @property({ attribute: true, type: Boolean, reflect: true })
    declare loading: boolean;

    constructor() {
        super();
        this.chartTitle = "";
        this.stationType = StationType.EFM;
        this.series = [];
        this.seriesUrl = "";
        this.loading = false;
    }

    static styles = css`
        :host {
            width: 100%;
            height: 400px;
            padding: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            width: 100%;
            min-width: 272px;
        }
        .chart {
            width: 100%;
            min-width: 272px;
            height: 100%;
        }
    `;

    async fetchData() {
        if (this.seriesUrl === "") {
            return;
        }
        const mainContainer = this.shadowRoot!.querySelector("#chart") as HTMLDivElement;
        mainContainer.innerHTML = "";
        const container = document.createElement("loading-animation");
        mainContainer.appendChild(container);
        this.loading = true;
        try {
            if (this.series.length > 0) {
            }

            const response = await fetch(this.seriesUrl);
            const data = await response.json();
            const parsedSeriesNames = data.data.map((serie: any) => {
                switch (this.stationType) {
                    case StationType.EFM:
                        serie.name = EFM_CHART_NAMES.get(serie.name);
                        break;
                    case StationType.Weather:
                        serie.name = WEATHER_STATION_CHART_NAMES.get(serie.name);
                        break;
                    default:
                        break;
                }
                return serie;
            });

            this.series = parsedSeriesNames;
            this.createChart(mainContainer);
        } catch (error) {
            console.error("Error making the request:", error);
            alert("Error making the request");
        } finally {
            this.loading = false;
            mainContainer.removeChild(container);
        }
    }

    createChart(mainContainer: HTMLDivElement) {
        const options = {
            series: this.series,
            chart: {
                type: "area",
                stacked: false,
                height: 350,
                zoom: {
                    type: "x",
                    enabled: true,
                    autoScaleYaxis: true,
                },
                toolbar: {
                    autoSelected: "zoom",
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
            },
            title: {
                text: this.chartTitle,
                align: "left",
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100],
                },
            },
            yaxis: {
                title: {
                    text: "Valor",
                },
            },
            xaxis: {
                type: "datetime",
            },
            tooltip: {
                shared: false,
            },
        };

        const container = document.createElement("div");
        container.classList.add("chart");
        mainContainer.appendChild(container);

        const chart = new ApexCharts(container, options);
        chart.render();
    }

    firstUpdated() {
        this.fetchData();
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("seriesUrl")) {
            this.fetchData();
        }
    }

    render() {
        return html` <div id="chart" class="container"></div> `;
    }
}
