import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0),
                  linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px, 48px 48px, 48px 48px'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Une erreur est survenue
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Nous sommes désolés, quelque chose s'est mal passé. Veuillez réessayer ou retourner à la page d'accueil.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Réessayer</span>
              </button>
              
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Home className="h-5 w-5" />
                <span>Accueil</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}