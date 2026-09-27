import React from 'react';
import { BookOpen, CheckCircle2, Bookmark, Compass, Sparkles } from 'lucide-react';
import type { StudySummaryData } from '../types/study';

interface StudySummaryProps {
  summary: StudySummaryData;
  topic: string;
}

export const StudySummary: React.FC<StudySummaryProps> = ({ summary, topic }) => {
  return (
    <div className="study-summary-view">
      {/* Overview Card */}
      <div className="summary-section-card">
        <div className="section-card-header">
          <BookOpen size={18} className="text-primary" />
          <h3 className="section-card-title">Executive Summary: {topic}</h3>
        </div>
        <p className="summary-overview-text">{summary.overview}</p>
      </div>

      {/* Key Takeaways */}
      <div className="summary-section-card">
        <div className="section-card-header">
          <CheckCircle2 size={18} className="text-emerald" />
          <h3 className="section-card-title">Key Takeaways & Rules</h3>
        </div>
        <ul className="takeaways-list">
          {summary.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="takeaway-item">
              <span className="takeaway-bullet">{idx + 1}</span>
              <span className="takeaway-text">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core Concepts Grid */}
      <div className="summary-section-card">
        <div className="section-card-header">
          <Bookmark size={18} className="text-amber" />
          <h3 className="section-card-title">Core Terminology & Mental Models</h3>
        </div>
        <div className="concepts-grid">
          {summary.coreConcepts.map((concept, idx) => (
            <div key={idx} className="concept-card">
              <div className="concept-term-row">
                <Sparkles size={12} className="text-primary" />
                <span className="concept-term">{concept.term}</span>
              </div>
              <p className="concept-definition">{concept.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Next Topics */}
      {summary.suggestedNextTopics && summary.suggestedNextTopics.length > 0 && (
        <div className="summary-section-card">
          <div className="section-card-header">
            <Compass size={18} className="text-sky" />
            <h3 className="section-card-title">Recommended Follow-up Topics</h3>
          </div>
          <div className="next-topics-wrap">
            {summary.suggestedNextTopics.map((item, idx) => (
              <span key={idx} className="chip chip-suggestion">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
