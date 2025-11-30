# Quickstart Guide: Chapter Template System

**Feature**: `002-chapter-template-system` | **Date**: 2025-11-30 | **Phase**: 1.3

## Overview

This guide helps authors quickly start writing chapters using the standardized chapter template system. It covers template usage, metadata requirements, component integration, and validation workflow.

---

## 🚀 Quick Start (5 Minutes)

### 1. Copy the Template

```bash
# Copy the chapter template to your module directory
cp .specify/templates/chapter-template.md docs/your-module/your-chapter.md
```

### 2. Fill in the Frontmatter

```yaml
---
title: Your Chapter Title Here
description: Brief 1-2 sentence description for SEO (120-160 characters ideal)
keywords: [keyword1, keyword2, keyword3]  # 3-10 keywords
sidebar_position: 1  # Order in sidebar
learning_objectives:
  - Understand [concept or skill]
  - Apply [technique or method]
  - [2-5 objectives using Bloom's verbs]
prerequisites:
  - docs/fundamentals/prerequisite-chapter-1
  - docs/module-x/prerequisite-chapter-2
estimated_time: 30  # Minutes (5-180)
content_type: tutorial  # tutorial | concept | hands-on-lab | reference
difficulty: beginner  # beginner | intermediate | advanced
---
```

### 3. Choose Your Content Type

Read the decision tree in the template header and delete unused sections based on your chosen `content_type`:

- **Tutorial**: Step-by-step guide → Keep numbered steps, exercises
- **Concept**: Explanatory content → Keep conceptual sections, key takeaways
- **Hands-on Lab**: Practical exercise → Keep setup, task, validation sections
- **Reference**: Quick lookup → Keep tables, minimal prose

### 4. Write Your Content

Follow the template structure and inline comments for guidance on each section.

### 5. Validate Before Committing

```bash
# Run build to validate metadata
npm run build

# If validation passes, commit your changes
git add docs/your-module/your-chapter.md
git commit -m "docs: add [your chapter title]"
```

---

## 📋 Detailed Walkthrough

### Step 1: Understanding Content Types

Choose the content type that best matches your chapter's primary purpose:

#### Tutorial

- **Purpose**: Teach a specific procedure or workflow
- **Structure**: Step-by-step numbered instructions with code examples
- **Tone**: Second person ("you will..."), imperative
- **Example**: "Build Your First Robot Controller"
- **Emphasis**: Learning Objectives, Prerequisites, Exercises

**When to use**:
- Teaching how to accomplish a specific task
- Providing hands-on coding walkthroughs
- Building something from scratch

#### Concept

- **Purpose**: Explain theory, principles, or underlying concepts
- **Structure**: Expository text with diagrams and definitions
- **Tone**: Third person, declarative
- **Example**: "Understanding Inverse Kinematics"
- **Emphasis**: Key Takeaways, References, Conceptual Diagrams

**When to use**:
- Explaining theoretical foundations
- Introducing new terminology or frameworks
- Providing deep conceptual understanding

#### Hands-on Lab

- **Purpose**: Provide practical application exercise
- **Structure**: Problem statement → Guided implementation → Validation
- **Tone**: Second person, action-oriented
- **Example**: "Lab: Calibrate Your Robot's Sensors"
- **Emphasis**: Prerequisites, Exercises, Troubleshooting

**When to use**:
- Reinforcing concepts through practice
- Providing real-world application scenarios
- Testing learner understanding

#### Reference

- **Purpose**: Quick lookup of APIs, formulas, or specifications
- **Structure**: Tables, lists, code signatures with minimal explanation
- **Tone**: Neutral, concise
- **Example**: "ROS Message Types Reference"
- **Emphasis**: Tables, Code Blocks, Minimal Prose

**When to use**:
- Documenting APIs or command-line interfaces
- Providing formula sheets or conversion tables
- Creating glossaries or appendices

---

### Step 2: Writing Learning Objectives

Learning objectives should use **Bloom's Taxonomy verbs** and be **measurable**.

#### Bloom's Taxonomy Levels

| Level | Verbs | Example |
|-------|-------|---------|
| **Remember** | Define, Identify, List, Recall | "Identify the components of a robotic arm" |
| **Understand** | Explain, Describe, Summarize | "Explain how forward kinematics works" |
| **Apply** | Calculate, Demonstrate, Implement | "Calculate the end-effector position" |
| **Analyze** | Compare, Examine, Investigate | "Compare DH parameters for different robots" |
| **Evaluate** | Assess, Critique, Justify | "Evaluate the accuracy of a kinematic model" |
| **Create** | Build, Design, Develop | "Design a custom robot gripper mechanism" |

#### Good vs. Bad Examples

| ❌ Bad | ✅ Good |
|--------|---------|
| "Know about sensors" | "Identify three types of robot sensors and their applications" |
| "Learn kinematics" | "Calculate forward kinematics for a 3-DOF manipulator" |
| "Understand ROS" | "Explain the publisher-subscriber pattern in ROS" |
| "Be familiar with Python" | "Implement a PID controller in Python" |

#### Template for Writing Objectives

```
[Bloom's Verb] [specific concept/skill] [context or constraint]

Examples:
- Understand the Denavit-Hartenberg convention for serial manipulators
- Calculate transformation matrices given DH parameters
- Implement forward kinematics for a 2-DOF planar robot
- Analyze the workspace of a robotic arm configuration
```

---

### Step 3: Structuring Prerequisites

#### Prerequisite Path Format

```yaml
prerequisites:
  - docs/fundamentals/coordinate-systems      # Module/chapter path
  - docs/module-1/introduction                # Relative to docs/
  - docs/appendices/python-refresher          # Can be from any module
```

#### When to List Prerequisites

**Include if**:
- The chapter uses concepts explained in another chapter
- Readers need specific mathematical background (e.g., linear algebra)
- Code examples build on previous implementations

**Don't include if**:
- The prerequisite is part of the expected baseline (e.g., basic programming for all chapters)
- The concept is re-explained in the current chapter
- The dependency is weak or tangential

#### Empty Prerequisites

```yaml
prerequisites: []  # Valid for introductory chapters or standalone references
```

---

### Step 4: Using Components

The template includes four custom MDX components:

#### 1. LearningObjectives Component

**Automatically renders** at the start of the chapter. No manual placement needed—just define `learning_objectives` in frontmatter.

```mdx
<!-- Component imports at top of file -->
import LearningObjectives from '@site/src/components/LearningObjectives';

<!-- Component usage -->
<LearningObjectives objectives={frontMatter.learning_objectives} />
```

**Output**: Styled callout box with bulleted list of objectives.

#### 2. Prerequisites Component

**Automatically renders** after learning objectives. Displays prerequisite links and estimated reading time.

```mdx
import Prerequisites from '@site/src/components/Prerequisites';

<Prerequisites
  prereqs={frontMatter.prerequisites}
  estimatedTime={frontMatter.estimated_time}
/>
```

**Output**: Info box with prerequisite chapter links and time badge.

#### 3. KeyTakeaways Component

**Manual placement** at chapter end. Wraps summary content in a styled box.

```mdx
import KeyTakeaways from '@site/src/components/KeyTakeaways';

## Summary

<KeyTakeaways>
  - Forward kinematics calculates end-effector pose from joint angles
  - DH parameters provide a standard convention for robot modeling
  - Transformation matrices compose to produce the final pose
  - Different robot configurations use the same framework
</KeyTakeaways>
```

**Output**: Styled callout with checkmark icon and summary bullets.

#### 4. ExerciseBlock Component

**Manual placement** in Exercises section. Creates interactive exercises with progressive hints.

```mdx
import ExerciseBlock from '@site/src/components/ExerciseBlock';

## Exercises

<ExerciseBlock title="Calculate Forward Kinematics" difficulty="intermediate">
  {/* SECTION 1: Problem Statement */}
  <div>
    <p>Given a 2-DOF robot arm with link lengths L1=1m and L2=0.8m...</p>
    <p>Calculate the end-effector position when θ1=30° and θ2=45°.</p>

    ```python
    # Starter code
    def forward_kinematics(theta1, theta2, l1=1.0, l2=0.8):
        # Your solution here
        pass
    ```
  </div>

  {/* SECTION 2: Hints (each <p> is one hint) */}
  <div>
    <p>Recall the DH transformation matrix formula: T = Rot(z,θ) × Trans(z,d) × Trans(x,a) × Rot(x,α)</p>
    <p>Start by computing the transformation from base to joint 1.</p>
    <p>Remember to convert degrees to radians using np.radians().</p>
  </div>

  {/* SECTION 3: Solution */}
  <div>
    ```python
    import numpy as np

    def forward_kinematics(theta1, theta2, l1=1.0, l2=0.8):
        # Convert to radians
        theta1_rad = np.radians(theta1)
        theta2_rad = np.radians(theta2)

        # Calculate position
        x = l1 * np.cos(theta1_rad) + l2 * np.cos(theta1_rad + theta2_rad)
        y = l1 * np.sin(theta1_rad) + l2 * np.sin(theta1_rad + theta2_rad)

        return (x, y)

    # Expected output: approximately (1.27, 1.27)
    ```

    <p><strong>Explanation</strong>: The end-effector position is computed by summing the x and y contributions from each link...</p>
  </div>
</ExerciseBlock>
```

**Output**: Interactive exercise with collapsible hints that unlock progressively as learners submit attempts.

---

### Step 5: Validation and Error Handling

#### Metadata Validation

Validation runs automatically during `npm run build` via the `prebuild` script.

```bash
# Validation script runs automatically
npm run build

# Manual validation (if needed)
node scripts/validate-metadata.js
```

#### Common Validation Errors

**Error: `title: must NOT be longer than 100 characters`**

```yaml
# ❌ Too long
title: A Comprehensive Deep-Dive into the Theory and Practice of Forward Kinematics for Serial Manipulators in Robotics

# ✅ Concise
title: Forward Kinematics for Serial Manipulators
```

**Error: `learning_objectives: must NOT have fewer than 2 items`**

```yaml
# ❌ Only one objective
learning_objectives:
  - Understand forward kinematics

# ✅ At least two
learning_objectives:
  - Understand the DH convention for robot modeling
  - Calculate transformation matrices for manipulators
```

**Error: `description: must NOT be shorter than 10 characters`**

```yaml
# ❌ Too brief
description: Kinematics chapter

# ✅ Descriptive SEO-friendly
description: Learn how to calculate robot end-effector positions using forward kinematics transformations with practical examples.
```

**Error: `prerequisites[0]: must match pattern "^docs/.+$"`**

```yaml
# ❌ Missing docs/ prefix
prerequisites:
  - fundamentals/coordinate-systems

# ✅ Correct path
prerequisites:
  - docs/fundamentals/coordinate-systems
```

**Error: `learning_objectives[0]: must match pattern "^(Understand|...)"`**

```yaml
# ❌ Doesn't start with Bloom's verb
learning_objectives:
  - "The student will understand kinematics"

# ✅ Starts with Bloom's verb
learning_objectives:
  - "Understand kinematics for robotic manipulators"
```

#### Build Failure Workflow

```
1. Author edits chapter.md
2. Author runs: npm run build
3. Validation script runs (prebuild hook)
4. ❌ Validation fails → Build stops with error messages
5. Author fixes errors based on clear output
6. Author runs: npm run build
7. ✅ Validation passes → Build continues
8. Author commits changes
```

---

## 📚 Examples

### Example 1: Tutorial Chapter

```yaml
---
title: Build a Simple PID Controller
description: Implement a PID controller from scratch in Python and tune its parameters to stabilize a simulated robot's motion.
keywords: [PID, control theory, robotics, Python, tuning, feedback control]
sidebar_position: 5
learning_objectives:
  - Understand the PID formula and its three components
  - Implement a PID controller class in Python
  - Tune PID gains using trial-and-error methods
  - Apply the controller to stabilize robot motion
prerequisites:
  - docs/fundamentals/control-systems
  - docs/fundamentals/python-basics
estimated_time: 60
content_type: tutorial
difficulty: intermediate
---
```

### Example 2: Concept Chapter

```yaml
---
title: Understanding Sensor Fusion
description: Explore how sensor fusion combines data from multiple sensors to improve robot perception accuracy and reliability.
keywords: [sensor fusion, Kalman filter, sensors, perception, robotics, uncertainty]
sidebar_position: 12
learning_objectives:
  - Explain the purpose of sensor fusion in robotics
  - Describe the Kalman filter algorithm conceptually
  - Compare complementary filters and Kalman filters
prerequisites:
  - docs/sensors/sensor-types
  - docs/fundamentals/probability
estimated_time: 45
content_type: concept
difficulty: advanced
---
```

### Example 3: Hands-on Lab Chapter

```yaml
---
title: "Lab: Calibrate Your Robot's IMU"
description: Hands-on lab exercise guiding you through the process of calibrating an Inertial Measurement Unit (IMU) sensor for accurate orientation tracking.
keywords: [IMU, calibration, sensors, hands-on lab, practical exercise, accelerometer, gyroscope]
sidebar_position: 8
learning_objectives:
  - Execute the IMU calibration procedure correctly
  - Validate calibration results using test data
prerequisites:
  - docs/sensors/imu-basics
estimated_time: 90
content_type: hands-on-lab
difficulty: beginner
tags: [lab, hardware, sensors]
---
```

### Example 4: Reference Chapter

```yaml
---
title: ROS 2 Message Types Reference
description: Comprehensive reference of common ROS 2 message types with field definitions and usage examples for quick lookup.
keywords: [ROS 2, messages, reference, API, message types, documentation]
sidebar_position: 100
learning_objectives:
  - Locate ROS 2 message type definitions quickly
  - Identify the correct message type for common use cases
prerequisites: []
estimated_time: 10
content_type: reference
difficulty: beginner
pagination_prev: null
pagination_next: null
---
```

---

## 🔧 Troubleshooting

### Problem: Component not rendering

**Symptoms**: `<LearningObjectives />` appears as plain text instead of rendering

**Solution**:
1. Check that import statement is at top of file:
   ```mdx
   import LearningObjectives from '@site/src/components/LearningObjectives';
   ```
2. Ensure component is registered in `src/theme/MDXComponents.js` (should be done during implementation)
3. Restart dev server: `npm start`

### Problem: Hints not unlocking in ExerciseBlock

**Symptoms**: "Submit Attempt" button doesn't unlock hints

**Solution**:
- Check that hints are wrapped in a single `<div>` as second child
- Each hint should be a separate `<p>` element within that div
- Verify JavaScript is enabled in browser

### Problem: Prerequisite links broken

**Symptoms**: Clicking prerequisite link results in 404

**Solution**:
1. Verify path matches actual file location:
   ```
   docs/fundamentals/coordinate-systems.md → docs/fundamentals/coordinate-systems
   ```
2. Check sidebar_position in prerequisite chapter (ensures it's in sidebar)
3. Run `npm run build` to regenerate routes

---

## 📖 Additional Resources

- **Data Model Documentation**: `specs/002-chapter-template-system/data-model.md`
- **Research Findings**: `specs/002-chapter-template-system/research.md`
- **TypeScript Contracts**: `specs/002-chapter-template-system/contracts/`
- **JSON Schema**: `specs/002-chapter-template-system/contracts/chapter-metadata-schema.json`
- **Docusaurus MDX Docs**: https://docusaurus.io/docs/markdown-features
- **Bloom's Taxonomy Guide**: https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/

---

## ✅ Checklist Before Publishing

Use this checklist before committing your chapter:

- [ ] Frontmatter complete with all 9 required fields
- [ ] Learning objectives use Bloom's taxonomy verbs
- [ ] Description is 120-160 characters (SEO optimized)
- [ ] 3-10 keywords provided
- [ ] Correct content_type chosen based on decision tree
- [ ] Component imports at top of file
- [ ] `<LearningObjectives>` and `<Prerequisites>` components placed after frontmatter
- [ ] `<KeyTakeaways>` component at chapter end (if applicable)
- [ ] Exercises use `<ExerciseBlock>` component (if applicable)
- [ ] Code blocks have language specified (```python, ```javascript, etc.)
- [ ] All images have alt text for accessibility
- [ ] Internal links use relative paths (docs/...)
- [ ] `npm run build` passes without validation errors
- [ ] Preview looks correct in dev server (`npm start`)

---

**Quick Tip**: Bookmark this guide and refer to it while writing your first few chapters. The process becomes second nature after 2-3 chapters!

**Need Help?**: Check the example chapters in `docs/examples/` or consult the project style guide in `docs/references/content-style-guide.md`.
