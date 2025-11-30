# Research & Discovery: Chapter Template System

**Feature**: `002-chapter-template-system` | **Date**: 2025-11-30 | **Phase**: 0

## Overview

This document contains research findings for all technical questions identified in the implementation plan. Each section includes decisions, rationale, alternatives considered, code examples, and external references.

---

## 1. Docusaurus MDX Component Best Practices

### Research Questions

- How to create SSR-compatible React components for MDX?
- How to access frontmatter metadata from within components?
- How to handle optional props gracefully (e.g., no prerequisites)?
- Component file structure conventions in Docusaurus projects?

### Decisions

**Decision 1: Use functional components with conditional client-side rendering for stateful components**

- **SSR-Compatible Components**: Create functional components in `src/components/` that avoid client-only APIs during server rendering
- **Client-Side State**: For components requiring state (ExerciseBlock), use the two-pass rendering pattern with `useState` + `useEffect`
- **Stateless Components**: Learning Objectives, Prerequisites, and Key Takeaways can be pure SSR components with no client-side state

**Decision 2: Access frontmatter via props, not global MDX scope**

- **Pattern**: Pass frontmatter fields as props to components explicitly in template
- **Frontmatter Access**: MDX files have access to `frontMatter` global variable
- **Component Props**: Components receive data via props, not by reading global frontmatter directly

**Decision 3: Use TypeScript optional props with default values**

- **Optional Props**: Define props as optional in TypeScript interfaces using `?`
- **Graceful Degradation**: Use conditional rendering (`{prereqs && ...}`) to hide components when data missing
- **Default Values**: Provide sensible defaults in component implementation

**Decision 4: Standard Docusaurus component structure**

- **Location**: `src/components/<ComponentName>.tsx`
- **Styling**: Component-specific styles in `src/css/custom.css`
- **Imports**: Use `@site/` alias for cleaner imports
- **Exports**: Default export for React components

### Rationale

**SSR Compatibility**: Docusaurus performs static site generation, so components must render on server without browser APIs. The two-pass rendering pattern ensures initial SSR matches client hydration while allowing client-side interactivity.

**Frontmatter as Props**: Explicitly passing frontmatter as props makes component dependencies clear, enables type safety, and follows React best practices of explicit data flow.

**Optional Props Pattern**: TypeScript optional props with conditional rendering is idiomatic React and provides compile-time safety while allowing graceful degradation when optional metadata is missing.

**Standard Structure**: Following Docusaurus conventions ensures compatibility with theme system, hot module replacement, and build optimizations.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Class components | Functional components with hooks are modern React standard and better for SSR |
| Global frontmatter access | Creates hidden dependencies, breaks component reusability, harder to test |
| Required props for all fields | Would force authors to provide metadata even when not applicable to content type |
| Component colocation with docs | Separating components in `src/components/` follows Docusaurus conventions |

### Code Examples

#### SSR-Compatible Stateless Component

```tsx
// src/components/LearningObjectives.tsx
import React from 'react';

export interface LearningObjectivesProps {
  objectives: string[];
}

export default function LearningObjectives({ objectives }: LearningObjectivesProps): JSX.Element {
  if (!objectives || objectives.length === 0) {
    return null; // Graceful handling of missing data
  }

  return (
    <div className="learning-objectives">
      <h3>Learning Objectives</h3>
      <ul>
        {objectives.map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### Two-Pass Rendering for Client-Side State

```tsx
// src/components/ExerciseBlock.tsx
import React, { useState, useEffect } from 'react';

export interface ExerciseBlockProps {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  children: React.ReactNode;
}

export default function ExerciseBlock({ title, difficulty, children }: ExerciseBlockProps): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);

  // Two-pass rendering: SSR renders initial state, client hydrates then updates
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Client-side only functionality
  const handleAttempt = () => {
    if (isClient) {
      setAttemptCount(prev => prev + 1);
      // Unlock hints after each attempt
      if (attemptCount >= hintsUnlocked) {
        setHintsUnlocked(prev => prev + 1);
      }
    }
  };

  return (
    <div className={`exercise-block difficulty-${difficulty}`}>
      <h4>{title}</h4>
      <div className="exercise-content">{children}</div>
      {isClient && (
        <button onClick={handleAttempt}>Submit Attempt</button>
      )}
    </div>
  );
}
```

#### Accessing Frontmatter in MDX Template

```mdx
---
title: Introduction to Robotics
learning_objectives:
  - Understand basic robotic systems
  - Identify key components
prerequisites:
  - docs/fundamentals/mechanics
estimated_time: 45
---

import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';

<LearningObjectives objectives={frontMatter.learning_objectives} />
<Prerequisites
  prereqs={frontMatter.prerequisites}
  estimatedTime={frontMatter.estimated_time}
/>

# {frontMatter.title}

Your chapter content here...
```

#### Global Component Registration

```javascript
// src/theme/MDXComponents.js
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';
import KeyTakeaways from '@site/src/components/KeyTakeaways';
import ExerciseBlock from '@site/src/components/ExerciseBlock';

export default {
  ...MDXComponents,
  LearningObjectives,
  Prerequisites,
  KeyTakeaways,
  ExerciseBlock,
};
```

### External References

- [Docusaurus MDX and React](https://github.com/facebook/docusaurus/blob/main/website/docs/guides/markdown-features/markdown-features-react.mdx)
- [React SSR with useEffect](https://react.dev/reference/react/useEffect)
- [React useSyncExternalStore for SSR](https://react.dev/reference/react/useSyncExternalStore)
- [Docusaurus MDX Components](https://github.com/facebook/docusaurus/blob/main/website/docs/guides/markdown-features/markdown-features-react.mdx)

---

## 2. Docusaurus Theme Configuration

### Research Questions

- How to enable automatic prev/next navigation in theme config?
- How to customize prev/next link display (show adjacent chapter titles)?
- Where to add custom CSS for component styling?
- How to ensure styles work in both light and dark modes?

### Decisions

**Decision 1: Use built-in docs plugin navigation features**

- **Prev/Next Links**: Enabled by default in Docusaurus docs plugin
- **Configuration**: No additional config needed; links auto-generate from sidebar structure
- **Customization**: Can be disabled per-page via frontmatter (`pagination_prev: null`)

**Decision 2: Rely on default prev/next display**

- **Display**: Docusaurus automatically shows adjacent page titles from sidebar
- **Theme Integration**: Works seamlessly with theme-classic navigation components
- **No Custom Work**: Default behavior already shows chapter titles and is fully accessible

**Decision 3: Add custom component styles to `src/css/custom.css`**

- **Location**: `src/css/custom.css` (Docusaurus convention)
- **Scope**: Use CSS classes to scope styles to specific components
- **Import**: File automatically loaded by Docusaurus theme

**Decision 4: Use CSS custom properties (CSS variables) for theme compatibility**

- **Light/Dark Modes**: Reference Docusaurus CSS variables (`--ifm-*`) for colors
- **Auto-Adaptation**: Styles automatically adapt when user switches theme
- **Fallbacks**: Provide fallback values for browsers without CSS custom property support

### Rationale

**Built-in Navigation**: Docusaurus docs plugin provides robust prev/next navigation out of the box. Custom implementation would duplicate existing functionality and create maintenance burden.

**Default Display**: The default prev/next display is accessible, responsive, and consistent with Docusaurus UI patterns. Customization would require theme swizzling with no material benefit.

**Custom CSS Location**: `src/css/custom.css` is the Docusaurus-recommended location for site-specific styles. It's loaded globally and supports hot module replacement during development.

**CSS Variables**: Docusaurus uses CSS custom properties for theming. Referencing these variables ensures components respect user theme preferences (light/dark mode) without JavaScript.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Custom prev/next component via swizzling | Unnecessary complexity; default works well and is maintained by Docusaurus team |
| Inline styles in components | Harder to maintain, no theme variable access, larger bundle size |
| Separate CSS files per component | Increases HTTP requests (in dev), harder to manage global theme consistency |
| JavaScript-based theme switching | CSS variables are faster, simpler, and work without JS |

### Code Examples

#### Navbar Configuration (docusaurus.config.js)

```javascript
// docusaurus.config.js
export default {
  themeConfig: {
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        src: 'img/logo.svg',
        alt: 'Textbook Logo',
        width: 32,
        height: 32,
      },
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/docs/references/glossary', label: 'Glossary', position: 'left'},
        {href: 'https://github.com/your-org/repo', label: 'GitHub', position: 'right'},
      ],
      hideOnScroll: false,
      style: 'primary',
    },
  },
};
```

#### Custom Component Styles with Theme Variables

```css
/* src/css/custom.css */

/* Learning Objectives Component */
.learning-objectives {
  background-color: var(--ifm-color-primary-lightest);
  border-left: 4px solid var(--ifm-color-primary);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: var(--ifm-global-radius);
}

.learning-objectives h3 {
  color: var(--ifm-color-primary-darkest);
  margin-top: 0;
  font-size: 1.1rem;
}

.learning-objectives ul {
  margin-bottom: 0;
  padding-left: 1.5rem;
}

/* Prerequisites Component */
.prerequisites {
  background-color: var(--ifm-color-info-lightest);
  border: 1px solid var(--ifm-color-info-light);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: var(--ifm-global-radius);
}

.prerequisites-badge {
  background-color: var(--ifm-color-info);
  color: var(--ifm-color-white);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
}

/* Key Takeaways Component */
.key-takeaways {
  background-color: var(--ifm-color-success-lightest);
  border-left: 4px solid var(--ifm-color-success);
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: var(--ifm-global-radius);
}

.key-takeaways::before {
  content: '✓ ';
  color: var(--ifm-color-success-darkest);
  font-size: 1.2rem;
  font-weight: bold;
}

/* Exercise Block Component */
.exercise-block {
  border: 2px solid var(--ifm-color-emphasis-300);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: var(--ifm-global-radius);
  background-color: var(--ifm-background-surface-color);
}

.exercise-block h4 {
  margin-top: 0;
  color: var(--ifm-heading-color);
}

.exercise-block.difficulty-beginner {
  border-color: var(--ifm-color-success);
}

.exercise-block.difficulty-intermediate {
  border-color: var(--ifm-color-warning);
}

.exercise-block.difficulty-advanced {
  border-color: var(--ifm-color-danger);
}

.exercise-block button {
  background-color: var(--ifm-color-primary);
  color: var(--ifm-color-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
}

.exercise-block button:hover {
  background-color: var(--ifm-color-primary-dark);
}

/* Ensure styles work in dark mode */
[data-theme='dark'] .learning-objectives {
  background-color: rgba(var(--ifm-color-primary-rgb), 0.1);
}

[data-theme='dark'] .prerequisites {
  background-color: rgba(var(--ifm-color-info-rgb), 0.1);
}

[data-theme='dark'] .key-takeaways {
  background-color: rgba(var(--ifm-color-success-rgb), 0.1);
}
```

#### Disabling Prev/Next Per Page (Frontmatter)

```yaml
---
title: Standalone Reference Page
pagination_prev: null
pagination_next: null
---
```

### External References

- [Docusaurus Theme Configuration](https://github.com/facebook/docusaurus/blob/main/website/versioned_docs/version-3.2.1/api/themes/theme-configuration.mdx)
- [Docusaurus Navbar Configuration](https://github.com/facebook/docusaurus/blob/main/website/versioned_docs/version-3.3.2/api/themes/theme-configuration.mdx)
- [Docusaurus Styling and Layout](https://docusaurus.io/docs/styling-layout)
- [Infima CSS Variables](https://infima.dev/docs/getting-started/introduction)

---

## 3. Build Pipeline Integration

### Research Questions

- How to run custom validation scripts in Docusaurus build process?
- How to fail build with clear error messages on validation failure?
- Performance impact of JSON Schema validation on 50+ files?
- Best practices for npm script sequencing (`prebuild`, `build`, `postbuild`)?

### Decisions

**Decision 1: Use npm `prebuild` hook to run validation before build**

- **Pattern**: Create `prebuild` script that runs before `build` automatically
- **Script Location**: `scripts/validate-metadata.js`
- **Execution**: `npm run build` automatically runs `prebuild` first

**Decision 2: Exit with non-zero code and clear error messages**

- **Error Reporting**: Print file path, field name, and validation error for each issue
- **Exit Code**: `process.exit(1)` on validation failure stops build pipeline
- **Success**: Silent success (or summary message) when all valid

**Decision 3: Optimize with compiled schemas and parallel validation**

- **Schema Compilation**: Compile JSON Schema once, reuse validator function
- **Batch Validation**: Read all files first, validate in memory (fast)
- **Expected Performance**: <1 second for 50 files with typical frontmatter

**Decision 4: Use `prebuild` pattern, avoid `postbuild`**

- **Prebuild**: Validation runs before build starts
- **Build**: Standard `docusaurus build`
- **Postbuild**: Reserved for deployment tasks (not validation)

### Rationale

**Prebuild Hook**: npm lifecycle hooks (`prebuild`) run automatically before named scripts. This ensures validation occurs on every build without requiring manual script chaining.

**Exit Code Pattern**: Build tools (npm, CI/CD) rely on exit codes. Non-zero exit (failure) stops pipeline, zero exit (success) continues. This is industry standard for build gates.

**Performance**: JSON Schema validation is extremely fast (<1ms per document). With compiled schemas, validating 50 files takes <100ms total. No performance concerns.

**Script Sequencing**: `prebuild` is the standard pattern for pre-build checks. `postbuild` is for post-build tasks like deployment. Using standard hooks ensures compatibility with CI/CD systems.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Manual script chaining (`npm run validate && npm run build`) | Requires developers to remember; easy to skip validation |
| Postbuild validation | Too late; wasted build time if validation fails |
| Git pre-commit hook | Doesn't run in CI; developers can bypass with `--no-verify` |
| Docusaurus plugin for validation | Over-engineering; simple script sufficient and more maintainable |

### Code Examples

#### Package.json Scripts

```json
{
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "prebuild": "node scripts/validate-metadata.js",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve"
  }
}
```

#### Validation Script Structure (Pseudo-code)

```javascript
// scripts/validate-metadata.js
const Ajv = require('ajv');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Load JSON Schema
const schema = require('../contracts/chapter-metadata-schema.json');

// Compile schema once for performance
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

// Find all .md and .mdx files in docs/
const files = glob.sync('docs/**/*.{md,mdx}');

let hasErrors = false;

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(content);

  const valid = validate(frontmatter);

  if (!valid) {
    hasErrors = true;
    console.error(`\n❌ Validation failed: ${filePath}`);
    validate.errors.forEach(error => {
      console.error(`  - ${error.instancePath || 'root'}: ${error.message}`);
    });
  }
});

if (hasErrors) {
  console.error('\n❌ Metadata validation failed. Fix errors above and rebuild.\n');
  process.exit(1);
} else {
  console.log('✅ All chapter metadata validated successfully.');
}
```

#### Example Error Output

```
❌ Validation failed: docs/module-1/introduction.md
  - /learning_objectives: must be array
  - /estimated_time: must be number

❌ Validation failed: docs/module-2/sensors.md
  - root: must have required property 'title'
  - /keywords: must be array

❌ Metadata validation failed. Fix errors above and rebuild.
```

### External References

- [npm Scripts Lifecycle Hooks](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-operation-order)
- [Docusaurus Build Command](https://docusaurus.io/docs/cli#docusaurus-build-sitedir)
- [gray-matter npm Package](https://www.npmjs.com/package/gray-matter)
- [glob npm Package](https://www.npmjs.com/package/glob)

---

## 4. Exercise Block Component Design

### Research Questions

- How to implement collapsible sections in MDX (details/summary tags vs. custom component)?
- How to track attempt state client-side for hint reveals (React useState)?
- How to reset state on page navigation (React useEffect cleanup)?
- Accessibility considerations for collapsible hints (ARIA attributes)?

### Decisions

**Decision 1: Use custom React component with HTML `<details>` elements for hints**

- **Component**: Custom `ExerciseBlock` React component
- **Collapsible Hints**: Render hints as `<details>` elements for native browser collapsibility
- **Attempt Tracking**: React `useState` to track submit attempts
- **Progressive Unlock**: Unlock hints by removing `hidden` attribute based on attempt count

**Decision 2: Track attempts with `useState`, no persistence**

- **State Management**: `const [attemptCount, setAttemptCount] = useState(0)`
- **No Persistence**: State resets on page reload (educational feature, not user data)
- **Increment Logic**: Submit button increments attempt count

**Decision 3: Reset state on navigation using `useEffect` cleanup**

- **Effect Hook**: `useEffect(() => { /* setup */ return () => { /* cleanup */ } }, [])`
- **Cleanup**: Reset state when component unmounts (user navigates away)
- **Re-initialization**: Fresh state when user returns to page

**Decision 4: Implement ARIA attributes for accessibility**

- **aria-expanded**: Set on hint `<details>` elements (`true`/`false`)
- **aria-controls**: Link submit button to hints container
- **aria-live**: Announce hint unlocks to screen readers (`polite`)
- **role**: Use semantic HTML (`<button>`, `<details>`, `<summary>`) over divs
- **Keyboard Navigation**: Ensure tab order and Enter/Space activation

### Rationale

**Native `<details>` Elements**: HTML `<details>`/`<summary>` provide built-in collapsibility, keyboard navigation, and accessibility. Custom JS implementations are more complex and error-prone.

**No State Persistence**: Persisting attempt counts across sessions adds complexity (localStorage, cookies) without educational value. Fresh attempts on page reload encourage review.

**useEffect Cleanup**: React's effect cleanup pattern ensures memory leaks don't occur when users navigate. Cleanup runs before component unmounts.

**ARIA Compliance**: Following WAI-ARIA authoring practices ensures screen reader users can interact with exercises. Native HTML elements provide baseline accessibility that ARIA enhances.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Pure CSS collapsible (`:target` or checkbox hack) | Cannot integrate with attempt-based unlock logic |
| Third-party accordion library | Adds dependency, over-engineered for simple use case |
| localStorage persistence | Unnecessary complexity; educational exercises should reset |
| Custom div-based collapsible | Requires more ARIA work, reinvents `<details>` functionality |

### Code Examples

#### ExerciseBlock Component (Full Implementation)

```tsx
// src/components/ExerciseBlock.tsx
import React, { useState, useEffect, useRef } from 'react';

export interface ExerciseBlockProps {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  children: React.ReactNode;
}

export default function ExerciseBlock({
  title,
  difficulty,
  children
}: ExerciseBlockProps): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const hintsRef = useRef<HTMLDivElement>(null);

  // Two-pass rendering for SSR compatibility
  useEffect(() => {
    setIsClient(true);

    // Cleanup function resets state on unmount (navigation)
    return () => {
      setAttemptCount(0);
    };
  }, []);

  // Handle attempt submission
  const handleAttempt = () => {
    setAttemptCount(prev => prev + 1);
  };

  // Parse children to extract problem, hints, and solution sections
  const sections = React.Children.toArray(children);
  // Assuming children structure: Problem → Hints → Solution
  // Authors mark sections with HTML comments: <!-- PROBLEM -->, <!-- HINTS -->, <!-- SOLUTION -->

  return (
    <div
      className={`exercise-block difficulty-${difficulty}`}
      role="region"
      aria-label={`Exercise: ${title}`}
    >
      <header>
        <h4>{title}</h4>
        <span className={`badge badge-${difficulty}`}>{difficulty}</span>
      </header>

      {/* Problem Statement */}
      <section className="exercise-problem">
        {sections[0]}
      </section>

      {/* Progressive Hints */}
      <div
        ref={hintsRef}
        className="exercise-hints"
        aria-live="polite"
        aria-relevant="additions"
      >
        <h5>Hints</h5>
        {React.Children.map(sections[1], (hint, index) => (
          <details
            key={index}
            className="hint"
            hidden={attemptCount <= index}
            aria-expanded={isClient && attemptCount > index ? 'true' : 'false'}
          >
            <summary>Hint {index + 1}</summary>
            <div className="hint-content">{hint}</div>
          </details>
        ))}
        {isClient && attemptCount === 0 && (
          <p className="hint-instruction">
            Submit an attempt to unlock hints progressively.
          </p>
        )}
      </div>

      {/* Submit Attempt Button */}
      {isClient && (
        <button
          onClick={handleAttempt}
          aria-controls="exercise-hints"
          className="btn-attempt"
        >
          Submit Attempt ({attemptCount} attempts so far)
        </button>
      )}

      {/* Solution (Collapsible) */}
      <details className="exercise-solution">
        <summary>View Solution</summary>
        <div className="solution-content">{sections[2]}</div>
      </details>
    </div>
  );
}
```

#### MDX Template Usage Example

```mdx
import ExerciseBlock from '@site/src/components/ExerciseBlock';

<ExerciseBlock title="Calculate Forward Kinematics" difficulty="intermediate">
  {/* PROBLEM */}
  <div>
    <p>Given a 2-DOF robotic arm with joint angles θ1=30° and θ2=45°...</p>
    <p>Calculate the end-effector position.</p>

    ```python
    # Starter code
    def forward_kinematics(theta1, theta2):
        # Your solution here
        pass
    ```
  </div>

  {/* HINTS */}
  <div>
    <p>Recall the Denavit-Hartenberg transformation matrix.</p>
    <p>Start by computing the transformation for the first joint.</p>
    <p>Remember to convert degrees to radians.</p>
  </div>

  {/* SOLUTION */}
  <div>
    ```python
    import numpy as np

    def forward_kinematics(theta1, theta2, l1=1.0, l2=1.0):
        # Convert to radians
        theta1_rad = np.radians(theta1)
        theta2_rad = np.radians(theta2)

        # Calculate position
        x = l1 * np.cos(theta1_rad) + l2 * np.cos(theta1_rad + theta2_rad)
        y = l1 * np.sin(theta1_rad) + l2 * np.sin(theta1_rad + theta2_rad)

        return (x, y)
    ```

    <p>The end-effector position is approximately (1.27, 1.27).</p>
  </div>
</ExerciseBlock>
```

#### ARIA Attributes Reference

```html
<!-- Details element with ARIA enhancement -->
<details
  aria-expanded="false"  <!-- Automatically managed by browser -->
  aria-label="Hint 1: Consider the transformation matrix"
>
  <summary>Hint 1</summary>
  <div>Recall the Denavit-Hartenberg parameters...</div>
</details>

<!-- Submit button with ARIA controls -->
<button
  aria-controls="exercise-hints"  <!-- Links to hints container ID -->
  aria-describedby="attempt-count"  <!-- Links to attempt counter -->
>
  Submit Attempt
</button>

<!-- Hints container with live region -->
<div
  id="exercise-hints"
  aria-live="polite"  <!-- Announces changes to screen readers -->
  aria-relevant="additions"  <!-- Announce when hints are added -->
>
  {/* Hints rendered here */}
</div>
```

### External References

- [Inclusive Components: Collapsible Sections](https://inclusive-components.design/collapsible-sections/)
- [MDN: `<details>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
- [WAI-ARIA: aria-expanded](https://www.webability.io/glossary/aria-expanded)
- [React Accessible Accordion](https://www.npmjs.com/package/react-accessible-accordion)
- [Accessible Accordion Best Practices](https://www.aditus.io/patterns/accordion/)
- [React Accessibility Docs](https://legacy.reactjs.org/docs/accessibility.html)

---

## 5. Content Type Variant Guidance

### Research Questions

- How to structure inline comments in template for conditional sections?
- Examples of other documentation templates with variant guidance?
- How to make variant selection obvious without cluttering template?

### Decisions

**Decision 1: Use HTML comments with clear variant labels**

- **Pattern**: `<!-- [TUTORIAL ONLY] ... -->` or `<!-- [OPTIONAL: Concept/Reference] ... -->`
- **Visibility**: HTML comments visible in raw Markdown, invisible in rendered output
- **Nested Structure**: Use indentation to show which content belongs to which variant

**Decision 2: Create variant decision tree at template top**

- **Location**: Immediately after frontmatter, before first heading
- **Format**: Commented-out table or decision flowchart
- **Guidance**: Helps authors choose correct variant before writing

**Decision 3: Use consistent marker syntax**

- **Required Section**: `<!-- [ALL VARIANTS] Section name -->`
- **Variant-Specific**: `<!-- [TUTORIAL] Section name -->`, `<!-- [CONCEPT] ... -->`, etc.
- **Optional Section**: `<!-- [OPTIONAL: Tutorial, Hands-on Lab] Section name -->`
- **Emphasis Guidance**: `<!-- [TUTORIAL: Emphasize step-by-step] ... -->`

**Decision 4: Provide template examples in quickstart guide**

- **Examples**: One completed chapter per variant type
- **Annotations**: Show how variant guidance was applied
- **Reference**: Authors can copy patterns from examples

### Rationale

**HTML Comments**: Visible to authors during writing but invisible to readers. No special syntax to learn beyond standard HTML comments. Works in all Markdown renderers.

**Decision Tree**: Helps authors make correct variant choice upfront rather than discovering mismatch mid-writing. Reduces rework.

**Consistent Markers**: Predictable syntax makes template scannable. Authors can quickly identify which sections apply to their chosen variant.

**Examples**: Seeing real implementations is more helpful than abstract rules. Examples serve as both templates and validation of correct usage.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Separate template files per variant | 4x maintenance burden; duplicate common sections; harder to keep in sync |
| Markdown frontmatter flag | Doesn't provide inline guidance on section content/emphasis |
| Docusaurus tabs component | Adds visual clutter to source; harder to edit; not intended for authoring guidance |
| No variant guidance | Authors would have inconsistent approaches; defeats purpose of standardization |

### Code Examples

#### Template Header with Variant Decision Tree

```markdown
---
title: [Chapter Title]
description: [Brief 1-2 sentence description]
keywords: [keyword1, keyword2, keyword3]
sidebar_position: [number]
learning_objectives:
  - [Objective 1]
  - [Objective 2]
prerequisites:
  - [path/to/prerequisite/chapter]
estimated_time: [minutes]
content_type: [tutorial | concept | hands-on-lab | reference]
---

<!--
CONTENT TYPE SELECTION GUIDE
============================
Choose ONE variant based on your chapter's primary purpose:

┌─ TUTORIAL ────────────────────────────────────────────────┐
│ Goal: Teach a specific procedure or workflow              │
│ Format: Step-by-step instructions with code examples      │
│ Tone: Second person ("you will..."), imperative           │
│ Example: "Build Your First Robot Controller"              │
│ Emphasis: Learning Objectives, Prerequisites, Exercises   │
└────────────────────────────────────────────────────────────┘

┌─ CONCEPT ─────────────────────────────────────────────────┐
│ Goal: Explain theory, principles, or underlying concepts  │
│ Format: Expository text with diagrams and definitions     │
│ Tone: Third person, declarative                           │
│ Example: "Understanding Inverse Kinematics"               │
│ Emphasis: Key Takeaways, References, Conceptual Diagrams  │
└────────────────────────────────────────────────────────────┘

┌─ HANDS-ON LAB ────────────────────────────────────────────┐
│ Goal: Provide practical application exercise              │
│ Format: Problem statement, guided implementation          │
│ Tone: Second person, action-oriented                      │
│ Example: "Lab: Calibrate Your Robot's Sensors"            │
│ Emphasis: Prerequisites, Exercises, Troubleshooting       │
└────────────────────────────────────────────────────────────┘

┌─ REFERENCE ───────────────────────────────────────────────┐
│ Goal: Quick lookup of APIs, formulas, or specifications   │
│ Format: Tables, lists, code signatures                    │
│ Tone: Neutral, concise                                    │
│ Example: "ROS Message Types Reference"                    │
│ Emphasis: Tables, Code Blocks, Minimal Prose              │
└────────────────────────────────────────────────────────────┘
-->

import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';
import KeyTakeaways from '@site/src/components/KeyTakeaways';
import ExerciseBlock from '@site/src/components/ExerciseBlock';

<!-- [ALL VARIANTS] Display learning objectives and prerequisites -->
<LearningObjectives objectives={frontMatter.learning_objectives} />
<Prerequisites
  prereqs={frontMatter.prerequisites}
  estimatedTime={frontMatter.estimated_time}
/>

# {frontMatter.title}
```

#### Variant-Specific Section Guidance

```markdown
<!-- ============================================================
     SECTION: Introduction
     ALL VARIANTS - Required
     ============================================================ -->

<!-- [TUTORIAL] Write introduction as problem statement + what they'll build -->
<!-- [CONCEPT] Write introduction as motivating question + chapter scope -->
<!-- [HANDS-ON LAB] Write introduction as scenario + learning outcomes -->
<!-- [REFERENCE] Write introduction as purpose + how to use this reference -->

[Your introduction here - 2-3 paragraphs]


<!-- ============================================================
     SECTION: Core Content
     ALL VARIANTS - Required (structure varies)
     ============================================================ -->

<!-- [TUTORIAL] Break into numbered steps with h2 headings -->
## Step 1: [First Step]
<!-- Explain what, why, and how. Include code with explanations. -->

## Step 2: [Second Step]
<!-- ... -->


<!-- [CONCEPT] Organize with thematic h2 sections -->
## [Concept Area 1]
<!-- Explain theory, provide diagrams, define terms. -->

## [Concept Area 2]
<!-- Build on previous section, deepen understanding. -->


<!-- [HANDS-ON LAB] Structure as Setup → Task → Validation -->
## Setup
<!-- Environment requirements, initial configuration -->

## Task: [Problem to Solve]
<!-- Clear problem statement, acceptance criteria -->

## Validation
<!-- How to verify solution works -->


<!-- [REFERENCE] Use tables and definition lists -->
## [API Category]
<!-- Table of functions/methods with signatures and descriptions -->


<!-- ============================================================
     SECTION: Exercises
     TUTORIAL, HANDS-ON LAB - Required
     CONCEPT - Optional
     REFERENCE - Omit
     ============================================================ -->

<!-- [TUTORIAL/HANDS-ON LAB] Include 2-3 progressive exercises -->
## Exercises

<ExerciseBlock title="[Exercise 1]" difficulty="beginner">
  <!-- Exercise content -->
</ExerciseBlock>


<!-- [CONCEPT] Include 1-2 thought exercises if applicable -->


<!-- ============================================================
     SECTION: Summary / Key Takeaways
     ALL VARIANTS - Required
     ============================================================ -->

<!-- [TUTORIAL] Summarize what was built and next steps -->
<!-- [CONCEPT] Use KeyTakeaways component for main points -->
<!-- [HANDS-ON LAB] Recap skills practiced and extensions -->
<!-- [REFERENCE] Omit (reference material doesn't need summary) -->

## Summary

<KeyTakeaways>
  - [Key point 1]
  - [Key point 2]
  - [Key point 3]
</KeyTakeaways>


<!-- ============================================================
     SECTION: References
     ALL VARIANTS - Required
     ============================================================ -->

## References

<!-- List all citations, further reading, external docs -->
1. [Author]. *[Title]*. [Source]. [URL]
2. ...
```

#### Example: Tutorial Variant Annotation

```markdown
<!-- VARIANT: TUTORIAL - "Build a Simple PID Controller" -->

<!-- [TUTORIAL ONLY] Problem-focused introduction -->
# Build a Simple PID Controller

Have you ever wondered how robots maintain stable movement despite disturbances?
In this tutorial, you'll build a PID (Proportional-Integral-Derivative) controller
from scratch and see how it stabilizes a simulated robot's motion.

<!-- [TUTORIAL] Step-by-step core content -->
## Step 1: Understand the PID Formula

A PID controller combines three terms...

```python
def pid_controller(setpoint, measured_value, Kp, Ki, Kd):
    """
    Calculate PID control output.

    Args:
        setpoint: Desired value
        measured_value: Current sensor reading
        Kp: Proportional gain
        Ki: Integral gain
        Kd: Derivative gain

    Returns:
        Control signal
    """
    # Your implementation here
    pass
```

<!-- [TUTORIAL] Emphasize hands-on exercises -->
## Exercises

<ExerciseBlock title="Tune Your PID Controller" difficulty="intermediate">
  <div>
    Experiment with different Kp, Ki, and Kd values...
  </div>
  <div>
    <p>Hint 1: Start with Kp only (set Ki=0, Kd=0)</p>
    <p>Hint 2: Add Ki to eliminate steady-state error</p>
  </div>
  <div>
    Optimal values depend on your system dynamics...
  </div>
</ExerciseBlock>
```

### External References

- [Docusaurus Admonitions](https://docusaurus.io/docs/markdown-features/admonitions)
- [Markdown Comment Syntax](https://stackoverflow.com/questions/4823468/comments-in-markdown)
- [Technical Writing Style Guides](https://developers.google.com/tech-writing)

---

## 6. Metadata Validation Implementation

### Research Questions

- AJV library usage for JSON Schema validation in Node.js?
- How to read all `.md`/`.mdx` files in `docs/` recursively?
- How to parse YAML frontmatter from Markdown files?
- Error message formatting for user-friendly output?

### Decisions

**Decision 1: Use AJV v8 with TypeScript support**

- **Library**: `ajv` (npm package)
- **Version**: v8.x (latest stable with full JSON Schema draft-2020-12 support)
- **Options**: `allErrors: true` to collect all validation errors, not just first
- **Compilation**: Compile schema once, reuse validator function for all files

**Decision 2: Use `glob` package for recursive file discovery**

- **Library**: `glob` (npm package)
- **Pattern**: `docs/**/*.{md,mdx}` (all Markdown files in docs/ recursively)
- **Sync vs Async**: Use synchronous `glob.sync()` for simplicity in build script
- **Exclusions**: Ignore `node_modules`, `.docusaurus` via glob ignore patterns

**Decision 3: Use `gray-matter` for frontmatter parsing**

- **Library**: `gray-matter` (npm package)
- **Usage**: `matter(fileContent)` returns `{ data, content }` object
- **Format Support**: Handles YAML (default), JSON, TOML frontmatter
- **Reliability**: Battle-tested library used by Docusaurus, Gatsby, VitePress

**Decision 4: Format errors with file paths, field names, and human-readable messages**

- **Error Structure**: `${filePath}: ${fieldPath} - ${errorMessage}`
- **Grouping**: Group errors by file for readability
- **Color Coding**: Use ANSI color codes (optional) for terminal output
- **Exit Code**: `process.exit(1)` on any validation failure

### Rationale

**AJV Choice**: Industry-standard JSON Schema validator. Fast, supports TypeScript, excellent error messages. Compiling schemas improves performance for repeated validation.

**glob Package**: Simple, widely-used, and reliable for file system traversal. Synchronous API is appropriate for build scripts (no need for async complexity).

**gray-matter**: De facto standard for frontmatter parsing in Node.js ecosystem. Used by Docusaurus itself, ensuring compatibility. Handles edge cases like multi-line strings, special characters.

**Error Formatting**: Clear, actionable error messages reduce debugging time. File paths allow quick navigation in IDE. Field paths indicate exactly what's wrong.

### Alternatives Considered

| Alternative | Why Rejected |
|------------|--------------|
| Joi for validation | AJV is faster, JSON Schema is standard format, easier to share schema with tools |
| Manual file traversal with `fs.readdirSync` | Reinvents wheel; glob handles edge cases (symlinks, permissions) |
| Custom YAML parser | Unnecessary complexity; gray-matter is battle-tested and handles edge cases |
| JSON output for errors | Harder for humans to read; build scripts should be developer-friendly |

### Code Examples

#### Complete Validation Script

```javascript
// scripts/validate-metadata.js
const Ajv = require('ajv');
const matter = require('gray-matter');
const fs = require('fs');
const glob = require('glob');

// Load JSON Schema
const schemaPath = './contracts/chapter-metadata-schema.json';
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Configure AJV
const ajv = new Ajv({
  allErrors: true,  // Collect all errors, not just first
  verbose: true,    // Include schema and data in errors
});

// Compile schema once for performance
const validate = ajv.compile(schema);

// Find all Markdown files in docs/ directory
const files = glob.sync('docs/**/*.{md,mdx}', {
  ignore: ['**/node_modules/**', '**/.docusaurus/**']
});

console.log(`\nValidating ${files.length} files against chapter metadata schema...\n`);

let hasErrors = false;
const errors = {};

// Validate each file
files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(content);

    const valid = validate(frontmatter);

    if (!valid) {
      hasErrors = true;
      errors[filePath] = validate.errors.map(error => ({
        field: error.instancePath || 'root',
        message: error.message,
        schema: error.schemaPath,
      }));
    }
  } catch (err) {
    hasErrors = true;
    errors[filePath] = [{ field: 'FILE', message: `Parse error: ${err.message}` }];
  }
});

// Report results
if (hasErrors) {
  console.error('❌ Metadata Validation Failed\n');
  console.error('The following files have invalid frontmatter:\n');

  Object.entries(errors).forEach(([filePath, fileErrors]) => {
    console.error(`\n📄 ${filePath}`);
    fileErrors.forEach(({ field, message }) => {
      console.error(`   ${field}: ${message}`);
    });
  });

  console.error('\n');
  console.error('Fix the errors above and run the build again.');
  console.error('Refer to contracts/chapter-metadata-schema.json for schema details.\n');

  process.exit(1);
} else {
  console.log('✅ All files validated successfully!\n');
  process.exit(0);
}
```

#### JSON Schema Example

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Chapter Metadata Schema",
  "type": "object",
  "required": [
    "title",
    "description",
    "keywords",
    "sidebar_position",
    "learning_objectives",
    "prerequisites",
    "estimated_time",
    "content_type"
  ],
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Chapter title (max 100 characters)"
    },
    "description": {
      "type": "string",
      "minLength": 10,
      "maxLength": 160,
      "description": "Brief description for SEO (10-160 characters)"
    },
    "keywords": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 3,
      "maxItems": 10,
      "description": "SEO keywords (3-10 items)"
    },
    "sidebar_position": {
      "type": "number",
      "minimum": 1,
      "description": "Position in sidebar navigation"
    },
    "learning_objectives": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 10
      },
      "minItems": 2,
      "maxItems": 5,
      "description": "Learning objectives using Bloom's taxonomy verbs (2-5 items)"
    },
    "prerequisites": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^docs/.+$"
      },
      "description": "Paths to prerequisite chapters (relative to docs/)"
    },
    "estimated_time": {
      "type": "number",
      "minimum": 5,
      "maximum": 180,
      "description": "Estimated reading time in minutes (5-180)"
    },
    "content_type": {
      "type": "string",
      "enum": ["tutorial", "concept", "hands-on-lab", "reference"],
      "description": "Content type variant"
    },
    "difficulty": {
      "type": "string",
      "enum": ["beginner", "intermediate", "advanced"],
      "description": "Optional difficulty level"
    }
  },
  "additionalProperties": true
}
```

#### TypeScript Integration (Optional)

```typescript
// scripts/validate-metadata.ts
import Ajv, { JSONSchemaType } from 'ajv';
import matter from 'gray-matter';
import * as fs from 'fs';
import glob from 'glob';

interface ChapterMetadata {
  title: string;
  description: string;
  keywords: string[];
  sidebar_position: number;
  learning_objectives: string[];
  prerequisites: string[];
  estimated_time: number;
  content_type: 'tutorial' | 'concept' | 'hands-on-lab' | 'reference';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const schema: JSONSchemaType<ChapterMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 100 },
    description: { type: 'string', minLength: 10, maxLength: 160 },
    keywords: {
      type: 'array',
      items: { type: 'string' },
      minItems: 3,
      maxItems: 10
    },
    sidebar_position: { type: 'number', minimum: 1 },
    learning_objectives: {
      type: 'array',
      items: { type: 'string', minLength: 10 },
      minItems: 2,
      maxItems: 5
    },
    prerequisites: {
      type: 'array',
      items: { type: 'string' }
    },
    estimated_time: { type: 'number', minimum: 5, maximum: 180 },
    content_type: {
      type: 'string',
      enum: ['tutorial', 'concept', 'hands-on-lab', 'reference']
    },
    difficulty: {
      type: 'string',
      enum: ['beginner', 'intermediate', 'advanced'],
      nullable: true
    }
  },
  required: [
    'title',
    'description',
    'keywords',
    'sidebar_position',
    'learning_objectives',
    'prerequisites',
    'estimated_time',
    'content_type'
  ],
  additionalProperties: true
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

// Validation logic (same as JavaScript version)
// ...
```

#### Gray-Matter Usage Examples

```javascript
const matter = require('gray-matter');

// Basic usage
const file = matter(`
---
title: Example Chapter
description: This is an example
keywords: [robotics, AI]
---

# Content here
`);

console.log(file.data.title);  // "Example Chapter"
console.log(file.content);     // "# Content here\n"

// Handle errors
try {
  const file = matter.read('docs/chapter.md');
} catch (err) {
  console.error('Failed to parse frontmatter:', err.message);
}

// Custom delimiters (if needed)
const customFile = matter(content, {
  delimiters: ['+++', '+++']  // For TOML frontmatter
});
```

### External References

- [AJV JSON Schema Validator](https://ajv.js.org/)
- [AJV GitHub Repository](https://github.com/ajv-validator/ajv)
- [gray-matter npm Package](https://www.npmjs.com/package/gray-matter)
- [gray-matter GitHub Repository](https://github.com/jonschlinkert/gray-matter)
- [glob npm Package](https://www.npmjs.com/package/glob)
- [JSON Schema Specification](https://json-schema.org/)

---

## Summary of Research Findings

### Key Decisions Matrix

| Research Area | Primary Decision | Rationale |
|--------------|------------------|-----------|
| **MDX Components** | Functional components with SSR compatibility via two-pass rendering | Docusaurus static site generation requires server-renderable components |
| **Theme Config** | Use Docusaurus built-in prev/next navigation and CSS variables | No customization needed; default is accessible and maintainable |
| **Build Pipeline** | npm `prebuild` hook with AJV validation script | Standard lifecycle hook ensures validation runs on every build |
| **Exercise Block** | Custom component with `<details>` elements and ARIA attributes | Native HTML provides accessibility, attempt tracking via React state |
| **Content Variants** | Single template with HTML comment guidance | Easier maintenance than 4 files; visible to authors, invisible to readers |
| **Metadata Validation** | AJV + gray-matter + glob for schema-based validation | Industry-standard tools, fast performance, clear error messages |

### Implementation Readiness

All research questions have been answered with concrete decisions, code examples, and rationale. The following Phase 1 deliverables are ready to be created:

1. **data-model.md** - Component prop structures defined
2. **contracts/** - TypeScript interfaces documented in research
3. **quickstart.md** - Template usage patterns established
4. **Component implementations** - Code examples provide starting point

### Risk Mitigation Validated

| Risk from Plan | Research Validation |
|---------------|---------------------|
| ExerciseBlock SSR compatibility | Two-pass rendering pattern proven in React docs |
| Metadata validation false positives | AJV `allErrors` option collects comprehensive feedback |
| Component theme compatibility | CSS variables ensure automatic light/dark mode support |
| Author confusion with variants | Decision tree + examples + HTML comments provide clear guidance |

### Next Steps

1. Proceed to **Phase 1.1**: Create `data-model.md` with entity definitions
2. Proceed to **Phase 1.2**: Generate TypeScript contract files in `contracts/`
3. Proceed to **Phase 1.3**: Write `quickstart.md` author guide
4. Proceed to **Phase 1.4**: Update agent context with research findings

**Research Phase Status**: ✅ **COMPLETE** - All 6 research questions answered with actionable decisions.
