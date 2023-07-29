import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import ApexCharts from "https://cdn.skypack.dev/apexcharts";
import { WEATHER_STATION_CHART_NAMES } from "../constants/constants";
import { Location } from "../types/types";

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

  @property({ attribute: "series", type: Array<any> })
  declare series: any[];

  @property({ attribute: true, type: String })
  declare seriesUrl: string;

  @property({ attribute: true, type: Boolean, reflect: true })
  declare loading: boolean;

  @property({ attribute: "start-date", type: Object })
  declare startDate: Location;

  constructor() {
    super();
    this.chartTitle = "";
    this.stationType = StationType.EFM;
    this.series = [];
    this.seriesUrl = "";
    this.loading = false;
    this.startDate = { value: "", title: "" };
  }

  static styles = css`
    :host {
      width: 100%;
      height: 650px;
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
    const mainContainer = this.shadowRoot!.querySelector(
      "#chart"
    ) as HTMLDivElement;
    mainContainer.innerHTML = "";
    const container = document.createElement("loading-animation");
    mainContainer.appendChild(container);
    this.loading = true;
    try {
      const response = await fetch(this.seriesUrl);
      const { data } = await response.json();

      const parsedSeriesNames = data.map((serie: any) => {
        switch (this.stationType) {
          case StationType.Weather:
            serie.name = WEATHER_STATION_CHART_NAMES.get(serie.name);
            break;
          default:
            break;
        }
        // serie.data = serie.data.filter(
        //   (item) =>
        //     item.x >= this.dates.startDate && item.x <= this.dates.endDate
        // );
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
    const addDaysToDate = (date: Date, days: number) => {
      const dateWithDays = new Date(date);
      dateWithDays.setDate(date.getDate() + days);
      return dateWithDays;
    };

    const startDate = new Date(this.startDate.value);
    const date1 = addDaysToDate(startDate, 0);
    const date2 = addDaysToDate(startDate, 40);
    const date3 = addDaysToDate(startDate, 80);
    const date4 = addDaysToDate(startDate, 120);

    const getPointValue = (values: Array<any>, date: Date) =>
      values.find((item) => item.x === date.toISOString().slice(0, 16)).y;

    const getDateMonthDay = (date: Date) => {
      return `${date.toLocaleString("es-MX", {
        month: "long",
      })} - ${date.toLocaleString("es-MX", { day: "2-digit" })}`;
    };

    const options = {
      series: this.series,
      chart: {
        type: "area",
        stacked: false,
        height: 600,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      annotations: {
        xaxis: [
          {
            x: date1.getTime(),
            x2: date2.getTime(),
            strokeDashArray: 0,
            borderColor: "#6e8192",
            label: {
              borderColor: "#6e8192",
              style: {
                fontSize: "16px",
                color: "#fff",
                background: "#6e8192",
              },
              text: `Establecimiento/Amacollamiento: ${getDateMonthDay(
                date1
              )} a ${getDateMonthDay(date2)}`,
            },
          },
          {
            x: date2.getTime(),
            x2: date3.getTime(),
            fillColor: "#B3F7CA",
            opacity: 0.4,
            label: {
              borderColor: "#B3F7CA",
              style: {
                fontSize: "16px",
                color: "#fff",
                background: "#00E396",
              },
              text: `Encañazon/Floración: ${getDateMonthDay(
                date2
              )} a ${getDateMonthDay(date3)}`,
            },
          },
          {
            x: date3.getTime(),
            x2: date4.getTime(),
            fillColor: "#feb019",
            pacity: 0.4,
            label: {
              borderColor: "#feb019",
              style: {
                fontSize: "16px",
                color: "#fff",
                background: "#feb019",
              },
              text: `Llenado de granos/Cosecha: ${getDateMonthDay(
                date3
              )} a ${getDateMonthDay(date4)}`,
            },
          },
        ],
        points: [
          // first stage
          {
            x: addDaysToDate(startDate, 0).getTime(),
            y: getPointValue(this.series[0].data, startDate),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Siembra: ${getDateMonthDay(startDate)}`,
            },
          },
          {
            x: addDaysToDate(startDate, 10).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 10)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Emergencia: ${getDateMonthDay(
                addDaysToDate(startDate, 10)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 20).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 20)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Doble arruga: ${getDateMonthDay(
                addDaysToDate(startDate, 20)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 30).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 30)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Espiguilla terminal: ${getDateMonthDay(
                addDaysToDate(startDate, 30)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 39).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 39)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Hoja bandera: ${getDateMonthDay(
                addDaysToDate(startDate, 39)
              )}`,
            },
          },
          // second stage
          {
            x: addDaysToDate(startDate, 42).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 42)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Vaina engrosada: ${getDateMonthDay(
                addDaysToDate(startDate, 42)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 50).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 50)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Espigado: ${getDateMonthDay(
                addDaysToDate(startDate, 50)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 66).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 66)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Antitesis: ${getDateMonthDay(
                addDaysToDate(startDate, 66)
              )}`,
            },
          },
          // third stage
          {
            x: addDaysToDate(startDate, 81).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 81)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Iniciación del llenado del grano: ${getDateMonthDay(
                addDaysToDate(startDate, 81)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 92).getTime(),
            y: getPointValue(this.series[0].data, addDaysToDate(startDate, 92)),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Madurez fisiológica: ${getDateMonthDay(
                addDaysToDate(startDate, 92)
              )}`,
            },
          },
          {
            x: addDaysToDate(startDate, 105).getTime(),
            y: getPointValue(
              this.series[0].data,
              addDaysToDate(startDate, 105)
            ),
            marker: {
              size: 6,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
                fontSize: "10px",
              },
              text: `Cosecha: ${getDateMonthDay(
                addDaysToDate(startDate, 105)
              )}`,
            },
          },
        ],
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
    if (
      changedProperties.has("seriesUrl") ||
      changedProperties.has("startDate")
    ) {
      this.fetchData();
    }
  }

  render() {
    return html` <div id="chart" class="container"></div> `;
  }
}
