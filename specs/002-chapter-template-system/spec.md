# Feature Specification: Chapter Template System

**Feature Branch**: `002-chapter-template-system`
**Created**: 2025-11-30
**Status**: Draft
**Input**: User description: "Create a chapter template system for the Physical AI textbook that standardizes content structure across all 50+ chapters with MDX components, code block standards, callout guidelines, and automatic navigation"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create New Chapter from Template (Priority: P1)

As a content author, I need to create a new chapter using a standardized template so that all chapters have consistent structure and I don't have to remember the required sections.

**Why this priority**: Foundation for all content authoring. Without a template, authors will create inconsistent chapters, making the textbook harder to navigate and maintain.

**Independent Test**: Can be fully tested by copying the template file, filling in chapter-specific content, and verifying all required sections are present with proper frontmatter metadata.

**Acceptance Scenarios**:

1. **Given** a content author starts a new chapter, **When** they copy the chapter template to the appropriate module directory, **Then** the template includes all required frontmatter fields (title, description, keywords, sidebar_position, estimated_time, week, learning_objectives) and standard section headings (Introduction, Core Content, Hands-On Exercise, Key Takeaways, Summary, References)

2. **Given** a content author uses the chapter template, **When** they fill in the placeholder content, **Then** the chapter automatically inherits the correct structure including Learning Objectives box, Prerequisites callout, and navigation links

3. **Given** a chapter is created from the template, **When** the author builds the documentation site, **Then** the chapter appears in the correct sidebar position with proper metadata displayed

---

### User Story 2 - Display Learning Components (Priority: P1)

As a reader, I need to see learning objectives, prerequisites, and estimated time prominently displayed at the start of each chapter so I can determine if I'm ready to learn this content.

**Why this priority**: Critical for self-paced learning. Readers need to know what they'll learn and what prior knowledge is required before investing time in a chapter.

**Independent Test**: Can be fully tested by opening any chapter and verifying that Learning Objectives, Prerequisites, and Estimated Time are visible above the main content (not just in frontmatter metadata).

**Acceptance Scenarios**:

1. **Given** a reader opens a chapter, **When** the page loads, **Then** a Learning Objectives box appears near the top showing all objectives from frontmatter as a bulleted list with an icon

2. **Given** a reader views a chapter, **When** prerequisites exist in frontmatter, **Then** a Prerequisites callout displays linked chapter names and estimated completion time

3. **Given** a chapter has estimated_time in frontmatter, **When** the page renders, **Then** a time badge displays "⏱️ Estimated Time: X hours" in the chapter header or prerequisites section

---

### User Story 3 - Add Code Examples with Standards (Priority: P2)

As a content author, I need to include code examples that automatically have syntax highlighting, line numbers, copy buttons, and line highlighting so readers can easily understand and reproduce the code.

**Why this priority**: Code examples are central to a technical textbook. Proper formatting makes them readable and usable. This is P2 because authors can manually add some features, but standardization ensures consistency.

**Independent Test**: Can be fully tested by adding a code block to a chapter using the documented syntax and verifying that syntax highlighting, line numbers, copy button, and line highlighting render correctly.

**Acceptance Scenarios**:

1. **Given** a content author adds a code block with language specified (e.g., ```python), **When** the page renders, **Then** the code has syntax highlighting for that language and a copy-to-clipboard button appears in the top-right corner

2. **Given** a content author adds `showLineNumbers` to a code block, **When** the page renders, **Then** line numbers appear on the left side of the code block

3. **Given** a content author adds line highlighting syntax `{1,4-6}` to a code block, **When** the page renders, **Then** the specified lines are highlighted with a background color to draw attention

4. **Given** a content author adds `title="filename.py"` to a code block, **When** the page renders, **Then** the filename appears as a header above the code block

---

### User Story 4 - Use Callouts for Important Information (Priority: P2)

As a content author, I need to use callouts (admonitions) to highlight notes, tips, warnings, and dangerous information so readers can quickly identify important context.

**Why this priority**: Callouts improve readability and help readers avoid common pitfalls. This is P2 because content can be written without them, but they significantly enhance comprehension.

**Independent Test**: Can be fully tested by adding each callout type (note, tip, warning, danger, info) to a chapter and verifying correct styling and icons render.

**Acceptance Scenarios**:

1. **Given** a content author adds `:::note` with content, **When** the page renders, **Then** a blue-styled callout with an info icon displays the content

2. **Given** a content author adds `:::tip[Custom Title]` with content, **When** the page renders, **Then** a green-styled callout with a lightbulb icon and "Custom Title" header displays the content

3. **Given** a content author adds `:::warning` or `:::danger` with content, **When** the page renders, **Then** orange or red-styled callouts with appropriate icons display to indicate severity

4. **Given** a content author nests callouts (e.g., tip inside note), **When** the page renders, **Then** the nested structure displays correctly with proper indentation

---

### User Story 5 - Navigate Between Chapters (Priority: P3)

As a reader, I need automatic previous/next navigation links at the bottom of each chapter so I can easily progress through the course sequentially.

**Why this priority**: Improves user experience but not critical for MVP. Readers can use sidebar navigation as a fallback. This is P3 because it's a polish feature.

**Independent Test**: Can be fully tested by navigating to any chapter and verifying that "Previous" and "Next" links appear at the bottom, correctly linking to adjacent chapters in the sidebar order.

**Acceptance Scenarios**:

1. **Given** a reader finishes a chapter (not the first chapter), **When** they scroll to the bottom, **Then** a "← Previous: [Chapter Title]" link appears on the left

2. **Given** a reader finishes a chapter (not the last chapter), **When** they scroll to the bottom, **Then** a "Next: [Chapter Title] →" link appears on the right

3. **Given** a reader is on the first chapter of a module, **When** they scroll to the bottom, **Then** no "Previous" link appears, only "Next"

---

### User Story 6 - Summarize Key Takeaways (Priority: P2)

As a reader, I need a Key Takeaways summary at the end of each chapter so I can review the most important concepts before moving on.

**Why this priority**: Reinforces learning and aids retention. This is P2 because it's important for pedagogical effectiveness but not blocking content creation.

**Independent Test**: Can be fully tested by adding a Key Takeaways component to a chapter and verifying it renders as a visually distinct callout with summary points.

**Acceptance Scenarios**:

1. **Given** a content author adds a `<KeyTakeaways>` component with bulleted content, **When** the page renders, **Then** a styled box with a checkmark icon displays the takeaways near the end of the chapter

2. **Given** a chapter has a Key Takeaways section, **When** a reader views it, **Then** the section stands out visually from regular content (e.g., background color, border, icon)

---

### Edge Cases

- What happens when a chapter has no prerequisites? (Prerequisites callout should not display)
- What happens when estimated_time is 0 or missing? (Display validation warning or default message)
- What happens when learning_objectives array is empty? (Display validation error - this is required)
- How does the system handle chapters with extremely long code blocks (>100 lines)? (Line numbers and copy button should still work; consider pagination or collapse)
- What happens when an author forgets to close a callout with `:::`? (Build should fail with clear error message)
- What happens when a chapter is the only one in a module? (No prev/next links, or link to module index)
- How does the system handle code blocks with special characters that might break syntax highlighting? (Escape characters properly; provide troubleshooting guidance)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Chapter template MUST include a Markdown file (`.md` or `.mdx`) located in `.specify/templates/chapter-template.md` with all required frontmatter fields (title, description, keywords, sidebar_position, estimated_time, week, learning_objectives) and standard section headings

- **FR-002**: Chapter template MUST be a single file with inline comments that define guidance for four content type variants: Tutorial (step-by-step, goal-oriented), Concept (explanatory, theory-focused), Hands-on Lab (applied exercise), and Reference (lookup, quick reference). Comments explain which sections are required/optional/emphasized for each type.

- **FR-003**: Learning Objectives component MUST display frontmatter `learning_objectives` array as a visible callout box (not just metadata) with a distinctive icon and heading "Learning Objectives"

- **FR-004**: Prerequisites component MUST display frontmatter `prerequisites` array as linked chapter names with automatic URL generation from paths (e.g., "module-1-ros2/week-3-architecture" becomes clickable link)

- **FR-005**: Estimated Time badge MUST display frontmatter `estimated_time` value (in hours) in a visible location, formatted as "⏱️ Estimated Time: X hours" or similar

- **FR-006**: Code block standards MUST include:
  - Automatic syntax highlighting for all specified languages (python, bash, yaml, javascript, typescript, cpp, etc.)
  - Copy-to-clipboard button for all code blocks (built-in Docusaurus feature)
  - `showLineNumbers` option to display line numbers
  - Line highlighting syntax `{1,4-6,11}` to highlight specific lines or ranges
  - `title="filename.ext"` option to display filename above code block
  - Comment-based highlighting with `// highlight-next-line`, `// highlight-start`, `// highlight-end`

- **FR-007**: Callout (admonition) guidelines MUST define five types:
  - `:::note` for definitions and background information (blue styling)
  - `:::tip[Optional Title]` for best practices and helpful hints (green styling)
  - `:::warning` for common mistakes and pitfalls (orange styling)
  - `:::danger` for security issues and breaking changes (red styling)
  - `:::info` for additional context and FYI information (light blue styling)

- **FR-008**: Callouts MUST support custom titles using `:::type[Custom Title]` syntax

- **FR-009**: Callouts MUST support nesting (e.g., `:::tip` inside `:::note`) with proper indentation and styling

- **FR-010**: Key Takeaways component MUST display a visually distinct summary box (e.g., background color, border, icon) containing bulleted key points at the end of each chapter

- **FR-011**: Navigation MUST include automatic previous/next chapter links at the bottom of each page, generated from sidebar configuration

- **FR-012**: Navigation links MUST display adjacent chapter titles (not just "Previous"/"Next") to provide context

- **FR-013**: Chapter structure MUST follow this standard order:
  1. Frontmatter (YAML)
  2. MDX component imports (if needed)
  3. Chapter title (H1)
  4. Learning Objectives component
  5. Prerequisites component
  6. Introduction section
  7. Core content sections (varying by content type)
  8. Hands-On Exercise section (optional but recommended)
  9. Key Takeaways component
  10. Troubleshooting section (optional)
  11. Summary section
  12. References section
  13. Automatic prev/next navigation (injected by theme)

- **FR-014**: Exercise block component MUST support:
  - Problem statement with title and difficulty level
  - Starter code or instructions
  - Progressive hints (collapsible sections) that unlock sequentially after users attempt to submit code/answer (requires attempt tracking)
  - Solution with collapsible reveal toggle

- **FR-015**: Template MUST include inline comments explaining how to use each component and when to apply each content type variant

- **FR-016**: All chapters created from template MUST validate against chapter metadata JSON Schema (`contracts/chapter-metadata-schema.json`) during the build process (`npm run build`). Build MUST fail with clear error messages if any chapter has invalid metadata.

- **FR-017**: Content style guide MUST define:
  - When to use each content type (Tutorial vs. Concept vs. Hands-on Lab vs. Reference)
  - How to write learning objectives using Bloom's taxonomy action verbs (Explain, Create, Implement, Analyze, Evaluate, Design, Debug, Configure, Demonstrate, Compare, Apply)
  - Code comment style and variable naming conventions
  - Voice and tone guidelines (active voice, second person "you", present tense)

### Key Entities

- **Chapter Template**: Markdown file defining structure, frontmatter fields, section headings, and component usage examples. Serves as the blueprint for all new chapters.

- **Learning Objectives Component**: MDX React component that reads `learning_objectives` from frontmatter and renders them as a styled callout box with list items.

- **Prerequisites Component**: MDX React component that reads `prerequisites` array from frontmatter, generates links to prerequisite chapters, and displays with estimated time.

- **Key Takeaways Component**: MDX React component that wraps summary content in a visually distinct box with checkmark icon and styling.

- **Exercise Block Component**: MDX React component with props for title, difficulty, problem statement, starter code, hints (array), and solution. Supports collapsible sections.

- **Content Type Variant**: Classification for chapters (Tutorial, Concept, Hands-on Lab, Reference) with associated structural guidance and examples.

- **Code Block Enhancement**: Configuration and documentation for Docusaurus code block features including syntax highlighting, line numbers, line highlighting, titles, and copy buttons.

- **Callout (Admonition)**: Docusaurus built-in feature with five types (note, tip, warning, danger, info), each with distinct styling, icons, and use case guidance.

- **Navigation Configuration**: Docusaurus theme configuration enabling automatic prev/next links at chapter bottom based on sidebar structure.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Content authors can create a new chapter from template to first draft in under 30 minutes (excluding content writing time), including all required frontmatter and standard sections

- **SC-002**: 100% of chapters created from template pass metadata validation against JSON Schema during build without errors (validation runs automatically in `npm run build`)

- **SC-003**: All code examples across the textbook have consistent formatting (syntax highlighting, copy buttons) without requiring manual styling from authors

- **SC-004**: Readers can identify learning objectives, prerequisites, and estimated time within 5 seconds of opening any chapter (visible above-the-fold, not in frontmatter)

- **SC-005**: Key information (warnings, tips, notes) is highlighted in 90% of chapters using callouts, improving scanability compared to plain text

- **SC-006**: Readers can navigate sequentially through the course using prev/next links in 100% of chapters (except first/last)

- **SC-007**: All chapters follow the same structural order, making the textbook predictable and easier to navigate

- **SC-008**: Content authors report (via survey) that the template system reduces chapter creation time by at least 40% compared to creating chapters from scratch

- **SC-009**: Zero build failures related to malformed callouts, code blocks, components, or invalid metadata after authors use the template and follow guidelines (includes automatic metadata validation in build)

- **SC-010**: Readers can distinguish between content types (Tutorial vs. Concept vs. Hands-on Lab) based on visual structure and headings

## Assumptions *(mandatory)*

- Docusaurus 3.x is already installed and configured as the documentation framework
- MDX (Markdown + JSX) is enabled in Docusaurus configuration, allowing React components in Markdown files
- Chapter metadata JSON Schema exists at `specs/001-book-master-plan/contracts/chapter-metadata-schema.json`
- Content authors have basic Markdown knowledge and can follow template examples
- Readers access the textbook via a web browser (not PDF or print in MVP)
- Sidebar configuration (`sidebars.js`) is maintained separately and updated when new chapters are added
- Template will be stored in `.specify/templates/` directory for easy access
- Content authors will manually copy the template to create new chapters (no automated scaffolding script in MVP)
- Navigation links will use Docusaurus built-in theme components (no custom implementation required)
- Code syntax highlighting languages are already supported by Docusaurus (Prism.js) without additional configuration
- Content style guide will be a separate Markdown document (not embedded in template)
- Exercise block solutions are text/code only (no automated validation or testing in MVP)
- Exercise block "attempt tracking" for hint reveals is client-side state management only (e.g., user clicks "Submit" button, which unlocks next hint) without server-side persistence or correctness validation

## Out of Scope *(mandatory)*

- Automated chapter generation or AI-assisted content writing
- Interactive code execution (live REPL/sandbox for running Python/ROS 2 code)
- Automated grading or validation of exercise solutions
- Quiz components with multiple-choice questions (deferred to `003-learning-components`)
- Video embed components (deferred to `003-learning-components`)
- Interactive diagrams or Mermaid integration (deferred to `003-learning-components`)
- Progress tracking or completion status per chapter (deferred to future feature)
- Print stylesheet or PDF export optimization (deferred to `004-visual-design-system`)
- Custom typography or color palette (deferred to `004-visual-design-system`)
- Multi-language support or internationalization (i18n)
- Versioning for different course editions (Docusaurus supports this but not in scope for MVP)
- Search configuration or Algolia integration (separate feature)
- Mobile-responsive design beyond Docusaurus defaults (deferred to `004-visual-design-system`)
- Accessibility enhancements beyond Docusaurus built-in support (ARIA labels, screen reader optimization)

## Dependencies *(mandatory)*

- **Docusaurus 3.x**: Chapter template relies on Docusaurus MDX support, theme components, and configuration
- **Existing Frontmatter Schema**: Template must align with `chapter-metadata-schema.json` (9 required fields)
- **Sidebar Configuration**: Navigation links depend on chapters being correctly registered in `sidebars.js`
- **MDX Components**: Learning Objectives, Prerequisites, Key Takeaways, and Exercise Block components must be created in `src/components/` before template can reference them
- **Book Layout Audit**: Template design is based on findings and recommendations in `specs/001-book-master-plan/book-layout-audit.md`

## Constraints *(mandatory)*

- Template must be technology-agnostic in presentation (no framework-specific jargon in content)
- All components must work with static site generation (no client-side-only features that break SSR)
- File size of template must be under 5KB to ensure fast copying and editing
- Template must not require content authors to write React/TypeScript code (components are imported, not implemented)
- Navigation links must work with nested sidebar categories (multi-level hierarchy)
- Code blocks must not exceed Docusaurus default limits (no known hard limit, but >1000 lines may cause performance issues)
- Callouts must render correctly in both light and dark modes
- All components must be accessible (keyboard navigable, screen reader compatible)
- Template structure must be maintainable by a single person (no complex build scripts or tooling)

## Risks *(optional)*

- **Risk**: Content authors may not follow the template consistently, leading to structural drift over time
  - **Mitigation**: Provide clear inline comments in template; create validation script to check chapter structure; conduct author training/onboarding

- **Risk**: MDX component imports may break if components are moved or renamed
  - **Mitigation**: Use aliased imports (e.g., `@site/src/components/`) to decouple from exact paths; document import syntax clearly

- **Risk**: Overuse of callouts may reduce their effectiveness (alert fatigue)
  - **Mitigation**: Provide usage guidelines specifying when each callout type is appropriate; review chapters for overuse during editing

- **Risk**: Navigation links may break if sidebar configuration is restructured
  - **Mitigation**: Use Docusaurus automatic navigation generation (theme feature); test navigation after sidebar changes

- **Risk**: Code blocks with very long lines may cause horizontal scrolling, hurting readability
  - **Mitigation**: Provide code formatting guidelines (max 80-100 characters per line); configure Docusaurus to wrap long lines

## Related Features *(optional)*

- **001-book-master-plan**: This feature implements the #1 priority recommendation from the book layout audit
- **003-learning-components** (future): Will add interactive elements (quizzes, code playgrounds) that complement the template structure
- **004-visual-design-system** (future): Will refine visual styling of template components (typography, colors, spacing)

## Clarifications *(optional)*

### Session 2025-11-30

- Q: How should Exercise Block progressive hints be revealed to learners? → A: Attempt-based reveal - hints unlock after users try submitting code/answer (requires tracking)
- Q: Should content type variants (Tutorial, Concept, Hands-on Lab, Reference) have separate template files or be part of one template? → A: Single template with conditional comments explaining which sections apply to which content type
- Q: When should chapter metadata validation against JSON Schema occur in the authoring workflow? → A: On build - validation runs during `npm run build` as a pre-deployment check
