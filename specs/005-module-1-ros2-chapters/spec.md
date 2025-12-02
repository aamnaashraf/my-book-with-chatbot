# Feature Specification: Module 1 - The Robotic Nervous System (ROS 2)

**Feature Branch**: `005-module-1-ros2-chapters`
**Created**: 2025-12-02
**Status**: Draft
**Input**: User description: "lets focus on writing module 1 chapters, here are content for all module, first do strong research only for module 1 chapters then write detailed specs for module 1 chapters"

## Clarifications

### Session 2025-12-02

- Q: What is the primary assessment format for the end-of-module evaluation? → A: Individual practical assessment - Each student completes a coding challenge independently (e.g., create publisher/subscriber pair, service, launch file) within time limit to ensure individual skill mastery.
- Q: What level of code scaffolding should be provided to students for hands-on exercises? → A: Minimal scaffolding with TODOs - Provide skeleton files with imports, class structure, and TODO markers where students write core logic (callbacks, publishers, decision algorithms) to balance guidance with active learning.
- Q: Which ROS 2 distribution should Module 1 standardize on? → A: ROS 2 Humble Hawksbill (LTS) exclusively - LTS support until 2027 ensures curriculum longevity, stability, and Ubuntu 22.04 LTS compatibility for educational consistency.
- Q: What is the IDE policy for Module 1? → A: Recommend VS Code with ROS extensions, but allow alternatives - Install guides and screenshots use VS Code for consistency, but students may use vim/emacs/PyCharm if preferred. Students using alternatives are responsible for translating instructions.
- Q: Should Module 1 include any Gazebo simulation content? → A: Preview only in Chapter 4 URDF context - Brief instructor-led Gazebo demo (10-15 minutes) showing URDF loading and physics simulation to contextualize URDF learning. Students do not install or use Gazebo themselves in Module 1.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understanding ROS 2 Architecture and Core Concepts (Priority: P1)

Students need to grasp the fundamental architecture of ROS 2 as a distributed middleware system before they can build robotic applications. They must understand how ROS 2 differs from ROS 1 (no master node, DDS-based communication) and comprehend the computational graph model where nodes communicate via topics, services, and actions.

**Why this priority**: This is the foundational knowledge required for all subsequent learning. Without understanding nodes, topics, and services, students cannot progress to practical implementation or advanced concepts. This represents the minimum viable knowledge base for ROS 2 development.

**Independent Test**: Can be fully tested by having students diagram a simple ROS 2 system (e.g., a robot with sensors and actuators), identify nodes, and explain the communication patterns between them. Delivers immediate value by enabling students to understand existing ROS 2 systems and documentation.

**Acceptance Scenarios**:

1. **Given** a student reads Chapter 1 on ROS 2 Architecture, **When** they review the distributed architecture explanation with DDS middleware, **Then** they can explain why ROS 2 eliminates the single-point-of-failure master node and how nodes discover each other
2. **Given** a student completes the nodes/topics/services section, **When** presented with a robotics use case (e.g., sensor data collection), **Then** they can determine whether to use topics (continuous data streams) or services (request-response patterns)
3. **Given** a student studies the computational graph examples, **When** they examine a multi-node system diagram, **Then** they can identify publishers, subscribers, service clients, and service servers
4. **Given** a student learns about ROS 2 distributions (Humble, Iron), **When** they review compatibility requirements, **Then** they can select the appropriate distribution for their target platform (Ubuntu 22.04 LTS)

---

### User Story 2 - Building ROS 2 Nodes with Python (rclpy) (Priority: P2)

Students need hands-on experience creating ROS 2 nodes using Python's rclpy library. They must learn to initialize nodes, create publishers and subscribers, implement service clients and servers, and manage node lifecycle. This includes understanding callback functions, quality of service (QoS) settings, and parameter management.

**Why this priority**: This is the first practical implementation step where students translate theoretical knowledge into working code. It's prioritized after P1 because students need conceptual understanding before writing code. This story delivers a working minimal node that can communicate within a ROS 2 system.

**Independent Test**: Can be fully tested by having students create a simple publisher node (e.g., sensor simulator) and subscriber node (e.g., data logger), run them together, and verify message exchange using ROS 2 CLI tools (ros2 topic echo). Delivers value by producing students' first functional ROS 2 application.

**Acceptance Scenarios**:

1. **Given** a student completes Chapter 2 on rclpy basics, **When** they write a minimal publisher node following the template, **Then** the node successfully publishes messages to a named topic at a specified rate
2. **Given** a student implements a subscriber node, **When** they run it alongside a publisher, **Then** the subscriber receives and processes messages using callback functions
3. **Given** a student creates a service server node, **When** a client node makes a service call, **Then** the server processes the request and returns the appropriate response
4. **Given** a student configures QoS policies (reliability, durability), **When** they test under simulated network conditions, **Then** they can observe and explain the impact of different QoS settings on message delivery
5. **Given** a student implements node parameters, **When** they launch the node with different parameter values, **Then** the node behavior changes accordingly without code modification

---

### User Story 3 - Bridging Python AI Agents to ROS 2 Controllers (Priority: P3)

Students need to integrate Python-based AI agents (e.g., decision-making algorithms, machine learning models) with ROS 2 control systems for humanoid robots. They must understand how to structure code that separates AI logic from ROS communication, use asynchronous programming patterns, and manage state between AI decision cycles and real-time control loops.

**Why this priority**: This bridges the gap between AI coursework from previous quarters and physical robotics. While important for the course's "Physical AI" theme, it builds upon P1 and P2 foundations. This story delivers the capability to control a robot using high-level AI decision-making.

**Independent Test**: Can be fully tested by having students create an AI agent node (e.g., simple state machine or rule-based planner) that publishes velocity commands based on sensor input from subscriber callbacks. Delivers value by demonstrating AI-driven robot control in simulation.

**Acceptance Scenarios**:

1. **Given** a student completes Chapter 3 on AI-ROS integration, **When** they implement a Python agent class with decision logic, **Then** the agent can be instantiated within a ROS node and access sensor data via subscriptions
2. **Given** a student structures their code with separation of concerns, **When** they modify AI logic, **Then** the ROS communication layer remains unchanged and vice versa
3. **Given** a student implements a control loop with AI decision-making, **When** the node receives sensor data, **Then** the AI agent processes it and publishes control commands within acceptable latency (< 100ms for decision cycle)
4. **Given** a student uses action servers for long-running AI tasks, **When** the agent executes a multi-step behavior, **Then** the system provides feedback during execution and allows cancellation
5. **Given** a student tests AI-controller integration in simulation, **When** they deploy to a simulated humanoid (e.g., in Gazebo), **Then** the robot executes basic behaviors (e.g., walk forward, turn) based on AI commands

---

### User Story 4 - Understanding URDF for Humanoid Robot Description (Priority: P4)

Students need to understand URDF (Unified Robot Description Format) to define humanoid robot models for simulation and control. They must learn URDF syntax for links (robot body parts), joints (connections between parts), visual/collision geometry, inertial properties, and how to integrate sensor and actuator definitions for humanoid-specific components (torso, limbs, hands).

**Why this priority**: While essential for simulation work (Module 2), URDF knowledge can be introduced after students have working ROS 2 nodes. This story is lower priority for initial learning but critical before Module 2 (Gazebo simulation). Delivers the capability to define and visualize robot models.

**Independent Test**: Can be fully tested by having students create a simplified humanoid URDF (e.g., stick figure with torso, arms, legs), visualize it in RViz2, and verify joint movements using the joint_state_publisher_gui tool. Delivers value by enabling students to represent robots in code.

**Acceptance Scenarios**:

1. **Given** a student reads Chapter 4 on URDF, **When** they create a basic URDF file with links and joints, **Then** the file parses without errors using check_urdf tool
2. **Given** a student defines visual and collision geometry, **When** they load the URDF in RViz2, **Then** the robot model displays correctly with proper proportions and colors
3. **Given** a student specifies joint types (revolute, prismatic) and limits, **When** they use joint_state_publisher_gui, **Then** joints move within specified ranges and degrees of freedom
4. **Given** a student adds inertial properties (mass, inertia tensor), **When** they load the model in a physics simulator, **Then** the robot behaves realistically under gravity and forces
5. **Given** a student creates a humanoid-specific URDF (head, torso, 2 arms, 2 legs), **When** they review best practices for humanoid kinematics, **Then** the joint hierarchy and reference frames follow conventions (e.g., right-hand rule, base_link as root)

---

### User Story 5 - Working with Launch Files and Package Management (Priority: P5)

Students need to manage complex ROS 2 systems with multiple nodes using launch files and organize code into reusable packages. They must learn to create launch files using Python syntax, pass parameters to nodes, configure remappings, and structure ROS 2 packages following standard conventions (package.xml, setup.py, directory structure).

**Why this priority**: This is operational excellence that improves productivity but isn't strictly required for initial learning. Students can manually launch individual nodes before learning launch files. However, this becomes essential for managing multi-node systems and team projects. Delivers professional development workflows.

**Independent Test**: Can be fully tested by having students create a ROS 2 package containing multiple nodes (from P2) and a launch file that starts all nodes with appropriate parameters. Delivers value by enabling students to distribute and run complete robot systems with a single command.

**Acceptance Scenarios**:

1. **Given** a student reads Chapter 5 on launch files, **When** they create a Python launch file, **Then** it successfully starts multiple nodes with specified parameters and remappings
2. **Given** a student structures a ROS 2 package, **When** they run colcon build, **Then** the package compiles without errors and executables are accessible via ros2 run
3. **Given** a student defines package dependencies in package.xml, **When** they install the package on a new system, **Then** rosdep resolves and installs all required dependencies
4. **Given** a student uses launch file arguments, **When** they launch with different argument values, **Then** the system behavior changes (e.g., switching between simulation and real hardware)
5. **Given** a student creates a reusable package, **When** another student clones and builds it, **Then** it works without modification following ROS 2 conventions

---

### Edge Cases

- What happens when a node crashes mid-operation? How do other nodes handle loss of publishers/subscribers? Students should understand fault tolerance patterns and node lifecycle management.
- How does the system handle high-frequency sensor data (e.g., IMU at 100Hz, camera at 30fps)? Students should learn about message queue overflow, dropped messages, and QoS reliability settings.
- What occurs when message types mismatch between publisher and subscriber? Students should understand type safety in ROS 2 and the role of interface definitions.
- How are naming conflicts resolved when multiple nodes publish to the same topic? Students should learn about namespaces and topic remapping.
- What happens when URDF files contain invalid joint configurations (e.g., impossible inertia tensors)? Students should validate models before simulation.
- How does the system behave when running nodes across multiple machines with network latency? Students should understand DDS discovery and inter-machine communication.

## Requirements *(mandatory)*

### Functional Requirements

#### Chapter 1: ROS 2 Architecture and Core Concepts

- **FR-001**: Chapter MUST explain the distributed architecture of ROS 2 and how it differs from ROS 1 (no master node, DDS-based peer-to-peer communication)
- **FR-002**: Chapter MUST define and illustrate nodes as independent processes that perform specific computations
- **FR-003**: Chapter MUST define topics as named buses for asynchronous message passing between nodes with publish-subscribe pattern
- **FR-004**: Chapter MUST define services as synchronous request-response communication between client and server nodes
- **FR-005**: Chapter MUST introduce actions as long-running tasks with feedback, building on service pattern
- **FR-006**: Chapter MUST explain the computational graph model with examples showing nodes, topics, services, and their relationships
- **FR-007**: Chapter MUST describe DDS (Data Distribution Service) middleware and its role in ROS 2 communication
- **FR-008**: Chapter MUST explain ROS 2 Humble Hawksbill LTS as the standard distribution for this course, including its LTS support timeline (until 2027) and compatibility with Ubuntu 22.04 LTS
- **FR-009**: Chapter MUST include installation instructions for ROS 2 Humble on Ubuntu 22.04 LTS
- **FR-010**: Chapter MUST provide visual diagrams of ROS 2 architecture, computational graphs, and communication patterns
- **FR-011**: Chapter MUST introduce ROS 2 CLI tools (ros2 node, ros2 topic, ros2 service) with basic usage examples
- **FR-012**: Chapter MUST explain Quality of Service (QoS) policies at a conceptual level (reliability, durability, history)

#### Chapter 2: Building ROS 2 Nodes with Python (rclpy)

- **FR-013**: Chapter MUST teach rclpy library structure and how to import required modules
- **FR-014**: Chapter MUST demonstrate node initialization using rclpy.init() and node creation with Node class
- **FR-015**: Chapter MUST show how to create publishers with create_publisher() method, specifying message type and topic name
- **FR-016**: Chapter MUST show how to create subscribers with create_subscription() method and implement callback functions
- **FR-017**: Chapter MUST teach timer creation for periodic publishing using create_timer() method
- **FR-018**: Chapter MUST demonstrate service server implementation with create_service() method
- **FR-019**: Chapter MUST demonstrate service client implementation with create_client() method
- **FR-020**: Chapter MUST explain callback functions and callback groups for managing concurrent execution
- **FR-021**: Chapter MUST cover node spinning (spin(), spin_once()) and shutdown procedures (shutdown())
- **FR-022**: Chapter MUST introduce standard message types (std_msgs, geometry_msgs, sensor_msgs) relevant to robotics
- **FR-023**: Chapter MUST teach parameter declaration and access using declare_parameter() and get_parameter() methods
- **FR-024**: Chapter MUST explain QoS profiles in practice (QoSProfile class) and common presets (sensor_data, system_default)
- **FR-025**: Chapter MUST provide skeleton code files with TODO markers for publisher node, subscriber node, and service pair exercises, where students implement core logic (callback functions, message creation, service handlers) while imports and class structure are pre-provided
- **FR-026**: Chapter MUST include debugging techniques using ROS 2 CLI (ros2 node list, ros2 topic echo, ros2 service call) and recommended VS Code debugging features (breakpoints, variable inspection) with note that alternative IDE users should adapt instructions

#### Chapter 3: Bridging Python AI Agents to ROS Controllers

- **FR-027**: Chapter MUST teach design pattern for separating AI logic from ROS communication layer
- **FR-028**: Chapter MUST demonstrate how to structure Python classes with AI agent logic and ROS node wrapper
- **FR-029**: Chapter MUST show how to pass sensor data from ROS subscribers to AI agent decision functions
- **FR-030**: Chapter MUST show how to publish AI agent output (e.g., velocity commands, motor positions) via ROS publishers
- **FR-031**: Chapter MUST explain state management between AI decision cycles and ROS callback execution
- **FR-032**: Chapter MUST introduce action servers for long-running AI behaviors using ActionServer class
- **FR-033**: Chapter MUST introduce action clients for requesting AI behaviors using ActionClient class
- **FR-034**: Chapter MUST demonstrate feedback mechanisms during action execution
- **FR-035**: Chapter MUST teach asynchronous programming patterns (async/await) for non-blocking AI operations
- **FR-036**: Chapter MUST provide latency considerations for real-time control (decision cycle timing, message queue management)
- **FR-037**: Chapter MUST include skeleton code for simple AI agent (e.g., finite state machine, rule-based controller) with TODO markers where students implement decision logic and state transitions while ROS integration structure is pre-provided
- **FR-038**: Chapter MUST show how to test AI-ROS integration in simulation environment
- **FR-039**: Chapter MUST explain coordinate frame transformations between AI agent frame and robot frame (preview of tf2 in Module 2)

#### Chapter 4: Understanding URDF for Humanoid Robots

- **FR-040**: Chapter MUST explain URDF as XML-based format for robot description
- **FR-041**: Chapter MUST define link elements representing rigid body parts (visual, collision, inertial properties)
- **FR-042**: Chapter MUST define joint elements connecting links (joint types: revolute, prismatic, fixed, continuous)
- **FR-043**: Chapter MUST explain visual geometry using primitive shapes (box, cylinder, sphere) and mesh files
- **FR-044**: Chapter MUST explain collision geometry for physics simulation (simplified vs. visual geometry)
- **FR-045**: Chapter MUST explain inertial properties (mass, center of mass, inertia tensor)
- **FR-046**: Chapter MUST teach joint properties (axis, origin, limits, dynamics)
- **FR-047**: Chapter MUST demonstrate building a simple multi-link robot URDF (e.g., 2-DOF arm)
- **FR-048**: Chapter MUST demonstrate building humanoid-specific URDF with torso, head, arms, legs
- **FR-049**: Chapter MUST explain kinematic chains and joint hierarchies for humanoid robots
- **FR-050**: Chapter MUST teach URDF validation using check_urdf tool
- **FR-051**: Chapter MUST show visualization in RViz2 with robot_state_publisher and joint_state_publisher
- **FR-052**: Chapter MUST explain xacro macros for parameterized and reusable URDF components
- **FR-053**: Chapter MUST provide reference frames and naming conventions for humanoid robots (base_link, left_hand, right_foot, etc.)
- **FR-054**: Chapter MUST include sensor integration in URDF (camera, lidar, IMU) with appropriate plugins for simulation
- **FR-055**: Chapter MUST include brief instructor-led Gazebo demonstration (10-15 minutes) showing how student-created URDF models load in physics simulation to provide context for URDF learning and preview Module 2; students observe only without installing or using Gazebo themselves

#### Chapter 5: Launch Files and Package Management

- **FR-056**: Chapter MUST explain purpose of launch files for managing multi-node systems
- **FR-057**: Chapter MUST teach Python launch file syntax using launch.LaunchDescription
- **FR-058**: Chapter MUST demonstrate adding nodes to launch files with Node() action
- **FR-059**: Chapter MUST show parameter passing to nodes in launch files
- **FR-060**: Chapter MUST explain topic/service remapping in launch files
- **FR-061**: Chapter MUST teach launch file arguments (DeclareLaunchArgument, LaunchConfiguration) for runtime configuration
- **FR-062**: Chapter MUST explain ROS 2 package structure (src, include, launch, config, urdf directories)
- **FR-063**: Chapter MUST teach package.xml configuration (package metadata, dependencies)
- **FR-064**: Chapter MUST teach setup.py configuration for Python packages (entry points for nodes)
- **FR-065**: Chapter MUST demonstrate colcon build system for compiling packages
- **FR-066**: Chapter MUST explain workspace setup and sourcing (setup.bash, overlay/underlay workspaces)
- **FR-067**: Chapter MUST teach dependency management with rosdep
- **FR-068**: Chapter MUST provide complete working package example with multiple nodes, launch files, and configuration files
- **FR-069**: Chapter MUST explain best practices for package organization and documentation

### Key Entities

- **ROS 2 Node**: Independent computational process with unique name in ROS graph; can publish/subscribe to topics, provide/call services, expose parameters
- **Topic**: Named communication channel for asynchronous message passing; supports many-to-many communication pattern
- **Message**: Strongly-typed data structure passed between nodes over topics (e.g., std_msgs/String, geometry_msgs/Twist)
- **Service**: Synchronous request-response communication mechanism with defined request/response message types
- **Action**: Long-running task mechanism with goal, feedback, and result messages; builds on service pattern
- **Publisher**: Component of a node that sends messages to a topic
- **Subscriber**: Component of a node that receives messages from a topic via callback function
- **QoS Policy**: Configuration for communication reliability, durability, history depth, and deadline constraints
- **Parameter**: Runtime configuration value for nodes (string, integer, float, boolean, array types)
- **Package**: Organizational unit containing nodes, launch files, configuration, and resources
- **Launch File**: Python script describing how to start and configure multiple nodes as a system
- **URDF Model**: XML description of robot structure including links (bodies), joints (connections), geometry, and physical properties
- **Link**: Rigid body component of robot with visual appearance, collision geometry, and inertial properties
- **Joint**: Connection between two links defining motion constraints (revolute, prismatic, fixed, continuous types)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Students can diagram a ROS 2 system with at least 5 nodes and explain the communication patterns between them within 10 minutes after completing Chapter 1
- **SC-002**: Students can write a working publisher-subscriber node pair from memory within 30 minutes after completing Chapter 2, demonstrating internalized understanding
- **SC-003**: Students can integrate a simple AI decision algorithm (e.g., 3-state finite state machine) with ROS 2 control nodes and demonstrate robot behavior in simulation within 1 hour after completing Chapter 3
- **SC-004**: Students can create a URDF model for a 6-DOF humanoid (torso, head, 2 arms, 2 legs) and visualize it in RViz2 within 45 minutes after completing Chapter 4
- **SC-005**: Students can structure a ROS 2 package with multiple nodes and a launch file that starts the complete system with one command within 20 minutes after completing Chapter 5
- **SC-006**: 90% of students successfully complete end-of-module assessment requiring creation of a functional ROS 2 system (publisher, subscriber, service, launch file) without assistance
- **SC-007**: Students can troubleshoot common ROS 2 issues (node not discovered, message type mismatch, parameter not found) using CLI tools within 15 minutes
- **SC-008**: Students can explain the advantages of ROS 2 over ROS 1 (DDS, no master, improved QoS) in 3 minutes or less when asked
- **SC-009**: Student-created code follows ROS 2 Python style conventions and passes linting (flake8, pylint) with zero errors
- **SC-010**: Students demonstrate understanding of real-time constraints by implementing control loops that maintain 10Hz update rate with less than 5% jitter

### Learning Objectives Alignment

- **LO-001**: Understand Physical AI principles and how ROS 2 enables embodied intelligence through distributed sensing and control
- **LO-002**: Master ROS 2 fundamentals sufficient to build, test, and debug multi-node robotic systems
- **LO-003**: Apply Python programming skills to robotics domain using rclpy library
- **LO-004**: Design humanoid robot models using industry-standard URDF format
- **LO-005**: Integrate AI algorithms with real-time robotic control systems following software engineering best practices
- **LO-006**: Prepare for Module 2 (Gazebo simulation) by understanding robot models and ROS 2 communication

## Assumptions *(optional)*

- Students have completed prior AI coursework including Python programming, basic algorithms, and introduction to machine learning
- Students have access to Ubuntu 22.04 LTS workstations (physical or VM) with at least 8GB RAM, 4 CPU cores for ROS 2 development
- Students are familiar with command-line interfaces (bash, terminal navigation, text editors)
- Module 1 is delivered in weeks 3-5 of the quarter (3 weeks, approximately 9 contact hours)
- Each chapter requires approximately 2 hours of instruction plus 2-3 hours of hands-on lab work
- Students will use ROS 2 Humble Hawksbill (LTS release, supported until 2027) for consistency
- Assessment will be individual practical coding challenges (not team-based), ensuring each student demonstrates independent mastery of ROS 2 skills through timed exercises requiring creation of functional nodes, services, and launch files
- Code exercises use minimal scaffolding approach: skeleton files provide imports, class structure, and TODO markers where students implement core logic (callbacks, publishers, decision algorithms); this balances guidance with active learning and prevents copy-paste without understanding
- VS Code with ROS extensions is the recommended IDE for consistency in materials and support, but students may use alternative editors (vim, emacs, PyCharm) if they take responsibility for translating instructions to their chosen environment
- Students do not need physical robot hardware for Module 1; concepts are taught using CLI tools and basic visualization (RViz2)
- URDF work in Chapter 4 prepares for Gazebo simulation in Module 2 but does not require full simulation setup yet
- Integration with NVIDIA Isaac (Module 3) and VLA models (Module 4) will be addressed in later modules

## Dependencies *(optional)*

### External Dependencies

- ROS 2 Humble Hawksbill distribution installed on Ubuntu 22.04 LTS
- Python 3.10+ with pip package manager
- Standard ROS 2 Python client library (rclpy) and message packages (std_msgs, geometry_msgs, sensor_msgs, tf2_msgs)
- RViz2 for robot visualization
- colcon build system for package compilation
- rosdep for dependency resolution
- xacro for URDF macro processing (introduced in Chapter 4)

### Course Dependencies

- Prerequisites: Prior AI/ML coursework including Python programming, data structures, algorithms
- Prepares for: Module 2 (Gazebo simulation requires URDF knowledge), Module 3 (Isaac ROS builds on ROS 2 fundamentals), Module 4 (VLA integration requires action server knowledge)

### Content Dependencies Between Chapters

- Chapter 2 depends on Chapter 1: Students must understand node/topic/service concepts before implementing them in code
- Chapter 3 depends on Chapters 1-2: AI-ROS integration requires working knowledge of publishers, subscribers, and actions
- Chapter 4 is relatively independent but benefits from Chapter 1: URDF learning enhanced by understanding how robot models integrate with ROS 2 system
- Chapter 5 depends on Chapters 1-2: Launch files and packages organize nodes learned in earlier chapters

## Out of Scope *(optional)*

### Explicitly Excluded from Module 1

- **Physical robot hardware**: Module 1 focuses on software foundations; physical deployment covered in later modules
- **Hands-on Gazebo simulation**: Students do not install or use Gazebo in Module 1; full physics simulation, world building, and sensor simulation deferred to Module 2 (Digital Twin). Note: Chapter 4 includes brief instructor-led Gazebo preview demo only.
- **NVIDIA Isaac Sim/ROS**: Covered in Module 3 (AI-Robot Brain)
- **Computer vision and perception pipelines**: Covered in Module 3 with Isaac ROS
- **Navigation stack (Nav2)**: Covered in Module 3 for path planning
- **MoveIt2 motion planning**: Not covered in Module 1; may be introduced in Module 2 or 3 depending on scope
- **ros2_control framework**: Deferred to Module 2 when integrating with Gazebo simulation
- **TF2 transforms in depth**: Introduced conceptually in Chapter 3, detailed coverage in Module 2
- **Custom message/service definition**: Students use standard ROS 2 message types; custom interfaces deferred to advanced topics or capstone
- **Multi-robot systems**: Single robot focus; multi-agent coordination out of scope for Module 1
- **ROS 1 Bridge**: Course uses ROS 2 exclusively; no backwards compatibility with ROS 1
- **Real-time operating systems (RTOS)**: Standard Linux scheduling assumed; RTOS integration out of scope
- **Security and authentication**: DDS security plugins and SROS2 out of scope for introductory module
- **Performance optimization**: Basic performance awareness included, but profiling and optimization deferred to advanced topics

## Risks and Mitigations *(optional)*

### Technical Risks

- **Risk**: Students struggle with Linux/Ubuntu if coming from Windows/Mac backgrounds
  - **Mitigation**: Provide pre-configured VM images or cloud workspaces; include Linux command-line primer in pre-module materials

- **Risk**: ROS 2 installation issues across different hardware configurations
  - **Mitigation**: Standardize on Ubuntu 22.04 LTS + ROS 2 Humble; provide troubleshooting guide for common issues; use Docker containers as fallback

- **Risk**: Students overwhelmed by amount of new concepts (Linux, Python, ROS, robotics all at once)
  - **Mitigation**: Scaffold learning with very simple examples first (e.g., single publisher-subscriber before multi-node systems); provide reference code templates

### Pedagogical Risks

- **Risk**: Students treat ROS 2 as "black box" without understanding underlying concepts
  - **Mitigation**: Include conceptual explanations with visualizations before code examples; require students to diagram systems before implementing

- **Risk**: Wide variation in student Python skill levels
  - **Mitigation**: Provide Python refresher materials as pre-work; use pair programming in labs to balance skill levels; offer office hours for struggling students

- **Risk**: Students copy-paste code without understanding
  - **Mitigation**: Require students to modify working examples (change message types, add features) to demonstrate understanding; use code reviews and oral explanations in assessments

### Content Risks

- **Risk**: URDF chapter (Ch 4) feels disconnected from other chapters without simulation context
  - **Mitigation**: Include RViz2 visualization throughout; show how URDF integrates with robot_state_publisher node; preview Gazebo simulation from Module 2

- **Risk**: AI-ROS integration chapter (Ch 3) too abstract without concrete AI algorithms
  - **Mitigation**: Use very simple AI examples (finite state machine, PID controller) that students can fully understand; focus on integration patterns rather than complex AI

- **Risk**: Pace too fast for 3-week module with 5 substantial chapters
  - **Mitigation**: Chapter 5 (launch files/packages) can be compressed or partially covered; URDF depth can be adjusted based on time availability; priority system (P1-P5 user stories) allows flexibility

## Open Questions *(optional)*

1. **Hardware access**: Will students have access to edge compute devices (Jetson) during Module 1, or only in Module 3/4? Early access could motivate learning but may be logistically complex.
