import React from 'react';
import { StatusIndicator } from '@cloudscape-design/components';

const TaskStatusCell = ({ task }) => {
  return (
    <StatusIndicator type={task.isCompleted ? 'success' : 'pending'}>
      {task.isCompleted ? 'Completed' : 'Pending'}
    </StatusIndicator>
  );
};

export default TaskStatusCell;
