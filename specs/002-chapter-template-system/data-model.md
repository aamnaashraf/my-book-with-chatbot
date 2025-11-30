# Data Model: Chapter Template System

**Feature**: `002-chapter-template-system` | **Date**: 2025-11-30 | **Phase**: 1.1

## Overview

This document defines the data structures, entities, and relationships for the chapter template system. All structures are designed for TypeScript type safety, Docusaurus MDX compatibility, and JSON Schema validation.

---

## Entity Definitions

### 1. Chapter Metadata (Frontmatter)

The core data structure stored in YAML frontmatter of each chapter file.

#### Schema

```typescript
interface ChapterMetadata {
  // Required Fields (9 total)
  title: string;                    // Chapter title (1-100 chars)
  description: string;               // SEO description (10-160 chars)
  keywords: string[];                // SEO keywords (3-10 items)
  sidebar_position: number;          // Position in sidebar (≥1)
  learning_objectives: string[];     // Learning objectives (2-5 items, ≥10 chars each)
  prerequisites: string[];           // Paths to prerequisite chapters (docs/...)
  estimated_time: number;            // Reading time in minutes (5-180)
  content_type: ContentType;         // Content variant type
  difficulty: DifficultyLevel;       // Difficulty level

  // Docusaurus Built-in (Optional)
  pagination_prev?: string | null;   // Override previous page link
  pagination_next?: string | null;   // Override next page link
  tags?: string[];                   // Tags for filtering/organization
  draft?: boolean;                   // Hide from production builds
}
```

#### Content Type Enum

```typescript
type ContentType =
  | 'tutorial'      // Step-by-step procedural guide
  | 'concept'       // Explanatory/theoretical content
  | 'hands-on-lab'  // Practical application exercise
  | 'reference';    // Quick lookup/API documentation
```

#### Difficulty Level Enum

```typescript
type DifficultyLevel =
  | 'beginner'      // Introductory, minimal prerequisites
  | 'intermediate'  // Requires foundational knowledge
  | 'advanced';     // Expert-level, complex concepts
```

#### Validation Rules

| Field | Type | Constraints | Validation Rule |
|-------|------|-------------|-----------------|
| `title` | string | 1-100 chars | Non-empty, max length |
| `description` | string | 10-160 chars | SEO meta description length |
| `keywords` | array<string> | 3-10 items | Minimum 3, maximum 10 |
| `sidebar_position` | number | ≥1 | Positive integer |
| `learning_objectives` | array<string> | 2-5 items, ≥10 chars/item | Array length, item min length |
| `prerequisites` | array<string> | N/A | Must match pattern `^docs/.+$` |
| `estimated_time` | number | 5-180 | Range validation (minutes) |
| `content_type` | enum | 4 values | Must be one of enum values |
| `difficulty` | enum | 3 values | Must be one of enum values |

#### Example

```yaml
---
title: Introduction to Forward Kinematics
description: Learn how to calculate robot end-effector positions using forward kinematics transformations with practical examples.
keywords: [robotics, kinematics, forward kinematics, transformations, DH parameters]
sidebar_position: 3
learning_objectives:
  - Understand the Denavit-Hartenberg (DH) convention for robot modeling
  - Calculate transformation matrices for robotic manipulators
  - Compute end-effector position and orientation from joint angles
  - Apply forward kinematics to 2-DOF and 3-DOF robot arms
prerequisites:
  - docs/fundamentals/coordinate-systems
  - docs/fundamentals/matrix-transformations
estimated_time: 45
content_type: tutorial
difficulty: intermediate
---
```

---

### 2. Learning Objectives Component

Displays learning objectives as a styled callout box at the chapter start.

#### Props Interface

```typescript
interface LearningObjectivesProps {
  objectives: string[];  // Array of learning objective strings from frontmatter
}
```

#### Data Flow

```
frontMatter.learning_objectives (YAML array)
  ↓
<LearningObjectives objectives={frontMatter.learning_objectives} />
  ↓
Component renders styled <ul> list
```

#### Rendering Logic

- **Input Validation**: If `objectives` is empty or undefined, render `null` (graceful degradation)
- **Output**: Styled `<div>` with heading "Learning Objectives" and `<ul>` list
- **Accessibility**: Semantic HTML (`<ul>`, `<li>`), no ARIA needed

#### Example Output (Rendered HTML)

```html
<div class="learning-objectives">
  <h3>Learning Objectives</h3>
  <ul>
    <li>Understand the Denavit-Hartenberg (DH) convention for robot modeling</li>
    <li>Calculate transformation matrices for robotic manipulators</li>
    <li>Compute end-effector position and orientation from joint angles</li>
    <li>Apply forward kinematics to 2-DOF and 3-DOF robot arms</li>
  </ul>
</div>
```

---

### 3. Prerequisites Component

Displays prerequisite chapters and estimated reading time as an info badge.

#### Props Interface

```typescript
interface PrerequisitesProps {
  prereqs: string[];      // Array of paths to prerequisite chapters
  estimatedTime: number;  // Reading time in minutes
}
```

#### Data Flow

```
frontMatter.prerequisites (YAML array) + frontMatter.estimated_time (number)
  ↓
<Prerequisites prereqs={frontMatter.prerequisites} estimatedTime={frontMatter.estimated_time} />
  ↓
Component renders prerequisite links + time badge
```

#### Rendering Logic

- **Input Validation**: If `prereqs` is empty, show only time estimate; if both missing, render `null`
- **Link Generation**: Convert `docs/path/to/chapter` → `/docs/path/to/chapter` (prepend base URL)
- **Link Labels**: Extract chapter title from path (e.g., `docs/fundamentals/coordinate-systems` → "Coordinate Systems")
- **Time Display**: Format as "⏱️ X minutes" badge

#### Link Resolution Strategy

**Option A (Simple)**: Use path as-is, let Docusaurus resolve
```tsx
<a href={`/${prereq}`}>Prerequisite Chapter</a>
```

**Option B (Enhanced)**: Fetch chapter title from frontmatter (requires build-time indexing)
```tsx
// Requires global chapter metadata index (future enhancement)
<a href={`/${prereq}`}>{getChapterTitle(prereq)}</a>
```

**Decision**: Start with **Option A** (simple path links), iterate to Option B if needed.

#### Example Output (Rendered HTML)

```html
<div class="prerequisites">
  <h4>Prerequisites</h4>
  <ul>
    <li><a href="/docs/fundamentals/coordinate-systems">Coordinate Systems</a></li>
    <li><a href="/docs/fundamentals/matrix-transformations">Matrix Transformations</a></li>
  </ul>
  <span class="prerequisites-badge">⏱️ 45 minutes</span>
</div>
```

---

### 4. Key Takeaways Component

Wraps summary content in a styled callout box, typically used at chapter end.

#### Props Interface

```typescript
interface KeyTakeawaysProps {
  children: React.ReactNode;  // MDX content passed as children
}
```

#### Data Flow

```
<KeyTakeaways>
  - Takeaway 1
  - Takeaway 2
</KeyTakeaways>
  ↓
Component wraps children in styled <div>
```

#### Rendering Logic

- **Input**: Accepts any React children (MDX renders Markdown as React nodes)
- **Wrapper**: Styled `<div>` with visual indicator (checkmark icon)
- **Flexibility**: Supports Markdown lists, paragraphs, code blocks within wrapper

#### Example Usage (MDX)

```mdx
## Summary

<KeyTakeaways>
  - Forward kinematics calculates end-effector pose from joint angles
  - DH parameters provide a standard convention for robot modeling
  - Transformation matrices compose to produce the final pose
  - Different robot configurations (revolute, prismatic) use the same framework
</KeyTakeaways>
```

#### Example Output (Rendered HTML)

```html
<div class="key-takeaways">
  <ul>
    <li>Forward kinematics calculates end-effector pose from joint angles</li>
    <li>DH parameters provide a standard convention for robot modeling</li>
    <li>Transformation matrices compose to produce the final pose</li>
    <li>Different robot configurations (revolute, prismatic) use the same framework</li>
  </ul>
</div>
```

---

### 5. Exercise Block Component

Interactive exercise component with progressive hints and collapsible solution.

#### Props Interface

```typescript
interface ExerciseBlockProps {
  title: string;                                  // Exercise title
  difficulty: 'beginner' | 'intermediate' | 'advanced';  // Difficulty badge
  children: React.ReactNode;                      // Structured content (Problem, Hints, Solution)
}
```

#### Children Structure

The `children` prop expects a specific structure with three sections:

```tsx
<ExerciseBlock title="..." difficulty="...">
  {/* SECTION 1: Problem Statement */}
  <div>Problem description and starter code</div>

  {/* SECTION 2: Hints (array of hint elements) */}
  <div>
    <p>Hint 1 content</p>
    <p>Hint 2 content</p>
    <p>Hint 3 content</p>
  </div>

  {/* SECTION 3: Solution */}
  <div>Solution code and explanation</div>
</ExerciseBlock>
```

#### State Management

```typescript
interface ExerciseBlockState {
  isClient: boolean;       // SSR flag (true after mount)
  attemptCount: number;    // Number of submit attempts
  hintsUnlocked: number;   // Number of hints visible
}
```

#### State Transitions

```
Initial State (SSR): { isClient: false, attemptCount: 0, hintsUnlocked: 0 }
  ↓
After Mount: { isClient: true, attemptCount: 0, hintsUnlocked: 0 }
  ↓
User clicks "Submit Attempt": attemptCount++
  ↓
If attemptCount > hintsUnlocked: hintsUnlocked++
  ↓
Hint N becomes visible when hintsUnlocked >= N
```

#### Progressive Hint Unlock Logic

```typescript
// Hint visibility rule
const isHintVisible = (hintIndex: number, hintsUnlocked: number): boolean => {
  return hintsUnlocked > hintIndex;
};

// Example:
// Hint 0: visible when hintsUnlocked >= 1 (after 1st attempt)
// Hint 1: visible when hintsUnlocked >= 2 (after 2nd attempt)
// Hint 2: visible when hintsUnlocked >= 3 (after 3rd attempt)
```

#### Accessibility Properties

```typescript
interface ExerciseBlockA11y {
  role: 'region';                      // ARIA role for exercise container
  ariaLabel: string;                   // Descriptive label (e.g., "Exercise: Calculate FK")
  hintAriaLive: 'polite';              // Announce hint unlocks
  hintAriaRelevant: 'additions';       // Announce when hints added
  buttonAriaControls: 'exercise-hints'; // Link button to hints container
}
```

#### Example Output Structure (Rendered HTML)

```html
<div class="exercise-block difficulty-intermediate" role="region" aria-label="Exercise: Calculate FK">
  <header>
    <h4>Calculate Forward Kinematics</h4>
    <span class="badge badge-intermediate">intermediate</span>
  </header>

  <section class="exercise-problem">
    <p>Given a 2-DOF robot arm...</p>
    <pre><code class="language-python">def forward_kinematics(...):</code></pre>
  </section>

  <div class="exercise-hints" aria-live="polite" aria-relevant="additions">
    <h5>Hints</h5>
    <details class="hint" aria-expanded="true">
      <summary>Hint 1</summary>
      <div>Recall the DH transformation matrix...</div>
    </details>
    <details class="hint" hidden aria-expanded="false">
      <summary>Hint 2</summary>
      <div>Start by computing T0_1...</div>
    </details>
    <p class="hint-instruction">Submit an attempt to unlock hints progressively.</p>
  </div>

  <button aria-controls="exercise-hints" class="btn-attempt">
    Submit Attempt (0 attempts so far)
  </button>

  <details class="exercise-solution">
    <summary>View Solution</summary>
    <div class="solution-content">
      <pre><code class="language-python">import numpy as np...</code></pre>
    </div>
  </details>
</div>
```

---

## Relationships & Dependencies

### Component → Metadata Mapping

| Component | Frontmatter Source | Required | Default if Missing |
|-----------|-------------------|----------|-------------------|
| `LearningObjectives` | `learning_objectives` | Yes (validation) | Render `null` (graceful) |
| `Prerequisites` | `prerequisites`, `estimated_time` | Yes (validation) | Render `null` (graceful) |
| `KeyTakeaways` | N/A (children prop) | No | N/A |
| `ExerciseBlock` | N/A (props passed explicitly) | No | N/A |

### Data Validation Pipeline

```
Author writes chapter.md with frontmatter
  ↓
(Build Time) validate-metadata.js runs (prebuild hook)
  ↓
gray-matter parses YAML frontmatter → JSON object
  ↓
AJV validates JSON against chapter-metadata-schema.json
  ↓
[PASS] Build continues → Docusaurus processes MDX
[FAIL] Build stops with error messages
  ↓
(Runtime) Components receive validated frontmatter as props
  ↓
Components render with type-safe props
```

### File → Component Flow

```
docs/module-1/chapter.md
  ├── Frontmatter (YAML)
  │   ├── title → Page <h1> (Docusaurus)
  │   ├── learning_objectives → <LearningObjectives />
  │   ├── prerequisites + estimated_time → <Prerequisites />
  │   └── [other metadata] → SEO, sidebar, etc.
  │
  └── Content (MDX)
      ├── Markdown sections
      ├── <KeyTakeaways> ... </KeyTakeaways>
      └── <ExerciseBlock> ... </ExerciseBlock>
```

---

## JSON Schema Definition

The validation schema enforces all metadata rules at build time.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Chapter Metadata Schema",
  "description": "Validation schema for Docusaurus chapter frontmatter in Physical AI & Humanoid Robotics Textbook",
  "type": "object",
  "required": [
    "title",
    "description",
    "keywords",
    "sidebar_position",
    "learning_objectives",
    "prerequisites",
    "estimated_time",
    "content_type",
    "difficulty"
  ],
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Chapter title displayed in navigation and page header"
    },
    "description": {
      "type": "string",
      "minLength": 10,
      "maxLength": 160,
      "description": "SEO meta description (ideal length: 120-160 characters)"
    },
    "keywords": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 2
      },
      "minItems": 3,
      "maxItems": 10,
      "uniqueItems": true,
      "description": "SEO keywords for search and indexing"
    },
    "sidebar_position": {
      "type": "number",
      "minimum": 1,
      "description": "Position in sidebar navigation (positive integer)"
    },
    "learning_objectives": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 10,
        "description": "Learning objective using Bloom's taxonomy verb (e.g., 'Understand...', 'Apply...', 'Analyze...')"
      },
      "minItems": 2,
      "maxItems": 5,
      "description": "2-5 measurable learning objectives"
    },
    "prerequisites": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^docs/.+$",
        "description": "Path to prerequisite chapter (relative to docs/)"
      },
      "description": "Array of paths to prerequisite chapters (can be empty)"
    },
    "estimated_time": {
      "type": "number",
      "minimum": 5,
      "maximum": 180,
      "description": "Estimated reading/completion time in minutes"
    },
    "content_type": {
      "type": "string",
      "enum": ["tutorial", "concept", "hands-on-lab", "reference"],
      "description": "Content variant type for template guidance"
    },
    "difficulty": {
      "type": "string",
      "enum": ["beginner", "intermediate", "advanced"],
      "description": "Difficulty level for reader expectations"
    },
    "pagination_prev": {
      "type": ["string", "null"],
      "description": "Override previous page link (Docusaurus built-in)"
    },
    "pagination_next": {
      "type": ["string", "null"],
      "description": "Override next page link (Docusaurus built-in)"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Tags for filtering and organization (Docusaurus built-in)"
    },
    "draft": {
      "type": "boolean",
      "description": "Hide from production builds (Docusaurus built-in)"
    }
  },
  "additionalProperties": true
}
```

---

## Type Safety Strategy

### TypeScript Interfaces Location

All TypeScript interfaces will be defined in:
- **Component files**: `src/components/<ComponentName>.tsx` (colocated with implementation)
- **Shared types**: `src/types/chapter.ts` (if needed for cross-component sharing)
- **Contracts directory**: `contracts/chapter-metadata.ts` (for documentation and tooling)

### Runtime vs. Compile-Time Validation

| Validation Type | Tool | When | Purpose |
|----------------|------|------|---------|
| **Build-time schema** | AJV + JSON Schema | `npm run build` (prebuild) | Catch metadata errors before deployment |
| **Compile-time types** | TypeScript | Development + build | Catch prop type mismatches in components |
| **Runtime checks** | Conditional rendering | Page load | Graceful degradation for missing optional data |

### Example Type Safety Flow

```typescript
// 1. TypeScript interface defines expected shape
interface LearningObjectivesProps {
  objectives: string[];
}

// 2. Component implementation uses typed props
export default function LearningObjectives({ objectives }: LearningObjectivesProps): JSX.Element {
  // 3. Runtime check for graceful degradation
  if (!objectives || objectives.length === 0) {
    return null;
  }

  // 4. TypeScript ensures type-safe operations
  return (
    <ul>
      {objectives.map((obj, index) => (
        <li key={index}>{obj}</li>
      ))}
    </ul>
  );
}

// 5. JSON Schema validates at build time (separate validation)
// If frontmatter violates schema, build fails before TypeScript sees it
```

---

## Performance Considerations

### Validation Performance

- **Expected Load**: 50 chapters × 9 required fields = 450 field validations
- **AJV Performance**: ~1ms per document validation with compiled schema
- **Total Validation Time**: <100ms for entire project
- **Optimization**: Schema compiled once, reused for all files

### Component Rendering Performance

- **SSR**: All components are SSR-compatible (no client-only dependencies in initial render)
- **Hydration**: Client-side state (ExerciseBlock) initializes after hydration
- **Bundle Size**: Native `<details>` elements reduce JS bundle vs. custom accordion libraries
- **CSS**: Styles in single `custom.css` file (no CSS-in-JS runtime cost)

---

## Summary

This data model provides:

1. **Type-Safe Structures**: TypeScript interfaces for all components and metadata
2. **Validation Schema**: JSON Schema for build-time metadata validation
3. **Clear Relationships**: Component ↔ Frontmatter mappings documented
4. **Accessibility**: ARIA attributes and semantic HTML integrated
5. **Performance**: Optimized validation and rendering strategies
6. **Extensibility**: Additional properties allowed for future enhancements

**Status**: ✅ Ready for Phase 1.2 (Contract Implementation)
