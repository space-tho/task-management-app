import React from 'react';

const TaskCreatedCell = ({ task }) => {
  return <span>{new Date(task.created_at).toLocaleString()}</span>;
};

export default TaskCreatedCell;
