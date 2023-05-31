import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import store from './store.js';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate } from "react-dom";


ReactGA.initialize('UA-93879621-2');
ReactGA.pageview(window.location.pathname + window.location.search);


const container = document.getElementById('root');
const root = ReactDOM.createRoot(document.getElementById('root'));
if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    );
} else {
    root.render(
        // <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </BrowserRouter>
            </Provider>
        // </React.StrictMode>
    );
}
// root.render(
//     // <React.StrictMode>
//         <Provider store={store}>
//             <BrowserRouter>
//                 <HelmetProvider>
//                     <App />
//                 </HelmetProvider>
//             </BrowserRouter>
//         </Provider>
//     // </React.StrictMode>
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
