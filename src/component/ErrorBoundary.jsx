import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>error Page!</div>;
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
