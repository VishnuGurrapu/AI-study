import React from 'react';
import { Award, RotateCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { QuizQuestion } from '../types/study';

interface QuizSummaryProps {
  score: number;
  total: number;
  questions: QuizQuestion[];
  userAnswers: Record<string, number>;
  onRetestMistakes: () => void;
  onRestartFullQuiz: () => void;
  onGoToFlashcards?: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  score,
  total,
  questions,
  userAnswers,
  onRetestMistakes,
  onRestartFullQuiz,
  onGoToFlashcards
}) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const incorrectCount = total - score;

  const getPerformanceMessage = () => {
    if (percentage === 100) return 'Flawless score! You have completely mastered this material.';
    if (percentage >= 70) return 'Solid foundation! A quick review of missed concepts will solidify it.';
    return 'Good effort! Focus on drilling your missed questions to boost comprehension.';
  };

  return (
    <div className="quiz-summary-card">
      {/* Score Header */}
      <div className="summary-hero">
        <div className="summary-badge-circle">
          <Award size={36} className="text-amber" />
        </div>
        <h3 className="summary-title">Quiz Completed!</h3>
        <p className="summary-subtitle">{getPerformanceMessage()}</p>

        <div className="score-meter-wrap">
          <div className="score-number-display">
            <span className="score-big">{score}</span>
            <span className="score-total"> / {total}</span>
          </div>
          <span className="score-percentage-tag">{percentage}% Accuracy</span>
        </div>
      </div>

      {/* Action Bar with "Re-test Wrong Answers" */}
      <div className="summary-actions-bar">
        {incorrectCount > 0 ? (
          <button
            type="button"
            className="btn btn-warning btn-lg action-primary"
            onClick={onRetestMistakes}
          >
            <RotateCcw size={16} />
            <span>Re-test {incorrectCount} Wrong Answer{incorrectCount > 1 ? 's' : ''}</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-lg action-primary"
            onClick={onRestartFullQuiz}
          >
            <RotateCcw size={16} />
            <span>Retake Full Quiz</span>
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRestartFullQuiz}
        >
          <span>Retake All</span>
        </button>

        {onGoToFlashcards && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onGoToFlashcards}
          >
            <span>Review Flashcards</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Question Breakdown List */}
      <div className="breakdown-section">
        <h4 className="breakdown-heading">Question Review & Explanations</h4>

        <div className="breakdown-list">
          {questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`breakdown-item ${isCorrect ? 'item-correct' : 'item-incorrect'}`}
              >
                <div className="item-status-icon">
                  {isCorrect ? (
                    <CheckCircle size={18} className="text-emerald" />
                  ) : (
                    <XCircle size={18} className="text-rose" />
                  )}
                </div>

                <div className="item-details">
                  <div className="item-q-row">
                    <span className="item-q-num">Q{idx + 1}.</span>
                    <span className="item-q-text">{q.question}</span>
                  </div>

                  <div className="item-answers-row">
                    {!isCorrect && userChoice !== undefined && (
                      <span className="ans-tag ans-wrong">
                        Your choice: {String.fromCharCode(65 + userChoice)} ({q.options[userChoice]})
                      </span>
                    )}
                    <span className="ans-tag ans-right">
                      Correct answer: {String.fromCharCode(65 + q.correctIndex)} ({q.options[q.correctIndex]})
                    </span>
                  </div>

                  <p className="item-explanation">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
