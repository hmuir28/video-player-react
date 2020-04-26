import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 10px;
    font-family: 'Hind', sans-serif !important;
    margin: 0;
  }

  .toast {
    border-radius: 10px;
    font-size: 2em;
    padding: 20px 30px;
    position: static;
    text-align: center;
  }

  .toast-error {
    color: #D8000C;
    background-color: #FFD2D2;
  }

  .toast-success {
    color: #FFFFFF;
    background-color: #26a69a;
  }
`;

export default GlobalStyle;
