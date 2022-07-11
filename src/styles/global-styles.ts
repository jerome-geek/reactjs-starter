import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 16px;
        letter-spacing: -0.64px;
        -webkit-text-size-adjust: none;
        font-family: 'Noto Sans KR',-apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
        padding: 0;
        margin: 0;
    }
    html, body, #root {
        height: 100%;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    input, button {
        background-color: transparent;
        border: none;
        outline: none;
    }
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        html {
            font-size: 12px;
        }
    }

    @media only screen and (max-width: 576px) {
        html {
            font-size: 10px;
        }
    }
`;

export default GlobalStyle;
