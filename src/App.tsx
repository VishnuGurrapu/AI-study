import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { StudyWorkspace } from './components/StudyWorkspace';
import { mockStudyKit } from './data/mockStudyKit';
import type { StudyKit, AppStatus } from './types/study';
import { Bug, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('ready'); // Start with ready to showcase UI components immediately
  const [studyKit, setStudyKit] = useState<StudyKit | null>(mockStudyKit);
  const [activeTopic, setActiveTopic] = useState<string>(mockStudyKit.topic);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorType, setErrorType] = useState<
    'MALFORMED_JSON' | 'WRONG_SHAPE' | 'EMPTY_RESPONSE' | 'TIMEOUT' | 'API_FAILURE'
  >('MALFORMED_JSON');
  const [rawErrorTrace, setRawErrorTrace] = useState<string>('');

  // Handle generation submission
  const handlePromptSubmit = (
    text: string,
    options: { difficulty: string; focus: string }
  ) => {
    setActiveTopic(text.slice(0, 60));
    setStatus('loading');

    // Simulate short generation transition with mock data before Step 2 API hookup
    setTimeout(() => {
      setStudyKit({
        ...mockStudyKit,
        topic: text.length > 50 ? `${text.slice(0, 48)}...` : text,
        difficulty: (options.difficulty as any) || 'Intermediate'
      });
      setStatus('ready');
    }, 1200);
  };

  const handleReset = () => {
    setStatus('idle');
    setStudyKit(null);
  };

  const handleRetry = () => {
    setStatus('loading');
    setTimeout(() => {
      setStudyKit(mockStudyKit);
      setStatus('ready');
    }, 1000);
  };

  // Helper simulation triggers for review
  const simulateError = (type: typeof errorType) => {
    setErrorType(type);
    if (type === 'MALFORMED_JSON') {
      setErrorMessage('The model output failed JSON parsing: Unexpected token < at position 0.');
      setRawErrorTrace('SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON');
    } else if (type === 'WRONG_SHAPE') {
      setErrorMessage('The response was missing required flashcard arrays or quiz question choices.');
      setRawErrorTrace('ValidationError: data.flashcards[0].front is required but received undefined');
    } else if (type === 'TIMEOUT') {
      setErrorMessage('The upstream AI request timed out after 20 seconds. Please try again.');
      setRawErrorTrace('AbortError: The operation was aborted due to timeout.');
    }
    setStatus('error');
  };

  return (
    <div className="app-root">
      {/* 1. Header */}
      <Header
        onReset={handleReset}
        hasActiveSession={status === 'ready' && studyKit !== null}
      />

      <main className="main-content">
        <div className="app-container">
          {/* Quick Dev/Preview Toolbar to test all states without waiting for API */}
          <aside className="dev-preview-bar" aria-label="Component state simulator">
            <span className="dev-preview-label">UI State Preview:</span>
            <div className="dev-btn-group">
              <button
                type="button"
                className={`dev-chip ${status === 'idle' ? 'active' : ''}`}
                onClick={() => setStatus('idle')}
              >
                Idle (Input)
              </button>
              <button
                type="button"
                className={`dev-chip ${status === 'loading' ? 'active' : ''}`}
                onClick={() => setStatus('loading')}
              >
                Loading
              </button>
              <button
                type="button"
                className={`dev-chip ${status === 'ready' ? 'active' : ''}`}
                onClick={() => {
                  setStudyKit(mockStudyKit);
                  setStatus('ready');
                }}
              >
                <CheckCircle2 size={12} /> Ready (Workspace)
              </button>
              <button
                type="button"
                className={`dev-chip dev-chip-error ${status === 'error' ? 'active' : ''}`}
                onClick={() => simulateError('MALFORMED_JSON')}
              >
                <Bug size={12} /> Simulate Bad AI Output
              </button>
            </div>
          </aside>

          {/* 2. Primary Free-form Input Area (Always available in idle or can be toggled) */}
          {(status === 'idle' || status === 'ready') && (
            <PromptInput
              onSubmit={handlePromptSubmit}
              isLoading={false}
            />
          )}

          {/* 3. Loading State */}
          {status === 'loading' && (
            <LoadingState
              topic={activeTopic}
              onCancel={() => setStatus('idle')}
            />
          )}

          {/* 4. Error State */}
          {status === 'error' && (
            <ErrorState
              message={errorMessage || 'An unexpected issue occurred while structuring the study kit.'}
              errorType={errorType}
              rawError={rawErrorTrace}
              onRetry={handleRetry}
              onDismiss={() => setStatus('idle')}
            />
          )}

          {/* 5. Study Workspace (Active Interactive Tool) */}
          {status === 'ready' && studyKit && (
            <StudyWorkspace studyKit={studyKit} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>StudyPilot &bull; Frontend Internship Assignment &bull; Built with React &amp; TypeScript</p>
      </footer>
    </div>
  );
};

export default App;
