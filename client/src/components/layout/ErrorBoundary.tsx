import * as React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught', error, info)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-gray-600 mb-6">{this.state.error?.message ?? 'Unknown error'}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Reload page</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}