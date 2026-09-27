import React, { useState } from 'react';
import { RotateCw, HelpCircle, Check, Sparkles } from 'lucide-react';
import type { FlashcardItem } from '../types/study';

interface FlashcardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  isMastered?: boolean;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, isFlipped, onFlip, isMastered = false }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flashcard-scene" onClick={onFlip} role="button" tabIndex={0} aria-label="Flashcard">
      <div className={`flashcard-flipper ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front of card */}
        <div className="flashcard-side flashcard-front">
          <div className="card-top-row">
            <span className="card-tag">
              <Sparkles size={11} />
              {card.tag || 'Concept'}
            </span>
            {isMastered && (
              <span className="badge badge-success">
                <Check size={12} /> Mastered
              </span>
            )}
          </div>

          <div className="card-center-content">
            <span className="card-label">QUESTION / PROMPT</span>
            <p className="card-question-text">{card.front}</p>
          </div>

          <div className="card-bottom-row" onClick={(e) => e.stopPropagation()}>
            {card.hint && (
              <div className="card-hint-container">
                <button
                  type="button"
                  className="hint-toggle-btn"
                  onClick={() => setShowHint(!showHint)}
                >
                  <HelpCircle size={13} />
                  <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
                {showHint && <p className="hint-text">{card.hint}</p>}
              </div>
            )}
            <div className="flip-prompt" onClick={onFlip}>
              <RotateCw size={13} />
              <span>Click or Press Space to Flip</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flashcard-side flashcard-back">
          <div className="card-top-row">
            <span className="card-tag tag-answer">Answer & Explanation</span>
            <span className="card-flip-badge">Flipped</span>
          </div>

          <div className="card-center-content">
            <p className="card-answer-text">{card.back}</p>
          </div>

          <div className="card-bottom-row" onClick={(e) => e.stopPropagation()}>
            <div className="flip-prompt" onClick={onFlip}>
              <RotateCw size={13} />
              <span>Click to view question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
