import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Field } from "../types/columns";

@customElement("select-fields")
export class SelectFields extends LitElement {
    @property({ attribute: "fields-title", type: String })
    declare fieldsTitle: string;

    @property({ attribute: true, type: Array<Field> })
    declare fields: Field[];

    constructor() {
        super();
        this.fieldsTitle = "";
        this.fields = [];
    }

    static styles = css`
        :host {
            width: 100%;
            height: auto;
            display: grid;
            grid-auto-rows: min-content;
            row-gap: 8px;
        }
        :host .title {
            font-size: 1.4rem;
            margin: 0;
        }
        :host .fields {
            margin: 0;
            padding: 0;
            list-style-type: none;
            font-size: 1.4rem;
        }
    `;

    dispatchFields(e: Event) {
        const value = e.target as HTMLInputElement;

        this.fields = this.fields.map((field) => {
            if (value.value === field.value) {
                field.selected = value.checked ? true : false;
            }
            return field;
        });

        const options = {
            detail: { fields: this.fields.filter((field) => field.selected === true) },
            bubbles: true,
            composed: true,
        };

        this.dispatchEvent(new CustomEvent("getSelected", options));
    }

    render() {
        return html`
            <h5 class="title">${this.fieldsTitle}</h5>
            <ul class="fields">
                ${this.fields.map(({ value, title, selected }) => {
                    return html`
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    value=${value}
                                    @change=${this.dispatchFields}
                                    ?checked=${selected}
                                />
                                ${title}
                            </label>
                        </li>
                    `;
                })}
            </ul>
            <slot></slot>
        `;
    }
}
