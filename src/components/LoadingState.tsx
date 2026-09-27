import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, BookOpen, Brain, CheckCircle2, X } from 'lucide-react';

interface LoadingStateProps {
  onCancel?: () => void;
  topic?: string;
}

const steps = [
  { icon: FileTextIcon, text: 'Analyzing text semantics and structure...' },
  { icon: Brain, text: 'Extracting key definitions & high-yield concepts...' },
  { icon: Sparkles, text: 'Synthesizing front-and-back flashcards...' },
  { icon: BookOpen, text: 'Constructing interactive multiple-choice quiz questions...' }
];

function FileTextIcon(props: any) {
  return <Brain {...props} />;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onCancel, topic }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-card" role="status" aria-live="polite">
      <div className="loading-spinner-halo">
        <Loader2 className="loading-spinner-icon" size={36} />
      </div>

      <div className="loading-header">
        <h3 className="loading-title">Generating Your Study Kit</h3>
        {topic && <p className="loading-subtitle">Topic: &ldquo;{topic}&rdquo;</p>}
      </div>

      <div className="loading-steps-list">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`loading-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="step-indicator">
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald" />
                ) : (
                  <StepIcon size={16} className={isCurrent ? 'spin-subtle text-primary' : 'text-muted'} />
                )}
              </div>
              <span className="step-text">{step.text}</span>
            </div>
          );
        })}
      </div>

      <div className="loading-skeleton-preview">
        <div className="skeleton-bar skeleton-title" />
        <div className="skeleton-bar skeleton-body-1" />
        <div className="skeleton-bar skeleton-body-2" />
      </div>

      {onCancel && (
        <div className="loading-cancel-wrapper">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
            <X size={14} />
            <span>Cancel Request</span>
          </button>
        </div>
      )}
    </div>
  );
};
