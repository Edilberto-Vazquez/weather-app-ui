import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Field } from "../types/columns";

@customElement("select-fields")
export class SelectFields extends LitElement {
    @property({ attribute: true, type: Array<Field> })
    declare fields: Field[];

    @property({ attribute: true, type: String })
    declare title: string;

    constructor() {
        super();
        this.fields = [{ value: "temp", title: "Temperatura" }];
        this.title = "Estación meteorológica";
    }

    dispatchFields(e: Event) {
        const fieldValue = e.target as HTMLInputElement;
        const fieldExist = this.fields.find(({ value }) => value === fieldValue.value);
        if (!fieldExist) {
            this.fields = [
                ...this.fields,
                { value: fieldValue.value, title: fieldValue.textContent! },
            ];
        } else {
            this.fields = this.fields.filter(({ value }) => value !== fieldValue.value);
        }
        const options = {
            detail: { fields: this.fields },
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent("getFields", options));
    }

    render() {
        return html`
            <h5>${this.title}</h5>
            <ul>
                ${this.fields.map(({ value, title }) => {
                    return html`
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    value=${value}
                                    @change=${this.dispatchFields}
                                />
                                ${title}
                            </label>
                        </li>
                    `;
                })}
            </ul>
        `;
    }
}
