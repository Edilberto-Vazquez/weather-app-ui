import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../styles/global";
import "../components/HeaderSection";
import "../components/SideBar";

@customElement("weather-app")
export class WeatherApp extends LitElement {
    static styles = [
        globalStyles,
        css`
            :host {
                width: 100%;
                min-height: 100vh;
                display: flex;
                background-color: whitesmoke;
            }
        `,
    ];

    render() {
        return html`
            <header-section title="Análisis del tiempo"></header-section>
            <side-bar></side-bar>
        `;
    }
}
