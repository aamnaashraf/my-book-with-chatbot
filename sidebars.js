/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-nocheck

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main tutorial sidebar with nested collapsible categories
  tutorialSidebar: [
    'intro',
   
    {
      type: 'category',
      label: 'Module 1: ROS 2 (Weeks 3-5)',
      collapsible: true,
      collapsed: false,
      items: [
        'module-1-ros2/index',
        'module-1-ros2/chapter-1-intro-ros2',
        'module-1-ros2/chapter-2-nodes-topics',
        'module-1-ros2/chapter-3-services-actions-parameters',
        'module-1-ros2/chapter-4-urdf-robot-modeling',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin (Weeks 6-7)',
      collapsible: true,
      collapsed: true,
      items: [
        'module-2-digital-twin/index',
        'module-2-digital-twin/chapter-1-simulation-basics',
        'module-2-digital-twin/chapter-2-sensors-fusion',
        'module-2-digital-twin/chapter-3-photorealistic-unity',
        'module-2-digital-twin/chapter-4-sim-to-real',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: NVIDIA Isaac (Weeks 8-10)',
      collapsible: true,
      collapsed: true,
      items: [
        'module-3-isaac/index',
        'module-3-isaac/chapter-1-isaac-intro',
        'module-3-isaac/chapter-2-advanced-vslam',
        'module-3-isaac/chapter-3-navigation-stacks',
        'module-3-isaac/chapter-4-rl-and-simulations',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: VLA & Humanoids (Weeks 11-13)',
      collapsible: true,
      collapsed: true,
      items: [
        'module-4-vla-humanoids/index',
        'module-4-vla-humanoids/chapter-1-vla-intro',
        'module-4-vla-humanoids/chapter-2-humanoid-kinematics',
        'module-4-vla-humanoids/chapter-3-manipulation-primitives',
        'module-4-vla-humanoids/chapter-4-vla-integration',
      ],
    },
    {
      type: 'category',
      label: 'References',
      collapsible: true,
      collapsed: true,
      items: ['references/glossary'],
    },
  ],
};

export default sidebars;
