import React from 'react';
import { Button } from '@cloudscape-design/components';

const TaskActionsCell = ({ 
  task, 
  onEdit, 
  onToggleCompletion, 
  onDelete, 
  isUpdating 
}) => {
  return (
    <div className="action-buttons">
      <Button 
        variant="link" 
        onClick={() => onEdit(task)}
      >
        Edit
      </Button>
      <Button 
        variant="link" 
        onClick={() => onToggleCompletion(task.id, task.isCompleted)}
        disabled={isUpdating}
      >
        {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Button 
        variant="link" 
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default TaskActionsCell;
