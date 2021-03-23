import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #E52E40;
        --green: #33CC95;
        --blue: #5429CC;

        --blue-light: #6933FF;

        --text-tile: #363F5F;
        --text-body: #969CB2;
        
        --background: #F0F2F5;
        --shape: #FFFFFF;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;

    }

    html {
        // Telas com o máximo de 1080px de largura usem a definição abaixo
        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }
        // Telas com o máximo de 720px de largura usem a definição abaixo
        @media (max-width: 720px) {
            font-size: 87.5%; // 14 px
        }
    }

    body { 
        background-color: var(--background);
        -webkit-font-smoothing: antialiased; //melhora a visualização da fonte
    }

    body, input, button, textArea {
        // por padrão o input, button e textArea não herdam a fonte do body, por isso forçamos aqui
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }
    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disable] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`