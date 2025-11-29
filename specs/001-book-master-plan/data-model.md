# Data Model: Book Master Plan - Physical AI & Humanoid Robotics Textbook

**Date**: 2025-11-29
**Feature**: 001-book-master-plan
**Purpose**: Define entities, metadata schema, and relationships for the Docusaurus-based textbook structure

---

## Entity Definitions

### 1. Module

Represents a major course section (4 total across the 13-week course).

**Attributes**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier (kebab-case) | `"module-1-ros2"` |
| `title` | string | Yes | Full module title | `"Module 1: The Robotic Nervous System (ROS 2)"` |
| `weekRange` | string | Yes | Week span for this module | `"Weeks 3-5"` |
| `description` | string | Yes | Module overview (2-3 sentences) | `"Learn ROS 2 architecture..."` |
| `learningOutcomes` | array\<string\> | Yes | 3-5 measurable learning outcomes | `["Explain ROS 2 nodes", "Build a package"]` |
| `chapters` | array\<string\> | Yes | Array of chapter IDs (references) | `["week-3-architecture", "week-4-topics"]` |
| `capstoneIntegration` | string | Yes | How module contributes to capstone | `"Provides ROS 2 skills for robot control"` |

**Example**:
```json
{
  "id": "module-1-ros2",
  "title": "Module 1: The Robotic Nervous System (ROS 2)",
  "weekRange": "Weeks 3-5",
  "description": "Learn ROS 2 architecture, communication patterns, and robot description. Build and deploy ROS 2 packages to control simulated robots.",
  "learningOutcomes": [
    "Explain ROS 2 architecture and core concepts",
    "Create publishers and subscribers for sensor data",
    "Define robot structure using URDF files"
  ],
  "chapters": [
    "module-1-ros2/week-3-architecture",
    "module-1-ros2/week-4-topics-services",
    "module-1-ros2/week-5-urdf"
  ],
  "capstoneIntegration": "ROS 2 serves as the communication layer for the autonomous humanoid, enabling voice commands to be translated into robot actions."
}
```

**Storage**: Modules are defined in `docusaurus.config.ts` or separate JSON file (`static/data/modules.json`)

---

### 2. Chapter

Represents a single topic within a module (typically 1-2 weeks of content). Defined via **Markdown frontmatter metadata**.

**Frontmatter Schema** (all chapters must include these fields):

| Field | Type | Required | Validation | Description | Example |
|-------|------|----------|------------|-------------|---------|
| `title` | string | Yes | minLength: 5 | Full chapter title | `"Week 3: ROS 2 Architecture and Core Concepts"` |
| `description` | string | Yes | 20-160 chars | Brief summary (for SEO/TOC) | `"Introduction to ROS 2 nodes, topics..."` |
| `keywords` | array\<string\> | Yes | 3-10 items | SEO keywords | `["ROS 2", "nodes", "topics", "robotics"]` |
| `sidebar_position` | number | Yes | >= 1 | Ordering within category | `1` |
| `sidebar_label` | string | No | maxLength: 40 | Short label override | `"ROS 2 Architecture"` |
| `estimated_time` | number | Yes | 0.5-20 hours | Reading + lab time | `3` (3 hours) |
| `week` | number | Yes | 1-13 | Course week number | `3` |
| `module` | number | Yes | 1-4 | Module number | `1` |
| `prerequisites` | array\<string\> | Yes | >= 0 items | Chapter IDs or `"none"` | `["intro", "setup/workstation"]` |
| `learning_objectives` | array\<string\> | Yes | 3-8 items | Measurable objectives | `["Explain ROS 2 graph concept", "Create a node"]` |
| `assessment_type` | string \| null | No | enum | Assessment category | `"project"` \| `"quiz"` \| `"capstone"` \| `null` |
| `difficulty_level` | string \| null | No | enum | Complexity indicator | `"beginner"` \| `"intermediate"` \| `"advanced"` \| `null` |
| `capstone_component` | string \| null | No | enum | Capstone relation | `"voice"` \| `"plan"` \| `"navigate"` \| `"perceive"` \| `"manipulate"` \| `null` |

**Example Frontmatter**:
```yaml
---
title: "Week 3: ROS 2 Architecture and Core Concepts"
description: "Introduction to ROS 2 nodes, topics, services, and the ROS 2 computation graph"
keywords: ["ROS 2", "nodes", "topics", "services", "graph", "rclpy"]
sidebar_position: 1
sidebar_label: "ROS 2 Architecture"
estimated_time: 3
week: 3
module: 1
prerequisites: ["intro", "setup/workstation"]
learning_objectives:
  - "Explain the ROS 2 computation graph and its components"
  - "Create a simple ROS 2 node using rclpy"
  - "Launch multiple nodes and inspect the graph using command-line tools"
assessment_type: null
difficulty_level: "beginner"
capstone_component: null
---

# Week 3: ROS 2 Architecture and Core Concepts

[Chapter content here...]
```

**Validation**: All chapters validated against `contracts/chapter-metadata-schema.json` using `ajv` library

**Storage**: Chapter content in `docs/module-X-name/week-Y-topic.md` files

---

### 3. Glossary Entry

Represents a robotics term with definition and cross-references.

**Attributes**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `term` | string | Yes | Canonical term name | `"Forward Kinematics"` |
| `definition` | string | Yes | Concise explanation | `"Computation of end-effector position from joint angles"` |
| `relatedTerms` | array\<string\> | No | Cross-references | `["Inverse Kinematics", "Joint Space"]` |
| `chapters` | array\<string\> | No | Where term is used | `["module-1-ros2/week-5-urdf", "module-4-vla/week-11-kinematics"]` |
| `acronym` | string | No | Abbreviation | `"FK"` |

**Example**:
```markdown
<!-- In docs/references/glossary.md -->
## Forward Kinematics (FK)

**Definition**: Computation of the end-effector position and orientation from known joint angles.

**Related Terms**: Inverse Kinematics, Joint Space, Denavit-Hartenberg Parameters

**Used In**: [Week 5: URDF](../module-1-ros2/week-5-urdf.md), [Week 11: Kinematics](../module-4-vla/week-11-kinematics.md)
```

**Storage**: Markdown file at `docs/references/glossary.md`, indexed as JSON for search at build time (`static/data/glossary-index.json`)

---

### 4. Hardware Configuration

Represents one of three setup paths for the course.

**Attributes**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Configuration identifier | `"workstation"` \| `"edge-kit"` \| `"cloud"` |
| `name` | string | Yes | Display name | `"Digital Twin Workstation"` |
| `requirements` | array\<string\> | Yes | Hardware/software specs | `["NVIDIA RTX 4070 Ti (12GB VRAM)", "Ubuntu 22.04 LTS"]` |
| `cost` | string | Yes | Estimated cost range | `"$2,500 - $4,000"` |
| `setupSteps` | array\<string\> | Yes | Installation instructions | `["Install Ubuntu 22.04", "Install NVIDIA drivers"]` |
| `limitations` | array\<string\> | No | What doesn't work | `["Cannot run Isaac Sim on non-RTX GPUs"]` |

**Example**:
```json
{
  "id": "workstation",
  "name": "Digital Twin Workstation (RTX + Ubuntu)",
  "requirements": [
    "NVIDIA RTX 4070 Ti (12GB VRAM) or higher",
    "Intel Core i7 (13th Gen+) or AMD Ryzen 9",
    "64 GB DDR5 RAM (32 GB minimum)",
    "Ubuntu 22.04 LTS (dual-boot or dedicated machine)"
  ],
  "cost": "$2,500 - $4,000",
  "setupSteps": [
    "Install Ubuntu 22.04 LTS from bootable USB",
    "Install NVIDIA proprietary drivers (version 535+)",
    "Install CUDA Toolkit 12.x",
    "Install ROS 2 Humble via apt",
    "Install NVIDIA Omniverse Launcher",
    "Install Isaac Sim from Omniverse"
  ],
  "limitations": [
    "Requires physical hardware purchase",
    "Not portable (desktop setup)"
  ]
}
```

**Storage**: Markdown files at `docs/setup/*.md` (workstation.md, edge-kit.md, cloud.md)

---

### 5. Assessment

Represents a project or evaluation point with rubric.

**Attributes**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Assessment identifier | `"ros2-package"` |
| `title` | string | Yes | Assessment name | `"ROS 2 Package Development Project"` |
| `modules` | array\<number\> | Yes | Modules assessed | `[1]` (Module 1) |
| `description` | string | Yes | Project overview | `"Build a ROS 2 package that publishes sensor data..."` |
| `rubric` | array\<RubricLevel\> | Yes | Evaluation levels | See RubricLevel below |

**RubricLevel Object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `level` | string | Yes | Performance level | `"needs improvement"` \| `"proficient"` \| `"excellent"` |
| `criteria` | array\<string\> | Yes | Evaluation criteria | `["Package builds successfully", "Code follows PEP 8"]` |
| `points` | number | Yes | Point value | `70` (for "proficient") |

**Example**:
```json
{
  "id": "ros2-package",
  "title": "ROS 2 Package Development Project",
  "modules": [1],
  "description": "Build a ROS 2 package that publishes simulated sensor data and subscribes to control commands. Demonstrate node communication and launch file configuration.",
  "rubric": [
    {
      "level": "needs improvement",
      "criteria": [
        "Package structure incomplete or does not build",
        "Nodes do not communicate correctly",
        "Lack of comments or documentation"
      ],
      "points": 50
    },
    {
      "level": "proficient",
      "criteria": [
        "Package builds successfully with all dependencies declared",
        "Nodes communicate via topics with correct message types",
        "Code follows PEP 8 style guide",
        "Basic documentation provided (README)"
      ],
      "points": 85
    },
    {
      "level": "excellent",
      "criteria": [
        "All proficient criteria met",
        "Launch file includes parameter configuration",
        "Unit tests included with >70% coverage",
        "Comprehensive documentation with usage examples"
      ],
      "points": 100
    }
  ]
}
```

**Storage**: Markdown files at `docs/assessments/*.md` (ros2-package.md, gazebo-simulation.md, isaac-perception.md, capstone.md)

---

## Entity Relationships

### Relationship Diagram

```
Module (1) ──────< (many) Chapter
  │
  └─> references in "chapters" array

Chapter ──────> Module
  │           via "module" number
  │
  ├──────> other Chapters
  │       via "prerequisites" array
  │
  └──────> Glossary Entries
          via inline markdown links

Assessment ──────< (many) Module
                 via "modules" array

Hardware Configuration ──────< (many) Chapter
                             referenced in setup guide chapters
```

### Relationship Details

**Module → Chapter** (One-to-Many)
- A Module contains multiple Chapters (typically 3-4 chapters per module)
- Defined in Module's `chapters` array
- Example: Module 1 (ROS 2) has chapters: week-3-architecture, week-4-topics, week-5-urdf

**Chapter → Module** (Many-to-One)
- Each Chapter belongs to exactly one Module
- Defined via Chapter's `module` frontmatter field
- Example: "Week 3: ROS 2 Architecture" has `module: 1`

**Chapter → Chapter** (Prerequisite Chain)
- Chapters can depend on other Chapters (or "none")
- Defined via Chapter's `prerequisites` array
- Example: "Week 4: Topics & Services" has `prerequisites: ["module-1-ros2/week-3-architecture"]`
- Forms a directed acyclic graph (DAG) of dependencies

**Chapter → Glossary Entry** (Many-to-Many)
- Chapters reference Glossary Entries via inline markdown links: `[Forward Kinematics](../references/glossary.md#forward-kinematics)`
- Glossary Entries track which Chapters use them via `chapters` array
- Bidirectional cross-referencing for navigation

**Assessment → Module** (Many-to-Many)
- An Assessment can cover multiple Modules
- Defined via Assessment's `modules` array
- Example: "Capstone Project" has `modules: [1, 2, 3, 4]` (all modules)

**Hardware Configuration → Chapter** (One-to-Many)
- Hardware configurations referenced in setup guide chapters
- Example: `docs/setup/workstation.md` describes the "workstation" configuration
- Chapters may reference specific hardware in prerequisites: `prerequisites: ["setup/workstation"]`

---

## State Transitions

**None** - All entities are static content with no workflow states. Content follows standard Git workflow:

```
Draft → Review → Approved → Published
```

Managed via Git branches and pull requests, not entity state fields.

---

## Data Storage Strategy

### Build-Time Generation

1. **Modules**: Defined in `static/data/modules.json` (manually curated)
2. **Chapters**: Markdown files with frontmatter in `docs/module-X-name/*.md`
3. **Glossary**: Markdown file at `docs/references/glossary.md`, parsed into `static/data/glossary-index.json` at build time
4. **Hardware Configs**: Markdown files at `docs/setup/*.md`
5. **Assessments**: Markdown files at `docs/assessments/*.md`

### Build Scripts

**`scripts/generate-chapter-index.js`**:
- Reads all `docs/**/*.md` files
- Extracts frontmatter metadata
- Validates against `chapter-metadata-schema.json`
- Outputs `static/data/chapters-index.json` for filtering/search

**`scripts/generate-glossary-index.js`**:
- Parses `docs/references/glossary.md`
- Extracts terms and definitions
- Builds Flexsearch index
- Outputs `static/data/glossary-index.json`

**`scripts/validate-metadata.js`**:
- Validates all chapter frontmatter against JSON Schema
- Runs as pre-commit hook and in CI pipeline

---

## Metadata Index Formats

### chapters-index.json

```json
{
  "chapters": [
    {
      "id": "module-1-ros2/week-3-architecture",
      "title": "Week 3: ROS 2 Architecture and Core Concepts",
      "description": "Introduction to ROS 2 nodes, topics...",
      "week": 3,
      "module": 1,
      "estimated_time": 3,
      "prerequisites": ["intro", "setup/workstation"],
      "learning_objectives": ["Explain ROS 2 graph", "Create node"],
      "difficulty_level": "beginner",
      "path": "/docs/module-1-ros2/week-3-architecture"
    }
    // ... more chapters
  ],
  "meta": {
    "generated": "2025-11-29T12:00:00Z",
    "total_chapters": 18,
    "total_hours": 135
  }
}
```

### glossary-index.json

```json
{
  "terms": [
    {
      "id": 1,
      "term": "Forward Kinematics",
      "definition": "Computation of end-effector position from joint angles",
      "acronym": "FK",
      "relatedTerms": ["Inverse Kinematics", "Joint Space"],
      "chapters": ["module-1-ros2/week-5-urdf", "module-4-vla/week-11-kinematics"]
    }
    // ... more terms
  ],
  "meta": {
    "generated": "2025-11-29T12:00:00Z",
    "total_terms": 120
  }
}
```

---

## Validation Rules

### Chapter Metadata Validation

1. **Required Fields**: title, description, keywords, sidebar_position, estimated_time, week, module, prerequisites, learning_objectives (enforced by JSON Schema)
2. **Value Ranges**:
   - `week`: 1-13
   - `module`: 1-4
   - `estimated_time`: 0.5-20 hours
   - `keywords`: 3-10 items
   - `learning_objectives`: 3-8 items
3. **String Lengths**:
   - `description`: 20-160 characters (SEO meta description)
   - `sidebar_label`: max 40 characters (sidebar width constraint)
4. **Enums**:
   - `assessment_type`: "project" | "quiz" | "capstone" | null
   - `difficulty_level`: "beginner" | "intermediate" | "advanced" | null
   - `capstone_component`: "voice" | "plan" | "navigate" | "perceive" | "manipulate" | null

### Cross-Reference Validation

1. **Prerequisites**: All referenced chapter IDs must exist in `chapters-index.json`
2. **Module References**: `module` number must correspond to valid Module ID
3. **Glossary Links**: Inline links to glossary must reference valid term anchors

---

## Data Model Summary

| Entity | Storage | Format | Validation |
|--------|---------|--------|------------|
| Module | `static/data/modules.json` | JSON | Manual QA |
| Chapter | `docs/module-X/*.md` | Markdown + Frontmatter | JSON Schema (ajv) |
| Glossary Entry | `docs/references/glossary.md` | Markdown | Build-time parsing |
| Hardware Config | `docs/setup/*.md` | Markdown | Manual QA |
| Assessment | `docs/assessments/*.md` | Markdown | Manual QA |

**Total Estimated Entities**:
- Modules: 4
- Chapters: ~18 (15-20 range)
- Glossary Entries: ~120 (100+ requirement)
- Hardware Configs: 3
- Assessments: 4

---

**Data Model Complete**: Ready for contract definition (JSON Schema) and quickstart guide.
