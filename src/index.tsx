import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './libs/i18n';
import { HelmetProvider } from 'react-helmet-async';
import { LoadingBarContainer } from 'react-top-loading-bar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <HelmetProvider>
          <LoadingBarContainer>
            <App />
          </LoadingBarContainer>
        </HelmetProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
