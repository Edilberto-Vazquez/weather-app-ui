import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import ApexCharts from "https://cdn.skypack.dev/apexcharts";

import "./LoadingAnimation";

@customElement("radial-chart")
export class RadialChart extends LitElement {
    @property({ attribute: "chart-title", type: String })
    declare chartTitle: string;

    @property({ attribute: true, type: Array<any> })
    declare series: any[];

    @property({ attribute: true, type: Array<any> })
    declare labels: any[];

    @property({ attribute: true, type: String })
    declare seriesUrl: string;

    @property({ attribute: true, type: Boolean, reflect: true })
    declare loading: boolean;

    constructor() {
        super();
        this.series = [];
        this.labels = [];
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
            this.series = Object.values(data.data);
            this.labels = Object.keys(data.data);
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
                height: 400,
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    track: {
                        background: "#333",
                        startAngle: 0,
                        endAngle: 270,
                    },
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: "30%",
                        background: "transparent",
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                        },
                    },
                },
            },
            colors: ["#137b9d", "#1c92b3", "#66c8e8", "#a7d9e8"],
            labels: this.labels,
            legend: {
                show: true,
                floating: true,
                fontSize: "16px",
                position: "left",
                offsetX: 160,
                offsetY: 15,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0,
                },
                formatter: function (seriesName: any, opts: any) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                },
                itemMargin: {
                    vertical: 3,
                },
            },
            title: {
                text: this.chartTitle,
                align: "left",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            show: false,
                        },
                    },
                },
            ],
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
