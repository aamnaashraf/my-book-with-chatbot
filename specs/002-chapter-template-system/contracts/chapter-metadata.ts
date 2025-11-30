/**
 * Chapter Metadata Type Definitions
 *
 * Contract file for chapter frontmatter metadata used in the
 * Physical AI & Humanoid Robotics Textbook.
 *
 * Feature: 002-chapter-template-system
 * Date: 2025-11-30
 * Phase: 1.2 - Design & Contracts
 */

/**
 * Content type variants for chapter templates.
 * Determines which sections are emphasized and how content is structured.
 */
export type ContentType =
  | 'tutorial'      // Step-by-step procedural guide with code examples
  | 'concept'       // Explanatory/theoretical content with diagrams
  | 'hands-on-lab'  // Practical application exercise with starter code
  | 'reference';    // Quick lookup/API documentation with tables

/**
 * Difficulty levels for chapters.
 * Helps readers assess prerequisite knowledge requirements.
 */
export type DifficultyLevel =
  | 'beginner'      // Introductory, minimal prerequisites required
  | 'intermediate'  // Requires foundational knowledge from prior chapters
  | 'advanced';     // Expert-level with complex concepts and mathematics

/**
 * Complete chapter metadata structure.
 * All fields are validated against JSON Schema at build time.
 *
 * @example
 * ```yaml
 * ---
 * title: Introduction to Forward Kinematics
 * description: Learn how to calculate robot end-effector positions...
 * keywords: [robotics, kinematics, forward kinematics]
 * sidebar_position: 3
 * learning_objectives:
 *   - Understand the Denavit-Hartenberg convention
 *   - Calculate transformation matrices
 * prerequisites:
 *   - docs/fundamentals/coordinate-systems
 * estimated_time: 45
 * content_type: tutorial
 * difficulty: intermediate
 * ---
 * ```
 */
export interface ChapterMetadata {
  // ========================================
  // REQUIRED FIELDS (9 total)
  // ========================================

  /**
   * Chapter title displayed in navigation and page header.
   *
   * @minLength 1
   * @maxLength 100
   * @example "Introduction to Forward Kinematics"
   */
  title: string;

  /**
   * SEO meta description for search engines and social media.
   *
   * @minLength 10
   * @maxLength 160
   * @example "Learn how to calculate robot end-effector positions using forward kinematics transformations with practical examples."
   */
  description: string;

  /**
   * SEO keywords for search indexing and discovery.
   *
   * @minItems 3
   * @maxItems 10
   * @uniqueItems true
   * @example ["robotics", "kinematics", "forward kinematics", "transformations", "DH parameters"]
   */
  keywords: string[];

  /**
   * Position in sidebar navigation (determines ordering).
   *
   * @minimum 1
   * @example 3
   */
  sidebar_position: number;

  /**
   * Measurable learning objectives using Bloom's taxonomy verbs.
   * Each objective should start with a verb (Understand, Apply, Analyze, etc.).
   *
   * @minItems 2
   * @maxItems 5
   * @minLength 10 (per item)
   * @example
   * [
   *   "Understand the Denavit-Hartenberg (DH) convention for robot modeling",
   *   "Calculate transformation matrices for robotic manipulators",
   *   "Compute end-effector position and orientation from joint angles"
   * ]
   */
  learning_objectives: string[];

  /**
   * Paths to prerequisite chapters (relative to docs/ directory).
   * Can be empty array if no prerequisites.
   *
   * @pattern "^docs/.+$" (per item)
   * @example ["docs/fundamentals/coordinate-systems", "docs/fundamentals/matrix-transformations"]
   */
  prerequisites: string[];

  /**
   * Estimated reading/completion time in minutes.
   *
   * @minimum 5
   * @maximum 180
   * @example 45
   */
  estimated_time: number;

  /**
   * Content variant type (determines template guidance).
   *
   * @example "tutorial"
   */
  content_type: ContentType;

  /**
   * Difficulty level for reader expectations.
   *
   * @example "intermediate"
   */
  difficulty: DifficultyLevel;

  // ========================================
  // OPTIONAL FIELDS (Docusaurus built-ins)
  // ========================================

  /**
   * Override the default previous page link in pagination.
   * Set to null to disable previous link.
   *
   * @example "docs/module-1/introduction"
   * @example null
   */
  pagination_prev?: string | null;

  /**
   * Override the default next page link in pagination.
   * Set to null to disable next link.
   *
   * @example "docs/module-1/kinematics"
   * @example null
   */
  pagination_next?: string | null;

  /**
   * Tags for filtering and organization (Docusaurus feature).
   *
   * @example ["robotics", "beginner-friendly"]
   */
  tags?: string[];

  /**
   * Hide this page from production builds (useful during authoring).
   *
   * @default false
   * @example true
   */
  draft?: boolean;
}

/**
 * Type guard to check if an object is valid ChapterMetadata.
 * Performs runtime validation of required fields.
 *
 * Note: For comprehensive validation, use the JSON Schema validator
 * (scripts/validate-metadata.js) which runs at build time.
 *
 * @param obj - Object to validate
 * @returns true if object has all required ChapterMetadata fields
 *
 * @example
 * ```typescript
 * const frontmatter = matter(fileContent).data;
 * if (isChapterMetadata(frontmatter)) {
 *   console.log(frontmatter.title); // Type-safe access
 * }
 * ```
 */
export function isChapterMetadata(obj: any): obj is ChapterMetadata {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    obj.title.length > 0 &&
    obj.title.length <= 100 &&
    typeof obj.description === 'string' &&
    obj.description.length >= 10 &&
    obj.description.length <= 160 &&
    Array.isArray(obj.keywords) &&
    obj.keywords.length >= 3 &&
    obj.keywords.length <= 10 &&
    typeof obj.sidebar_position === 'number' &&
    obj.sidebar_position >= 1 &&
    Array.isArray(obj.learning_objectives) &&
    obj.learning_objectives.length >= 2 &&
    obj.learning_objectives.length <= 5 &&
    Array.isArray(obj.prerequisites) &&
    typeof obj.estimated_time === 'number' &&
    obj.estimated_time >= 5 &&
    obj.estimated_time <= 180 &&
    ['tutorial', 'concept', 'hands-on-lab', 'reference'].includes(obj.content_type) &&
    ['beginner', 'intermediate', 'advanced'].includes(obj.difficulty)
  );
}

/**
 * Bloom's Taxonomy action verbs for writing learning objectives.
 * Organized by cognitive complexity level.
 *
 * Usage: Start each learning objective with one of these verbs.
 *
 * @example "Understand the DH convention" (Remember/Understand level)
 * @example "Analyze transformation matrix compositions" (Analyze level)
 */
export const BloomsTaxonomyVerbs = {
  /** Remembering: Recall facts and basic concepts */
  remember: [
    'Define', 'Identify', 'List', 'Name', 'Recall', 'Recognize', 'State'
  ],

  /** Understanding: Explain ideas or concepts */
  understand: [
    'Classify', 'Describe', 'Discuss', 'Explain', 'Interpret', 'Summarize'
  ],

  /** Applying: Use information in new situations */
  apply: [
    'Apply', 'Calculate', 'Demonstrate', 'Execute', 'Implement', 'Solve', 'Use'
  ],

  /** Analyzing: Draw connections among ideas */
  analyze: [
    'Analyze', 'Compare', 'Contrast', 'Differentiate', 'Examine', 'Investigate'
  ],

  /** Evaluating: Justify a decision or course of action */
  evaluate: [
    'Assess', 'Critique', 'Evaluate', 'Judge', 'Justify', 'Validate'
  ],

  /** Creating: Produce new or original work */
  create: [
    'Build', 'Construct', 'Create', 'Design', 'Develop', 'Formulate', 'Generate'
  ]
} as const;

/**
 * Helper function to format learning objectives with Bloom's verbs.
 *
 * @param verb - Bloom's taxonomy verb
 * @param concept - Concept being learned
 * @returns Formatted learning objective string
 *
 * @example formatLearningObjective("Understand", "the DH convention for robot modeling")
 * // Returns: "Understand the DH convention for robot modeling"
 */
export function formatLearningObjective(verb: string, concept: string): string {
  return `${verb} ${concept}`;
}
