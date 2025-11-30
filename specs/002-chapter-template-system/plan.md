# Implementation Plan: Chapter Template System

**Branch**: `002-chapter-template-system` | **Date**: 2025-11-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-chapter-template-system/spec.md`

**Note**: This plan documents completed Phase 0 (Research) and Phase 1 (Design & Contracts), and outlines Phase 2 (Implementation) tasks.

## Summary

Build a standardized chapter template system for the Physical AI & Humanoid Robotics Textbook that ensures consistent structure, integrates custom MDX components for learning objectives and exercises, and validates metadata at build time. The system includes a single flexible template with variant guidance for four content types (tutorial, concept, hands-on-lab, reference), four custom React components (LearningObjectives, Prerequisites, KeyTakeaways, ExerciseBlock), and JSON Schema validation enforced via npm prebuild hook.

**Technical Approach**: Leverage Docusaurus 3.x MDX support to create SSR-compatible React components that consume frontmatter metadata. Use AJV library for build-time JSON Schema validation. Implement progressive hint unlocking in ExerciseBlock component using React useState with accessibility via native `<details>` elements and ARIA attributes.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x (Docusaurus 3.x dependency)
**Primary Dependencies**: Docusaurus 3.x, MDX 3.x, React 18.x, Prism.js (syntax highlighting), AJV (JSON Schema validation)
**Storage**: File-based (Markdown/MDX files in `docs/` directory, static assets in `static/`)
**Testing**: Manual validation during authoring, JSON Schema validation at build time, component testing via Docusaurus dev server
**Target Platform**: Static site (GitHub Pages), browser compatibility for React components
**Project Type**: Web (Docusaurus documentation site)
**Performance Goals**: <1s metadata validation for 50+ chapters, <100ms component render time, SSR-compatible (no client-only blocking)
**Constraints**: Must work with Docusaurus static site generation, components must be SSR-safe, validation must fail build on errors
**Scale/Scope**: 50+ chapters using template, 4 content type variants, 4 custom MDX components, 9 required frontmatter fields, 1 validation script

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Check (Pre-Research)

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. Content Accuracy** | Citations for algorithms, version specs | ✅ PASS | Component TypeScript types enforce metadata structure |
| **II. Educational Clarity** | Learning objectives, prerequisites declared | ✅ PASS | Template enforces learning_objectives and prerequisites fields |
| **III. Consistency** | Chapter structure template required | ✅ PASS | Primary goal of feature - standardizes all chapters |
| **IV. Docusaurus Structure** | Metadata required in frontmatter | ✅ PASS | JSON Schema validates all 9 required fields |
| **V. Code Example Quality** | Repository structure for examples | ⚠️ DEVIATION | Code examples inline in chapters, not `/examples/[chapter]/` - see justification below |
| **VI. Deployment** | Build gates enforced | ✅ PASS | Validation runs as prebuild hook, fails build on errors |

### Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **Principle V**: Code examples inline vs. `/examples/[chapter]/` | Educational chapters integrate code directly in narrative flow (tutorial/concept types). Separating to `/examples/` breaks reading continuity and prevents inline explanation of each line. | External examples suitable for standalone projects, not pedagogical walkthroughs where code is part of learning sequence. Template will guide authors on when to use inline vs. external (reference chapters can link external repos). |

**Justification**: Principle V states "Repository structure: `/examples/[chapter-name]/[example-name]/`". For this textbook's pedagogical approach, code examples appear inline within chapter MDX for step-by-step tutorials and concepts. Reference chapters can link external repositories. This deviation was present in the original spec (approved) and aligns with educational best practices for technical writing.

### Post-Design Re-Check

| Principle | Phase 1 Validation | Status | Notes |
|-----------|-------------------|--------|-------|
| **I. Content Accuracy** | TypeScript contracts define accurate types | ✅ PASS | `chapter-metadata.ts` and `component-props.ts` provide type safety |
| **II. Educational Clarity** | Bloom's Taxonomy verbs enforced | ✅ PASS | JSON Schema pattern matches learning objectives to Bloom's verbs |
| **III. Consistency** | Single template with variant guidance | ✅ PASS | `chapter-template.md` provides decision tree and inline comments |
| **IV. Docusaurus Structure** | Metadata fields align with requirement | ✅ PASS | All required fields (title, description, keywords, etc.) in schema |
| **V. Code Example Quality** | Deviation justified and documented | ✅ PASS | Inline examples for pedagogical continuity, external for standalone projects |
| **VI. Deployment** | Build validation script designed | ✅ PASS | `validate-metadata.js` runs via prebuild hook, exits 1 on failure |

**Constitution Compliance**: **PASS with 1 documented deviation** (Principle V - code examples inline in chapters for pedagogical reasons).

## Project Structure

### Documentation (this feature)

```text
specs/002-chapter-template-system/
├── spec.md                # Feature specification
├── plan.md                # This file (implementation plan)
├── research.md            # Phase 0 research findings (6 research questions answered)
├── data-model.md          # Phase 1 data model (entities, relationships, validation)
├── quickstart.md          # Phase 1 author guide (usage examples, troubleshooting)
├── contracts/             # Phase 1 TypeScript interfaces and JSON Schema
│   ├── chapter-metadata.ts              # ChapterMetadata interface, type guards
│   ├── component-props.ts               # Component prop interfaces, helpers
│   └── chapter-metadata-schema.json     # JSON Schema for build validation
└── tasks.md               # Phase 2 tasks (NOT YET CREATED - requires /sp.tasks command)
```

### Source Code (repository root)

```text
.specify/templates/
└── chapter-template.md                  # Single template with variant guidance (PHASE 2)

src/components/
├── LearningObjectives.tsx               # Renders frontmatter learning_objectives (PHASE 2)
├── Prerequisites.tsx                    # Renders prerequisites + time estimate (PHASE 2)
├── KeyTakeaways.tsx                     # Wraps summary content in styled box (PHASE 2)
└── ExerciseBlock.tsx                    # Interactive exercise with progressive hints (PHASE 2)

src/theme/
└── MDXComponents.js                     # Global component registration (PHASE 2)

src/css/
└── custom.css                           # Component styles (append to existing) (PHASE 2)

scripts/
└── validate-metadata.js                 # Metadata validation script (PHASE 2)

docs/references/
└── content-style-guide.md               # FR-017 content style guide (PHASE 2)

contracts/                                # TypeScript contracts (for tooling/docs)
└── [symlink to specs/002-chapter-template-system/contracts/]

package.json                             # Updated with prebuild script (PHASE 2)
```

**Structure Decision**: Docusaurus web application structure. Template in `.specify/templates/` for author use. Components in `src/components/` following Docusaurus conventions. Validation script in `scripts/` runs via npm prebuild hook. Contracts directory symlinked to specs for tooling access.

---

## Phase 0: Research & Discovery

**Status**: ✅ COMPLETED (2025-11-30)

### Research Questions

Six research areas identified from Technical Context unknowns:

1. **Docusaurus MDX Component Best Practices** - How to create SSR-compatible components, access frontmatter, handle optional props
2. **Docusaurus Theme Configuration** - How to enable prev/next navigation, customize display
3. **Build Pipeline Integration** - How to run custom validation, fail build with errors
4. **Exercise Block Component Design** - How to implement collapsible sections, track attempts, ensure accessibility
5. **Content Type Variant Guidance** - How to structure inline comments for conditional sections
6. **Metadata Validation Implementation** - How to use AJV, parse frontmatter, format errors

### Key Decisions

| Research Area | Decision | Rationale |
|---------------|----------|-----------|
| **MDX Components** | Functional components with two-pass rendering for state | Docusaurus SSR requires server-renderable components; two-pass pattern enables client state |
| **Theme Config** | Use built-in prev/next navigation, CSS variables for theming | Default is accessible and maintained; CSS variables auto-adapt to light/dark mode |
| **Build Pipeline** | npm `prebuild` hook running AJV validation script | Standard lifecycle hook, fails build automatically, <100ms for 50 files |
| **Exercise Block** | React component with native `<details>` + ARIA attributes | Native HTML provides accessibility, React state tracks attempts |
| **Content Variants** | HTML comments with variant labels in single template | Visible to authors, invisible in output, easier than 4 separate files |
| **Validation** | AJV v8 + gray-matter + glob for schema validation | Industry standard, fast, TypeScript support, clear error messages |

### Deliverable

📄 **`research.md`** (435 lines) - Comprehensive research findings with decisions, rationale, alternatives, code examples, and external references.

---

## Phase 1: Design & Contracts

**Status**: ✅ COMPLETED (2025-11-30)

### Objectives

1. Define data entities and validation rules
2. Create TypeScript interfaces for type safety
3. Generate JSON Schema for build-time validation
4. Document API contracts for components
5. Provide quickstart guide for authors

### Deliverables

#### 1. Data Model (`data-model.md` - 680 lines)

**Entities Defined**:
- `ChapterMetadata` - 9 required frontmatter fields with validation rules
- `LearningObjectivesProps` - Array of objective strings
- `PrerequisitesProps` - Prereq paths + estimated time
- `KeyTakeawaysProps` - React children wrapper
- `ExerciseBlockProps` - Title, difficulty, structured children (Problem/Hints/Solution)

**Relationships**:
- Component → Metadata mappings documented
- Data validation pipeline defined (YAML → JSON → AJV → components)
- File → Component flow illustrated

#### 2. TypeScript Contracts (`contracts/` - 3 files, 690 lines total)

**`chapter-metadata.ts`** (230 lines):
- `interface ChapterMetadata` - Complete frontmatter structure
- `type ContentType` - 4 variants (tutorial, concept, hands-on-lab, reference)
- `type DifficultyLevel` - 3 levels (beginner, intermediate, advanced)
- `function isChapterMetadata()` - Runtime type guard
- `const BloomsTaxonomyVerbs` - Verb constants for objectives
- `function formatLearningObjective()` - Helper for creating objectives

**`component-props.ts`** (280 lines):
- `interface LearningObjectivesProps`
- `interface PrerequisitesProps`
- `interface KeyTakeawaysProps`
- `interface ExerciseBlockProps`
- `type ExerciseDifficulty`
- `interface ExerciseBlockState` - Internal state structure
- `interface ExerciseBlockA11yProps` - Accessibility properties
- `const DIFFICULTY_BADGES` - Badge configurations
- Type guards: `isLearningObjectivesProps()`, `isPrerequisitesProps()`, `isExerciseBlockProps()`

**`chapter-metadata-schema.json`** (180 lines):
- JSON Schema draft-07 compliant
- All 9 required fields with constraints:
  - `title`: 1-100 chars
  - `description`: 10-160 chars (SEO)
  - `keywords`: 3-10 unique items
  - `sidebar_position`: ≥1
  - `learning_objectives`: 2-5 items, ≥10 chars each, must match Bloom's verb pattern
  - `prerequisites`: array of paths matching `^docs/.+$`
  - `estimated_time`: 5-180 minutes
  - `content_type`: enum (tutorial|concept|hands-on-lab|reference)
  - `difficulty`: enum (beginner|intermediate|advanced)
- Optional Docusaurus fields: `pagination_prev`, `pagination_next`, `tags`, `draft`
- 2 complete example configurations

#### 3. Quickstart Guide (`quickstart.md` - 580 lines)

**Sections**:
- 🚀 Quick Start (5-minute workflow)
- 📋 Detailed Walkthrough (content types, learning objectives, prerequisites, components)
- 📚 Examples (4 complete chapter frontmatter examples)
- 🔧 Troubleshooting (common validation errors, component issues)
- ✅ Checklist (pre-publishing validation steps)

**Content Type Guidance**:
- **Tutorial**: Step-by-step guides with code examples
- **Concept**: Explanatory/theoretical content
- **Hands-on Lab**: Practical exercises with validation
- **Reference**: Quick lookup tables/APIs

**Bloom's Taxonomy Table**: Maps verb levels (Remember → Create) to example objectives

### Type Safety Strategy

| Validation Type | Tool | When | Purpose |
|----------------|------|------|---------|
| **Build-time schema** | AJV + JSON Schema | `npm run build` (prebuild) | Catch metadata errors before deployment |
| **Compile-time types** | TypeScript | Development + build | Catch prop type mismatches |
| **Runtime checks** | Conditional rendering | Page load | Graceful degradation for optional fields |

---

## Phase 2: Implementation (NOT YET STARTED)

**Status**: ⏳ PENDING - Requires `/sp.tasks` command to generate task breakdown

### Implementation Overview

Phase 2 involves creating the actual template file, React components, validation script, CSS styles, and content guide based on the designs from Phase 1.

### Artifacts to Create

1. **Chapter Template** (`.specify/templates/chapter-template.md`)
   - Frontmatter with all 9 required fields (with placeholder values)
   - Component import statements
   - Variant decision tree at top (HTML comments)
   - Inline guidance comments for each section
   - Conditional section markers (e.g., `<!-- [TUTORIAL] ... -->`)
   - Example content for each section

2. **React Components** (`src/components/*.tsx`)
   - `LearningObjectives.tsx` - SSR-safe, renders objectives as styled list
   - `Prerequisites.tsx` - Renders prerequisite links + time badge
   - `KeyTakeaways.tsx` - Wrapper component for summary content
   - `ExerciseBlock.tsx` - Interactive component with useState for attempts, `<details>` for hints, ARIA attributes

3. **Global Component Registration** (`src/theme/MDXComponents.js`)
   - Create theme override file
   - Import all 4 custom components
   - Export merged component map

4. **Validation Script** (`scripts/validate-metadata.js`)
   - Import AJV, gray-matter, glob, fs
   - Load and compile JSON Schema
   - Find all `.md` and `.mdx` files in `docs/`
   - Parse frontmatter from each file
   - Validate against schema
   - Format errors with file paths and field names
   - Exit with code 1 on any failure

5. **Custom CSS** (`src/css/custom.css` - append)
   - `.learning-objectives` - Styled callout with left border
   - `.prerequisites` - Info box with link list and time badge
   - `.key-takeaways` - Summary box with checkmark icon
   - `.exercise-block` - Container with difficulty badges
   - Use CSS variables (`--ifm-color-*`) for theme compatibility
   - Dark mode overrides with `[data-theme='dark']` selector

6. **Content Style Guide** (`docs/references/content-style-guide.md`)
   - Writing guidelines for each content type
   - Bloom's Taxonomy verb usage
   - Code block formatting standards
   - Image and diagram guidelines
   - Accessibility requirements
   - Internal linking conventions

7. **Package.json Update**
   - Add `"prebuild": "node scripts/validate-metadata.js"` to scripts section
   - Ensure dependencies include: `ajv`, `gray-matter`, `glob`

### Acceptance Criteria Mapping

| Success Criterion | Implementation Check |
|------------------|---------------------|
| **SC-001**: Single template file | ✅ `.specify/templates/chapter-template.md` created |
| **SC-002**: 4 custom components | ✅ All 4 `.tsx` files in `src/components/` |
| **SC-003**: Components display metadata | ✅ LearningObjectives + Prerequisites consume frontmatter |
| **SC-004**: Progressive hints | ✅ ExerciseBlock uses useState + attempt tracking |
| **SC-005**: Build-time validation | ✅ `validate-metadata.js` runs via prebuild, exits 1 on fail |
| **SC-006**: Authors guided by template | ✅ Template has decision tree + inline comments |
| **SC-007**: Authors reference quickstart | ✅ `quickstart.md` with examples and troubleshooting |
| **SC-008**: 4 content type variants | ✅ Template markers for tutorial/concept/lab/reference |
| **SC-009**: Metadata validates to schema | ✅ JSON Schema enforces all 9 required fields |
| **SC-010**: Styles consistent with theme | ✅ CSS uses `--ifm-*` variables, dark mode support |

### Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| ExerciseBlock SSR hydration mismatch | Low | High | Use two-pass rendering pattern validated in research |
| Metadata validation false positives | Medium | Medium | Test schema against 5+ example chapters before deployment |
| Component theme incompatibility | Low | Medium | Use only Docusaurus CSS variables, test in light/dark modes |
| Author confusion with template variants | Medium | Low | Provide decision tree, 4 complete examples, troubleshooting guide |

---

## Next Steps

1. **Run `/sp.tasks 002-chapter-template-system`** to generate testable task breakdown (Phase 2)
2. **Implement tasks** in dependency order:
   - Create template file first (blocks component usage testing)
   - Implement stateless components (LearningObjectives, Prerequisites, KeyTakeaways)
   - Implement stateful component (ExerciseBlock)
   - Create validation script
   - Add CSS styles
   - Register components globally
   - Create content style guide
   - Update package.json
3. **Manual Testing**:
   - Create test chapter using template
   - Verify components render correctly
   - Test validation script with valid and invalid metadata
   - Test progressive hints in ExerciseBlock
   - Verify styles in light and dark modes
4. **Documentation**:
   - Update main README with template usage instructions
   - Link to quickstart guide from developer docs

**Current Status**: Ready for Phase 2 task generation via `/sp.tasks` command.

**Branch**: `002-chapter-template-system` (current)
**Spec**: [specs/002-chapter-template-system/spec.md](./spec.md)
**Research**: [specs/002-chapter-template-system/research.md](./research.md)
**Data Model**: [specs/002-chapter-template-system/data-model.md](./data-model.md)
**Quickstart**: [specs/002-chapter-template-system/quickstart.md](./quickstart.md)
**Contracts**: [specs/002-chapter-template-system/contracts/](./contracts/)
