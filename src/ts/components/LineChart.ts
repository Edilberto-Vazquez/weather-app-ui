import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import ApexCharts from "https://cdn.skypack.dev/apexcharts";

@customElement("line-chart")
export class LineChart extends LitElement {
    constructor() {
        super();
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
        div {
            width: 100%;
            min-width: 272px;
            max-width: 1024px;
        }
    `;

    updated() {
        const options = {
            series: [
                {
                    name: "Desktops",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                },
            ],
            chart: {
                height: 400,
                type: "line",
                zoom: {
                    enabled: false,
                },
                stacked: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            title: {
                text: "Product Trends by Month",
                align: "left",
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                ],
            },
        };

        const chart = new ApexCharts(this.shadowRoot!.querySelector("#chart"), options);
        chart.render();
    }

    render() {
        return html` <div id="chart"></div> `;
    }
}
