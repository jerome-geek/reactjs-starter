import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        -ms-overflow-style: none;
        font-family: 'Noto Sans KR',-apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;
        font-weight: normal;
        font-display: fallback;
    }
    html {
        font-family: 'Noto Sans KR',-apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;
        -webkit-text-size-adjust: none;
        letter-spacing: -0.64px;
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
        font-family: inherit;
    }
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar,
    ::-moz-scrollbar {
        display: none;
        height: 0;
    }
    b {
        font-weight: bold;
    }
    @media only screen and (max-width: 1200px) {
        html {
            font-size: 14px;
        }
    }
    @media only screen and (max-width: 768px) {
        html {
            font-size: 12px;
        }
    }
`;

export default GlobalStyle;
