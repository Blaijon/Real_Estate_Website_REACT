import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';




const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
registerServiceWorker();
