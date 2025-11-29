# Implementation Plan: Book Master Plan - Physical AI & Humanoid Robotics Textbook

**Branch**: `001-book-master-plan` | **Date**: 2025-11-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-book-master-plan/spec.md`

## Summary

Create the foundational Docusaurus-based textbook structure for a 13-week Physical AI & Humanoid Robotics course. The book will organize content into 4 modules with a dashboard-style homepage, nested sidebar navigation, hybrid search (Algolia + glossary component), and rich chapter metadata supporting prerequisite tracking, time estimates, and assessment categorization. Content delivery targets industry practitioners with embedded code examples and incremental publishing support.

**Technical Approach**: Docusaurus 3 static site with custom React components for dashboard homepage, TypeScript-based metadata validation, Algolia DocSearch integration with custom facets, and dedicated glossary search component. Single sidebar configuration with nested collapsible categories organized by modules.

## Technical Context

**Language/Version**: TypeScript 5.x (for custom components), Markdown (for content), Node.js 18+ (for build tooling)

**Primary Dependencies**:
- Docusaurus 3.x (static site generator)
- React 18.x (for custom homepage components)
- Algolia DocSearch 3.x (main content search)
- Flexsearch or Lunr.js (glossary search component)
- Remark/Rehype plugins (markdown processing, code highlighting)

**Storage**: Static files (Markdown, JSON, images) committed to Git repository, deployed to GitHub Pages as static HTML/CSS/JS

**Testing**:
- Docusaurus build validation (ensures no errors/warnings)
- Broken link checker (validates internal/external links)
- Lighthouse CI (performance, accessibility, SEO scores ≥ 90)
- Metadata schema validation (JSON Schema for frontmatter)
- Visual regression testing for homepage dashboard (optional, using Percy or Chromatic)

**Target Platform**: GitHub Pages (static site hosting), responsive web design for desktop/tablet/mobile

**Project Type**: Documentation site (Docusaurus-based static site generator)

**Performance Goals**:
- Initial page load: < 3 seconds (per Constitution Principle VI)
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Search query response: < 300ms (Algolia)
- Glossary search: < 100ms (local index)

**Constraints**:
- GitHub Pages deployment (free tier, no server-side logic)
- Static site only (no database, no user authentication)
- File size limits: images < 500KB, SVG optimized
- Incremental publishing (Week 1-2 can deploy independently)
- Build time: < 5 minutes for full site rebuild

**Scale/Scope**:
- ~15-20 chapters across 13 weeks
- 100+ glossary terms with cross-references
- 4 modules with dedicated landing pages
- 4 assessment guides with rubrics
- 3 hardware setup guides
- Estimated total pages: ~40-50 (chapters + references + assessments)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Content Accuracy & Technical Rigor
- ✅ **Pass**: Book structure enables citations, version specs, and code validation
- 📝 **Requirement**: Chapter template must include References section for citations
- 📝 **Requirement**: Frontmatter metadata must include `dependencies` field for version tracking

### Principle II: Educational Clarity & Accessibility
- ✅ **Pass**: Nested sidebar supports prerequisite chains, metadata tracks learning objectives
- 📝 **Requirement**: Chapter template must follow structure: Learning Objectives → Prerequisites → Content → Summary → Exercises → References
- 📝 **Requirement**: Frontmatter metadata includes `prerequisites` array for dependency tracking

### Principle III: Consistency & Standards (NON-NEGOTIABLE)
- ✅ **Pass**: Chapter metadata schema enforces consistent structure across all content
- 📝 **Requirement**: Metadata validation script must check for required fields (title, description, week, module, estimated_time, learning_objectives, prerequisites)
- 📝 **Requirement**: Glossary at `docs/glossary.md` serves as single source of truth
- 📝 **Requirement**: Notation guide at `docs/notation.md` defines mathematical symbols

### Principle IV: Docusaurus Structure & Quality
- ✅ **Pass**: Sidebar configuration matches specification, metadata schema includes all required fields
- 📝 **Requirement**: Every markdown file must have frontmatter with `title`, `description`, `keywords`, `sidebar_position`, plus custom fields
- 📝 **Requirement**: Images in `/static/img/[chapter-name]/` with descriptive names and mandatory alt text

### Principle V: Code Example Quality
- ⚠️ **DEVIATION** (documented in spec Constitution Compliance Notes):
  - Constitution requires: Repository structure `/examples/[chapter-name]/[example-name]/`
  - Spec chooses: Embedded code snippets only in markdown
  - **Justification**: Simplifies maintenance, ensures code-content synchronization
  - **Mitigation**: Code examples still complete, tested, documented (via surrounding text)
- 📝 **Requirement**: Embedded code blocks must specify language, include dependency comments, follow safety guidelines

### Principle VI: Deployment & Publishing Standards
- ✅ **Pass**: GitHub Pages deployment with build gates (no warnings, broken links, performance checks)
- 📝 **Requirement**: Build pipeline must enforce: Docusaurus build success, broken link check, Lighthouse score ≥ 90, image optimization
- 📝 **Requirement**: `docusaurus.config.js` must include redirects for deprecated URLs, SEO metadata, sitemap generation

### Summary
**Status**: ✅ **PASS** (with one documented deviation for Principle V)

**Action Items**:
- Document code example deviation in Complexity Tracking section
- Ensure chapter template follows required structure per Principles II & III
- Implement metadata validation script for Principle III compliance

## Project Structure

### Documentation (this feature)

```text
specs/001-book-master-plan/
├── plan.md              # This file (/sp.plan command output)
├── spec.md              # Feature specification
├── research.md          # Phase 0: Docusaurus best practices, search strategies
├── data-model.md        # Phase 1: Metadata schema, entities (Module, Chapter, etc.)
├── quickstart.md        # Phase 1: Setup and run instructions for development
├── contracts/           # Phase 1: JSON Schema for metadata validation
│   └── chapter-metadata-schema.json
├── checklists/          # Quality validation checklists
│   └── requirements.md
└── tasks.md             # Phase 2: Implementation tasks (NOT created by /sp.plan)
```

### Source Code (repository root)

This is a **Docusaurus documentation site** structure:

```text
Physical-AI-Humanoid-Robotics-Textbook/
├── docs/                           # Main content directory
│   ├── intro.md                    # Course introduction (Weeks 1-2)
│   ├── setup/                      # Foundational setup guides
│   │   ├── workstation.md          # Digital Twin Workstation setup
│   │   ├── edge-kit.md             # Jetson Orin Nano edge kit setup
│   │   └── cloud.md                # Cloud-native setup (AWS/Azure)
│   ├── module-1-ros2/              # Module 1: ROS 2 (Weeks 3-5)
│   │   ├── index.md                # Module overview
│   │   ├── week-3-architecture.md
│   │   ├── week-4-topics-services.md
│   │   └── week-5-urdf.md
│   ├── module-2-digital-twin/      # Module 2: Gazebo & Unity (Weeks 6-7)
│   │   ├── index.md
│   │   ├── week-6-gazebo.md
│   │   └── week-7-unity-sensors.md
│   ├── module-3-isaac/             # Module 3: NVIDIA Isaac (Weeks 8-10)
│   │   ├── index.md
│   │   ├── week-8-isaac-sim.md
│   │   ├── week-9-isaac-ros-vslam.md
│   │   └── week-10-nav2-rl.md
│   ├── module-4-vla-humanoids/     # Module 4: VLA & Humanoids (Weeks 11-13)
│   │   ├── index.md
│   │   ├── week-11-kinematics.md
│   │   ├── week-12-manipulation.md
│   │   └── week-13-conversational-vla.md
│   ├── capstone/                   # Capstone project guide
│   │   └── autonomous-humanoid.md
│   ├── assessments/                # Project assessment guides
│   │   ├── ros2-package.md
│   │   ├── gazebo-simulation.md
│   │   ├── isaac-perception.md
│   │   └── capstone.md
│   ├── references/                 # Reference materials
│   │   ├── glossary.md             # 100+ robotics terms
│   │   ├── notation.md             # Mathematical symbols
│   │   ├── ros2-quick-ref.md       # ROS 2 command cheat sheet
│   │   └── troubleshooting.md      # Common errors and solutions
│   └── instructors/                # Instructor customization guide
│       └── guide.md
│
├── src/                            # Custom React components
│   ├── components/
│   │   ├── ModuleCard.tsx          # Module card for dashboard
│   │   ├── QuickLinks.tsx          # Sidebar with setup/assessments/glossary
│   │   ├── RecentUpdates.tsx       # Recent content changes
│   │   └── GlossarySearch.tsx      # Dedicated glossary search component
│   ├── pages/
│   │   └── index.tsx               # Custom homepage (dashboard layout)
│   └── css/
│       └── custom.css              # Theme overrides
│
├── static/                         # Static assets
│   ├── img/                        # Images organized by chapter
│   │   ├── intro/
│   │   ├── module-1-ros2/
│   │   ├── module-2-digital-twin/
│   │   ├── module-3-isaac/
│   │   └── module-4-vla-humanoids/
│   └── files/                      # Downloadable resources (PDFs, etc.)
│
├── docusaurus.config.js            # Main Docusaurus configuration
├── sidebars.js                     # Sidebar navigation structure
├── package.json                    # Node dependencies
├── tsconfig.json                   # TypeScript configuration
│
├── .github/
│   └── workflows/
│       ├── deploy.yml              # GitHub Pages deployment
│       ├── build-validation.yml    # Build + broken link check
│       └── performance-check.yml   # Lighthouse CI
│
├── specs/                          # Feature specifications (this directory)
├── history/                        # PHRs and ADRs
└── .specify/                       # Spec-Kit Plus configuration
```

**Structure Decision**: Selected Docusaurus documentation site structure (not a single project with src/tests, not a web app with backend/frontend). This is appropriate for static content delivery with custom homepage components. Content organized by modules in `docs/` directory, custom React components in `src/`, and build configuration at root.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Principle V: No `/examples/` directory | Embedded code snippets simplify maintenance and ensure code-content synchronization | Monorepo with `/examples/[chapter-name]/[example-name]/` rejected due to maintenance burden for 15-20 chapters with multiple examples each. Students can copy-paste embedded snippets; validation ensures they remain functional. |

## Phase 0: Research & Technology Decisions

**Objective**: Resolve technical unknowns and establish best practices for Docusaurus configuration, search integration, and homepage customization.

### Research Tasks

1. **Docusaurus 3 Best Practices for Educational Content**
   - Research: Multi-level sidebar configuration for nested categories
   - Research: Custom homepage vs. docs homepage trade-offs
   - Research: TypeScript integration for type-safe components
   - Research: Metadata extraction for automated TOC generation
   - Research: Incremental publishing strategies (deploy subsets of content)

2. **Search Integration Strategies**
   - Research: Algolia DocSearch configuration for custom metadata facets (week, module, topic)
   - Research: Glossary search component options (Flexsearch vs. Lunr.js vs. custom React component)
   - Research: Search-as-you-type UX patterns for educational content
   - Research: Search analytics integration (track popular queries)

3. **Dashboard Homepage Patterns**
   - Research: Module card grid layouts (responsive design patterns)
   - Research: Quick links sidebar component best practices
   - Research: Recent updates feed implementation (static vs. dynamic)
   - Research: Progress tracking placeholders (future enhancement preparation)

4. **Chapter Metadata Schema Design**
   - Research: JSON Schema validation for Markdown frontmatter
   - Research: Metadata-driven navigation and filtering
   - Research: Prerequisite graph visualization libraries (D3.js, Mermaid)
   - Research: Time estimate aggregation for study planning

5. **Build Pipeline & Deployment**
   - Research: GitHub Actions workflows for Docusaurus deployment
   - Research: Broken link checker tools (linkinator, broken-link-checker)
   - Research: Lighthouse CI integration for performance monitoring
   - Research: Image optimization automation (sharp, svgo)

**Output**: `research.md` documenting all decisions with rationale and alternatives considered.

---

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**Entities**:

1. **Module**
   - `id`: string (e.g., "module-1-ros2")
   - `title`: string (e.g., "Module 1: The Robotic Nervous System (ROS 2)")
   - `weekRange`: string (e.g., "Weeks 3-5")
   - `description`: string (module overview)
   - `learningOutcomes`: array of strings
   - `chapters`: array of Chapter references
   - `capstoneIntegration`: string (how module contributes to capstone)

2. **Chapter** (Markdown frontmatter metadata)
   - `title`: string (full chapter title)
   - `description`: string (brief summary for SEO and TOC)
   - `keywords`: array of strings (SEO keywords)
   - `sidebar_position`: number (ordering within parent category)
   - `sidebar_label`: string (optional override for long titles)
   - `estimated_time`: number (hours of reading/lab work)
   - `week`: number (1-13)
   - `module`: number (1-4)
   - `prerequisites`: array of strings (chapter slugs or "none")
   - `learning_objectives`: array of strings (measurable objectives)
   - `assessment_type`: string | null ("project", "quiz", "capstone", null)
   - `difficulty_level`: string | null ("beginner", "intermediate", "advanced", null)
   - `capstone_component`: string | null ("voice", "plan", "navigate", "perceive", "manipulate", null)

3. **Glossary Entry**
   - `term`: string (canonical term)
   - `definition`: string (concise explanation)
   - `relatedTerms`: array of strings (cross-references)
   - `chapters`: array of strings (where term is used)

4. **Hardware Configuration**
   - `id`: string ("workstation", "edge-kit", "cloud")
   - `name`: string (display name)
   - `requirements`: array of strings (hardware/software specs)
   - `cost`: string (estimated cost range)
   - `setupSteps`: array of strings (installation instructions)
   - `limitations`: array of strings (what doesn't work)

5. **Assessment**
   - `id`: string ("ros2-package", "gazebo-simulation", "isaac-perception", "capstone")
   - `title`: string
   - `modules`: array of numbers (which modules assessed)
   - `rubric`: array of RubricLevel objects
     - `level`: string ("needs improvement", "proficient", "excellent")
     - `criteria`: array of strings
     - `points`: number

**Relationships**:
- Module → has many Chapters
- Chapter → references Modules (via module number)
- Chapter → references other Chapters (via prerequisites)
- Chapter → references Glossary Entries (via inline links)
- Assessment → assesses Modules (via modules array)

**State Transitions**: None (static content, no workflow states)

### Contracts (contracts/)

**File**: `chapter-metadata-schema.json` (JSON Schema for validating chapter frontmatter)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Chapter Metadata Schema",
  "description": "Validation schema for chapter frontmatter in Markdown files",
  "type": "object",
  "required": [
    "title",
    "description",
    "keywords",
    "sidebar_position",
    "estimated_time",
    "week",
    "module",
    "prerequisites",
    "learning_objectives"
  ],
  "properties": {
    "title": { "type": "string", "minLength": 5 },
    "description": { "type": "string", "minLength": 20, "maxLength": 160 },
    "keywords": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 3,
      "maxItems": 10
    },
    "sidebar_position": { "type": "integer", "minimum": 1 },
    "sidebar_label": { "type": "string", "maxLength": 40 },
    "estimated_time": { "type": "number", "minimum": 0.5, "maximum": 20 },
    "week": { "type": "integer", "minimum": 1, "maximum": 13 },
    "module": { "type": "integer", "minimum": 1, "maximum": 4 },
    "prerequisites": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 0
    },
    "learning_objectives": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 3,
      "maxItems": 8
    },
    "assessment_type": {
      "type": ["string", "null"],
      "enum": ["project", "quiz", "capstone", null]
    },
    "difficulty_level": {
      "type": ["string", "null"],
      "enum": ["beginner", "intermediate", "advanced", null]
    },
    "capstone_component": {
      "type": ["string", "null"],
      "enum": ["voice", "plan", "navigate", "perceive", "manipulate", null]
    }
  },
  "additionalProperties": false
}
```

**File**: `sidebar-config-structure.ts` (TypeScript type definitions for sidebar)

```typescript
// Type definitions for sidebar configuration
export interface SidebarCategory {
  type: 'category';
  label: string;
  collapsible: boolean;
  collapsed: boolean;
  items: (string | SidebarCategory)[];
}

export interface SidebarConfig {
  tutorialSidebar: (string | SidebarCategory)[];
}

// Example structure
export const exampleSidebarConfig: SidebarConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Setup Guides',
      collapsible: true,
      collapsed: false,
      items: ['setup/workstation', 'setup/edge-kit', 'setup/cloud']
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 (Weeks 3-5)',
      collapsible: true,
      collapsed: false,
      items: [
        'module-1-ros2/index',
        'module-1-ros2/week-3-architecture',
        'module-1-ros2/week-4-topics-services',
        'module-1-ros2/week-5-urdf'
      ]
    }
    // ... more modules
  ]
};
```

### Quickstart Guide (quickstart.md)

**Purpose**: Enable developers to set up, run, and contribute to the textbook.

**Sections**:
1. **Prerequisites**: Node.js 18+, Git, text editor
2. **Installation**:
   ```bash
   git clone <repo-url>
   cd Physical-AI-Humanoid-Robotics-Textbook
   npm install
   ```
3. **Development Server**:
   ```bash
   npm start
   # Opens http://localhost:3000
   ```
4. **Build & Deploy**:
   ```bash
   npm run build          # Creates static site in build/
   npm run serve          # Preview production build locally
   npm run deploy         # Deploy to GitHub Pages (main branch only)
   ```
5. **Creating New Chapter**:
   - Copy chapter template from `.specify/templates/chapter-template.md`
   - Fill frontmatter metadata (use `chapter-metadata-schema.json` for validation)
   - Place in appropriate module directory (`docs/module-X-name/`)
   - Add to `sidebars.js` in correct category
   - Run `npm run validate-metadata` to check compliance
6. **Running Quality Checks**:
   ```bash
   npm run build          # Ensures no build errors/warnings
   npm run check-links    # Validates internal/external links
   npm run lighthouse     # Runs performance/accessibility/SEO checks
   npm run validate-metadata  # Validates chapter frontmatter against schema
   ```
7. **Updating Glossary**:
   - Edit `docs/references/glossary.md`
   - Run `npm run generate-glossary-index` to rebuild search index

**Output**: `quickstart.md` with complete setup and contribution guide.

---

## Phase 2: Task Breakdown

**Note**: This phase is executed by `/sp.tasks` command, NOT by `/sp.plan`. The plan document ends after Phase 1 design artifacts are generated.

Tasks will be organized by user story (P1: Navigation, P1: Setup Docs, P2: Module Path, P2: Assessments, P3: Quick Refs) with implementation dependencies.

---

## Post-Phase 1: Agent Context Update

After Phase 1 artifacts are generated, run:

```bash
.specify/scripts/bash/update-agent-context.sh claude
```

This will add to `CLAUDE.md`:
- Docusaurus 3.x as documentation framework
- TypeScript 5.x for component development
- Algolia DocSearch 3.x for search
- React 18.x for homepage dashboard

---

## Next Steps

1. **Approve this plan** and proceed to Phase 0 research
2. After research: Generate `research.md`, `data-model.md`, `quickstart.md`, `contracts/`
3. Run agent context update
4. Execute `/sp.tasks book-master-plan` to generate implementation tasks
5. Implement tasks: Docusaurus setup → Homepage components → Sidebar config → Search integration → Metadata validation

---

## Success Criteria Mapping

| Success Criteria | Design Element |
|------------------|----------------|
| SC-001: 2-click navigation | Dashboard homepage with module cards + nested sidebar |
| SC-002: 95% links work | Broken link checker in build pipeline |
| SC-003: Module learning outcomes | Module entity with learningOutcomes field |
| SC-004: 3 hardware setups | setup/ directory with workstation.md, edge-kit.md, cloud.md |
| SC-005: Capstone mapping (5 min) | capstone_component metadata field + capstone guide |
| SC-006: Time estimates | estimated_time metadata field + TOC aggregation |
| SC-007: 100+ glossary terms | glossary.md + GlossarySearch component |
| SC-008: 3-level rubrics | Assessment entity with rubric array |
| SC-009: Independent Week 1-2 | Incremental build support, intro.md as standalone |
| SC-010: Prerequisite graph | prerequisites metadata field + visualization option |

---

**Plan Status**: ✅ Ready for Phase 0 Research

**Next Command**: Review research.md after generation, then proceed to `/sp.tasks book-master-plan`
