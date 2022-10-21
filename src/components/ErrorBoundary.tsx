import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Nullable<Error>;
    errorInfo?: Nullable<ErrorInfo>;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        error: null,
        errorInfo: null,
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return {
            error: null,
            errorInfo: null,
            hasError: true,
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });
        console.error('Uncaught error:', error, errorInfo);
        // You can also log the error to an error reporting service
        // if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error, {
            extra: { errorInfo },
        });
        // }
    }

    public render() {
        if (this.state.hasError) {
            // return <h1>Sorry.. there was an error</h1>;
            <div style={{ padding: 20 }}>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error?.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                </details>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
