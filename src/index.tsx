import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import App from 'App';
import { lightTheme } from 'styles/theme';
import GlobalStyle from 'styles/global-styles';
import reportWebVitals from './reportWebVitals';
import store from 'state/store';
import 'locales';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const persistor = persistStore(store);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            useErrorBoundary: true,
        },
        mutations: {
            useErrorBoundary: true,
        },
    },
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={lightTheme}>
                        <GlobalStyle />
                        <App />
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
