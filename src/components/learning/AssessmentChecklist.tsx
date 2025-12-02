import React, { useState, useEffect } from 'react';

export interface AssessmentChecklistProps {
  /** Assessment identifier (e.g., "module-1-assessment-2") */
  assessmentId: string;

  /** Checklist items grouped by category */
  items: {
    category: string;
    criteria: Array<{
      id: string;
      description: string;
      points: number;
    }>;
  }[];

  /** Total points for the assessment */
  totalPoints: number;

  /** Optional submission instructions */
  submissionInstructions?: string;

  /** Additional CSS class names */
  className?: string;
}

export default function AssessmentChecklist({
  assessmentId,
  items,
  totalPoints,
  submissionInstructions,
  className = '',
}: AssessmentChecklistProps): JSX.Element | null {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Validation
  if (!assessmentId || !items || !totalPoints) {
    console.error('AssessmentChecklist: assessmentId, items, and totalPoints are required');
    return null;
  }

  const calculatedTotal = items
    .flatMap((category) => category.criteria)
    .reduce((sum, criterion) => sum + criterion.points, 0);

  if (calculatedTotal !== totalPoints) {
    console.error(
      `AssessmentChecklist: totalPoints (${totalPoints}) does not match sum of criteria points (${calculatedTotal})`
    );
  }

  // Load persisted state from localStorage
  useEffect(() => {
    const storageKey = `assessment-${assessmentId}-checklist`;
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        setCompleted(JSON.parse(savedState));
      } catch (e) {
        console.warn('Failed to parse saved assessment state:', e);
      }
    }
  }, [assessmentId]);

  // Save state to localStorage
  const handleToggle = (criterionId: string) => {
    const newCompleted = { ...completed, [criterionId]: !completed[criterionId] };
    setCompleted(newCompleted);

    const storageKey = `assessment-${assessmentId}-checklist`;
    localStorage.setItem(storageKey, JSON.stringify(newCompleted));
  };

  // Calculate progress
  const allCriteria = items.flatMap((category) => category.criteria);
  const totalItems = allCriteria.length;
  const completedItems = allCriteria.filter((c) => completed[c.id]).length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const completedPoints = allCriteria
    .filter((criterion) => completed[criterion.id])
    .reduce((sum, criterion) => sum + criterion.points, 0);

  const isComplete = progressPercentage === 100;

  return (
    <section
      className={`assessment-checklist ${className}`}
      role="group"
      aria-labelledby="checklist-title"
    >
      {/* Header */}
      <div className="assessment-checklist__header">
        <h3 id="checklist-title" className="assessment-checklist__title">
          📋 Assessment Checklist
        </h3>
        <div className="assessment-checklist__progress" role="status" aria-live="polite" aria-atomic="true">
          <div>Progress: {progressPercentage}%</div>
          <div>
            {completedPoints} / {totalPoints} points
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="assessment-checklist__progress-bar">
        <div
          className="assessment-checklist__progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Categories and Criteria */}
      {items.map((category) => (
        <fieldset key={category.category} className="assessment-checklist__category">
          <legend>{category.category}</legend>
          {category.criteria.map((criterion) => (
            <label key={criterion.id} className="assessment-checklist__criterion">
              <input
                type="checkbox"
                checked={completed[criterion.id] || false}
                onChange={() => handleToggle(criterion.id)}
                aria-label={`${criterion.description} (${criterion.points} points)`}
              />
              <span className="assessment-checklist__criterion-description">
                {criterion.description}
              </span>
              <span className="assessment-checklist__criterion-points">
                ({criterion.points} pts)
              </span>
            </label>
          ))}
        </fieldset>
      ))}

      {/* Status Indicator */}
      <div
        className={`assessment-checklist__status ${
          isComplete
            ? 'assessment-checklist__status--complete'
            : 'assessment-checklist__status--incomplete'
        }`}
      >
        {isComplete ? (
          <>
            <div>✅ Ready to Submit!</div>
            <div>All criteria met. Review your work and submit via Canvas.</div>
          </>
        ) : (
          <>
            <div>⚠️ Incomplete ({100 - progressPercentage}% remaining)</div>
            <div>Submit when all criteria are met.</div>
          </>
        )}
      </div>

      {/* Submission Instructions */}
      {submissionInstructions && (
        <div className="assessment-checklist__instructions">
          <strong>Submission Instructions:</strong>
          <p>{submissionInstructions}</p>
        </div>
      )}
    </section>
  );
}
