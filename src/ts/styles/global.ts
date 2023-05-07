import { css, unsafeCSS } from "lit";

const globalStyles = css`
    ${unsafeCSS(`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `)}
`;

export { globalStyles };
