import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 12px;
        -webkit-text-size-adjust: none;
        font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
        padding: 0;
    margin: 0;
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
    h1, h2, h3, h4, h5, h6{
        font-family:'Maven Pro', sans-serif;
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
