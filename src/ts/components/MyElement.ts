import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
    @property({ attribute: true, type: String })
    declare title: string;

    @property({ attribute: true, type: Number })
    declare counter: number;

    @property({ attribute: true, type: Boolean, reflect: true })
    declare test: boolean;

    constructor() {
        super();
        this.title = "";
        this.counter = 0;
        this.test = false;
    }

    static styles = css`
        :host {
            display: block;
            padding: 25px;
            color: var(--my-element-text-color, #000);
        }
    `;

    __increment() {
        this.counter += 1;
    }

    __reflectedState() {
        this.test = !this.test;
        console.log(this.test);
    }

    render() {
        return html`
            <h2>${this.title} Nr. ${this.counter}!</h2>
            <button @click=${this.__increment}>increment</button>
            <button @click=${this.__reflectedState}>test</button>
        `;
    }
}
