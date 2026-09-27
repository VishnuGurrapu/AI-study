import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';
import type { QuizQuestion } from '../types/study';

interface QuizViewProps {
  questions: QuizQuestion[];
  onCompleteQuiz: (results: {
    score: number;
    total: number;
    answers: Record<string, number>;
    incorrectQuestions: QuizQuestion[];
  }) => void;
  isRetestMode?: boolean;
  onExitRetest?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  onCompleteQuiz,
  isRetestMode = false,
  onExitRetest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (!questions.length) {
    return (
      <div className="empty-quiz-card">
        <AlertCircle size={28} className="text-amber" />
        <h3>No questions available</h3>
        <p>There are no questions in this quiz queue.</p>
        {isRetestMode && onExitRetest && (
          <button type="button" className="btn btn-primary btn-sm" onClick={onExitRetest}>
            Return to Full Quiz
          </button>
        )}
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQ.id];
  const isSelected = selectedOption !== undefined;

  const handleSelectOption = (index: number) => {
    if (isSelected) return; // Prevent re-selection once answered
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: index }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Complete quiz tally
      let score = 0;
      const incorrect: QuizQuestion[] = [];

      questions.forEach((q) => {
        const userChoice = selectedAnswers[q.id];
        if (userChoice === q.correctIndex) {
          score += 1;
        } else {
          incorrect.push(q);
        }
      });

      onCompleteQuiz({
        score,
        total: questions.length,
        answers: selectedAnswers,
        incorrectQuestions: incorrect
      });
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="quiz-view-wrapper">
      {/* Quiz Top Status Bar */}
      <div className="quiz-top-bar">
        <div className="quiz-badge-wrap">
          {isRetestMode ? (
            <span className="badge badge-warning">
              <RotateCcw size={12} /> Retesting Mistakes ({questions.length} questions)
            </span>
          ) : (
            <span className="badge badge-primary">Interactive Quiz</span>
          )}
          <span className="quiz-counter text-muted text-sm">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        {isRetestMode && onExitRetest && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onExitRetest}>
            Exit Retest
          </button>
        )}
      </div>

      {/* Progress Track */}
      <div className="quiz-progress-track">
        <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question Card */}
      <div className="question-card">
        <div className="question-header">
          <HelpCircle size={18} className="text-primary question-icon" />
          <h3 className="question-text">{currentQ.question}</h3>
        </div>

        {/* Options List */}
        <div className="options-list" role="radiogroup">
          {currentQ.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let optionStateClass = '';

            if (isSelected) {
              if (isCorrect) {
                optionStateClass = 'option-correct';
              } else if (isChosen) {
                optionStateClass = 'option-incorrect';
              } else {
                optionStateClass = 'option-dimmed';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className={`option-button ${optionStateClass} ${isChosen ? 'chosen' : ''}`}
                onClick={() => handleSelectOption(idx)}
                disabled={isSelected}
              >
                <div className="option-prefix">{String.fromCharCode(65 + idx)}</div>
                <div className="option-label">{opt}</div>
                {isSelected && isCorrect && (
                  <CheckCircle2 size={18} className="option-feedback-icon text-emerald" />
                )}
                {isSelected && isChosen && !isCorrect && (
                  <XCircle size={18} className="option-feedback-icon text-rose" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner (revealed after answering) */}
        {isSelected && (
          <div
            className={`explanation-banner ${
              selectedOption === currentQ.correctIndex ? 'banner-correct' : 'banner-incorrect'
            }`}
          >
            <div className="explanation-title">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-rose" />
                  <span>Incorrect. The right answer is {String.fromCharCode(65 + currentQ.correctIndex)}.</span>
                </>
              )}
            </div>
            <p className="explanation-text">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question CTA */}
        <div className="quiz-bottom-actions">
          <span className="quiz-hint-text text-xs text-muted">
            {!isSelected ? 'Select an answer to see the explanation' : 'Ready for the next question'}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextQuestion}
            disabled={!isSelected}
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
