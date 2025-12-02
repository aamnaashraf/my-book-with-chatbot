# Tasks: Module 1 - The Robotic Nervous System (ROS 2)

**Input**: Design documents from `/specs/005-module-1-ros2-chapters/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: No automated tests for content (manual review + Docusaurus build validation)

**Organization**: Tasks grouped by user story (mapped to chapters) for independent authoring and review.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story/chapter this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

**Documentation site structure** (per plan.md):
- Chapters: `docs/module-1-ros2/chapter-X-slug.mdx`
- Code examples: `static/code-examples/module-1/{complete|skeleton}/chapterX_name.py`
- Diagrams: `static/img/module-1/diagrams/name.svg`
- Assessments: `docs/assessments/module-1/assessment-X.mdx`
- Components: `src/components/learning/ComponentName.tsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, validation, and shared component development

**Scope**: Setup tasks that are prerequisites for all content authoring

- [ ] T001 Create JSON Schema for chapter front matter at .specify/schemas/chapter-frontmatter.schema.json
- [ ] T002 [P] Create directory structure for Module 1 content (docs/module-1-ros2/, static/code-examples/module-1/, static/img/module-1/)
- [ ] T003 [P] Create skeleton code template with TODO markers following quickstart.md conventions in .specify/templates/code-example-skeleton-template.py
- [ ] T004 [P] Create complete code template with docstrings and comments in .specify/templates/code-example-complete-template.py
- [ ] T005 Update scripts/validate-metadata.js to validate chapter front matter against JSON Schema using AJV

**Checkpoint**: Basic infrastructure ready for content creation

---

## Phase 2: Foundational (Custom MDX Components)

**Purpose**: Implement custom React components required by ALL chapters

**⚠️ CRITICAL**: These components must be complete before any chapter MDX authoring begins

- [ ] T006 [P] Implement CodeExample component in src/components/learning/CodeExample.tsx per contracts/CodeExample.md
- [ ] T007 [P] Implement ExerciseBlock component in src/components/learning/ExerciseBlock.tsx per contracts/ExerciseBlock.md
- [ ] T008 [P] Implement ConceptCallout component in src/components/learning/ConceptCallout.tsx per contracts/ConceptCallout.md
- [ ] T009 [P] Implement AssessmentChecklist component in src/components/learning/AssessmentChecklist.tsx per contracts/AssessmentChecklist.md
- [ ] T010 [P] Add CSS styles for custom components in src/css/custom.css (component-specific classes per contracts/)
- [ ] T011 Register custom components in src/theme/MDXComponents.tsx for MDX usage
- [ ] T012 Write unit tests for CodeExample component (Jest + React Testing Library)
- [ ] T013 [P] Write unit tests for ExerciseBlock component
- [ ] T014 [P] Write unit tests for ConceptCallout component
- [ ] T015 [P] Write unit tests for AssessmentChecklist component
- [ ] T016 Run npm run typecheck and npm run build to validate component implementation

**Checkpoint**: All custom MDX components functional and tested - chapter authoring can begin

---

## Phase 3: User Story 1 - Understanding ROS 2 Architecture and Core Concepts (Priority: P1) 🎯 MVP

**Goal**: Chapter 1 teaching ROS 2 distributed architecture, computational graph model, DDS middleware, and basic CLI tools

**Independent Test**: Student can diagram a ROS 2 system (nodes, topics, services), explain DDS advantages over ROS 1 master, and use ros2 CLI tools to inspect running systems

**Maps to**: spec.md US1 (FR-001 through FR-012)

### Content Creation for User Story 1

- [ ] T017 [US1] Create Chapter 1 MDX file at docs/module-1-ros2/chapter-1-intro-ros2.mdx with front matter following data-model.md schema
- [ ] T018 [US1] Write Chapter 1 Section 1.1: What is ROS 2? (distributed architecture, DDS, no master node)
- [ ] T019 [US1] Write Chapter 1 Section 1.2: ROS 2 Architecture (computational graph, nodes, topics, services, actions)
- [ ] T020 [US1] Write Chapter 1 Section 1.3: Installation and Setup (ROS 2 Humble on Ubuntu 22.04 LTS)
- [ ] T021 [US1] Write Chapter 1 Section 1.4: ROS 2 CLI Basics (ros2 node, ros2 topic, ros2 service commands)

### Diagrams for User Story 1

- [ ] T022 [P] [US1] Create ros2-architecture.svg diagram (Application → rclpy → DDS → OS/Transport layers) using draw.io
- [ ] T023 [P] [US1] Create dds-middleware-comparison.svg diagram (ROS 1 vs ROS 2 vs Traditional IPC) using draw.io
- [ ] T024 [P] [US1] Create computation-graph-example.svg diagram (camera → perception → actuator nodes) using draw.io
- [ ] T025 [P] [US1] Export all Chapter 1 diagrams to static/img/module-1/diagrams/ and save source files to static/diagrams-src/module-1/

### Code Examples for User Story 1

- [ ] T026 [P] [US1] Create chapter1_hello_ros2.sh script demonstrating basic ROS 2 CLI commands in static/code-examples/module-1/complete/
- [ ] T027 [P] [US1] Add ConceptCallout components for key terms (Node, Topic, Service, DDS) in Chapter 1 MDX

### Assessment for User Story 1

- [ ] T028 [US1] Create Assessment 1 MDX file at docs/assessments/module-1/assessment-1.mdx with rubric for ROS 2 architecture understanding
- [ ] T029 [US1] Define assessment objectives (diagram system, explain DDS, use CLI tools, identify communication patterns)
- [ ] T030 [US1] Add AssessmentChecklist component to Assessment 1 with rubric criteria

### Validation for User Story 1

- [ ] T031 [US1] Run npm run validate-metadata to check Chapter 1 front matter
- [ ] T032 [US1] Run npm run build to verify Chapter 1 MDX compiles without errors
- [ ] T033 [US1] Manual review: Verify Chapter 1 follows quickstart.md authoring guide (heading hierarchy, accessibility, tone)

**Checkpoint**: Chapter 1 complete and independently testable (students can understand ROS 2 architecture conceptually)

---

## Phase 4: User Story 2 - Building ROS 2 Nodes with Python (rclpy) (Priority: P2)

**Goal**: Chapter 2 teaching hands-on rclpy programming (publishers, subscribers, services, timers, QoS)

**Independent Test**: Student creates publisher node + subscriber node, runs both, verifies message exchange with `ros2 topic echo`

**Maps to**: spec.md US2 (FR-013 through FR-024), Chapter 2 content

### Content Creation for User Story 2

- [ ] T034 [US2] Create Chapter 2 MDX file at docs/module-1-ros2/chapter-2-nodes-topics.mdx with front matter
- [ ] T035 [US2] Write Chapter 2 Section 2.1: Understanding Nodes (rclpy.init, Node class, lifecycle)
- [ ] T036 [US2] Write Chapter 2 Section 2.2: Publisher/Subscriber Pattern (create_publisher, create_subscription, callbacks)
- [ ] T037 [US2] Write Chapter 2 Section 2.3: Quality of Service (QoS) (QoSProfile, reliability, durability, history)
- [ ] T038 [US2] Write Chapter 2 Section 2.4: Introspection Tools (ros2 topic list/echo/info, ros2 node list/info)

### Diagrams for User Story 2

- [ ] T039 [P] [US2] Create node-topic-communication.svg sequence diagram (Publisher → Topic → Subscriber) using Mermaid.js
- [ ] T040 [P] [US2] Create multiple-subscribers.svg diagram (1 publisher, 3 subscribers fan-out) using draw.io
- [ ] T041 [P] [US2] Create qos-policy-diagram.svg visual (Reliable vs Best-Effort QoS) using draw.io
- [ ] T042 [P] [US2] Create namespace-hierarchy.svg diagram (node naming with namespaces) using draw.io

### Code Examples for User Story 2 (Skeleton + Complete)

- [ ] T043 [P] [US2] Create chapter2_minimal_node.py complete version in static/code-examples/module-1/complete/ (basic node with init and spin)
- [ ] T044 [P] [US2] Create chapter2_minimal_node_skeleton.py with TODO markers in static/code-examples/module-1/skeleton/
- [ ] T045 [P] [US2] Create chapter2_publisher_subscriber.py complete version (temperature sensor publisher + logger subscriber)
- [ ] T046 [P] [US2] Create chapter2_publisher_subscriber_skeleton.py with TODOs
- [ ] T047 [P] [US2] Create chapter2_qos_example.py demonstrating QoS policy configuration
- [ ] T048 [P] [US2] Add all Chapter 2 code examples to MDX using CodeExample component with solutionCode prop

### Exercises for User Story 2

- [ ] T049 [US2] Create Exercise 2.1: "Build a Temperature Monitor" using ExerciseBlock component (publisher + subscriber pair)
- [ ] T050 [US2] Create Exercise 2.2: "QoS Mismatch Debugging" using ExerciseBlock type="debugging"
- [ ] T051 [US2] Write exercise starter code and complete solutions for both exercises

### Assessment for User Story 2

- [ ] T052 [US2] Create Assessment 2 MDX file at docs/assessments/module-1/assessment-2.mdx (multi-node communication system)
- [ ] T053 [US2] Define assessment requirements (sensor node, monitor node, client node with service calls)
- [ ] T054 [US2] Create rubric CSV file at docs/assessments/module-1/rubrics/assessment-2-rubric.csv
- [ ] T055 [US2] Add AssessmentChecklist component with Functionality (40%), Code Quality (30%), ROS 2 Best Practices (20%), Documentation (10%)

### Validation for User Story 2

- [ ] T056 [US2] Test all Chapter 2 code examples on ROS 2 Humble / Ubuntu 22.04 LTS
- [ ] T057 [US2] Run ruff check and ruff format on all Python code examples
- [ ] T058 [US2] Run npm run validate-metadata and npm run build for Chapter 2
- [ ] T059 [US2] Manual review: Verify exercises follow ExerciseBlock contract (objectives, hints, starter/solution code)

**Checkpoint**: Chapter 2 complete (students can create functional ROS 2 nodes and communicate via topics)

---

## Phase 5: User Story 3 - Bridging Python AI Agents to ROS 2 Controllers (Priority: P3)

**Goal**: Chapter 3 teaching Python-ROS 2 integration patterns, service servers/clients, parameters, async patterns

**Independent Test**: Student creates AI agent node (simple state machine) that subscribes to sensor data and publishes velocity commands

**Maps to**: spec.md US3 (FR-025 through FR-036), Chapter 3 content

### Content Creation for User Story 3

- [ ] T060 [US3] Create Chapter 3 MDX file at docs/module-1-ros2/chapter-3-python-rclpy.mdx with front matter
- [ ] T061 [US3] Write Chapter 3 Section 3.1: rclpy API Overview (Node, Publisher, Subscription, Client, Service classes)
- [ ] T062 [US3] Write Chapter 3 Section 3.2: Creating Publishers and Subscribers (message types, callback patterns)
- [ ] T063 [US3] Write Chapter 3 Section 3.3: Service Clients and Servers (request/response pattern, async service calls)
- [ ] T064 [US3] Write Chapter 3 Section 3.4: Parameters and Callbacks (declare_parameter, get_parameter, parameter callbacks)

### Diagrams for User Story 3

- [ ] T065 [P] [US3] Create rclpy-class-hierarchy.svg diagram (Node → Publisher/Subscription/Service inheritance) using draw.io
- [ ] T066 [P] [US3] Create callback-execution-flow.svg diagram (event loop, callback queue) using Mermaid.js
- [ ] T067 [P] [US3] Create timer-callback-diagram.svg showing periodic timer execution using Mermaid.js
- [ ] T068 [P] [US3] Create service-request-response.svg sequence diagram (client → server → response) using Mermaid.js

### Code Examples for User Story 3

- [ ] T069 [P] [US3] Create chapter3_minimal_publisher.py complete version with timer callbacks
- [ ] T070 [P] [US3] Create chapter3_minimal_publisher_skeleton.py with TODOs for timer and publish logic
- [ ] T071 [P] [US3] Create chapter3_minimal_subscriber.py complete version with callback implementation
- [ ] T072 [P] [US3] Create chapter3_minimal_subscriber_skeleton.py
- [ ] T073 [P] [US3] Create chapter3_service_server.py complete version (AddTwoInts service example)
- [ ] T074 [P] [US3] Create chapter3_service_client.py complete version with async service call
- [ ] T075 [P] [US3] Create chapter3_parameters_example.py demonstrating parameter declaration and access
- [ ] T076 [P] [US3] Create corresponding skeleton versions for all Chapter 3 examples
- [ ] T077 [P] [US3] Embed all code examples in Chapter 3 MDX using CodeExample component

### Exercises for User Story 3

- [ ] T078 [US3] Create Exercise 3.1: "Implement a Calculator Service" using ExerciseBlock type="challenge"
- [ ] T079 [US3] Create Exercise 3.2: "AI Decision Node" using ExerciseBlock (state machine subscribing to sensor, publishing commands)
- [ ] T080 [US3] Write starter code and solutions for both exercises

### Assessment for User Story 3

- [ ] T081 [US3] Create Assessment 3 MDX file at docs/assessments/module-1/assessment-3.mdx (AI-ROS integration)
- [ ] T082 [US3] Define assessment objectives (AI agent class, separation of concerns, control loop, action server integration)
- [ ] T083 [US3] Create rubric with criteria for code structure, AI logic separation, latency requirements (<100ms)
- [ ] T084 [US3] Add AssessmentChecklist component

### Validation for User Story 3

- [ ] T085 [US3] Test all Chapter 3 code examples (services, parameters, timers)
- [ ] T086 [US3] Run ruff check/format on Python code
- [ ] T087 [US3] Run npm run validate-metadata and build for Chapter 3
- [ ] T088 [US3] Manual review: Verify AI integration patterns follow best practices (async, separation of concerns)

**Checkpoint**: Chapter 3 complete (students can integrate Python AI agents with ROS 2 control systems)

---

## Phase 6: User Story 4 - Understanding URDF for Humanoid Robot Description (Priority: P4)

**Goal**: Chapter 4 teaching URDF syntax for defining humanoid robots (links, joints, visual/collision geometry, inertial properties)

**Independent Test**: Student creates humanoid URDF (torso, arms, legs), visualizes in RViz2, verifies joint movements with joint_state_publisher_gui

**Maps to**: spec.md US4 (FR-037 through FR-048), Chapter 4 content

### Content Creation for User Story 4

- [ ] T089 [US4] Create Chapter 4 MDX file at docs/module-1-ros2/chapter-4-urdf-humanoid.mdx with front matter
- [ ] T090 [US4] Write Chapter 4 Section 4.1: URDF Syntax and Structure (XML format, robot/link/joint elements)
- [ ] T091 [US4] Write Chapter 4 Section 4.2: Defining Links and Joints (visual/collision geometry, joint types, limits)
- [ ] T092 [US4] Write Chapter 4 Section 4.3: Humanoid Robot Modeling (torso, limbs, kinematics hierarchy)
- [ ] T093 [US4] Write Chapter 4 Section 4.4: Visualization with RViz2 (robot_state_publisher, joint_state_publisher_gui, TF2 frames)

### Diagrams for User Story 4

- [ ] T094 [P] [US4] Create urdf-hierarchy-tree.svg diagram (humanoid link tree: base → torso → arms/legs) using draw.io
- [ ] T095 [P] [US4] Create joint-types-comparison.svg visual (revolute, prismatic, fixed, continuous) using draw.io
- [ ] T096 [P] [US4] Create coordinate-frames.svg diagram (TF2 frames for humanoid: world → base_link → joints) using draw.io
- [ ] T097 [P] [US4] Create urdf-to-rviz-pipeline.svg flowchart (URDF → robot_state_publisher → TF2 → RViz2) using Mermaid.js

### Code Examples for User Story 4

- [ ] T098 [P] [US4] Create chapter4_simple_robot.urdf complete version (basic 2-link robot) in static/code-examples/module-1/complete/
- [ ] T099 [P] [US4] Create chapter4_simple_robot_skeleton.urdf with XML comments indicating TODOs
- [ ] T100 [P] [US4] Create chapter4_humanoid_arm.urdf complete version (3-DOF arm: shoulder, elbow, wrist)
- [ ] T101 [P] [US4] Create chapter4_humanoid_full.urdf complete version (full humanoid: torso, 2 arms, 2 legs, head)
- [ ] T102 [P] [US4] Create chapter4_urdf_launch.py launch file to visualize URDF in RViz2
- [ ] T103 [P] [US4] Embed all URDF examples in Chapter 4 MDX using CodeExample component with language="xml"

### Exercises for User Story 4

- [ ] T104 [US4] Create Exercise 4.1: "Build a Humanoid Arm URDF" using ExerciseBlock type="guided"
- [ ] T105 [US4] Create Exercise 4.2: "Add Inertial Properties" using ExerciseBlock type="extension"
- [ ] T106 [US4] Write starter URDF files and complete solutions

### Assessment for User Story 4

- [ ] T107 [US4] Create Assessment 4 MDX file at docs/assessments/module-1/assessment-4.mdx (humanoid URDF modeling)
- [ ] T108 [US4] Define assessment objectives (URDF parsing, visual/collision geometry, joint types, RViz2 visualization)
- [ ] T109 [US4] Create rubric with criteria for URDF validity, joint hierarchy, humanoid conventions
- [ ] T110 [US4] Add AssessmentChecklist component

### Validation for User Story 4

- [ ] T111 [US4] Validate all URDF files using check_urdf tool
- [ ] T112 [US4] Test URDF visualization in RViz2 with robot_state_publisher
- [ ] T113 [US4] Run npm run validate-metadata and build for Chapter 4
- [ ] T114 [US4] Manual review: Verify URDF follows conventions (right-hand rule, base_link root, joint naming)

**Checkpoint**: Chapter 4 complete (students can define and visualize humanoid robots in URDF)

---

## Phase 7: User Story 5 - Working with Launch Files and Package Management (Priority: P5)

**Goal**: Chapter 5 teaching ROS 2 package structure, launch files, dependency management, colcon build

**Independent Test**: Student creates ROS 2 package with multiple nodes (from P2/P3) and launch file, builds with colcon, runs entire system with one command

**Maps to**: spec.md US5 (FR-049 through FR-060), Chapter 5 content

### Content Creation for User Story 5

- [ ] T115 [US5] Create Chapter 5 MDX file at docs/module-1-ros2/chapter-5-launch-packages.mdx with front matter
- [ ] T116 [US5] Write Chapter 5 Section 5.1: ROS 2 Package Structure (package.xml, setup.py, src/ directory, resource/)
- [ ] T117 [US5] Write Chapter 5 Section 5.2: Creating Launch Files (Python launch API, Node actions, parameters, remappings)
- [ ] T118 [US5] Write Chapter 5 Section 5.3: Managing Dependencies (package.xml dependencies, rosdep)
- [ ] T119 [US5] Write Chapter 5 Section 5.4: Building and Testing Packages (colcon build, colcon test, sourcing workspace)

### Diagrams for User Story 5

- [ ] T120 [P] [US5] Create package-structure.svg diagram (ROS 2 package directory tree) using draw.io
- [ ] T121 [P] [US5] Create launch-file-execution.svg flowchart (launch file → node spawning → parameter loading) using Mermaid.js
- [ ] T122 [P] [US5] Create dependency-graph.svg diagram (multi-package dependency visualization) using draw.io

### Code Examples for User Story 5

- [ ] T123 [P] [US5] Create example ROS 2 package structure in static/code-examples/module-1/complete/my_robot_package/ (package.xml, setup.py, src/, launch/)
- [ ] T124 [P] [US5] Create chapter5_multi_node_launch.py complete launch file (starts publisher + subscriber + service nodes)
- [ ] T125 [P] [US5] Create chapter5_parameters_launch.py demonstrating parameter passing
- [ ] T126 [P] [US5] Create example package.xml with dependencies (rclpy, std_msgs, geometry_msgs)
- [ ] T127 [P] [US5] Create example setup.py with entry points for executables
- [ ] T128 [P] [US5] Embed all package/launch examples in Chapter 5 MDX using CodeExample component

### Exercises for User Story 5

- [ ] T129 [US5] Create Exercise 5.1: "Create a Multi-Node Package" using ExerciseBlock type="guided"
- [ ] T130 [US5] Create Exercise 5.2: "Launch File with Arguments" using ExerciseBlock type="challenge"
- [ ] T131 [US5] Write starter package structure and complete solutions

### Assessment for User Story 5

- [ ] T132 [US5] Create Assessment 5 MDX file at docs/assessments/module-1/assessment-5.mdx (package management and launch files)
- [ ] T133 [US5] Define assessment objectives (package structure, launch file, colcon build, dependencies)
- [ ] T134 [US5] Create rubric with criteria for package conventions, launch file functionality, dependency management
- [ ] T135 [US5] Add AssessmentChecklist component

### Validation for User Story 5

- [ ] T136 [US5] Test example package builds successfully with colcon build
- [ ] T137 [US5] Test launch files start all nodes correctly
- [ ] T138 [US5] Run npm run validate-metadata and build for Chapter 5
- [ ] T139 [US5] Manual review: Verify package follows ROS 2 conventions (ament_python, resource/, setup.py)

**Checkpoint**: Chapter 5 complete (students can create, build, and launch complete ROS 2 packages)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Module-level integration, documentation, and final validation

**Scope**: Tasks that span all chapters and ensure cohesive module experience

### Module Integration

- [ ] T140 Update docs/module-1-ros2/index.mdx module landing page with chapter links, learning outcomes, time commitment
- [ ] T141 [P] Update sidebars.js to include all 5 chapters in Module 1 sidebar
- [ ] T142 [P] Update docusaurus.config.js with any Module 1-specific configuration (if needed)
- [ ] T143 Create module-wide glossary terms for ROS 2 terminology (node, topic, service, QoS, URDF, etc.)

### Diagram Finalization

- [ ] T144 [P] Review all diagrams for consistent style (ROS 2 blue #00AEEF, color palette per quickstart.md)
- [ ] T145 [P] Ensure all diagrams have descriptive alt text for accessibility
- [ ] T146 [P] Save all draw.io source files to static/diagrams-src/module-1/ for future editing

### Code Example Finalization

- [ ] T147 Run ruff check and ruff format on all Python code examples in static/code-examples/module-1/
- [ ] T148 [P] Verify all skeleton code has clear TODO markers and references to chapter sections
- [ ] T149 [P] Verify all complete code has comprehensive docstrings and inline comments
- [ ] T150 Create README.md in static/code-examples/module-1/ explaining directory structure and usage

### Accessibility and Standards

- [ ] T151 Run npm run check-links to verify no broken links in Module 1 content
- [ ] T152 [P] Verify all chapters have proper heading hierarchy (H1 → H2 → H3, no skips)
- [ ] T153 [P] Check color contrast ratios for all custom components (WCAG 2.1 AA compliance)
- [ ] T154 [P] Test keyboard navigation through all interactive components (ExerciseBlock checkboxes, AssessmentChecklist)

### Build and Performance Validation

- [ ] T155 Run npm run build and verify no errors or warnings for Module 1 content
- [ ] T156 Test page load times (<2s for all chapters)
- [ ] T157 Verify syntax highlighting works correctly for Python, XML, Bash code blocks
- [ ] T158 Test Module 1 content in both light and dark Docusaurus themes

### Documentation and Handoff

- [ ] T159 Create Module 1 authoring retrospective document (what worked, what didn't, lessons learned)
- [ ] T160 [P] Update quickstart.md with any new patterns discovered during authoring
- [ ] T161 [P] Create instructor guide for Module 1 (teaching tips, common student questions, assessment rubric usage)

**Checkpoint**: Module 1 complete and ready for production deployment

---

## Dependencies (User Story Completion Order)

**Critical Path** (must complete in order):
1. Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1/Chapter 1)
2. US1 complete → US2 can start (Chapter 2 references Chapter 1 concepts)
3. US2 complete → US3 can start (Chapter 3 builds on rclpy from Chapter 2)

**Independent Stories** (can be done in parallel after foundational):
- US4 (Chapter 4 - URDF) is independent of US2/US3 (can start after US1 if needed)
- US5 (Chapter 5 - Launch files) depends on US2 (needs multi-node examples)

**Recommended Sequence for MVP**:
1. US1 (Chapter 1) - Foundational concepts ✅ MVP
2. US2 (Chapter 2) - First hands-on coding ✅ Extends MVP
3. US4 (Chapter 4) - URDF (independent, can parallelize with US3)
4. US3 (Chapter 3) - AI integration (builds on US2)
5. US5 (Chapter 5) - Package management (polish/operations)

**Dependency Graph**:
```
Setup → Foundational → US1 (Chapter 1) → US2 (Chapter 2) → US3 (Chapter 3)
                                       ↘                      ↘
                                        US4 (Chapter 4)        US5 (Chapter 5)
```

---

## Parallel Execution Examples

### Phase 2 (Foundational) - Parallel Component Development
**Run in parallel** (different files, no dependencies):
- T006 (CodeExample), T007 (ExerciseBlock), T008 (ConceptCallout), T009 (AssessmentChecklist)
- T012-T015 (unit tests for all components)

### Phase 3 (US1/Chapter 1) - Parallel Diagram Creation
**Run in parallel**:
- T022 (ros2-architecture.svg), T023 (dds-middleware.svg), T024 (computation-graph.svg)

### Phase 4 (US2/Chapter 2) - Parallel Code Example Creation
**Run in parallel** (different files):
- T043-T044 (minimal_node), T045-T046 (publisher_subscriber), T047 (qos_example)

### Phase 5 (US3/Chapter 3) - Parallel Code + Diagram Creation
**Run in parallel**:
- Code: T069-T076 (all code examples), Diagrams: T065-T068 (all diagrams)

### Phase 6 (US4/Chapter 4) - Parallel URDF Examples
**Run in parallel**:
- T098-T101 (all URDF files), T094-T097 (all diagrams)

### Phase 7 (US5/Chapter 5) - Parallel Package Examples
**Run in parallel**:
- T123-T128 (package structure, launch files, package.xml, setup.py)

### Phase 8 (Polish) - Parallel Validation
**Run in parallel**:
- T144-T146 (diagram review), T147-T149 (code review), T151-T154 (accessibility)

---

## Implementation Strategy

### MVP Scope (Week 1)
**Minimum Viable Module**: Complete US1 (Chapter 1) + foundational components
- Phase 1 (Setup): T001-T005
- Phase 2 (Foundational): T006-T016
- Phase 3 (US1): T017-T033

**Delivers**: Students understand ROS 2 architecture conceptually, custom MDX components working

### Incremental Delivery (Week 2)
- US2 (Chapter 2): T034-T059 → Students can write functional ROS 2 nodes
- US4 (Chapter 4): T089-T114 → Students can model robots in URDF (parallel with US2 if 2+ authors)

### Final Delivery (Week 3)
- US3 (Chapter 3): T060-T088 → Students can integrate AI with ROS 2
- US5 (Chapter 5): T115-T139 → Students can package and deploy systems
- Phase 8 (Polish): T140-T161 → Module-wide integration and validation

**Total Estimated Effort**: 161 tasks, ~90-120 hours (aligns with plan.md estimate)

---

## Task Summary

**Total Tasks**: 161
- **Setup (Phase 1)**: 5 tasks
- **Foundational (Phase 2)**: 11 tasks
- **US1/Chapter 1 (Phase 3)**: 17 tasks
- **US2/Chapter 2 (Phase 4)**: 26 tasks
- **US3/Chapter 3 (Phase 5)**: 29 tasks
- **US4/Chapter 4 (Phase 6)**: 26 tasks
- **US5/Chapter 5 (Phase 7)**: 25 tasks
- **Polish (Phase 8)**: 22 tasks

**Parallel Opportunities**: ~80 tasks marked [P] can run in parallel (50% of total)

**Independent Test Criteria**:
- **US1**: Diagram ROS 2 system, explain DDS, use CLI tools
- **US2**: Create publisher + subscriber, verify with `ros2 topic echo`
- **US3**: Create AI agent node publishing commands based on sensor input
- **US4**: Create humanoid URDF, visualize in RViz2, verify joints
- **US5**: Create package + launch file, build with colcon, run system

**Suggested MVP Scope**: Phases 1-3 only (33 tasks, US1 complete)

---

**Status**: Tasks ready for implementation via `/sp.implement 005-module-1-ros2-chapters`
