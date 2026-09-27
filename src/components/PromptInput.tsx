import React, { useState } from 'react';
import { Sparkles, FileText, ArrowRight, Wand2, Lightbulb } from 'lucide-react';
import { sampleTopics } from '../data/mockStudyKit';

interface PromptInputProps {
  onSubmit: (text: string, options: { difficulty: string; focus: string }) => void;
  isLoading?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading = false }) => {
  const [inputText, setInputText] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [focusArea, setFocusArea] = useState<'comprehensive' | 'exam-prep' | 'quick-review'>('comprehensive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSubmit(inputText.trim(), { difficulty, focus: focusArea });
  };

  const handleSelectSample = (topic: string) => {
    setInputText(
      `Overview of ${topic}:\nKey principles, architecture, common performance pitfalls, and practical implementation trade-offs.`
    );
  };

  return (
    <section className="prompt-input-section" aria-label="Study Kit Generator">
      <div className="prompt-card">
        <div className="prompt-card-header">
          <div className="prompt-badge">
            <Wand2 size={14} />
            <span>AI Knowledge Transformer</span>
          </div>
          <h2 className="prompt-heading">Paste Notes or Describe Any Topic</h2>
          <p className="prompt-description">
            Paste lecture notes, raw documentation, or type a subject. The AI transforms it into flip-ready
            flashcards, interactive quizzes, and structured summaries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="textarea-container">
            <textarea
              id="study-notes-input"
              className="prompt-textarea"
              placeholder="Paste raw text, lecture notes, textbook excerpts, or write a topic (e.g. 'How DNS works step-by-step', 'Photosynthesis dark reactions')..."
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <div className="textarea-footer">
              <span className="char-count">
                <FileText size={12} />
                {inputText.length} characters
              </span>
              {inputText.length > 0 && (
                <button
                  type="button"
                  className="btn-link text-xs"
                  onClick={() => setInputText('')}
                  disabled={isLoading}
                >
                  Clear text
                </button>
              )}
            </div>
          </div>

          <div className="prompt-controls-row">
            {/* Difficulty selector */}
            <div className="control-group">
              <label htmlFor="difficulty-select" className="control-label">
                Depth Level
              </label>
              <div className="pill-group" id="difficulty-select">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`pill-btn ${difficulty === lvl ? 'active' : ''}`}
                    onClick={() => setDifficulty(lvl)}
                    disabled={isLoading}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Focus area pill selector */}
            <div className="control-group">
              <label className="control-label">Study Focus</label>
              <div className="pill-group">
                {[
                  { id: 'comprehensive', label: 'Balanced' },
                  { id: 'exam-prep', label: 'Exam Drill' },
                  { id: 'quick-review', label: 'Quick Recap' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`pill-btn ${focusArea === item.id ? 'active' : ''}`}
                    onClick={() => setFocusArea(item.id as any)}
                    disabled={isLoading}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample quick prompts */}
          <div className="samples-container">
            <span className="samples-label">
              <Lightbulb size={13} className="text-amber" />
              Try a sample topic:
            </span>
            <div className="samples-scroll">
              {sampleTopics.map((topic, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="sample-chip"
                  onClick={() => handleSelectSample(topic)}
                  disabled={isLoading}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="submit-row">
            <button
              type="submit"
              className="btn btn-primary btn-lg generate-btn"
              disabled={!inputText.trim() || isLoading}
            >
              <Sparkles size={18} />
              <span>{isLoading ? 'Generating Study Kit...' : 'Generate Interactive Study Kit'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
