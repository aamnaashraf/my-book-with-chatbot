# Book Layout Audit & Recommendations

**Date**: 2025-11-30
**Project**: Physical AI & Humanoid Robotics Textbook
**Purpose**: Analyze existing content structure and recommend robust book layout specifications

---

## Executive Summary

This audit evaluates the current book layout implementation against best practices for educational technical documentation. The project has a solid foundation (metadata schema, sidebar structure, basic content), but lacks standardized chapter templates, interactive learning components, and visual consistency.

**Key Findings**:
- ✅ Strong metadata schema (9 fields)
- ✅ Clear module organization
- ⚠️ Inconsistent chapter structure across files
- ❌ No chapter template for content authors
- ❌ No interactive learning components (quizzes, exercises, code playgrounds)
- ❌ Limited use of Docusaurus features (admonitions, tabs, etc.)

**Recommendation**: Create **3 incremental feature specs** in priority order:
1. `002-chapter-template-system` (HIGHEST PRIORITY)
2. `003-learning-components` (MEDIUM PRIORITY)
3. `004-visual-design-system` (POLISH)

---

## 1. Current State Audit

### 1.1 Existing Content Files Analyzed

| File | Type | Frontmatter | Structure | Components |
|------|------|-------------|-----------|------------|
| `docs/intro.md` | Landing | ✅ Complete | ⚠️ Informal | Basic buttons |
| `docs/module-1-ros2/index.md` | Module Overview | ✅ Complete | ✅ Consistent | None |
| `docs/module-2-digital-twin/index.md` | Module Overview | ✅ Complete | ✅ Consistent | Table |
| `docs/setup/workstation.md` | Setup Guide | ✅ Complete | ⚠️ Informal | Checklist, table |
| `docs/references/glossary.md` | Reference | ✅ Complete | ✅ Consistent | Custom component |

### 1.2 Content Structure Patterns

**Module Index Pages** follow a consistent structure:
```markdown
---
frontmatter (9 fields)
---

# Title

Duration | Estimated Time | Prerequisites

---

## Module Overview
## Why [Topic]?
## Module Structure (Week-by-week breakdown)
## Learning Outcomes (checkbox list)
## Capstone Integration
## Time Commitment
## Assessment
## Next Steps
```

**Setup Guides** use a task-oriented structure:
```markdown
---
frontmatter
---

# Title

Estimated Time | Difficulty

---

## Overview
## Hardware Requirements (tables)
## Installation Steps (numbered, with code blocks)
## Verification Checklist
## Troubleshooting
## Next Steps
```

**Glossary** uses alphabetical organization with custom search component.

### 1.3 Frontmatter Metadata

All files use consistent metadata defined in `contracts/chapter-metadata-schema.json`:

**Required fields**: title, description, keywords, sidebar_position, estimated_time, week, learning_objectives
**Optional fields**: module, prerequisites, assessment_type, difficulty_level, capstone_component

✅ **Strength**: Well-defined schema with validation
⚠️ **Gap**: No template showing how to populate these fields correctly

---

## 2. Pattern Analysis

### 2.1 What's Working Well

1. **Consistent frontmatter**: All files follow metadata schema
2. **Clear module organization**: Nested directories by module
3. **Predictable structure**: Module indexes have similar sections
4. **Learning-focused**: Each module defines objectives and outcomes
5. **Capstone integration**: Explicit connections to final project

### 2.2 Inconsistencies & Problems

| Issue | Impact | Files Affected |
|-------|--------|----------------|
| Varying heading levels | Navigation confusion | `intro.md` uses h2, modules use h2 with `---` dividers |
| Informal vs. formal tone | Inconsistent learning experience | `intro.md` uses casual language, modules are formal |
| No standard code block format | Hard to reference code | Some have line numbers, some don't |
| Mixed use of lists | Visual inconsistency | Some use ✅ emoji, some use `-`, some use `1.` |
| No callout/admonition usage | Important info buried | Zero usage of `:::note`, `:::tip`, etc. |
| No exercise/quiz structure | No self-assessment | Assessment mentioned but not embedded |
| Manual navigation links | Maintenance burden | `intro.md` hardcodes buttons |
| No standard "Next Steps" format | Unclear path forward | Different structures across files |

### 2.3 Missing Elements

**Critical for educational content**:
- [ ] **Learning objective boxes** at chapter start (not just frontmatter)
- [ ] **Prerequisites callout** with links to required prior chapters
- [ ] **Estimated time indicator** in visible location (not just frontmatter)
- [ ] **Exercise/quiz blocks** for self-assessment
- [ ] **Key takeaways summary** at chapter end
- [ ] **Code block enhancements** (copy button, line numbers, syntax highlighting)
- [ ] **Callouts** for warnings, tips, notes, examples
- [ ] **Progress indicators** (e.g., "Chapter 3 of 13")
- [ ] **Previous/Next navigation** between chapters
- [ ] **Table of contents** for long chapters
- [ ] **Breadcrumbs** for navigation context

---

## 3. Gaps Identified

### 3.1 Content Authoring Gaps

❌ **No chapter template** exists in `.specify/templates/`
- Authors must infer structure from existing files
- Risk of inconsistent organization
- No guidance on using Docusaurus features

❌ **No component library documentation**
- Authors don't know what's available (ModuleCard, QuickLinks, GlossarySearch)
- Custom components exist but aren't documented for reuse

❌ **No content style guide**
- When to use emoji? Tone? Voice? Tense?
- How to write learning objectives (Bloom's taxonomy verbs)
- Code comment style, variable naming

### 3.2 Interactive Learning Gaps

❌ **No quiz/exercise components**
- Can't test understanding inline
- Assessments mentioned but not embedded

❌ **No code playground integration**
- Docusaurus supports `live` code blocks (React Live)
- Could embed Python REPL for ROS 2 examples
- No current usage

❌ **No interactive diagrams**
- Could use Mermaid for architecture diagrams
- No current integration

### 3.3 Navigation & Usability Gaps

❌ **No automatic previous/next links**
- Docusaurus provides `DocPreviousVersionLink` and `DocNextVersionLink`
- Not configured

❌ **No breadcrumbs configured**
- Docusaurus provides breadcrumbs by default
- Theme may need customization

❌ **No progress tracking**
- Could show "Week 3 of 13" or "Module 1 of 4"
- Requires custom component

### 3.4 Visual Design Gaps

❌ **No typography system**
- Custom CSS exists (`src/css/custom.css`) but minimal
- No font scale, line height, or weight definitions

❌ **No color palette defined**
- Default Docusaurus theme colors
- No semantic colors (success, warning, error, info)

❌ **No spacing system**
- Inconsistent margins and padding
- No design tokens

---

## 4. Docusaurus Best Practices Research

### 4.1 Content Organization Best Practices

From [Docusaurus official docs](https://docusaurus.io):

**Structured Content** (SEO Best Practice):
- Use CommonMark headings consistently (`#`, `##`, `###`)
- One H1 per page (Docusaurus uses frontmatter `title`)
- Hierarchical heading structure (no skipping levels)
- Descriptive heading text

**Folder Structure** (Flexibility):
- File structure can be decoupled from URL structure
- Use `slug` in frontmatter to override URL
- Use `sidebar_position` to control ordering
- Organize by logical grouping, not arbitrary numbering

### 4.2 Available Docusaurus Features (Currently Underutilized)

#### Admonitions/Callouts
```markdown
:::note
Some **content** with _Markdown_ `syntax`.
:::

:::tip[Custom Title]
Helpful tip for the reader.
:::

:::info
:::warning
:::danger
```

**Use cases for this textbook**:
- `:::note` for definitions, background info
- `:::tip` for best practices, pro tips
- `:::warning` for common pitfalls, gotchas
- `:::danger` for security issues, breaking changes
- `:::info` for additional context, FYI

#### Code Block Enhancements
```jsx
```python {1,4-6} showLineNumbers title="my_robot_node.py"
import rclpy
from rclpy.node import Node

class MyRobotNode(Node):
    def __init__(self):
        super().__init__('my_robot_node')
```
```

**Available features**:
- Line highlighting: `{1,4-6,11}`
- Line numbers: `showLineNumbers`
- Title: `title="filename.py"`
- Language: `python`, `bash`, `yaml`, etc.
- Live editor: `live` (React components only)
- Comment-based highlighting:
  ```python
  # highlight-next-line
  important_code()
  # highlight-start
  multiline_block()
  # highlight-end
  ```

#### Tabs Component
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>
    ```python
    # Python code
    ```
  </TabItem>
  <TabItem value="cpp" label="C++">
    ```cpp
    // C++ code
    ```
  </TabItem>
</Tabs>
```

**Use cases**:
- Show Python vs. C++ ROS 2 examples
- Hardware setup instructions (Workstation vs. Edge Kit vs. Cloud)
- Alternative approaches

#### MDX Components
Docusaurus supports React components in Markdown:
- Custom callouts
- Interactive demos
- Embedded videos
- Progress indicators
- Exercise blocks

---

## 5. Similar Technical Textbook Layouts

### 5.1 Industry Examples

**1. Rust Book (rust-lang.github.io)**
- **Structure**: Numbered chapters, nested sections
- **Components**: Chapter navigation (prev/next), inline exercises, callouts
- **Strengths**: Clear progression, "Fearless Concurrency" branding, excellent code examples
- **Relevance**: Similar technical depth, hands-on focus

**2. The Odin Project**
- **Structure**: Learning paths, projects, knowledge checks
- **Components**: Embedded quizzes, assignment blocks, additional resources
- **Strengths**: Self-assessment built-in, clear objectives, active voice
- **Relevance**: Educational focus, self-paced learning

**3. FreeCodeCamp Curriculum**
- **Structure**: Modular lessons, challenges, projects
- **Components**: Interactive code editor, tests, hints
- **Strengths**: Immediate feedback, gamification, progress tracking
- **Relevance**: Hands-on learning, industry skills

**4. Django Documentation**
- **Structure**: Tutorial + Topic guides + Reference
- **Components**: Code snippets, admonitions, version selectors
- **Strengths**: Multi-audience (beginner to advanced), excellent search
- **Relevance**: Technical documentation standard

**5. Fast.ai Course**
- **Structure**: Weekly lessons, notebooks, forums
- **Components**: Video embeds, Jupyter notebooks, questionnaires
- **Strengths**: Top-down learning, real projects, community
- **Relevance**: Machine learning + robotics, industry practitioners

### 5.2 Pattern Synthesis

**Common elements across successful technical textbooks**:
1. **Clear chapter structure**: Objectives → Content → Summary → Exercises
2. **Multiple content types**: Tutorial, Concept, Reference, Hands-on
3. **Visual hierarchy**: Headings, callouts, code blocks stand out
4. **Self-assessment**: Quizzes, exercises, projects with solutions
5. **Navigation aids**: Breadcrumbs, prev/next, progress indicators
6. **Code-first approach**: Examples before theory, runnable code
7. **Troubleshooting sections**: Common errors, FAQs
8. **Additional resources**: Links to papers, videos, tools

---

## 6. Comparison Matrix

### 6.1 Chapter Structure Comparison

| Element | Current State | Rust Book | Odin Project | Django Docs | Recommendation |
|---------|--------------|-----------|--------------|-------------|----------------|
| **Learning Objectives** | Frontmatter only | Chapter intro | Prominent box | Implicit | ✅ Visible box at top |
| **Prerequisites** | Frontmatter only | Inline links | Callout box | Referenced | ✅ Callout with links |
| **Estimated Time** | Frontmatter only | Not shown | Shown prominently | Not shown | ✅ Show in header |
| **Code Examples** | Basic blocks | Highlighted + runnable | Interactive | Copy button | ✅ All enhancements |
| **Exercises** | External reference | End-of-chapter | Inline challenges | Tutorial format | ✅ Inline + end |
| **Summary** | Manual | "Key Takeaways" | "Check Your Understanding" | "Quick Answer" | ✅ "Key Takeaways" |
| **Navigation** | Manual links | Auto prev/next | Path indicator | Breadcrumbs | ✅ All three |
| **Callouts** | None | Extensive | Yes (note, warning) | Extensive | ✅ 5 types |

### 6.2 Component Comparison

| Component | Current | Should Have | Docusaurus Support | Priority |
|-----------|---------|-------------|-------------------|----------|
| Learning Objectives Box | ❌ | ✅ | Custom MDX | HIGH |
| Prerequisites Callout | ❌ | ✅ | `:::info` | HIGH |
| Code Block with Copy | ❌ | ✅ | Built-in | HIGH |
| Line Numbers | ❌ | ✅ | `showLineNumbers` | MEDIUM |
| Syntax Highlighting | ✅ | ✅ | Built-in | ✅ DONE |
| Admonitions | ❌ | ✅ | Built-in | HIGH |
| Tabs (multi-language) | ❌ | ✅ | `@theme/Tabs` | MEDIUM |
| Exercise Blocks | ❌ | ✅ | Custom MDX | HIGH |
| Quiz Components | ❌ | ✅ | Custom MDX | MEDIUM |
| Key Takeaways Box | ❌ | ✅ | `:::tip` | HIGH |
| Previous/Next Nav | ❌ | ✅ | Theme config | MEDIUM |
| Breadcrumbs | ⚠️ | ✅ | Theme (may need CSS) | LOW |
| Progress Indicator | ❌ | ✅ | Custom component | LOW |
| Table of Contents | ⚠️ | ✅ | Built-in (right sidebar) | ✅ DONE |

---

## 7. Recommendations

### 7.1 Prioritized Feature Specs

#### **PRIORITY 1: Chapter Template System** (`002-chapter-template-system`)

**Scope**: Standardize chapter structure and content authoring

**Deliverables**:
1. **Chapter template** (`.specify/templates/chapter-template.md`)
   - Learning objectives box (visible, not just frontmatter)
   - Prerequisites callout with links
   - Estimated time badge
   - Standard headings structure
   - Key takeaways summary box
   - Exercise/hands-on section
   - References/further reading

2. **Content block types**:
   - Learning Objectives component
   - Prerequisites component
   - Key Takeaways component
   - Exercise Block component
   - Troubleshooting Callout

3. **Code block standards**:
   - Always use syntax highlighting
   - Add `showLineNumbers` for >10 lines
   - Use `title="filename.ext"` for file examples
   - Use line highlighting `{1,4-6}` for teaching
   - Always include copy button (built-in)

4. **Callout usage guidelines**:
   - `:::note` for definitions, background
   - `:::tip` for best practices
   - `:::warning` for common mistakes
   - `:::danger` for security issues
   - `:::info` for FYI context

5. **Navigation enhancements**:
   - Configure automatic prev/next links
   - Add breadcrumbs styling
   - Create "Chapter X of Y" component

**Why Priority 1?**
- Needed immediately for content authoring
- Affects every chapter you write
- Foundational for consistency

#### **PRIORITY 2: Learning Components** (`003-learning-components`)

**Scope**: Add interactive elements for engagement and assessment

**Deliverables**:
1. **Quiz component**:
   - Multiple choice
   - Code output prediction
   - True/False
   - Solution reveal toggle

2. **Exercise block**:
   - Problem statement
   - Starter code
   - Hints (progressive reveal)
   - Solution (collapsible)
   - Submission/validation (future)

3. **Code playground**:
   - Embedded Python REPL (using React Live or iframe)
   - ROS 2 command simulator
   - Syntax highlighting
   - Run button

4. **Interactive diagrams**:
   - Mermaid integration for flowcharts
   - Architecture diagrams
   - State machines

5. **Video embed**:
   - YouTube/Vimeo wrapper
   - Transcript toggle
   - Timestamp links

**Why Priority 2?**
- Enhances engagement after structure is solid
- Enables self-paced learning
- Differentiates from static docs

#### **PRIORITY 3: Visual Design System** (`004-visual-design-system`)

**Scope**: Polish and visual consistency

**Deliverables**:
1. **Typography system** (`src/css/custom.css`):
   - Font scale (12px → 48px)
   - Line heights (1.2, 1.5, 1.8)
   - Font weights (400, 600, 700)

2. **Color palette**:
   - Primary: #0D47A1 (blue)
   - Secondary: #FF6F00 (orange)
   - Success: #2E7D32 (green)
   - Warning: #F57C00 (amber)
   - Error: #C62828 (red)
   - Info: #0288D1 (light blue)
   - Dark mode variants

3. **Spacing system**:
   - Scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px
   - CSS custom properties: `--spacing-sm`, `--spacing-md`, etc.

4. **Component library**:
   - Cards (module cards, chapter cards)
   - Buttons (primary, secondary, ghost)
   - Badges (difficulty, week, module)
   - Alerts (success, warning, error, info)

5. **Responsive breakpoints**:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

6. **Print stylesheet**:
   - PDF export optimization
   - Hide navigation for print
   - Page breaks before h1

**Why Priority 3?**
- Polish after content and structure are solid
- Visual refinement less urgent than usability
- Can be iterated incrementally

### 7.2 Quick Wins (Can Do Now Without New Spec)

1. **Enable code block copy buttons** (already built-in)
2. **Add `showLineNumbers` to existing code blocks**
3. **Replace manual callouts with `:::note`, `:::tip`, etc.**
4. **Add breadcrumbs CSS styling**
5. **Configure `docs` plugin for auto prev/next navigation**
6. **Create first draft of chapter template**

---

## 8. Requirements Questionnaire

Before writing `002-chapter-template-system` spec, answer these questions:

### 8.1 Content Types

**Q1: What content types will the textbook have?**
- [ ] Tutorial (step-by-step, goal-oriented)
- [ ] Concept (explanatory, theory-focused)
- [ ] Hands-on Lab (applied exercise)
- [ ] Reference (lookup, API docs)
- [ ] Assessment (quiz, project)

**Q2: Should each type have a different template?**
- [ ] Yes, separate templates for each
- [ ] No, one flexible template for all
- [ ] Hybrid: base template + type-specific sections

### 8.2 Chapter Structure

**Q3: Standard chapter structure?**
```markdown
# Title

[Learning Objectives Box]
[Prerequisites Callout]
[Estimated Time Badge]

## Introduction
## Core Content (sections vary)
## Hands-On Exercise
## Key Takeaways
## Troubleshooting
## Summary
## References

[Previous/Next Navigation]
```

Agree with this structure? Any additions/removals?

**Q4: Should learning objectives be visible in content?**
- [ ] Yes, as a callout box (in addition to frontmatter)
- [ ] No, frontmatter only (accessible via metadata)

**Q5: Should prerequisites be linked?**
- [ ] Yes, auto-generate links from frontmatter `prerequisites` array
- [ ] No, manual links only
- [ ] Hybrid: auto-generate + manual override

### 8.3 Interactive Elements

**Q6: What exercise formats do you want?**
- [ ] Code challenges (write code, run tests)
- [ ] Multiple choice quizzes
- [ ] True/False questions
- [ ] Code output prediction
- [ ] Debugging exercises
- [ ] Project specifications

**Q7: Should exercises have solutions?**
- [ ] Yes, always (collapsible reveal)
- [ ] No, instructors-only (separate materials)
- [ ] Hybrid: some inline, some external

**Q8: Code playgrounds?**
- [ ] Yes, embedded Python REPL for all ROS 2 examples
- [ ] Yes, but only for specific chapters
- [ ] No, external tools only (Colab, Repl.it links)

### 8.4 Code Blocks

**Q9: Code block standards?**
- [ ] Always show line numbers
- [ ] Only show line numbers for >X lines (X = ?)
- [ ] Author decides per block

**Q10: Code block features to enable?**
- [ ] Copy button (already built-in)
- [ ] Line highlighting for teaching
- [ ] File titles (`title="filename.py"`)
- [ ] Comment-based highlighting
- [ ] Live editing (React Live)

### 8.5 Navigation

**Q11: Chapter navigation?**
- [ ] Automatic prev/next links (Docusaurus built-in)
- [ ] Manual "Next Steps" section with custom links
- [ ] Both

**Q12: Progress indicators?**
- [ ] Show "Week X of 13" or "Module Y of 4"
- [ ] Show percentage complete (requires tracking)
- [ ] No progress indicators

### 8.6 Assessments

**Q13: Where should assessments live?**
- [ ] Embedded inline (within chapter)
- [ ] Separate pages (`docs/assessments/`)
- [ ] Both (inline quizzes + separate projects)

**Q14: Assessment types?**
- [ ] Quizzes (multiple choice, auto-graded)
- [ ] Projects (rubric-based, manual grading)
- [ ] Peer review submissions
- [ ] All of the above

### 8.7 Visual Design

**Q15: Color scheme preference?**
- [ ] Use Docusaurus defaults
- [ ] Custom brand colors (specify palette)
- [ ] Academic/professional theme (blues, grays)
- [ ] Vibrant/energetic theme (oranges, purples)

**Q16: Dark mode?**
- [ ] Support dark mode (theme toggle)
- [ ] Light mode only
- [ ] Dark mode default

---

## 9. Next Steps

### Option A: Proceed with `002-chapter-template-system` (Recommended)

Run:
```bash
/sp.specify 002-chapter-template-system
```

**Initial prompt**:
> "Create a chapter template system for the Physical AI textbook that standardizes content structure across all 50+ chapters. The system must include: (1) A reusable Markdown template with learning objectives box, prerequisites callout, estimated time badge, standard heading structure, key takeaways summary, exercise blocks, and references section; (2) MDX components for Learning Objectives, Prerequisites, Key Takeaways, and Exercise blocks; (3) Code block standards using Docusaurus features (syntax highlighting, line numbers, copy button, line highlighting); (4) Callout usage guidelines (5 types: note, tip, warning, danger, info); (5) Automatic previous/next navigation configuration; (6) Content type taxonomy (Tutorial, Concept, Hands-on Lab, Reference). Must integrate with existing metadata schema (chapter-metadata-schema.json) and support 4 modules + intro/capstone content."

### Option B: Answer Questionnaire First

Review Section 8 questions and provide answers. I will then draft the spec based on your preferences.

### Option C: Quick Wins First

Implement the 6 quick wins (Section 7.2) to improve existing content before creating new specs. This would involve:
1. Updating existing chapters with admonitions
2. Adding code block enhancements
3. Configuring navigation
4. Creating a basic chapter template

---

## Appendix A: File Structure Recommendations

**Current structure** (simplified):
```
docs/
├── intro.md
├── setup/
│   ├── workstation.md
│   ├── edge-kit.md
│   └── cloud.md
├── module-1-ros2/
│   └── index.md
├── module-2-digital-twin/
│   └── index.md
├── module-3-isaac/
│   └── index.md
├── module-4-vla-humanoids/
│   └── index.md
├── capstone/
├── assessments/
└── references/
    └── glossary.md
```

**Recommended structure** (with chapters):
```
docs/
├── intro.md
├── setup/
│   ├── workstation.md
│   ├── edge-kit.md
│   └── cloud.md
├── module-1-ros2/
│   ├── index.md (Module overview)
│   ├── week-3-architecture.md
│   ├── week-3-first-node.md
│   ├── week-4-services.md
│   ├── week-4-actions.md
│   ├── week-5-urdf.md
│   ├── week-5-rviz.md
│   └── week-5-assessment.md
├── module-2-digital-twin/
│   ├── index.md
│   ├── week-6-gazebo-setup.md
│   ├── week-6-world-files.md
│   ├── week-7-unity-setup.md
│   ├── week-7-sensors.md
│   └── week-7-assessment.md
├── module-3-isaac/
│   ├── index.md
│   ├── week-8-isaac-intro.md
│   ├── week-9-vslam.md
│   ├── week-10-nav2.md
│   └── week-10-assessment.md
├── module-4-vla-humanoids/
│   ├── index.md
│   ├── week-11-vla-intro.md
│   ├── week-12-kinematics.md
│   ├── week-13-manipulation.md
│   └── week-13-assessment.md
├── capstone/
│   ├── overview.md
│   ├── voice-component.md
│   ├── navigation-component.md
│   ├── perception-component.md
│   ├── manipulation-component.md
│   └── rubric.md
├── assessments/
│   ├── week-5-ros2-package.md
│   ├── week-7-gazebo-simulation.md
│   ├── week-10-isaac-perception.md
│   └── week-13-capstone.md
└── references/
    ├── glossary.md
    ├── notation.md
    ├── ros2-quick-ref.md
    ├── troubleshooting.md
    └── hardware-comparison.md
```

**Total estimated chapters**: ~50-60 Markdown files

---

## Appendix B: Example Chapter Structure

**Example: `docs/module-1-ros2/week-3-first-node.md`**

```markdown
---
title: "Creating Your First ROS 2 Node"
description: "Learn to create a simple ROS 2 node using rclpy, understand node lifecycle, and communicate via topics"
keywords: [ROS 2, rclpy, node, publisher, subscriber, Python]
sidebar_position: 2
sidebar_label: "First ROS 2 Node"
estimated_time: 1.5
week: 3
module: 1
prerequisites: ["module-1-ros2/week-3-architecture"]
learning_objectives:
  - Create a minimal ROS 2 node using rclpy
  - Implement a publisher to send messages on a topic
  - Implement a subscriber to receive messages from a topic
  - Launch and debug a simple multi-node system
difficulty_level: "beginner"
---

import LearningObjectives from '@site/src/components/LearningObjectives';
import Prerequisites from '@site/src/components/Prerequisites';
import KeyTakeaways from '@site/src/components/KeyTakeaways';
import ExerciseBlock from '@site/src/components/ExerciseBlock';

# Creating Your First ROS 2 Node

<LearningObjectives objectives={frontMatter.learning_objectives} />
<Prerequisites prereqs={frontMatter.prerequisites} estimatedTime={frontMatter.estimated_time} />

---

## Introduction

In this chapter, you'll create your first ROS 2 node—a minimal program that publishes and subscribes to messages. Think of nodes as individual workers in a factory: each has a specific job, and they communicate via conveyor belts (topics).

:::info What You'll Build
A temperature monitoring system with two nodes:
- `sensor_node`: Publishes simulated temperature readings
- `monitor_node`: Subscribes to readings and prints warnings
:::

## Setting Up Your Workspace

First, create a ROS 2 workspace:

```bash title="Terminal" showLineNumbers
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_robot_pkg
cd ~/ros2_ws
colcon build
source install/setup.bash
```

:::tip Pro Tip
Always source your workspace after building: `source install/setup.bash`
:::

## Creating a Publisher Node

Let's create a node that publishes temperature readings every second.

```python title="my_robot_pkg/sensor_node.py" showLineNumbers {14-16}
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        # highlight-next-line
        self.publisher = self.create_publisher(Float32, 'temperature', 10)
        self.timer = self.create_timer(1.0, self.publish_temperature)
        self.get_logger().info('Sensor node started')

    def publish_temperature(self):
        msg = Float32()
        msg.data = 25.0  # Simulated temperature
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}°C')

def main(args=None):
    rclpy.init(args=args)
    node = SensorNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Key points**:
- Line 9: `create_publisher(message_type, topic_name, queue_size)`
- Line 10: Timer calls `publish_temperature()` every 1.0 second
- Lines 14-16: Create message, populate data, publish

:::warning Common Mistake
Forgetting to call `rclpy.init()` before creating nodes will cause a crash!
:::

## Creating a Subscriber Node

Now create a node that listens for temperature readings:

```python title="my_robot_pkg/monitor_node.py" showLineNumbers
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class MonitorNode(Node):
    def __init__(self):
        super().__init__('monitor_node')
        self.subscription = self.create_subscription(
            Float32,
            'temperature',
            self.temperature_callback,
            10
        )
        self.get_logger().info('Monitor node started')

    def temperature_callback(self, msg):
        if msg.data > 30.0:
            self.get_logger().warn(f'High temperature: {msg.data}°C')
        else:
            self.get_logger().info(f'Temperature OK: {msg.data}°C')

def main(args=None):
    rclpy.init(args=args)
    node = MonitorNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Running Your Nodes

Open two terminals and run each node:

**Terminal 1**:
```bash
ros2 run my_robot_pkg sensor_node
```

**Terminal 2**:
```bash
ros2 run my_robot_pkg monitor_node
```

You should see temperature readings published and monitored in real-time!

:::tip Debugging
Use `ros2 topic echo /temperature` to see messages on the topic
:::

## Hands-On Exercise

<ExerciseBlock title="Multi-Sensor System" difficulty="intermediate">

**Problem**: Modify the sensor node to publish **both** temperature and humidity.

**Requirements**:
1. Create a custom message type `SensorReading` with `temperature` and `humidity` fields
2. Update `sensor_node.py` to publish `SensorReading` messages
3. Update `monitor_node.py` to check both thresholds (temp > 30°C, humidity > 80%)

**Starter Code**:
```python
# TODO: Define SensorReading message in msg/SensorReading.msg
float32 temperature
float32 humidity
---
# TODO: Modify sensor_node.py to publish SensorReading
# TODO: Modify monitor_node.py to handle both fields
```

<details>
<summary>Hint #1</summary>
Message definition goes in `msg/SensorReading.msg`, then update `CMakeLists.txt` to build it.
</details>

<details>
<summary>Hint #2</summary>
Import custom messages: `from my_robot_pkg.msg import SensorReading`
</details>

<details>
<summary>Solution</summary>

```python title="sensor_node.py (modified)"
from my_robot_pkg.msg import SensorReading

def publish_temperature(self):
    msg = SensorReading()
    msg.temperature = 25.0
    msg.humidity = 65.0
    self.publisher.publish(msg)
```

```python title="monitor_node.py (modified)"
def temperature_callback(self, msg):
    if msg.temperature > 30.0:
        self.get_logger().warn(f'High temp: {msg.temperature}°C')
    if msg.humidity > 80.0:
        self.get_logger().warn(f'High humidity: {msg.humidity}%')
```

</details>
</ExerciseBlock>

## Key Takeaways

<KeyTakeaways>

- **Nodes** are independent processes that perform specific tasks
- **Publishers** send messages on topics using `create_publisher()`
- **Subscribers** receive messages using `create_subscription()`
- **Callbacks** are functions triggered when messages arrive
- **Timers** enable periodic publishing using `create_timer()`
- Always initialize ROS 2 with `rclpy.init()` before creating nodes
- Use `rclpy.spin()` to keep the node alive and processing callbacks

</KeyTakeaways>

## Troubleshooting

**Problem**: `ModuleNotFoundError: No module named 'my_robot_pkg'`
**Solution**: Rebuild and source: `colcon build && source install/setup.bash`

**Problem**: Subscriber doesn't receive messages
**Solution**: Check topic names match exactly: `ros2 topic list`

**Problem**: Node exits immediately
**Solution**: Ensure `rclpy.spin(node)` is called to keep node alive

## Summary

You've created your first ROS 2 publisher and subscriber nodes! You now understand the basics of node communication via topics—the foundation for distributed robotics systems.

**Next**, you'll learn about **Services** for synchronous request-response communication.

## References

- [ROS 2 rclpy API Documentation](https://docs.ros2.org/foxy/api/rclpy/)
- [ROS 2 Tutorials: Writing a Simple Publisher/Subscriber](https://docs.ros.org/en/foxy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html)
- [ROS 2 Design: Topics vs Services vs Actions](https://design.ros2.org/)

---

**Previous**: [ROS 2 Architecture & Core Concepts](./week-3-architecture.md)
**Next**: [Services for Request-Response Communication](./week-4-services.md)
```

---

## Conclusion

This audit reveals that the Physical AI textbook has a solid foundation but needs:
1. **Chapter template system** (HIGHEST PRIORITY)
2. **Interactive learning components** (MEDIUM PRIORITY)
3. **Visual design polish** (LOW PRIORITY)

Recommend creating `002-chapter-template-system` spec next to standardize content authoring before writing 50+ chapters.

**Decision point**: Should we proceed with the spec, answer the questionnaire first, or implement quick wins?
