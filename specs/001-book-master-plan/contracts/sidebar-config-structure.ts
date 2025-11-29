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
