#!/usr/bin/env python3
"""
[EXAMPLE_NAME] - Skeleton Version

ROS 2 Distribution: Humble
Language: Python 3.10+
Package: [PACKAGE_NAME or N/A (standalone script)]
Difficulty: [beginner | intermediate | advanced]
Estimated Time: [XX] min

Description:
[Brief description of what this code demonstrates]

Related Concepts:
- Chapter [X], Section [X.X]: [Concept name]
- ROS 2 Docs: [API or concept reference]

Usage:
    ros2 run [package] [script_name]
    OR
    python3 [script_name].py

Expected Output:
    [Description of expected console output]
"""

# TODO: Import required ROS 2 modules
# Hint: See Chapter [X], Section [X.X] for import examples
import rclpy
from rclpy.node import Node
# TODO: Import message types (e.g., from std_msgs.msg import String)


class [ClassName](Node):
    """
    [Brief description of what this node does]

    This skeleton provides the basic structure. Complete the TODOs to implement
    the full functionality described in Chapter [X].
    """

    def __init__(self):
        """Initialize the [node_name] node."""
        super().__init__('[node_name]')

        # TODO: Create publishers/subscribers/services
        # Hint: Use self.create_publisher(), self.create_subscription(), etc.
        # See Chapter [X], Section [X.X] for examples

        # TODO: Create timers if needed
        # Hint: self.create_timer(period_sec, callback_function)

        # TODO: Initialize any class variables

        self.get_logger().info('[Node name] initialized')

    def [callback_method](self):
        """
        [Description of what this callback does]

        TODO: Implement callback logic
        - Step 1: [Description]
        - Step 2: [Description]
        - Step 3: [Description]
        """
        # TODO: Implement callback functionality
        # Hint: Reference Chapter [X], Section [X.X] for guidance
        pass


def main(args=None):
    """
    Main function to initialize and run the node.

    This follows the standard ROS 2 node lifecycle:
    1. Initialize rclpy
    2. Create node instance
    3. Spin (process callbacks)
    4. Cleanup on shutdown
    """
    # TODO: Initialize rclpy
    # Hint: rclpy.init(args=args)

    # TODO: Create node instance
    # Hint: node = [ClassName]()

    try:
        # TODO: Spin the node
        # Hint: rclpy.spin(node)
        pass
    except KeyboardInterrupt:
        pass
    finally:
        # TODO: Cleanup
        # Hint: node.destroy_node(), rclpy.shutdown()
        pass


if __name__ == '__main__':
    main()
