import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import App from 'App';
import ErrorBoundary from 'components/ErrorBoundary';
import { lightTheme } from 'styles/theme';
import GlobalStyle from 'styles/global-styles';
import reportWebVitals from './reportWebVitals';
import store from 'state/store';
import 'locales';
import 'index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const persistor = persistStore(store);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            useErrorBoundary: true,
            refetchOnWindowFocus: process.env.REACT_APP_MODE === 'production',
        },
        mutations: {
            useErrorBoundary: true,
        },
    },
});

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={lightTheme}>
                        <GlobalStyle />
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </ThemeProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWegbVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
