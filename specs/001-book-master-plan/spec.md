# Feature Specification: Book Master Plan - Physical AI & Humanoid Robotics Textbook

**Feature Branch**: `001-book-master-plan`
**Created**: 2025-11-29
**Status**: Draft
**Input**: User description: "Define the complete textbook structure, chapters, parts, and organization for the Physical AI & Humanoid Robotics 13-week course"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate Complete Course Structure (Priority: P1)

As an **industry practitioner** learning Physical AI, I need to see the complete 13-week course structure organized by modules and weeks, so I can plan my learning journey and understand prerequisite relationships between topics.

**Why this priority**: This is foundational - students cannot effectively use the textbook without understanding its organization and learning progression.

**Independent Test**: Can be fully tested by viewing the table of contents, confirming all 13 weeks are represented, all 4 modules are clearly delineated, and prerequisite chains are visible.

**Acceptance Scenarios**:

1. **Given** I am a new student starting the course, **When** I open the textbook homepage, **Then** I see a dashboard with 4 module cards displaying titles and week ranges (Weeks 1-2, 3-5, 6-7, 8-10, 11-12, 13), plus a quick links sidebar with hardware setup, assessments, and glossary
2. **Given** I want to understand course progression, **When** I view the table of contents, **Then** I can see which chapters belong to which weeks and modules
3. **Given** I am on Week 5, **When** I navigate to Module 1 content, **Then** I can see all chapters for Weeks 3-5 grouped together
4. **Given** I need to review prerequisites, **When** I open any chapter, **Then** I see clearly stated prerequisite weeks/chapters

---

### User Story 2 - Access Foundational Setup Documentation (Priority: P1)

As an **industry practitioner**, I need immediate access to hardware setup guides, environment configuration, and glossary references before starting course content, so I can prepare my development environment and understand terminology.

**Why this priority**: Students cannot begin hands-on work without proper hardware and software setup. This blocks all other learning.

**Independent Test**: Can be fully tested by accessing hardware setup guide, verifying all 3 hardware options are documented (Digital Twin Workstation, Edge Kit, Cloud setup), and confirming glossary is searchable.

**Acceptance Scenarios**:

1. **Given** I am setting up my learning environment, **When** I navigate to the setup section, **Then** I see detailed guides for all 3 hardware options (Workstation, Jetson Kit, Cloud)
2. **Given** I encounter unfamiliar robotics terminology, **When** I use the dedicated glossary search component, **Then** I get instant term lookup with definitions and links to relevant chapters
3. **Given** I need to install ROS 2 and Isaac Sim, **When** I follow the setup guide, **Then** I have step-by-step instructions with version specifications
4. **Given** I have budget constraints, **When** I review hardware options, **Then** I can compare costs and capabilities to make an informed decision

---

### User Story 3 - Follow Module-Based Learning Path (Priority: P2)

As an **industry practitioner**, I need to progress through each module (ROS 2 → Digital Twin → Isaac → VLA) sequentially with clear module objectives and capstone integration points, so I understand how each module builds toward the final autonomous humanoid project.

**Why this priority**: Module structure provides the pedagogical framework. Students need to see how topics connect and build toward the capstone.

**Independent Test**: Can be fully tested by navigating through each module, verifying module learning outcomes are stated, and confirming capstone integration points are documented.

**Acceptance Scenarios**:

1. **Given** I completed Module 1 (ROS 2), **When** I start Module 2 (Digital Twin), **Then** I see how ROS 2 concepts are applied in simulation
2. **Given** I am working on Module 3 (Isaac), **When** I review the module overview, **Then** I see clear learning outcomes and how this contributes to the capstone project
3. **Given** I am planning my study schedule, **When** I view module summaries, **Then** I can estimate time commitment for each module (2-3 weeks per module)
4. **Given** I completed all modules, **When** I reach Module 4 final section, **Then** I have a clear integration guide for the capstone project

---

### User Story 4 - Access Assessment and Project Guidelines (Priority: P2)

As an **industry practitioner**, I need to access assessment criteria, project rubrics, and capstone requirements throughout the course, so I can self-assess my progress and understand evaluation expectations.

**Why this priority**: Clear assessment criteria helps students focus effort and validates learning. This supports self-directed learning for practitioners.

**Independent Test**: Can be fully tested by locating all 4 assessment types (ROS 2 package, Gazebo simulation, Isaac perception, Capstone) and verifying each has a detailed rubric.

**Acceptance Scenarios**:

1. **Given** I completed a module, **When** I navigate to the assessments section, **Then** I see the relevant project requirements and evaluation rubric
2. **Given** I am working on the ROS 2 package project, **When** I review the rubric, **Then** I understand exactly what constitutes passing, good, and excellent work
3. **Given** I am planning the capstone, **When** I access the capstone guide, **Then** I see the 5-step architecture (voice → plan → navigate → perceive → manipulate) clearly documented
4. **Given** I want to check my progress, **When** I review assessment checklists, **Then** I can self-evaluate against measurable criteria

---

### User Story 5 - Reference Quick Guides and Troubleshooting (Priority: P3)

As an **industry practitioner**, I need quick-reference guides for ROS 2 commands, Isaac Sim operations, and common troubleshooting scenarios, so I can resolve issues without searching through full chapters.

**Why this priority**: Efficiency improvement for experienced users. Reduces friction but not critical for initial learning.

**Independent Test**: Can be fully tested by accessing quick reference section, searching for a common error, and verifying troubleshooting steps are provided.

**Acceptance Scenarios**:

1. **Given** I forgot a ROS 2 command, **When** I access the ROS 2 quick reference, **Then** I see a command cheat sheet with examples
2. **Given** I encounter an Isaac Sim error, **When** I search the troubleshooting guide, **Then** I find common errors and solutions
3. **Given** I need to review notation, **When** I access the notation guide, **Then** I see mathematical symbols and conventions used throughout the book
4. **Given** I need external resources, **When** I visit the resources section, **Then** I find links to official documentation, papers, and community forums

---

### Edge Cases

- What happens when a student wants to skip directly to Module 3 (Isaac) without completing Modules 1-2 (ROS 2, Gazebo)? → Prerequisites section clearly warns about required knowledge; student can attempt but may struggle
- How does the structure handle students using alternative hardware (e.g., non-NVIDIA GPUs)? → Hardware setup guide includes a "Limitations and Alternatives" section documenting what works and what doesn't
- What if a student only has access to cloud infrastructure? → Cloud-native setup guide is a first-class option with specific chapters on cloud deployment
- How do instructors customize chapter order for different course formats? → Book structure is modular; instructors section explains how to reorder or skip chapters with prerequisite warnings

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Book MUST organize content into 4 distinct modules aligned with course structure: Module 1 (ROS 2 - Weeks 3-5), Module 2 (Digital Twin - Weeks 6-7), Module 3 (NVIDIA Isaac - Weeks 8-10), Module 4 (VLA & Humanoids - Weeks 11-13)

- **FR-002**: Book MUST include a dedicated "Introduction" section covering Weeks 1-2 (Physical AI Foundations) before Module 1

- **FR-003**: Book MUST provide 3 hardware setup paths: (1) Digital Twin Workstation (RTX + Ubuntu), (2) Physical AI Edge Kit (Jetson Orin Nano), (3) Cloud-Native Setup (AWS/Azure)

- **FR-004**: Each module MUST state clear learning outcomes that map to course learning outcomes

- **FR-005**: Book MUST include a "Capstone Project Guide" section detailing the autonomous humanoid project architecture (voice → plan → navigate → perceive → manipulate)

- **FR-006**: Book MUST provide 4 assessment guides corresponding to course assessments: ROS 2 package development, Gazebo simulation, Isaac perception pipeline, Capstone project

- **FR-007**: Book MUST include reference materials: Glossary (robotics terminology with dedicated search component), Notation Guide (mathematical symbols), ROS 2 Quick Reference, Troubleshooting Guide

- **FR-007a**: Search functionality MUST use a hybrid approach: Algolia DocSearch for main content with custom metadata indexing (week, module, topic), plus a dedicated glossary search component for instant term lookup

- **FR-008**: Navigation structure MUST use a single sidebar with nested collapsible categories organized by modules, with cross-references enabling access by week (1-13), by module (1-4), and by topic (kinematics, perception, etc.)

- **FR-009**: Each chapter MUST declare prerequisites (specific prior weeks/chapters or external knowledge)

- **FR-010**: Book structure MUST support incremental content delivery (Week 1-2 content can be published independently of later weeks)

- **FR-011**: Each chapter MUST include frontmatter metadata: `estimated_time` (hours), `week`, `module`, `prerequisites` (array), `learning_objectives` (array), `sidebar_label`, and optionally `assessment_type`, `difficulty_level`, `capstone_component`. Table of contents MUST display estimated time to help students plan study schedules

- **FR-012**: Book MUST include an "Instructors Guide" section explaining how to customize chapter order, recommend lab exercises, and adapt for different course formats (semester vs. quarter)

- **FR-013**: Homepage MUST use a dashboard-style layout featuring: (1) grid of 4 module cards showing title, week range, and learning outcomes, (2) quick links sidebar for hardware setup, assessments, and glossary, (3) recent updates section for content changes

### Key Entities

- **Module**: Represents a major course section (4 total: ROS 2, Digital Twin, Isaac, VLA). Contains learning outcomes, week ranges, chapters, and integration points with capstone

- **Chapter**: Represents a single topic within a module. Metadata includes: estimated_time (hours), week number, module number, prerequisites (array of prior chapters/weeks), learning_objectives (array), sidebar_label, and optional assessment_type, difficulty_level, capstone_component. Contains content sections, code examples, exercises, and references. Maps to 1-2 weeks of course content

- **Part**: High-level grouping of content. Parts include: Introduction, Foundational Setup, Modules 1-4, Capstone Guide, Assessments, References

- **Hardware Configuration**: Represents one of three setup paths. Contains hardware requirements, software installation steps, cost estimates, and limitations

- **Assessment**: Represents a project or evaluation point. Contains requirements, rubrics, evaluation criteria, and submission guidelines

- **Reference Material**: Includes glossary entries, notation definitions, quick reference commands, troubleshooting solutions, and external resources

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Students can locate any week's content within 2 clicks from the homepage (navigation efficiency)

- **SC-002**: 95% of prerequisite references are correctly linked (no broken internal links to prior chapters)

- **SC-003**: Each of the 4 modules has clearly stated learning outcomes that align with course learning outcomes (verifiable by side-by-side comparison)

- **SC-004**: All 3 hardware setup paths are documented with complete step-by-step instructions (verifiable by following setup guide)

- **SC-005**: Students can identify which chapters contribute to each capstone project component (voice, plan, navigate, perceive, manipulate) within 5 minutes of reviewing the capstone guide

- **SC-006**: Table of contents shows estimated time commitment for each chapter, enabling students to plan a 13-week study schedule

- **SC-007**: Glossary contains at least 100 robotics terms with definitions and chapter cross-references, accessible via dedicated search component providing instant lookup (searchable and comprehensive)

- **SC-008**: Each assessment has a detailed rubric with at least 3 evaluation levels (e.g., needs improvement, proficient, excellent)

- **SC-009**: Book structure supports publishing Week 1-2 content independently as a functional mini-textbook (Introduction + Setup + Glossary)

- **SC-010**: Instructors can customize chapter order by following the prerequisite dependency graph without breaking learning progression

## Assumptions

- Students are industry practitioners with programming knowledge (Python) as stated in course requirements
- Course duration is fixed at 13 weeks with 10-12 hours/week commitment
- Capstone project is the culminating assessment and all modules build toward it
- Hardware requirements follow NVIDIA Isaac Sim specifications (RTX GPU for workstation path)
- Content will be delivered via Docusaurus static site deployed to GitHub Pages
- ROS 2 version is Humble or Iron (Ubuntu 22.04 compatible)
- Isaac Sim is the primary simulation environment for Modules 3-4
- Students have access to at least one of the three hardware configurations
- Assessment rubrics follow academic standards for technical courses
- Book will be continuously updated as hardware/software evolves

## Scope Boundaries

### In Scope

- Complete textbook structure covering all 13 weeks of course content
- 4 modules aligned with course syllabus
- Hardware setup documentation for all 3 configuration options
- Capstone project guide with detailed architecture
- Assessment guides and rubrics for all 4 course assessments
- Reference materials (glossary, notation, quick references, troubleshooting)
- Navigation structure supporting multiple access patterns (week, module, topic)
- Prerequisite tracking and dependency documentation
- Instructor customization guidance

### Out of Scope

- Actual chapter content (covered in separate specs for each chapter/module)
- Separate code example repository or downloadable project files (code examples will be embedded as snippets in chapter markdown)
- Video content or multimedia beyond static diagrams/images
- Interactive simulations embedded in the textbook (students use external tools)
- Automated grading systems for assessments
- Student progress tracking or LMS integration
- Translation to languages other than English
- Mobile app version (Docusaurus responsive web design only)
- Offline PDF export (nice-to-have but not required for v1.0)
- Community forum or discussion board (external to textbook)

## Dependencies

- **Constitution Principles**: Book structure must comply with all 6 constitution principles, especially:
  - Principle III: Consistency & Standards (chapter structure template)
  - Principle IV: Docusaurus Structure & Quality (navigation, metadata)
  - Principle VI: Deployment & Publishing Standards (build gates, performance)

- **Course Syllabus**: Official 13-week syllabus defines week-by-week topics and must be reflected in book structure

- **Hardware Specifications**: NVIDIA Isaac Sim requirements dictate hardware setup documentation (RTX GPU, Ubuntu 22.04)

- **Docusaurus Framework**: Book structure must be compatible with Docusaurus v3 sidebar and navigation capabilities

- **External Tools**: ROS 2, Gazebo, Unity, Isaac Sim versioning affects prerequisite setup guides

## Clarifications

### Session 2025-11-29

- Q: Docusaurus sidebar organization pattern for supporting multiple access patterns (by week, by module, by topic)? → A: Single sidebar with nested collapsible categories (Intro → Module 1 → Module 2, etc.) with cross-references for topics
- Q: Chapter frontmatter metadata requirements beyond Docusaurus defaults? → A: Custom metadata with assessment tracking including estimated_time, week, module, prerequisites (array), learning_objectives (array), sidebar_label, assessment_type, difficulty_level, capstone_component
- Q: Homepage layout and course overview presentation? → A: Dashboard-style with module cards + quick links sidebar (hardware setup, assessments, glossary) + recent updates section
- Q: Search functionality configuration for content and glossary? → A: Hybrid approach using Algolia DocSearch for main content with custom metadata indexing, plus dedicated glossary search component for term lookup
- Q: Code example repository structure and hosting? → A: Embedded code snippets only in markdown files, no separate example file repository (simplifies maintenance, though deviates from Constitution Principle V)

## Constitution Compliance Notes

**Deviation from Constitution Principle V (Code Example Quality)**:
- Constitution requires: "Repository structure: `/examples/[chapter-name]/[example-name]/` with README explaining purpose and usage"
- This spec chooses: Embedded code snippets only in markdown files (no separate example repository)
- **Justification**: For a textbook focused on educational content delivery, embedded snippets provide simpler maintenance and ensure code-content synchronization. Individual chapter specs will define complete, tested code examples embedded directly in markdown. Students can copy-paste examples for hands-on practice. This reduces repository complexity and aligns with the book structure's goal of being a readable, navigable textbook rather than a code distribution platform.
- **Alternative considered**: Monorepo with `/examples/` directory rejected due to increased maintenance burden for 15-20 chapters with multiple examples each
- **Mitigation**: Each embedded code example will still follow Constitution Principle V requirements for completeness, documentation (via surrounding text), and testing (validated before publication)

## Notes

- Book structure should support phased rollout: Introduction & Setup → Module 1 → Module 2 → Module 3 → Module 4 → Capstone
- Each module can be developed in parallel once overall structure is defined
- Hardware setup guide should be continuously updated as new hardware options become available
- Consider adding a "Learning Pathways" visualization showing how chapters connect to capstone components
- Instructors guide should include tips for adapting to semester (15-week) vs. quarter (10-week) formats
- Assessment rubrics should reference specific chapters/exercises to make grading objective
- Code examples will be embedded as fenced code blocks with language specification, comments, and dependency notes per Constitution Principle V
