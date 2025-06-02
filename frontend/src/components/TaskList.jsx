import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import { filterAndSortTasks } from '../utils/SortingManager.js';
import {
  fetchTasksData,
  handleTaskDeletion, 
  handleTaskCompletionToggle 
} from '../utils/TaskManager';
import { useEditModal, useCreateModal } from '../utils/ModalManager';
import {
  Box,
  Button,
  SpaceBetween,
  Header,
  Spinner,
  Alert,
  TextFilter,
  SegmentedControl
} from '@cloudscape-design/components';

const TaskList = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingTaskIds, setUpdatingTaskIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingColumn, setSortingColumn] = useState({ sortingField: 'created_at' });
  const [sortingDescending, setSortingDescending] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const {
    isVisible: isEditModalVisible, 
    editingItem: editingTask, 
    openModal: openEditModal, 
    closeModal: closeEditModal 
  } = useEditModal();
  
  const { 
    isVisible: isCreateModalVisible, 
    openModal: openCreateModal, 
    closeModal: closeCreateModal 
  } = useCreateModal();

  const handleDelete = (id) => {
    handleTaskDeletion(id, setTasks, setError);
  };

  const handleCompletionToggle = (id) => {
    handleTaskCompletionToggle(id, tasks, setTasks, setError, setUpdatingTaskIds);
  };

  const handleTaskCreated = () => {
    fetchTasksData(setTasks, setLoading, setError);
    closeCreateModal();
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    closeEditModal();
  };

  const handleRetry = () => {
    fetchTasksData(setTasks, setLoading, setError);
  };

  const handleSortingChange = (event) => {
    const { detail } = event;
    if (detail.sortingColumn.sortingField === sortingColumn.sortingField) {
      setSortingDescending(!sortingDescending);
    } else {
      setSortingColumn(detail.sortingColumn);
      setSortingDescending(false);
    }
  };

  const sortedTasks = filterAndSortTasks(tasks, searchQuery, statusFilter, sortingColumn, sortingDescending);

  useEffect(() => {
    fetchTasksData(setTasks, setLoading, setError);
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="table-container">
        <Box textAlign="center" padding="l">
          <SpaceBetween direction="vertical" size="m">
            <Spinner size="large" />
            <Box variant="p">Loading Tasks...</Box>
          </SpaceBetween>
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <SpaceBetween direction="vertical" size="m">
          <Alert type="error">
            {error}
          </Alert>
          <Box textAlign="center">
            <Button onClick={handleRetry} variant="primary">
              Retry
            </Button>
          </Box>
        </SpaceBetween>
      </div>
    );
  }

  return (
    <div className="table-container">
      <SpaceBetween direction="vertical" size="l">
        <Header 
          variant="h2"
          actions={
            <Button 
              variant="primary" 
              onClick={openCreateModal}
              iconName="add-plus"
            >
              Create Task
            </Button>
          }
        >
          Your Tasks
        </Header>
        
        <SpaceBetween direction="horizontal" size="m">
          <div className="search-container">
            <TextFilter
              filteringText={searchQuery}
              filteringPlaceholder="Search by Keyword..."
              filteringAriaLabel="Search tasks"
              onChange={({ detail }) => setSearchQuery(detail.filteringText)}
              disabled={tasks.length === 0}
            />
          </div>
          
          <SegmentedControl
            selectedId={statusFilter}
            onChange={({ detail }) => setStatusFilter(detail.selectedId)}
            label="Status filter"
            options={[
              { id: 'all', text: `All Tasks` },
              { id: 'completed', text: `Completed` },
              { id: 'pending', text: `Pending` }
            ]}
          />
        </SpaceBetween>
        
        {tasks.length === 0 ? (
          <Box textAlign="center" padding="l">
            <Box variant="p">
              No tasks found. Create a new task to get started!
            </Box>
          </Box>
        ) : (
          <TaskTable
            tasks={sortedTasks}
            sortingColumn={sortingColumn}
            sortingDescending={sortingDescending}
            onSortingChange={handleSortingChange}
            onEdit={openEditModal}
            onToggleCompletion={handleCompletionToggle}
            onDelete={handleDelete}
            updatingTaskIds={updatingTaskIds}
          />
        )}
      </SpaceBetween>

      <TaskForm
        visible={isCreateModalVisible}
        onDismiss={closeCreateModal}
        onTaskCreated={handleTaskCreated}
        mode="create"
      />

      <TaskForm
        visible={isEditModalVisible}
        onDismiss={closeEditModal}
        onTaskUpdated={handleTaskUpdated}
        mode="edit"
        initialTask={editingTask}
      />
    </div>
  );
};

export default TaskList;
