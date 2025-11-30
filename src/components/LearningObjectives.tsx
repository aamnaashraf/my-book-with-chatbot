/**
 * LearningObjectives Component
 *
 * Displays chapter learning objectives in a visually distinct card.
 * Used at the beginning of chapters to set clear expectations for learners.
 *
 * Feature: 002-chapter-template-system
 * User Story: US2 - Display Learning Components
 *
 * @example
 * ```mdx
 * <LearningObjectives objectives={frontMatter.learning_objectives} />
 * ```
 */

import React from 'react';
import type { ReactElement } from 'react';

/**
 * Props for LearningObjectives component
 */
export interface LearningObjectivesProps {
  /**
   * Array of learning objective strings from chapter frontmatter.
   * Each objective should start with a Bloom's taxonomy verb (e.g., "Understand", "Apply").
   * Minimum 2, maximum 5 objectives per chapter.
   */
  objectives: string[];
}

/**
 * LearningObjectives Component
 *
 * Renders a styled card containing the chapter's learning objectives.
 * Uses CSS classes defined in src/css/custom.css for consistent theming.
 *
 * @param props - Component props
 * @returns Formatted learning objectives section
 */
export default function LearningObjectives({
  objectives
}: LearningObjectivesProps): ReactElement | null {
  // Validate props
  if (!objectives || !Array.isArray(objectives) || objectives.length === 0) {
    console.warn('LearningObjectives: No objectives provided');
    return null;
  }

  return (
    <div className="learning-objectives">
      <h3>Learning Objectives</h3>
      <ul>
        {objectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
}
