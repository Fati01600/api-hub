import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #121212; /* Mørk baggrund */
    color: #FFFFFF; /* Hvid tekst */
    margin: 0;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #FFFFFF; /* Sørg for overskrifter er hvide */
  }

  a {
    text-decoration: none;
    color: #1DB954; /* Spotify-grøn */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  main {
    padding: 20px;
    flex-grow: 1;
  }

  header, footer {
    width: 100%;
    background-color: #181818; /* Mørkere header/footer */
    color: #FFFFFF;
  }
`;

export default GlobalStyle;
