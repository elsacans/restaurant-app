/* eslint-disable no-unused-vars */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
/*import '../public/data/restaurant-apps.js';*/
import App from './views/app.js';

const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});