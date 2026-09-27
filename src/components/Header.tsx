import React from 'react';
import { BookOpen, Sparkles, GraduationCap } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  hasActiveSession?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, hasActiveSession }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand" onClick={onReset} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-title">StudyPilot</h1>
              <span className="brand-badge">
                <Sparkles size={11} className="badge-sparkle" />
                AI Assistant
              </span>
            </div>
            <p className="brand-subtitle">Turn unstructured notes into interactive study kits</p>
          </div>
        </div>

        <div className="header-actions">
          {hasActiveSession && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onReset}
              title="Create another study kit"
            >
              <BookOpen size={14} />
              <span>New Notes</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
