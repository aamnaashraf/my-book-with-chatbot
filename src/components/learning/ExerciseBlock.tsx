import React, { useState, useEffect } from 'react';

export interface ExerciseBlockProps {
  /** Exercise title (e.g., "Build a Multi-Node System") */
  title: string;

  /** Unique identifier for linking (e.g., "chapter3-exercise-multi-node") */
  id?: string;

  /** Exercise type */
  type?: 'guided' | 'challenge' | 'debugging' | 'extension';

  /** Difficulty level (shows badge) */
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  /** Estimated time to complete in minutes */
  estimatedTime: number;

  /** Array of learning objectives (displayed as checkboxes) */
  objectives: string[];

  /** Array of hint strings (displayed in collapsible section) */
  hints?: string[];

  /** Path to starter code file (relative to static/) */
  starterCode?: string;

  /** Path to complete solution file (relative to static/) */
  solutionCode?: string;

  /** Exercise content (MDX children: problem, requirements, testing) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string;
}

export default function ExerciseBlock({
  title,
  id,
  type = 'guided',
  difficulty,
  estimatedTime,
  objectives,
  hints,
  starterCode,
  solutionCode,
  children,
  className = '',
}: ExerciseBlockProps): JSX.Element | null {
  const [objectivesCompleted, setObjectivesCompleted] = useState<boolean[]>(
    new Array(objectives.length).fill(false)
  );
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [solutionExpanded, setSolutionExpanded] = useState(false);

  // Validation
  if (!title || !difficulty || !estimatedTime || !objectives) {
    console.error('ExerciseBlock: title, difficulty, estimatedTime, and objectives are required');
    return null;
  }

  if (objectives.length === 0 || objectives.length > 5) {
    console.warn(`ExerciseBlock: objectives should have 1-5 items, got ${objectives.length}`);
  }

  if (estimatedTime < 5) {
    console.warn(`ExerciseBlock: estimatedTime (${estimatedTime}) should be ≥ 5 minutes`);
  }

  // Load persisted state from localStorage
  useEffect(() => {
    if (id) {
      const storageKey = `exercise-${id}-objectives`;
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (Array.isArray(parsed) && parsed.length === objectives.length) {
            setObjectivesCompleted(parsed);
          }
        } catch (e) {
          console.warn('Failed to parse saved exercise state:', e);
        }
      }
    }
  }, [id, objectives.length]);

  // Save state to localStorage
  const handleObjectiveToggle = (index: number) => {
    const newCompleted = [...objectivesCompleted];
    newCompleted[index] = !newCompleted[index];
    setObjectivesCompleted(newCompleted);

    if (id) {
      const storageKey = `exercise-${id}-objectives`;
      localStorage.setItem(storageKey, JSON.stringify(newCompleted));
    }
  };

  // Calculate progress
  const completedCount = objectivesCompleted.filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / objectives.length) * 100);

  const getDifficultyClass = (level: string) => {
    const classes: Record<string, string> = {
      beginner: 'exercise-block__badge--beginner',
      intermediate: 'exercise-block__badge--intermediate',
      advanced: 'exercise-block__badge--advanced',
    };
    return classes[level] || '';
  };

  return (
    <section
      className={`exercise-block ${className}`}
      role="complementary"
      aria-label={`Exercise: ${title}`}
    >
      {/* Header */}
      <div className="exercise-block__header">
        <h3 className="exercise-block__title" id={`exercise-${id}-title`}>
          {title}
        </h3>
        <div className="exercise-block__meta">
          <span className={`exercise-block__badge ${getDifficultyClass(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="exercise-block__badge exercise-block__badge--time">
            ⏱ ~{estimatedTime} min
          </span>
          {type && (
            <span className="exercise-block__badge exercise-block__badge--type">
              Type: {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* Learning Objectives */}
      <div
        className="exercise-block__objectives"
        role="group"
        aria-labelledby={`exercise-${id}-objectives-label`}
      >
        <h4 id={`exercise-${id}-objectives-label`}>Learning Objectives</h4>
        {objectives.map((obj, i) => (
          <label key={i} className="exercise-block__objective">
            <input
              type="checkbox"
              checked={objectivesCompleted[i]}
              onChange={() => handleObjectiveToggle(i)}
              aria-label={obj}
            />
            <span className="exercise-block__objective-text">{obj}</span>
          </label>
        ))}
        <div className="exercise-block__progress" role="status" aria-live="polite">
          Progress: {progressPercentage}% ({completedCount} / {objectives.length})
        </div>
      </div>

      {/* Action Buttons */}
      <div className="exercise-block__actions">
        {starterCode && (
          <a
            href={`/${starterCode}`}
            download
            className="exercise-block__button"
          >
            Get Starter Code
          </a>
        )}
        {hints && hints.length > 0 && (
          <button
            className="exercise-block__button exercise-block__button--secondary"
            onClick={() => setHintsExpanded(!hintsExpanded)}
          >
            {hintsExpanded ? 'Hide Hints' : 'View Hints'}
          </button>
        )}
        {solutionCode && (
          <button
            className="exercise-block__button exercise-block__button--secondary"
            onClick={() => setSolutionExpanded(!solutionExpanded)}
          >
            {solutionExpanded ? 'Hide Solution' : 'View Solution'}
          </button>
        )}
      </div>

      {/* Hints Section */}
      {hints && hints.length > 0 && hintsExpanded && (
        <details open className="exercise-block__hints">
          <summary aria-label="Show hints">Hints</summary>
          <ul>
            {hints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Exercise Content */}
      <div className="exercise-block__content">{children}</div>

      {/* Solution Section */}
      {solutionCode && solutionExpanded && (
        <details open className="exercise-block__solution">
          <summary aria-label="Show solution">Solution</summary>
          <p>
            <a href={`/${solutionCode}`} download>
              Download complete solution
            </a>
          </p>
        </details>
      )}
    </section>
  );
}
