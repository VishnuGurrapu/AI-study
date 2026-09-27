import React from 'react';
import { Layers, HelpCircle, Award, BookOpen } from 'lucide-react';
import type { StudyTabType } from '../types/study';

interface StudyTabsProps {
  activeTab: StudyTabType;
  onTabChange: (tab: StudyTabType) => void;
  flashcardCount: number;
  quizCount: number;
  hasQuizAttempt?: boolean;
}

export const StudyTabs: React.FC<StudyTabsProps> = ({
  activeTab,
  onTabChange,
  flashcardCount,
  quizCount,
  hasQuizAttempt = false
}) => {
  const tabs = [
    {
      id: 'flashcards' as StudyTabType,
      label: 'Flashcards',
      icon: Layers,
      count: flashcardCount
    },
    {
      id: 'quiz' as StudyTabType,
      label: 'Interactive Quiz',
      icon: HelpCircle,
      count: quizCount
    },
    {
      id: 'quiz-summary' as StudyTabType,
      label: 'Quiz Results',
      icon: Award,
      badge: hasQuizAttempt ? 'Completed' : 'Pending'
    },
    {
      id: 'summary' as StudyTabType,
      label: 'Summary & Notes',
      icon: BookOpen
    }
  ];

  return (
    <nav className="study-tabs-nav" aria-label="Study Kit Sections">
      <div className="study-tabs-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`study-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={16} />
              <span className="tab-label">{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className="tab-count-badge">{tab.count}</span>
              )}
              {tab.badge && (
                <span className={`tab-status-pill ${hasQuizAttempt ? 'pill-success' : 'pill-muted'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
