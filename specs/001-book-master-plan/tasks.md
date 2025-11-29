# Tasks: Book Master Plan - Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/001-book-master-plan/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: This feature does not require traditional tests. Validation is done through build checks, link validation, and Lighthouse CI.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a **Docusaurus documentation site** with:
- `docs/` - main content directory
- `src/` - custom React components and pages
- `static/` - static assets (images, files)
- Configuration files at repository root: `docusaurus.config.js`, `sidebars.js`, `package.json`, `tsconfig.json`
- `.github/workflows/` - CI/CD pipelines

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Docusaurus framework setup

- [x] T001 Initialize Docusaurus 3.x project with TypeScript template at repository root
- [x] T002 [P] Configure package.json with dependencies (Docusaurus 3.x, React 18.x, TypeScript 5.x, Algolia DocSearch 3.x, Flexsearch)
- [x] T003 [P] Configure tsconfig.json for TypeScript 5.x with strict mode and React JSX support
- [x] T004 [P] Create .gitignore for Docusaurus (node_modules/, .docusaurus/, build/, .DS_Store)
- [x] T005 Create project directory structure (docs/, src/, src/components/, src/pages/, src/css/, static/, static/img/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create docusaurus.config.js with site metadata (title, tagline, URL, baseUrl, organizationName, projectName)
- [x] T007 Configure Algolia DocSearch in docusaurus.config.js (appId, apiKey, indexName with custom metadata facets for week, module, capstone_component)
- [x] T008 [P] Configure theme settings in docusaurus.config.js (colorMode, navbar with logo and items, footer with links)
- [x] T009 [P] Configure build settings in docusaurus.config.js (onBrokenLinks: 'throw', onBrokenMarkdownLinks: 'throw', SEO metadata, sitemap generation)
- [x] T010 Create sidebars.js with base structure for tutorialSidebar array
- [x] T011 [P] Create src/css/custom.css with CSS variables for theme colors and custom styles
- [x] T012 Create docs directory with subdirectories (setup/, module-1-ros2/, module-2-digital-twin/, module-3-isaac/, module-4-vla-humanoids/, capstone/, assessments/, references/, instructors/)
- [x] T013 Create static/img directory with subdirectories (intro/, module-1-ros2/, module-2-digital-twin/, module-3-isaac/, module-4-vla-humanoids/)
- [x] T014 [P] Setup metadata validation script using ajv library with chapter-metadata-schema.json in package.json scripts
- [x] T015 [P] Create .github/workflows/build-validation.yml for build checks and broken link validation using linkinator
- [x] T016 [P] Create .github/workflows/performance-check.yml for Lighthouse CI with thresholds (performance ≥ 90, accessibility ≥ 95, SEO ≥ 95)
- [x] T017 [P] Create .github/workflows/deploy.yml for GitHub Pages deployment (main branch only)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigate Complete Course Structure (Priority: P1) 🎯 MVP

**Goal**: Enable students to navigate the complete 13-week course structure with dashboard homepage, nested sidebar, module cards, and quick links

**Independent Test**: Open homepage and verify 4 module cards are displayed with week ranges, navigate to any module via sidebar within 2 clicks, verify all 13 weeks are accessible

### Implementation for User Story 1

- [x] T018 [P] [US1] Create src/components/ModuleCard.tsx React component with TypeScript (accepts module props: id, title, weekRange, description, learningOutcomes)
- [x] T019 [P] [US1] Create src/components/QuickLinks.tsx React component with TypeScript (displays links to setup, assessments, glossary)
- [x] T020 [P] [US1] Create src/components/RecentUpdates.tsx React component with TypeScript (displays recent content changes with date, title, description)
- [x] T021 [US1] Create src/pages/index.tsx custom homepage with dashboard layout (CSS Grid with 4 module cards, quick links sidebar, recent updates section)
- [x] T022 [US1] Create src/data/modules.json with metadata for 4 modules (id, title, weekRange, description, learningOutcomes array)
- [x] T023 [US1] Update sidebars.js with intro item and nested collapsible categories for all 4 modules (type: 'category', label, collapsible: true, collapsed: false, items array)
- [x] T024 [P] [US1] Create docs/intro.md with course introduction and frontmatter metadata (title, description, keywords, sidebar_position: 1)
- [x] T025 [P] [US1] Create docs/module-1-ros2/index.md with module overview (frontmatter: title, description, keywords, sidebar_position, estimated_time: 10, week: 3, module: 1, prerequisites: ["intro"], learning_objectives array)
- [x] T026 [P] [US1] Create docs/module-2-digital-twin/index.md with module overview (frontmatter with estimated_time: 6, week: 6, module: 2, prerequisites: ["module-1-ros2/index"])
- [x] T027 [P] [US1] Create docs/module-3-isaac/index.md with module overview (frontmatter with estimated_time: 9, week: 8, module: 3, prerequisites: ["module-2-digital-twin/index"])
- [x] T028 [P] [US1] Create docs/module-4-vla-humanoids/index.md with module overview (frontmatter with estimated_time: 9, week: 11, module: 4, prerequisites: ["module-3-isaac/index"])
- [x] T029 [US1] Update sidebars.js to add all module index pages to their respective category items arrays
- [x] T030 [US1] Add cross-references in module index pages for week-based and topic-based navigation (markdown links between related chapters)

**Checkpoint**: At this point, User Story 1 should be fully functional - homepage dashboard displays, sidebar navigation works, all 4 modules are accessible within 2 clicks

---

## Phase 4: User Story 2 - Access Foundational Setup Documentation (Priority: P1)

**Goal**: Provide hardware setup guides for 3 configurations and searchable glossary with dedicated search component

**Independent Test**: Navigate to setup section and verify all 3 hardware options are documented, use glossary search component to look up a robotics term and verify instant results

### Implementation for User Story 2

- [x] T031 [P] [US2] Create docs/setup/workstation.md with Digital Twin Workstation setup guide (frontmatter: title, description, keywords, sidebar_position: 1, estimated_time: 2, week: 1, module: 0, prerequisites: [], learning_objectives, hardware requirements, software installation steps, cost estimates)
- [x] T032 [P] [US2] Create docs/setup/edge-kit.md with Physical AI Edge Kit (Jetson Orin Nano) setup guide (frontmatter with estimated_time: 3, week: 1, module: 0, hardware specs, installation, limitations)
- [x] T033 [P] [US2] Create docs/setup/cloud.md with Cloud-Native Setup guide (AWS/Azure) (frontmatter with estimated_time: 2, week: 1, module: 0, cloud provider options, deployment steps, cost comparison)
- [x] T034 [US2] Update sidebars.js to add Setup Guides category with nested items (workstation, edge-kit, cloud) after intro
- [ ] T035 [US2] Create docs/references/glossary.md with initial 100+ robotics terms (each term as H2 with definition, links to relevant chapters, alphabetically organized)
- [ ] T036 [US2] Create src/components/GlossarySearch.tsx React component with TypeScript using Flexsearch library (tokenize: 'forward', resolution: 9, search-as-you-type UX)
- [x] T037 [US2] Create glossary index build script in package.json (npm run generate-glossary-index) that parses glossary.md and generates Flexsearch index
- [ ] T038 [US2] Integrate GlossarySearch component into homepage quick links and glossary page
- [x] T039 [US2] Update Algolia DocSearch configuration in docusaurus.config.js to index custom metadata (attributesToRetrieve: ['hierarchy', 'content', 'url', 'week', 'module', 'capstone_component'])

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - setup guides are complete, glossary search provides instant term lookup

---

## Phase 5: User Story 3 - Follow Module-Based Learning Path (Priority: P2)

**Goal**: Enable students to see how modules build toward capstone project with clear learning outcomes and integration points

**Independent Test**: Navigate through each module overview and verify learning outcomes are stated, capstone integration points are documented, time estimates help plan study schedule

### Implementation for User Story 3

- [ ] T040 [US3] Update docs/module-1-ros2/index.md to add capstone integration section explaining how ROS 2 serves as communication layer for autonomous humanoid
- [ ] T041 [US3] Update docs/module-2-digital-twin/index.md to add capstone integration section explaining simulation testing for humanoid navigation
- [ ] T042 [US3] Update docs/module-3-isaac/index.md to add capstone integration section explaining Isaac perception and manipulation for capstone
- [ ] T043 [US3] Update docs/module-4-vla-humanoids/index.md to add capstone integration section explaining VLA integration for voice → action pipeline
- [ ] T044 [US3] Create docs/capstone/autonomous-humanoid.md with 5-step architecture guide (voice → plan → navigate → perceive → manipulate) and chapter mappings
- [ ] T045 [US3] Update sidebars.js to add Capstone Project Guide category after Module 4
- [ ] T046 [US3] Add module summary sections to each module index page with time commitment estimates (aggregate estimated_time from chapters)
- [ ] T047 [US3] Create visual learning pathway diagram (Mermaid.js or static SVG) showing module progression and capstone dependencies in docs/capstone/autonomous-humanoid.md

**Checkpoint**: All module overviews show clear learning outcomes and capstone integration, students can plan study schedule based on time estimates

---

## Phase 6: User Story 4 - Access Assessment and Project Guidelines (Priority: P2)

**Goal**: Provide assessment criteria, project rubrics, and capstone requirements with detailed evaluation guidelines

**Independent Test**: Locate all 4 assessment types and verify each has a detailed rubric with at least 3 evaluation levels (needs improvement, proficient, excellent)

### Implementation for User Story 4

- [ ] T048 [P] [US4] Create docs/assessments/ros2-package.md with ROS 2 package project requirements and 3-level rubric (frontmatter: title, description, keywords, sidebar_position: 1, estimated_time: 10, week: 5, module: 1, assessment_type: "project")
- [ ] T049 [P] [US4] Create docs/assessments/gazebo-simulation.md with Gazebo simulation project requirements and 3-level rubric (frontmatter with estimated_time: 8, week: 7, module: 2, assessment_type: "project")
- [ ] T050 [P] [US4] Create docs/assessments/isaac-perception.md with Isaac perception pipeline project requirements and 3-level rubric (frontmatter with estimated_time: 10, week: 10, module: 3, assessment_type: "project")
- [ ] T051 [P] [US4] Create docs/assessments/capstone.md with autonomous humanoid capstone requirements and 3-level rubric (frontmatter with estimated_time: 30, week: 13, module: 4, assessment_type: "capstone", capstone_component: "all")
- [ ] T052 [US4] Update sidebars.js to add Assessments category with all 4 assessment guides after Capstone section
- [ ] T053 [US4] Add self-assessment checklists to each assessment guide with measurable criteria
- [ ] T054 [US4] Link assessment guides from relevant module index pages (e.g., link ROS 2 package assessment from module-1-ros2/index.md)

**Checkpoint**: All 4 assessments have detailed rubrics with 3 evaluation levels, students can self-assess progress against measurable criteria

---

## Phase 7: User Story 5 - Reference Quick Guides and Troubleshooting (Priority: P3)

**Goal**: Provide quick-reference guides for ROS 2 commands, Isaac Sim operations, notation, and troubleshooting scenarios

**Independent Test**: Access quick reference section, search for a common error in troubleshooting guide, verify ROS 2 command cheat sheet has examples

### Implementation for User Story 5

- [ ] T055 [P] [US5] Create docs/references/ros2-quick-ref.md with ROS 2 command cheat sheet (topics, services, nodes, launch, common commands with examples, frontmatter: sidebar_position: 2)
- [ ] T056 [P] [US5] Create docs/references/notation.md with mathematical notation guide (vectors, matrices, coordinate frames, symbols used throughout book, frontmatter: sidebar_position: 3)
- [ ] T057 [P] [US5] Create docs/references/troubleshooting.md with common errors and solutions (organized by module: ROS 2, Gazebo, Isaac Sim, frontmatter: sidebar_position: 4)
- [ ] T058 [US5] Update sidebars.js to add References category with all reference materials (glossary, ros2-quick-ref, notation, troubleshooting)
- [ ] T059 [US5] Add external resources section to docs/references/troubleshooting.md (links to official ROS 2 docs, Isaac Sim docs, community forums)
- [ ] T060 [US5] Create docs/instructors/guide.md with instructor customization guidelines (chapter reordering, lab exercises, semester vs. quarter adaptation, frontmatter: sidebar_position: 1)
- [ ] T061 [US5] Update sidebars.js to add Instructors Guide category after References

**Checkpoint**: All reference materials are accessible, troubleshooting guide covers common scenarios, instructors have customization guidance

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality gates

- [ ] T062 [P] Add favicon and logo images to static/img/ directory
- [ ] T063 [P] Create README.md at repository root with project overview and quickstart links
- [ ] T064 [P] Update docusaurus.config.js with SEO metadata (Open Graph tags, Twitter cards, meta descriptions)
- [ ] T065 [P] Configure navbar in docusaurus.config.js with logo, documentation link, GitHub link, search bar
- [ ] T066 [P] Configure footer in docusaurus.config.js with links to documentation, GitHub, community, constitution
- [ ] T067 Create placeholder chapter files for all 13 weeks (week-3-architecture.md through week-13-conversational-vla.md) with frontmatter metadata templates
- [ ] T068 Add placeholder chapter items to sidebars.js under respective module categories
- [ ] T069 [P] Optimize all images in static/img/ using sharp or imagemin (ensure < 500KB per image)
- [ ] T070 [P] Run metadata validation script (npm run validate-metadata) to verify all chapter frontmatter complies with chapter-metadata-schema.json
- [ ] T071 Run Docusaurus build (npm run build) and verify 0 errors, 0 warnings
- [ ] T072 Run broken link checker (npm run check-links) and verify 0 broken internal links
- [ ] T073 Run Lighthouse CI (npm run lighthouse) and verify scores (Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95)
- [ ] T074 Test incremental publishing by building only Week 1-2 content (intro + setup + glossary) and verify functional mini-textbook
- [ ] T075 Create CONTRIBUTING.md with contribution guidelines (code of conduct, PR process, commit conventions, review process)
- [ ] T076 Verify quickstart.md instructions by following setup guide end-to-end (clone, npm install, npm start, verify localhost:3000 works)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 1 (P1) can start after Foundational → MVP target
  - User Story 2 (P1) can start after Foundational → Can run in parallel with US1
  - User Story 3 (P2) can start after US1/US2 (needs module structure)
  - User Story 4 (P2) can start after US1 (needs sidebar structure)
  - User Story 5 (P3) can start after US1 (needs sidebar structure)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - MVP PRIORITY
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Can run in parallel with US1 - MVP PRIORITY
- **User Story 3 (P2)**: Depends on US1 (needs module structure) - Can run after US1 completes
- **User Story 4 (P2)**: Depends on US1 (needs sidebar structure) - Can run in parallel with US3
- **User Story 5 (P3)**: Depends on US1 (needs sidebar structure) - Can run in parallel with US3/US4

### Within Each User Story

- Dashboard components (ModuleCard, QuickLinks, RecentUpdates) can be built in parallel
- Module index pages can be created in parallel
- Setup guides can be created in parallel
- Assessment guides can be created in parallel
- Reference materials can be created in parallel

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003, T004)
- All Foundational tasks marked [P] can run in parallel (T008, T009, T014, T015, T016, T017)
- User Story 1 and User Story 2 can run in parallel (both P1 priority, independent)
- Within User Story 1: T018, T019, T020 (components) and T024, T025, T026, T027, T028 (module pages) can run in parallel
- Within User Story 2: T031, T032, T033 (setup guides) can run in parallel
- Within User Story 4: T048, T049, T050, T051 (assessment guides) can run in parallel
- Within User Story 5: T055, T056, T057 (reference materials) can run in parallel
- All Polish tasks marked [P] can run in parallel (T062, T063, T064, T065, T066, T069, T070)

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create src/components/ModuleCard.tsx React component"
Task: "Create src/components/QuickLinks.tsx React component"
Task: "Create src/components/RecentUpdates.tsx React component"

# Launch all module index pages for User Story 1 together:
Task: "Create docs/module-1-ros2/index.md with module overview"
Task: "Create docs/module-2-digital-twin/index.md with module overview"
Task: "Create docs/module-3-isaac/index.md with module overview"
Task: "Create docs/module-4-vla-humanoids/index.md with module overview"
```

---

## Parallel Example: User Story 2

```bash
# Launch all setup guides for User Story 2 together:
Task: "Create docs/setup/workstation.md with Digital Twin Workstation setup guide"
Task: "Create docs/setup/edge-kit.md with Physical AI Edge Kit setup guide"
Task: "Create docs/setup/cloud.md with Cloud-Native Setup guide"
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Navigate Complete Course Structure)
4. Complete Phase 4: User Story 2 (Access Foundational Setup Documentation)
5. **STOP and VALIDATE**: Test US1 and US2 independently (homepage dashboard works, setup guides accessible, glossary searchable)
6. Deploy/demo if ready

**Rationale**: Both US1 and US2 are P1 priority and provide the foundational navigation and setup content needed for students to start the course.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 + User Story 2 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 → Test independently → Deploy/Demo (Module learning paths)
4. Add User Story 4 → Test independently → Deploy/Demo (Assessments)
5. Add User Story 5 → Test independently → Deploy/Demo (Quick references)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Navigation)
   - Developer B: User Story 2 (Setup & Glossary)
   - Developer C: User Story 4 (Assessments) - can start after US1 sidebar is ready
3. Stories complete and integrate independently

---

## Success Criteria Mapping

Each success criterion from spec.md is satisfied by specific tasks:

- **SC-001** (2-click navigation): T021 (dashboard homepage), T023 (sidebar with nested categories)
- **SC-002** (95% links work): T015 (broken link checker), T072 (run link validation)
- **SC-003** (Module learning outcomes): T025-T028 (module index pages with learning_objectives)
- **SC-004** (3 hardware setups): T031-T033 (setup guides)
- **SC-005** (Capstone mapping): T044 (capstone guide with chapter mappings)
- **SC-006** (Time estimates): T046 (aggregate time estimates in module summaries)
- **SC-007** (100+ glossary terms): T035 (glossary.md), T036-T038 (glossary search component)
- **SC-008** (3-level rubrics): T048-T051 (assessment guides with rubrics)
- **SC-009** (Independent Week 1-2): T074 (test incremental publishing)
- **SC-010** (Prerequisite graph): T030 (cross-references), metadata schema includes prerequisites array

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Build validation (T071), link checking (T072), and Lighthouse CI (T073) serve as "tests" for this documentation project
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All chapter frontmatter must validate against contracts/chapter-metadata-schema.json
- Follow Constitution Principle III for consistent chapter structure template
