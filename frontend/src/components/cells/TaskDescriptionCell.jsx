import React from 'react';

const TaskDescriptionCell = ({ task }) => {
  return (
    <div className="description-text">
      {task.description || '-'}
    </div>
  );
};

export default TaskDescriptionCell;
