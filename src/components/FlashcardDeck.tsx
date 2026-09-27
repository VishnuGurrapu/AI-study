import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, CheckCircle, RotateCcw, Bookmark } from 'lucide-react';
import type { FlashcardItem } from '../types/study';
import { Flashcard } from './Flashcard';

interface FlashcardDeckProps {
  cards: FlashcardItem[];
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards }) => {
  const [deck, setDeck] = useState<FlashcardItem[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Synchronize when cards prop updates
  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
  }, [cards]);

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in a textarea or input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  if (!deck.length) {
    return (
      <div className="empty-deck-card">
        <p>No flashcards available in this study set.</p>
      </div>
    );
  }

  const currentCard = deck[currentIndex];
  const isMastered = masteredIds.has(currentCard.id);
  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);

  return (
    <div className="flashcard-deck-wrapper">
      {/* Deck Controls Header */}
      <div className="deck-toolbar">
        <div className="deck-counter-badge">
          <span className="font-semibold">Card {currentIndex + 1}</span>
          <span className="text-muted"> of {deck.length}</span>
        </div>

        <div className="deck-toolbar-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleShuffle}
            title="Randomize card order"
          >
            <Shuffle size={13} />
            <span>Shuffle</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            title="Reset to first card"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="deck-progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
        <div className="deck-progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* The Active Flipping Flashcard */}
      <div className="deck-card-container">
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          isMastered={isMastered}
        />
      </div>

      {/* Mastery & Study Toggles */}
      <div className="deck-mastery-actions">
        <button
          type="button"
          className={`btn btn-sm ${isMastered ? 'btn-success' : 'btn-secondary'}`}
          onClick={() => handleToggleMastered(currentCard.id)}
        >
          <CheckCircle size={15} />
          <span>{isMastered ? 'Mastered' : 'Mark as Mastered'}</span>
        </button>
        <span className="mastery-stat text-xs text-muted">
          <Bookmark size={13} /> {masteredIds.size} of {deck.length} mastered
        </span>
      </div>

      {/* Deck Navigation Stepper */}
      <div className="deck-navigation-bar">
        <button
          type="button"
          className="btn btn-secondary nav-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div className="nav-hints-text">
          <kbd>Space</kbd> to flip &bull; <kbd>&larr;</kbd> <kbd>&rarr;</kbd> to navigate
        </div>

        <button
          type="button"
          className="btn btn-primary nav-btn"
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          aria-label="Next card"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
