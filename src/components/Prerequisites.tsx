/**
 * Prerequisites Component
 *
 * Displays chapter prerequisites and estimated completion time.
 * Used at the beginning of chapters to help learners assess readiness.
 *
 * Feature: 002-chapter-template-system
 * User Story: US2 - Display Learning Components
 *
 * @example
 * ```mdx
 * <Prerequisites
 *   prereqs={frontMatter.prerequisites}
 *   estimatedTime={frontMatter.estimated_time}
 * />
 * ```
 */

import React from 'react';
import type { ReactElement } from 'react';

/**
 * Props for Prerequisites component
 */
export interface PrerequisitesProps {
  /**
   * Array of prerequisite chapter paths from frontmatter.
   * Paths should be relative to docs/ directory (e.g., "docs/fundamentals/kinematics").
   * Can be empty array if no prerequisites.
   */
  prereqs: string[];

  /**
   * Estimated time to complete the chapter in minutes.
   * Should be a multiple of 5 (e.g., 15, 30, 45, 60).
   */
  estimatedTime: number;
}

/**
 * Convert prerequisite path to readable title
 *
 * Transforms a path like "docs/fundamentals/kinematics" into "Fundamentals: Kinematics"
 *
 * @param path - Prerequisite chapter path
 * @returns Human-readable title
 */
function formatPrerequisiteTitle(path: string): string {
  // Remove "docs/" prefix if present
  const pathWithoutDocs = path.replace(/^docs\//, '');

  // Split by "/" and capitalize each segment
  const segments = pathWithoutDocs.split('/');
  const formatted = segments
    .map(segment =>
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(': ');

  return formatted;
}

/**
 * Prerequisites Component
 *
 * Renders prerequisite chapters as links and displays estimated time.
 * Uses CSS classes defined in src/css/custom.css for consistent theming.
 *
 * @param props - Component props
 * @returns Formatted prerequisites section
 */
export default function Prerequisites({
  prereqs,
  estimatedTime
}: PrerequisitesProps): ReactElement | null {
  // Validate props
  if (!Array.isArray(prereqs)) {
    console.warn('Prerequisites: prereqs must be an array');
    return null;
  }

  if (typeof estimatedTime !== 'number' || estimatedTime < 5) {
    console.warn('Prerequisites: estimatedTime must be a number >= 5');
    return null;
  }

  return (
    <div className="prerequisites">
      <h3>Before You Begin</h3>

      <div className="estimated-time">
        ⏱️ Estimated Time: {estimatedTime} minutes
      </div>

      {prereqs.length > 0 ? (
        <>
          <p>
            <strong>Prerequisites:</strong> You should be familiar with the following topics:
          </p>
          <ul>
            {prereqs.map((prereq, index) => {
              // Convert path to proper link format
              const linkPath = prereq.startsWith('/')
                ? prereq
                : `/${prereq.replace(/^docs\//, '')}`;

              return (
                <li key={index}>
                  <a href={linkPath}>{formatPrerequisiteTitle(prereq)}</a>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>
          <strong>Prerequisites:</strong> None - this chapter is suitable for beginners.
        </p>
      )}
    </div>
  );
}
