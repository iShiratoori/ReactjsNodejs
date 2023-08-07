import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor() {
        super()
        this.state = { error: false }
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        this.props.dispatchError(error);
    }

    render() {
        if (this.state.error) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
export default ErrorBoundary
