#!/usr/bin/env python3
"""
[EXAMPLE_NAME] - Complete Solution

ROS 2 Distribution: Humble
Language: Python 3.10+
Package: [PACKAGE_NAME or N/A (standalone script)]
Difficulty: [beginner | intermediate | advanced]
Estimated Time: [XX] min

Description:
[Brief description of what this code demonstrates and the key ROS 2 concepts
it illustrates. Include the primary learning objective from the related chapter.]

Related Concepts:
- Chapter [X], Section [X.X]: [Concept name and brief explanation]
- ROS 2 Docs: [Specific API reference with URL or doc path]
- [Additional concept if applicable]

Usage:
    ros2 run [package] [script_name]
    OR
    python3 [script_name].py

Expected Output:
    [INFO] [timestamp] [[node_name]]: [Example log message 1]
    [INFO] [timestamp] [[node_name]]: [Example log message 2]
    [Detailed description of expected behavior and console output]

Instructor Notes:
[Any additional context for instructors, common student mistakes to address,
or alternative approaches that could be discussed in class]
"""

import rclpy
from rclpy.node import Node
# Import specific message types used in this example
from std_msgs.msg import String  # Example - replace with actual message types


class [ClassName](Node):
    """
    [Detailed description of what this node does and its role in a ROS 2 system]

    This class demonstrates:
    - [Key concept 1 illustrated by this code]
    - [Key concept 2 illustrated by this code]
    - [Key concept 3 illustrated by this code]

    Attributes:
        [attribute_name] ([type]): [Description of what this attribute stores/does]
        [attribute_name] ([type]): [Description]
    """

    def __init__(self):
        """
        Initialize the [node_name] node.

        Sets up publishers, subscribers, timers, and any necessary state.
        Follows ROS 2 best practices for node initialization.
        """
        # Initialize the parent Node class with the node name
        super().__init__('[node_name]')

        # Create publisher(s)
        # - Topic name follows ROS 2 naming conventions (lowercase, underscores)
        # - Queue size set appropriately for the data rate
        self.[publisher_name] = self.create_publisher(
            [MessageType],
            '[topic_name]',
            10  # Queue size - adjust based on publish rate and importance
        )

        # Create subscriber(s) if needed
        # - Callback function is called when messages arrive
        # - QoS settings can be customized for reliability requirements
        self.[subscription_name] = self.create_subscription(
            [MessageType],
            '[topic_name]',
            self.[callback_method],
            10  # Queue size
        )

        # Create timer for periodic operations
        # - Timer period in seconds (e.g., 0.5 = 2 Hz, 1.0 = 1 Hz)
        # - Callback is executed at this rate
        timer_period = [PERIOD_SEC]  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        # Initialize counter or state variables
        self.[state_variable] = [INITIAL_VALUE]

        # Log successful initialization
        self.get_logger().info('[Node name] initialized successfully')
        self.get_logger().info(f'Publishing to: [topic_name] at {1.0/timer_period:.1f} Hz')

    def [callback_method](self, msg):
        """
        Callback function for processing incoming messages.

        Args:
            msg ([MessageType]): The received message

        This callback demonstrates:
        - Message processing and data extraction
        - Logging for debugging and monitoring
        - [Additional concept if applicable]
        """
        # Extract data from the message
        received_data = msg.[field_name]

        # Process the data (example logic)
        processed_data = self._process_data(received_data)

        # Log the received and processed data
        self.get_logger().info(
            f'Received: {received_data}, Processed: {processed_data}'
        )

    def timer_callback(self):
        """
        Periodic callback executed by the timer.

        This demonstrates:
        - Creating and publishing messages
        - Using timer callbacks for periodic operations
        - Proper message construction and field assignment
        """
        # Create a new message instance
        msg = [MessageType]()

        # Populate message fields
        msg.[field_name] = [VALUE or self._generate_data()]

        # Publish the message
        self.[publisher_name].publish(msg)

        # Log the published message for monitoring
        self.get_logger().info(f'Publishing: {msg.[field_name]}')

        # Update state if needed
        self.[state_variable] += 1

    def _process_data(self, data):
        """
        Helper method for data processing.

        Args:
            data: Input data to process

        Returns:
            Processed data

        This is a private helper method (indicated by leading underscore)
        that encapsulates processing logic for cleaner code organization.
        """
        # Example processing logic - replace with actual implementation
        processed = data * 2  # Example transformation
        return processed

    def _generate_data(self):
        """
        Helper method to generate example data.

        Returns:
            Generated data value

        This demonstrates separating data generation logic from
        the main callback for better code organization and testability.
        """
        # Example data generation - replace with actual implementation
        return f'Data #{self.[state_variable]}'


def main(args=None):
    """
    Main function to initialize and run the ROS 2 node.

    This follows the standard ROS 2 Python node lifecycle:
    1. Initialize the rclpy library
    2. Create an instance of the node class
    3. Spin the node to process callbacks
    4. Clean up on shutdown (Ctrl+C or program termination)

    Args:
        args: Command-line arguments (passed to rclpy.init)
    """
    # Initialize the rclpy library
    # This must be called before creating any nodes
    rclpy.init(args=args)

    # Create an instance of the node
    node = [ClassName]()

    try:
        # Spin the node to process callbacks
        # This blocks until the node is shut down (Ctrl+C)
        rclpy.spin(node)
    except KeyboardInterrupt:
        # Handle Ctrl+C gracefully
        node.get_logger().info('Shutting down [node_name]...')
    finally:
        # Clean up resources
        # This is crucial for proper shutdown and resource cleanup
        node.destroy_node()

        # Shutdown the rclpy library
        # Only call this if rclpy.init() was successful
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
