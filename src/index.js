import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Movies from './component/listadoPeliculas.js';
import * as serviceWorker from './serviceWorker';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import {IntlProvider} from 'react-intl';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let translationTable = navigator.language.startsWith("es") ? localeEsMessages : localeEnMessages;
let url = navigator.language.startsWith("es") ? "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json" : "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language} messages= {translationTable}>
      <Movies url={url}/>
    </IntlProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
