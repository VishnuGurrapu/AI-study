import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  errorType?: 'MALFORMED_JSON' | 'WRONG_SHAPE' | 'EMPTY_RESPONSE' | 'TIMEOUT' | 'API_FAILURE' | 'NETWORK';
  rawError?: string;
  onRetry: () => void;
  onDismiss?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Generate Study Kit',
  message,
  errorType,
  rawError,
  onRetry,
  onDismiss
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getBadgeText = () => {
    switch (errorType) {
      case 'MALFORMED_JSON':
        return 'Malformed AI Output';
      case 'WRONG_SHAPE':
        return 'Schema Mismatch';
      case 'EMPTY_RESPONSE':
        return 'Empty Response';
      case 'TIMEOUT':
        return 'Request Timed Out';
      case 'API_FAILURE':
        return 'LLM Service Error';
      default:
        return 'Generation Error';
    }
  };

  return (
    <div className="error-card" role="alert" aria-live="assertive">
      <div className="error-card-header">
        <div className="error-icon-box">
          <AlertTriangle className="error-icon" size={26} />
        </div>
        <div className="error-content">
          <div className="error-badge-row">
            <span className="badge badge-error">{getBadgeText()}</span>
          </div>
          <h3 className="error-title">{title}</h3>
          <p className="error-message">{message}</p>
        </div>
      </div>

      <div className="error-actions">
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          <RefreshCw size={15} />
          <span>Try Again</span>
        </button>
        {onDismiss && (
          <button type="button" className="btn btn-secondary" onClick={onDismiss}>
            Back to Input
          </button>
        )}
        {rawError && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Terminal size={14} />
            <span>{showDetails ? 'Hide Diagnostics' : 'View Diagnostics'}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {showDetails && rawError && (
        <div className="error-diagnostics">
          <div className="diagnostics-label">Raw Output / Error Stack:</div>
          <pre className="diagnostics-pre">{rawError}</pre>
        </div>
      )}
    </div>
  );
};
