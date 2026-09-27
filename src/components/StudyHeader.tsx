import React from 'react';
import { Layers, HelpCircle, FileText, Calendar, RotateCcw } from 'lucide-react';
import type { StudyKit } from '../types/study';

interface StudyHeaderProps {
  studyKit: StudyKit;
  onReset: () => void;
}

export const StudyHeader: React.FC<StudyHeaderProps> = ({ studyKit, onReset }) => {
  return (
    <div className="study-header-card">
      <div className="study-header-top">
        <div className="study-header-meta">
          <span className="badge badge-difficulty">{studyKit.difficulty} Level</span>
          <span className="study-meta-item">
            <Calendar size={13} />
            <span>Just now</span>
          </span>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-muted"
          onClick={onReset}
          title="Start fresh with another topic"
        >
          <RotateCcw size={14} />
          <span>New Topic</span>
        </button>
      </div>

      <h2 className="study-header-topic">{studyKit.topic}</h2>

      <div className="study-header-stats">
        <div className="stat-chip">
          <Layers size={14} className="text-primary" />
          <span>{studyKit.flashcards.length} Flashcards</span>
        </div>
        <div className="stat-chip">
          <HelpCircle size={14} className="text-emerald" />
          <span>{studyKit.quiz.length} Quiz Questions</span>
        </div>
        <div className="stat-chip">
          <FileText size={14} className="text-amber" />
          <span>{studyKit.summary.keyTakeaways.length} Key Takeaways</span>
        </div>
      </div>
    </div>
  );
};
