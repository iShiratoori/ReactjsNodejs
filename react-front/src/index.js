import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorContextProdiver } from './components/context/error.context';
import SessionProvider from './components/context/session.context';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/context/theme.context';
import { LoadingContextProvider } from './components/context/loading.context';
import { ModelContextProvider } from "./components/context/model.dialog.contex"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <ErrorContextProdiver>
        <ModelContextProvider>
          <SessionProvider>
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </SessionProvider>
        </ModelContextProvider>
      </ErrorContextProdiver>
    </LoadingContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
