/**
 * MDX Component Registration
 *
 * This file registers custom React components to be available globally in all MDX files.
 * Components registered here can be used directly in markdown without explicit imports.
 *
 * Feature: 002-chapter-template-system
 *
 * @see https://docusaurus.io/docs/markdown-features/react#mdx-component-scope
 */

import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// Import custom components for chapter template system
import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';

// Import Module 1 ROS 2 educational components (Feature: 005-module-1-ros2-chapters)
import CodeExample from '@site/src/components/learning/CodeExample';
import ExerciseBlock from '@site/src/components/learning/ExerciseBlock';
import ConceptCallout from '@site/src/components/learning/ConceptCallout';
import AssessmentChecklist from '@site/src/components/learning/AssessmentChecklist';

// These components will be registered as they are created in subsequent phases
// import KeyTakeaways from '@site/src/components/KeyTakeaways';

/**
 * Component mapping for MDX
 *
 * This object extends the default Docusaurus MDX components with our custom components.
 * Any component added here becomes available in all MDX files without imports.
 *
 * Usage in MDX files:
 * ```mdx
 * <LearningObjectives objectives={frontMatter.learning_objectives} />
 * <Prerequisites prereqs={frontMatter.prerequisites} estimatedTime={frontMatter.estimated_time} />
 * <KeyTakeaways>
 *   - Key point 1
 *   - Key point 2
 * </KeyTakeaways>
 * <ExerciseBlock title="Practice Problem" difficulty="intermediate">
 *   Problem content here...
 * </ExerciseBlock>
 * ```
 */
export default {
  // Extend default MDX components
  ...MDXComponents,

  // Custom chapter template components
  LearningObjectives,
  Prerequisites,

  // Module 1 ROS 2 educational components
  CodeExample,
  ExerciseBlock,
  ConceptCallout,
  AssessmentChecklist,

  // Uncomment these as components are created in subsequent phases
  // KeyTakeaways,
};
