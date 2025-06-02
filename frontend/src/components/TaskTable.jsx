import React from 'react';
import { Table, Box } from '@cloudscape-design/components';
import TaskTitleCell from './cells/TaskTitleCell';
import TaskDescriptionCell from './cells/TaskDescriptionCell';
import TaskStatusCell from './cells/TaskStatusCell';
import TaskCreatedCell from './cells/TaskCreatedCell';
import TaskActionsCell from './cells/TaskActionsCell';

const TaskTable = ({ 
  tasks, 
  sortingColumn, 
  sortingDescending, 
  onSortingChange,
  onEdit,
  onToggleCompletion,
  onDelete,
  updatingTaskIds
}) => {
  const columnDefinitions = [
    {
      id: 'title',
      header: 'Title',
      cell: item => <TaskTitleCell task={item} />,
      sortingField: 'title'
    },
    {
      id: 'description',
      header: 'Description',
      cell: item => <TaskDescriptionCell task={item} />,
      className: 'column-description'
    },
    {
      id: 'created_at',
      header: 'Created',
      cell: item => <TaskCreatedCell task={item} />,
      sortingField: 'created_at',
      className: 'column-created'
    },
    {
      id: 'status',
      header: 'Status',
      cell: item => <TaskStatusCell task={item} />,
      className: 'column-status'
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: item => (
        <TaskActionsCell 
          task={item}
          onEdit={onEdit}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
          isUpdating={updatingTaskIds.has(item.id)}
        />
      ),
      className: 'column-actions'
    }
  ];

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" padding="l">
        <Box variant="p">
          No tasks match the current filters.
        </Box>
      </Box>
    );
  }

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={tasks}
      sortingDisabled={false}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={onSortingChange}
      variant="container"
      stickyHeader
      wrapLines={true}
      resizableColumns
    />
  );
};

export default TaskTable;
