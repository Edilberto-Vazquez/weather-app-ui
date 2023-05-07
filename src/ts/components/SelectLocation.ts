import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

type Location = {
    title: string;
    value: string;
};

@customElement("select-location")
export class SelectLocation extends LitElement {
    static styles = [
        globalStyles,
        css`
            .select-location {
                width: 100%;
                height: 24px;
                border: none;
                border-radius: 4px;
                font-size: 1.6rem;
            }
        `,
    ];

    @property({ attribute: true, type: Array<Location>, reflect: true })
    declare options: Location[];

    @property({ attribute: true, type: Object, reflect: true })
    declare selected: Location;

    constructor() {
        super();
        this.options = [];
        this.selected = { value: "default", title: "Selecciona una locación" };
    }

    setLocations(options: Location[], selected?: string) {
        this.options = options;
        if (selected) {
            const selectedOption = options.find((option) => option.value === selected);
            this.selected = selectedOption ? selectedOption : { value: "", title: "" };
        }
    }

    setLocation(e: Event) {
        const selectElement = e.target as HTMLSelectElement;
        this.selected = {
            value: selectElement.value,
            title: selectElement.selectedOptions[0].text,
        };
    }

    render() {
        const options: Location[] = [
            { value: "default", title: "Selecciona una locación" },
            ...this.options,
        ];

        return html`
            <select class="select-location" @change="${this.setLocation}">
                ${options.map(({ value, title }) => {
                    return html`
                        <option
                            value="${value}"
                            ?selected="${this.selected.value === value ||
                            value === "default"}"
                        >
                            ${title}
                        </option>
                    `;
                })}
            </select>
        `;
    }
}
