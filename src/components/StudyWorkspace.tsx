import React, { useState } from 'react';
import type { StudyKit, StudyTabType, QuizQuestion } from '../types/study';
import { StudyHeader } from './StudyHeader';
import { StudyTabs } from './StudyTabs';
import { FlashcardDeck } from './FlashcardDeck';
import { QuizView } from './QuizView';
import { QuizSummary } from './QuizSummary';
import { StudySummary } from './StudySummary';

interface StudyWorkspaceProps {
  studyKit: StudyKit;
  onReset: () => void;
}

export const StudyWorkspace: React.FC<StudyWorkspaceProps> = ({ studyKit, onReset }) => {
  const [activeTab, setActiveTab] = useState<StudyTabType>('flashcards');

  // Quiz progression and state management
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>(studyKit.quiz);
  const [isRetestMode, setIsRetestMode] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    total: number;
    answers: Record<string, number>;
    incorrectQuestions: QuizQuestion[];
  } | null>(null);

  const handleCompleteQuiz = (results: {
    score: number;
    total: number;
    answers: Record<string, number>;
    incorrectQuestions: QuizQuestion[];
  }) => {
    setQuizResults(results);
    setActiveTab('quiz-summary');
  };

  const handleRetestMistakes = () => {
    if (quizResults && quizResults.incorrectQuestions.length > 0) {
      setActiveQuizQuestions(quizResults.incorrectQuestions);
      setIsRetestMode(true);
      setActiveTab('quiz');
    }
  };

  const handleRestartFullQuiz = () => {
    setActiveQuizQuestions(studyKit.quiz);
    setIsRetestMode(false);
    setQuizResults(null);
    setActiveTab('quiz');
  };

  return (
    <div className="study-workspace-container">
      {/* 1. Study Header */}
      <StudyHeader studyKit={studyKit} onReset={onReset} />

      {/* 2. Study Navigation Tabs */}
      <StudyTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        flashcardCount={studyKit.flashcards.length}
        quizCount={studyKit.quiz.length}
        hasQuizAttempt={quizResults !== null}
      />

      {/* 3. Tab Panels */}
      <div className="workspace-tab-content">
        {activeTab === 'flashcards' && (
          <div className="tab-pane animate-fade-in">
            <FlashcardDeck cards={studyKit.flashcards} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="tab-pane animate-fade-in">
            <QuizView
              questions={activeQuizQuestions}
              onCompleteQuiz={handleCompleteQuiz}
              isRetestMode={isRetestMode}
              onExitRetest={handleRestartFullQuiz}
            />
          </div>
        )}

        {activeTab === 'quiz-summary' && (
          <div className="tab-pane animate-fade-in">
            {quizResults ? (
              <QuizSummary
                score={quizResults.score}
                total={quizResults.total}
                questions={activeQuizQuestions}
                userAnswers={quizResults.answers}
                onRetestMistakes={handleRetestMistakes}
                onRestartFullQuiz={handleRestartFullQuiz}
                onGoToFlashcards={() => setActiveTab('flashcards')}
              />
            ) : (
              <div className="empty-quiz-card">
                <p>You haven&apos;t taken the quiz yet.</p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setActiveTab('quiz')}
                >
                  Start Quiz Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="tab-pane animate-fade-in">
            <StudySummary summary={studyKit.summary} topic={studyKit.topic} />
          </div>
        )}
      </div>
    </div>
  );
};
