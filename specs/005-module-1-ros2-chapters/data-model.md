# Phase 1: Data Model and Content Structure

**Feature**: 005-module-1-ros2-chapters
**Date**: 2025-12-02
**Status**: Phase 1 In Progress

This document defines the data structures, metadata schemas, and content organization for Module 1 ROS 2 chapters.

---

## 1. Content Hierarchy

### 1.1 Module → Chapter → Section Structure

```
Module 1: The Robotic Nervous System (ROS 2)
├── index.mdx                          # Module landing page
├── Chapter 1: Introduction to ROS 2
│   ├── 1.1 What is ROS 2?             # Section (H2)
│   ├── 1.2 ROS 2 Architecture         # Section (H2)
│   │   ├── 1.2.1 DDS Middleware       # Subsection (H3)
│   │   └── 1.2.2 Computation Graph    # Subsection (H3)
│   ├── 1.3 Installation and Setup     # Section (H2)
│   └── 1.4 Your First ROS 2 Command   # Section (H2)
├── Chapter 2: ROS 2 Nodes and Topics
│   ├── 2.1 Understanding Nodes        # Section (H2)
│   ├── 2.2 Publisher/Subscriber Pattern
│   ├── 2.3 Quality of Service (QoS)
│   └── 2.4 Introspection Tools
├── Chapter 3: Python Programming with rclpy
│   ├── 3.1 rclpy API Overview
│   ├── 3.2 Creating Publishers and Subscribers
│   ├── 3.3 Service Clients and Servers
│   └── 3.4 Parameters and Callbacks
├── Chapter 4: URDF for Humanoid Robots
│   ├── 4.1 URDF Syntax and Structure
│   ├── 4.2 Defining Links and Joints
│   ├── 4.3 Humanoid Robot Modeling
│   └── 4.4 Visualization with RViz2
└── Chapter 5: Launch Files and Package Management
    ├── 5.1 ROS 2 Package Structure
    ├── 5.2 Creating Launch Files
    ├── 5.3 Managing Dependencies
    └── 5.4 Building and Testing Packages
```

**Heading Level Rules**:
- **H1**: Chapter title only (once per file, using `# {frontMatter.title}`)
- **H2**: Major sections (main concepts)
- **H3**: Subsections (sub-concepts, examples)
- **H4**: Rarely used (only for deeply nested explanations, prefer flatter structure)

---

## 2. Chapter Front Matter Schema

### 2.1 JSON Schema Definition

**Schema File**: `.specify/schemas/chapter-frontmatter.schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ameen-alam/Physical-AI-Humanoid-Robotics-Textbook/schemas/chapter-frontmatter.schema.json",
  "title": "Chapter Front Matter Schema",
  "description": "Metadata schema for chapter MDX files",
  "type": "object",
  "required": ["title", "description", "keywords", "sidebar_position", "learning_objectives", "prerequisites", "estimated_time", "content_type", "difficulty"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Chapter title (e.g., 'Chapter 1: Introduction to ROS 2')",
      "minLength": 10,
      "maxLength": 80
    },
    "description": {
      "type": "string",
      "description": "Brief description for SEO and previews",
      "minLength": 10,
      "maxLength": 160
    },
    "keywords": {
      "type": "array",
      "description": "3-10 keywords for search and indexing",
      "items": {
        "type": "string"
      },
      "minItems": 3,
      "maxItems": 10
    },
    "sidebar_position": {
      "type": "integer",
      "description": "Position in sidebar navigation (1, 2, 3...)",
      "minimum": 1
    },
    "learning_objectives": {
      "type": "array",
      "description": "2-5 learning objectives using Bloom's taxonomy verbs",
      "items": {
        "type": "string",
        "pattern": "^(Understand|Apply|Demonstrate|Implement|Build|Create|Design|Evaluate|Analyze)"
      },
      "minItems": 2,
      "maxItems": 5
    },
    "prerequisites": {
      "type": "array",
      "description": "Paths to prerequisite chapters (e.g., 'docs/module-1-ros2/chapter-1-intro')",
      "items": {
        "type": "string",
        "pattern": "^(docs/|\\[\\]$)"
      }
    },
    "estimated_time": {
      "type": "integer",
      "description": "Estimated completion time in minutes (multiple of 5)",
      "minimum": 5,
      "multipleOf": 5
    },
    "content_type": {
      "type": "string",
      "description": "Type of content",
      "enum": ["tutorial", "concept", "hands-on-lab", "reference"]
    },
    "difficulty": {
      "type": "string",
      "description": "Difficulty level",
      "enum": ["beginner", "intermediate", "advanced"]
    },
    "tags": {
      "type": "array",
      "description": "Optional tags for filtering (e.g., ['ros2', 'python', 'hands-on'])",
      "items": {
        "type": "string"
      }
    },
    "draft": {
      "type": "boolean",
      "description": "If true, hide from production builds"
    },
    "ros2_distribution": {
      "type": "string",
      "description": "ROS 2 distribution (default: 'humble')",
      "enum": ["humble"],
      "default": "humble"
    },
    "chapter_number": {
      "type": "integer",
      "description": "Chapter number within module (1, 2, 3, 4, 5)",
      "minimum": 1,
      "maximum": 5
    }
  }
}
```

### 2.2 Example Front Matter (Chapter 1)

```yaml
---
title: "Chapter 1: Introduction to ROS 2"
description: "Understand ROS 2 architecture, middleware, and core concepts to build distributed robotic systems"
keywords: [ROS 2, robotics middleware, DDS, computation graph, distributed systems]
sidebar_position: 1
learning_objectives:
  - Understand the ROS 2 computation graph and its key components
  - Explain the role of DDS middleware in robot communication
  - Install ROS 2 Humble on Ubuntu 22.04 and verify the setup
  - Execute basic ROS 2 CLI commands to introspect running nodes
prerequisites: []  # No prerequisites for Chapter 1
estimated_time: 45
content_type: concept
difficulty: beginner
tags: [ros2, architecture, setup]
ros2_distribution: humble
chapter_number: 1
---
```

### 2.3 Validation Script

**Script**: `scripts/validate-metadata.js` (already exists in project)

Enhanced to validate against JSON Schema:

```javascript
// scripts/validate-metadata.js
const Ajv = require('ajv');
const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync('.specify/schemas/chapter-frontmatter.schema.json', 'utf-8'));
const validate = ajv.compile(schema);

// Find all MDX files in docs/module-1-ros2/
const files = glob.sync('docs/module-1-ros2/chapter-*.mdx');

let errors = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const { data } = matter(content);

  if (!validate(data)) {
    console.error(`❌ ${file}:`);
    console.error(validate.errors);
    errors++;
  } else {
    console.log(`✅ ${file}`);
  }
});

if (errors > 0) {
  console.error(`\n❌ ${errors} file(s) failed validation`);
  process.exit(1);
} else {
  console.log('\n✅ All files passed validation');
}
```

**Usage**: Run `npm run validate-metadata` before committing.

---

## 3. Section and Content Organization

### 3.1 Section Types

| Section Type | Purpose | Typical Heading | Example |
|--------------|---------|-----------------|---------|
| **Concept Introduction** | Explain what, why, and when | "What is X?" | "What is a ROS 2 Node?" |
| **Technical Deep Dive** | Architecture, internals, design | "How X Works" | "How DDS Middleware Routes Messages" |
| **Code Example** | Show implementation | "Example: Building X" | "Example: Creating a Publisher" |
| **Hands-On Exercise** | Practice activity | "Exercise: Build X" | "Exercise: Multi-Node Communication" |
| **Troubleshooting** | Common issues | "Common Issues" | "Debugging Node Discovery Problems" |
| **Best Practices** | Recommendations | "Best Practices for X" | "Best Practices for QoS Configuration" |
| **Summary** | Key takeaways | "Key Takeaways" | "Chapter 2 Summary" |

### 3.2 Content Flow Pattern (Per Chapter)

**Recommended Flow** (aligns with `tutorial.mdx` template):

```
1. Learning Objectives & Prerequisites (auto-displayed from frontmatter)
2. Introduction (1-2 paragraphs: what + why)
3. Concept Section 1 (H2)
   └── Subsection 1.1 (H3)
   └── Code Example (H3 or embedded in subsection)
4. Concept Section 2 (H2)
   └── Subsection 2.1 (H3)
   └── Hands-On Exercise (embedded in subsection)
5. Summary / Key Takeaways (H2)
6. Next Steps / Related Chapters (H2)
7. Assessment (linked separately in `assessments/module-1/`)
```

**Example Flow for Chapter 2**:
```markdown
# Chapter 2: ROS 2 Nodes and Topics

<LearningObjectives /> <Prerequisites />

## Introduction
Nodes and topics form the backbone of ROS 2 communication...

## 2.1 Understanding Nodes
A node is a process that performs computation...

### 2.1.1 Node Lifecycle
[Diagram: Node lifecycle states]

### 2.1.2 Example: Minimal Node
<CodeExample language="python" filename="minimal_node.py">
...
</CodeExample>

## 2.2 Publisher/Subscriber Pattern
The pub/sub pattern enables...

### 2.2.1 Creating a Publisher
[Step-by-step with code]

### 2.2.2 Exercise: Build a Subscriber
<ExerciseBlock title="Temperature Monitor" difficulty="beginner">
...
</ExerciseBlock>

## 2.3 Quality of Service (QoS)
QoS policies control message delivery...

## Key Takeaways
- Nodes are independent processes...
- Topics use pub/sub pattern...
- QoS affects reliability...

## Next Steps
- Try [Chapter 3: Python with rclpy](./chapter-3-python-rclpy)
- Explore [Assessment 2](../../assessments/module-1/assessment-2)
```

---

## 4. Code Example Metadata

### 4.1 Code Example File Naming

**Convention**:
```
static/code-examples/module-1/{complete|skeleton}/chapterX_example_name.{py|xml|launch.py}
```

**Examples**:
- `chapter3_minimal_publisher.py` — Complete publisher example
- `chapter3_minimal_publisher_skeleton.py` — Skeleton with TODOs
- `chapter4_humanoid_arm.urdf` — URDF robot description
- `chapter5_multi_node_launch.py` — Launch file example

### 4.2 Code Example Embedded Metadata

**In-File Documentation** (for Python):
```python
#!/usr/bin/env python3
"""
[Example Name]

ROS 2 Distribution: Humble
Language: Python 3.10+
Package: N/A (standalone script) OR <package_name>
Difficulty: beginner | intermediate | advanced
Estimated Time: 15 min

Description:
Brief description of what this code demonstrates.

Related Concepts:
- Chapter 3, Section 3.2: Publishers and Subscribers
- ROS 2 Docs: rclpy.Node API

Usage:
    ros2 run <package> <script_name>
    OR
    python3 chapter3_minimal_publisher.py

Expected Output:
    [INFO] [timestamp] [minimal_publisher]: Publishing: 'Hello World: 0'
"""
```

**In-File Documentation** (for URDF):
```xml
<?xml version="1.0"?>
<!--
  Humanoid Arm URDF Example

  ROS 2 Distribution: Humble
  Difficulty: intermediate
  Estimated Time: 30 min

  Description:
  URDF model of a 3-DOF humanoid arm (shoulder, elbow, wrist).

  Related Concepts:
  - Chapter 4, Section 4.2: Links and Joints
  - URDF Spec: http://wiki.ros.org/urdf/XML

  Visualization:
  ros2 launch urdf_tutorial display.launch.py model:=humanoid_arm.urdf
-->
<robot name="humanoid_arm">
  <!-- Links and joints -->
</robot>
```

### 4.3 Code Example Metadata in MDX

When referencing code in MDX, use this pattern:

```mdx
<CodeExample
  language="python"
  filename="chapter3_minimal_publisher.py"
  difficulty="beginner"
  estimatedTime={15}
  relatedConcepts={["Chapter 3.2: Publishers", "rclpy.Node API"]}
  showLineNumbers={true}
  highlightLines={[5, 12-15]}
  solutionCode={require('!!raw-loader!@site/static/code-examples/module-1/complete/chapter3_minimal_publisher.py').default}
>
{require('!!raw-loader!@site/static/code-examples/module-1/skeleton/chapter3_minimal_publisher.py').default}
</CodeExample>
```

**Props Explanation**:
- `language`: Syntax highlighting language
- `filename`: Display filename in code block header
- `difficulty`: Show difficulty badge
- `estimatedTime`: Show "~15 min" badge
- `relatedConcepts`: Link to chapter sections
- `showLineNumbers`: Enable line numbers
- `highlightLines`: Emphasize specific lines
- `solutionCode`: If provided, show "View Solution" toggle button

---

## 5. Exercise Structure

### 5.1 Exercise Metadata

```yaml
# Embedded in ExerciseBlock component
title: "Build a Multi-Node System"
difficulty: intermediate  # beginner | intermediate | advanced
estimatedTime: 45  # minutes
prerequisites: ["Chapter 2.1", "Chapter 3.2"]
objectives:
  - Create a publisher node that emits sensor data
  - Create a subscriber node that processes sensor data
  - Launch both nodes with a launch file
starterCode: "path/to/skeleton/code.py"
solutionCode: "path/to/complete/code.py"
hints:
  - "Use rclpy.create_node() to instantiate nodes"
  - "Remember to set QoS to RELIABLE for sensor data"
  - "Test with `ros2 topic echo /sensor_data` before implementing subscriber"
```

### 5.2 Exercise Types

| Type | Description | Example | Component |
|------|-------------|---------|-----------|
| **Guided Exercise** | Step-by-step instructions with TODOs | "Fill in the missing publisher code" | `<ExerciseBlock type="guided">` |
| **Challenge Exercise** | Only requirements given, no scaffolding | "Build a service that computes distance" | `<ExerciseBlock type="challenge">` |
| **Debugging Exercise** | Fix broken code | "The subscriber isn't receiving messages. Debug it." | `<ExerciseBlock type="debugging">` |
| **Extension Exercise** | Modify working code | "Add a parameter to change publish rate" | `<ExerciseBlock type="extension">` |

### 5.3 Exercise MDX Usage

```mdx
<ExerciseBlock
  title="Build a Temperature Monitor"
  difficulty="beginner"
  estimatedTime={30}
  type="guided"
  objectives={[
    "Create a publisher that emits temperature readings",
    "Create a subscriber that logs temperature values",
    "Test with `ros2 topic echo`"
  ]}
  starterCode="chapter3_temperature_monitor_skeleton.py"
  solutionCode="chapter3_temperature_monitor_complete.py"
  hints={[
    "Use Float32 message type from std_msgs",
    "Set publish rate to 1 Hz with create_timer(1.0, callback)"
  ]}
>

## Problem Statement
You are building a temperature monitoring system for a humanoid robot's joint motors. Create a ROS 2 publisher that simulates temperature sensor readings and a subscriber that logs them.

## Requirements
1. **Publisher Node** (`temp_publisher`):
   - Publishes to `/motor/temperature` topic
   - Message type: `std_msgs/msg/Float32`
   - Publish rate: 1 Hz
   - Simulated temperature: 30.0 + random noise

2. **Subscriber Node** (`temp_subscriber`):
   - Subscribes to `/motor/temperature`
   - Logs temperature to console with warning if > 80°C

## Getting Started
Download the starter code:
```bash
wget https://example.com/chapter3_temperature_monitor_skeleton.py
```

Fill in the TODOs and test your implementation.

## Testing
```bash
# Terminal 1: Run publisher
python3 temp_publisher.py

# Terminal 2: Echo topic
ros2 topic echo /motor/temperature

# Terminal 3: Run subscriber
python3 temp_subscriber.py
```

Expected output: Temperature values logged every second.

</ExerciseBlock>
```

---

## 6. Assessment Structure

### 6.1 Assessment Front Matter

**File**: `docs/assessments/module-1/assessment-X.mdx`

```yaml
---
title: "Assessment 2: Multi-Node Communication System"
module: 1
chapter: 2
points: 20  # Out of 100 for entire module
difficulty: intermediate
estimated_time: 120  # minutes
submission_format: github_repo
due_date: "Week 3, Friday 11:59 PM"
rubric_version: 1.0
---
```

### 6.2 Assessment Content Structure

```markdown
# Assessment 2: Multi-Node Communication System

## Overview
Build a ROS 2 system that demonstrates inter-node communication using topics and services.

## Learning Objectives Assessed
- [ ] Create publishers and subscribers (LO2)
- [ ] Implement service clients and servers (LO3)
- [ ] Configure QoS policies (LO4)
- [ ] Debug multi-node systems (LO5)

## Scenario
You are developing a monitoring system for a humanoid robot. The system must:
- Collect sensor data from multiple sources (simulated)
- Process data and detect anomalies
- Provide a diagnostic service on demand

## Functional Requirements
1. **Sensor Node** (publisher):
   - Publishes to `/sensors/imu`, `/sensors/camera_status`
   - 10 Hz publish rate
   - Use appropriate QoS for real-time data

2. **Monitor Node** (subscriber + service server):
   - Subscribes to sensor topics
   - Detects anomalies (simulated logic)
   - Provides `/diagnostics` service (returns system health status)

3. **Client Node** (service client):
   - Calls `/diagnostics` service every 5 seconds
   - Logs health status to console

## Technical Requirements
- ROS 2 Humble Hawksbill
- Python 3.10+ with rclpy
- Must include:
  - `package.xml` with dependencies
  - `setup.py` with entry points
  - `README.md` with usage instructions
  - Launch file to start all nodes

## Submission
1. Create a GitHub repository: `<your-username>-module1-assessment2`
2. Repository structure:
   ```
   assessment2_ws/
   ├── src/
   │   └── sensor_monitor/
   │       ├── sensor_monitor/
   │       │   ├── sensor_node.py
   │       │   ├── monitor_node.py
   │       │   └── client_node.py
   │       ├── launch/
   │       │   └── system_launch.py
   │       ├── package.xml
   │       ├── setup.py
   │       └── README.md
   └── README.md  # Root README with overview
   ```
3. Submit repository URL via Canvas by [due_date]

## Rubric

| Criterion | Exemplary (100%) | Proficient (80%) | Developing (60%) | Beginning (40%) |
|-----------|------------------|------------------|------------------|-----------------|
| **Functionality** (40%) | All nodes work flawlessly, system meets all requirements | Minor bugs, core features work, 1 requirement missing | Multiple features incomplete, significant bugs | Does not run or missing major functionality |
| **Code Quality** (30%) | Clean, well-documented, follows PEP 8, excellent error handling | Mostly clean, adequate docs, minor style issues | Inconsistent style, limited docs, poor error handling | Hard to read, no docs, no error handling |
| **ROS 2 Best Practices** (20%) | Proper QoS, node lifecycle, parameter usage, logging | Good practices, minor issues (e.g., hardcoded values) | Some practices ignored, QoS defaults used without consideration | Poor practices, no consideration of ROS 2 patterns |
| **Documentation** (10%) | Comprehensive README, usage examples, troubleshooting, docstrings | Good README, basic usage, some docstrings | Minimal README, no usage examples, few docstrings | No README or documentation |

**Total Points**: 20 / 100 (Module 1 total)

## Grading Notes
- **Late Submission**: -10% per day (max 3 days)
- **Plagiarism**: Automatic 0 (see course honor code)
- **Partial Credit**: Available for incomplete but well-documented attempts

## Resources
- [Chapter 2: Nodes and Topics](../../docs/module-1-ros2/chapter-2-nodes-topics)
- [Chapter 3: Python with rclpy](../../docs/module-1-ros2/chapter-3-python-rclpy)
- [ROS 2 Humble Docs](https://docs.ros.org/en/humble/)
- [Office Hours](https://calendar.example.com/office-hours)
```

### 6.3 Grading Rubric CSV (for LMS import)

**File**: `assessments/module-1/rubrics/assessment-2-rubric.csv`

```csv
Criterion,Weight,Exemplary,Proficient,Developing,Beginning
Functionality,40%,All nodes work flawlessly...,Minor bugs...,Multiple features...,Does not run...
Code Quality,30%,Clean well-documented...,Mostly clean...,Inconsistent style...,Hard to read...
ROS 2 Best Practices,20%,Proper QoS node lifecycle...,Good practices...,Some practices...,Poor practices...
Documentation,10%,Comprehensive README...,Good README...,Minimal README...,No README...
```

---

## 7. Component Usage Patterns

### 7.1 When to Use Each Component

| Component | Use When | Don't Use When |
|-----------|----------|----------------|
| **LearningObjectives** | At start of every chapter (required) | N/A (always use) |
| **Prerequisites** | At start of every chapter (required) | N/A (always use) |
| **CodeExample** | Showing code with skeleton/solution toggle | Inline snippets <10 lines (use markdown code blocks) |
| **ExerciseBlock** | Structured hands-on practice (15+ min) | Quick 2-minute "try this" tasks (use callouts) |
| **ConceptCallout** | Highlighting key concepts, definitions | General tips (use `:::info` admonitions) |
| **AssessmentChecklist** | Assessment objective tracking | Generic checklists (use markdown lists) |
| **ROSVersionBadge** | First mention of ROS 2 in chapter | Every paragraph (overuse) |

### 7.2 Component Import Pattern (Per Chapter)

**Standard Imports** (top of every chapter MDX file):
```mdx
---
# Front matter here
---

import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';
import CodeExample from '@site/src/components/learning/CodeExample';
import ExerciseBlock from '@site/src/components/learning/ExerciseBlock';
import ConceptCallout from '@site/src/components/learning/ConceptCallout';

<LearningObjectives objectives={frontMatter.learning_objectives} />
<Prerequisites prereqs={frontMatter.prerequisites} estimatedTime={frontMatter.estimated_time} />

# {frontMatter.title}

<!-- Chapter content -->
```

### 7.3 MDX Best Practices

**DO**:
- ✅ Import components at top of file
- ✅ Use `frontMatter.X` to access metadata
- ✅ Wrap JSX components in blank lines (for MDX parser)
- ✅ Use self-closing tags when no children: `<Component />`
- ✅ Pass props as JSX: `objectives={frontMatter.learning_objectives}`

**DON'T**:
- ❌ Inline JavaScript expressions in Markdown (use components)
- ❌ Mix HTML and JSX syntax
- ❌ Forget blank lines around JSX components (causes parsing errors)
- ❌ Use `class` attribute (use `className` for JSX)

---

## 8. Data Model Summary

### 8.1 Key Entities

| Entity | Schema File | Validation Script |
|--------|-------------|-------------------|
| Chapter Front Matter | `.specify/schemas/chapter-frontmatter.schema.json` | `scripts/validate-metadata.js` |
| Code Example Metadata | Embedded in file docstrings | Manual review |
| Exercise Metadata | Props in `<ExerciseBlock>` | Component PropTypes |
| Assessment Metadata | Front matter in `assessment-X.mdx` | `validate-metadata.js` (extended) |

### 8.2 File Naming Conventions

| File Type | Pattern | Example |
|-----------|---------|---------|
| Chapter MDX | `chapter-X-slug.mdx` | `chapter-3-python-rclpy.mdx` |
| Code Example (Complete) | `chapterX_example_name.py` | `chapter3_minimal_publisher.py` |
| Code Example (Skeleton) | `chapterX_example_name_skeleton.py` | `chapter3_minimal_publisher_skeleton.py` |
| Assessment MDX | `assessment-X.mdx` | `assessment-2.mdx` |
| Diagram (SVG) | `slug-name.svg` | `node-topic-communication.svg` |
| Diagram Source (draw.io) | `slug-name.drawio` | `node-topic-communication.drawio` |

### 8.3 Directory Structure (Complete)

```
docs/
├── module-1-ros2/
│   ├── index.mdx                    # Module landing page
│   ├── chapter-1-intro-ros2.mdx
│   ├── chapter-2-nodes-topics.mdx
│   ├── chapter-3-python-rclpy.mdx
│   ├── chapter-4-urdf-humanoid.mdx
│   └── chapter-5-launch-packages.mdx
├── assessments/
│   └── module-1/
│       ├── assessment-1.mdx
│       ├── assessment-2.mdx
│       ├── assessment-3.mdx
│       ├── assessment-4.mdx
│       ├── assessment-5.mdx
│       └── rubrics/
│           ├── assessment-1-rubric.csv
│           ├── assessment-2-rubric.csv
│           └── ...

static/
├── code-examples/
│   └── module-1/
│       ├── complete/
│       │   ├── chapter1_hello_ros2.sh
│       │   ├── chapter2_minimal_node.py
│       │   ├── chapter3_minimal_publisher.py
│       │   ├── chapter3_minimal_subscriber.py
│       │   ├── chapter3_service_server.py
│       │   ├── chapter3_service_client.py
│       │   ├── chapter4_humanoid_arm.urdf
│       │   └── chapter5_multi_node_launch.py
│       └── skeleton/
│           ├── chapter2_minimal_node_skeleton.py
│           ├── chapter3_minimal_publisher_skeleton.py
│           └── ...
├── img/
│   └── module-1/
│       ├── diagrams/
│       │   ├── ros2-architecture.svg
│       │   ├── dds-middleware.svg
│       │   ├── node-topic-communication.svg
│       │   ├── qos-policy-diagram.svg
│       │   ├── urdf-hierarchy-tree.svg
│       │   └── launch-file-execution.svg
│       └── screenshots/
│           ├── ros2-cli-demo.png
│           ├── vscode-ros-extension.png
│           └── rviz2-humanoid-visualization.png
└── diagrams-src/
    └── module-1/
        ├── ros2-architecture.drawio
        ├── dds-middleware.drawio
        └── ...

.specify/
└── schemas/
    └── chapter-frontmatter.schema.json

src/
└── components/
    └── learning/
        ├── CodeExample.tsx
        ├── ExerciseBlock.tsx
        ├── ConceptCallout.tsx
        ├── AssessmentChecklist.tsx
        └── ROSVersionBadge.tsx
```

---

## 9. Phase 1 Checklist (Data Model)

- [x] Define module → chapter → section hierarchy
- [x] Create JSON Schema for chapter front matter
- [x] Define section types and content flow pattern
- [x] Specify code example metadata (in-file + MDX props)
- [x] Design exercise structure and types
- [x] Define assessment front matter and rubric structure
- [x] Document component usage patterns
- [x] Establish file naming conventions
- [x] Map complete directory structure

**Status**: Data Model Complete ✅
**Next**: Create `quickstart.md` (authoring guide) and `contracts/` (component specs)

---

## References

- [JSON Schema Draft-07](https://json-schema.org/draft-07/schema)
- [Docusaurus Front Matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Bloom's Taxonomy Verbs](https://tips.uark.edu/using-blooms-taxonomy/)
