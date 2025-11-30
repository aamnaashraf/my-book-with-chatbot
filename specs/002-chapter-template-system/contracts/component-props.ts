/**
 * Component Props Type Definitions
 *
 * Contract file for React component props used in the chapter template system.
 *
 * Feature: 002-chapter-template-system
 * Date: 2025-11-30
 * Phase: 1.2 - Design & Contracts
 */

import { ReactNode } from 'react';

// ========================================
// LEARNING OBJECTIVES COMPONENT
// ========================================

/**
 * Props for the LearningObjectives component.
 * Displays learning objectives as a styled callout box at chapter start.
 *
 * @example
 * ```tsx
 * <LearningObjectives
 *   objectives={frontMatter.learning_objectives}
 * />
 * ```
 */
export interface LearningObjectivesProps {
  /**
   * Array of learning objective strings from chapter frontmatter.
   * Each objective should start with a Bloom's taxonomy verb.
   *
   * @minItems 2
   * @maxItems 5
   * @example
   * [
   *   "Understand the DH convention for robot modeling",
   *   "Calculate transformation matrices for robotic manipulators"
   * ]
   */
  objectives: string[];
}

// ========================================
// PREREQUISITES COMPONENT
// ========================================

/**
 * Props for the Prerequisites component.
 * Displays prerequisite chapters and estimated reading time.
 *
 * @example
 * ```tsx
 * <Prerequisites
 *   prereqs={frontMatter.prerequisites}
   *   estimatedTime={frontMatter.estimated_time}
 * />
 * ```
 */
export interface PrerequisitesProps {
  /**
   * Array of paths to prerequisite chapters (relative to docs/).
   * Can be empty if no prerequisites.
   *
   * @pattern "^docs/.+$" (per item)
   * @example ["docs/fundamentals/coordinate-systems", "docs/fundamentals/matrix-transformations"]
   */
  prereqs: string[];

  /**
   * Estimated reading/completion time in minutes.
   *
   * @minimum 5
   * @maximum 180
   * @example 45
   */
  estimatedTime: number;
}

// ========================================
// KEY TAKEAWAYS COMPONENT
// ========================================

/**
 * Props for the KeyTakeaways component.
 * Wraps summary content in a styled callout box at chapter end.
 *
 * @example
 * ```tsx
 * <KeyTakeaways>
 *   - Forward kinematics calculates end-effector pose from joint angles
 *   - DH parameters provide a standard convention for robot modeling
 * </KeyTakeaways>
 * ```
 */
export interface KeyTakeawaysProps {
  /**
   * MDX content passed as children (supports Markdown lists, paragraphs, code blocks).
   * Typically a bulleted list of key takeaways.
   */
  children: ReactNode;
}

// ========================================
// EXERCISE BLOCK COMPONENT
// ========================================

/**
 * Difficulty levels for exercises.
 * Determines visual badge and user expectations.
 */
export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Props for the ExerciseBlock component.
 * Interactive exercise with progressive hints and collapsible solution.
 *
 * @example
 * ```tsx
 * <ExerciseBlock title="Calculate Forward Kinematics" difficulty="intermediate">
 *   {/ * SECTION 1: Problem Statement * /}
 *   <div>
 *     <p>Given a 2-DOF robot arm with joint angles θ1=30° and θ2=45°...</p>
 *   </div>
 *
 *   {/ * SECTION 2: Hints (array of hint elements) * /}
 *   <div>
 *     <p>Hint 1: Recall the DH transformation matrix</p>
 *     <p>Hint 2: Start by computing T0_1</p>
 *     <p>Hint 3: Remember to convert degrees to radians</p>
 *   </div>
 *
 *   {/ * SECTION 3: Solution * /}
 *   <div>
 *     <pre><code>import numpy as np...</code></pre>
 *   </div>
 * </ExerciseBlock>
 * ```
 */
export interface ExerciseBlockProps {
  /**
   * Exercise title displayed in the header.
   *
   * @minLength 5
   * @maxLength 100
   * @example "Calculate Forward Kinematics"
   */
  title: string;

  /**
   * Difficulty level for visual badge and user expectations.
   *
   * @example "intermediate"
   */
  difficulty: ExerciseDifficulty;

  /**
   * Structured content with three sections:
   * 1. Problem statement (first child)
   * 2. Hints array (second child containing multiple hint elements)
   * 3. Solution (third child)
   *
   * Each section should be wrapped in a <div> for proper parsing.
   */
  children: ReactNode;
}

// ========================================
// INTERNAL STATE INTERFACES
// (Used within component implementations, not passed as props)
// ========================================

/**
 * Internal state structure for the ExerciseBlock component.
 * Manages attempt tracking and hint unlocking.
 *
 * @internal
 */
export interface ExerciseBlockState {
  /**
   * Flag indicating if component has mounted on client (for SSR compatibility).
   * Initially false during server-side render, set to true in useEffect.
   */
  isClient: boolean;

  /**
   * Number of times the user has clicked "Submit Attempt".
   * Used to determine which hints to unlock.
   *
   * @minimum 0
   */
  attemptCount: number;

  /**
   * Number of hints currently unlocked/visible.
   * Increments when attemptCount > hintsUnlocked.
   *
   * @minimum 0
   */
  hintsUnlocked: number;
}

/**
 * Accessibility properties for the ExerciseBlock component.
 * Ensures screen reader compatibility and keyboard navigation.
 *
 * @internal
 */
export interface ExerciseBlockA11yProps {
  /**
   * ARIA role for the exercise container.
   */
  role: 'region';

  /**
   * ARIA label describing the exercise (for screen readers).
   *
   * @example "Exercise: Calculate Forward Kinematics"
   */
  ariaLabel: string;

  /**
   * ARIA live region politeness level for hint announcements.
   * "polite" = announce when user is idle, don't interrupt.
   */
  hintAriaLive: 'polite';

  /**
   * ARIA relevant property for live region.
   * "additions" = announce when new hints are added to DOM.
   */
  hintAriaRelevant: 'additions';

  /**
   * ARIA controls attribute linking submit button to hints container.
   * Value should be the ID of the hints container element.
   *
   * @example "exercise-hints"
   */
  buttonAriaControls: string;
}

// ========================================
// HELPER TYPES
// ========================================

/**
 * Prerequisite link data after path parsing.
 * Used internally by Prerequisites component to render links.
 *
 * @internal
 */
export interface PrerequisiteLink {
  /**
   * Full path to prerequisite chapter (with leading slash).
   *
   * @example "/docs/fundamentals/coordinate-systems"
   */
  href: string;

  /**
   * Display label for the link (extracted from path or fetched from metadata).
   *
   * @example "Coordinate Systems"
   */
  label: string;
}

/**
 * Badge configuration for difficulty levels.
 * Maps difficulty to visual styling.
 *
 * @internal
 */
export interface DifficultyBadge {
  /**
   * Difficulty level.
   */
  level: ExerciseDifficulty;

  /**
   * CSS class name for styling.
   *
   * @example "badge-beginner"
   */
  className: string;

  /**
   * Accessible label for screen readers.
   *
   * @example "Difficulty: Beginner"
   */
  ariaLabel: string;

  /**
   * Color theme (maps to Docusaurus color variables).
   *
   * @example "success" (for beginner = green)
   */
  colorTheme: 'success' | 'warning' | 'danger';
}

/**
 * Map of difficulty levels to badge configurations.
 *
 * @internal
 */
export const DIFFICULTY_BADGES: Record<ExerciseDifficulty, DifficultyBadge> = {
  beginner: {
    level: 'beginner',
    className: 'badge-beginner',
    ariaLabel: 'Difficulty: Beginner',
    colorTheme: 'success'
  },
  intermediate: {
    level: 'intermediate',
    className: 'badge-intermediate',
    ariaLabel: 'Difficulty: Intermediate',
    colorTheme: 'warning'
  },
  advanced: {
    level: 'advanced',
    className: 'badge-advanced',
    ariaLabel: 'Difficulty: Advanced',
    colorTheme: 'danger'
  }
};

// ========================================
// VALIDATION HELPERS
// ========================================

/**
 * Type guard to validate LearningObjectivesProps.
 *
 * @param props - Props object to validate
 * @returns true if props are valid LearningObjectivesProps
 *
 * @example
 * ```typescript
 * if (isLearningObjectivesProps(props)) {
 *   return <LearningObjectives {...props} />;
 * }
 * ```
 */
export function isLearningObjectivesProps(props: any): props is LearningObjectivesProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    Array.isArray(props.objectives) &&
    props.objectives.length >= 2 &&
    props.objectives.length <= 5 &&
    props.objectives.every((obj: any) => typeof obj === 'string' && obj.length >= 10)
  );
}

/**
 * Type guard to validate PrerequisitesProps.
 *
 * @param props - Props object to validate
 * @returns true if props are valid PrerequisitesProps
 */
export function isPrerequisitesProps(props: any): props is PrerequisitesProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    Array.isArray(props.prereqs) &&
    props.prereqs.every((prereq: any) => typeof prereq === 'string' && prereq.startsWith('docs/')) &&
    typeof props.estimatedTime === 'number' &&
    props.estimatedTime >= 5 &&
    props.estimatedTime <= 180
  );
}

/**
 * Type guard to validate ExerciseBlockProps.
 *
 * @param props - Props object to validate
 * @returns true if props are valid ExerciseBlockProps
 */
export function isExerciseBlockProps(props: any): props is ExerciseBlockProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    typeof props.title === 'string' &&
    props.title.length >= 5 &&
    props.title.length <= 100 &&
    ['beginner', 'intermediate', 'advanced'].includes(props.difficulty)
  );
}
