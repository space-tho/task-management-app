import React, { useState } from 'react';
import { createTask, updateTask } from '../accessors/ToDoAPIAccessor.jsx';
import {
  Modal,
  Form,
  FormField,
  Input,
  Textarea,
  Button,
  SpaceBetween,
  Box,
  Alert
} from '@cloudscape-design/components';

const TaskForm = ({ 
  visible, 
  onDismiss, 
  onTaskCreated, 
  onTaskUpdated,
  mode = 'create',
  initialTask = null
}) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialTask]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required!');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (mode === 'create') {
        const newTask = {
          title,
          description,
          isCompleted: false
        };
        
        const createdTask = await createTask(newTask);
        
        if (onTaskCreated) {
          onTaskCreated(createdTask);
        }
      } else if (mode === 'edit' && initialTask) {
        const updatedTaskData = {
          title,
          description,
          isCompleted: initialTask.isCompleted
        };
        
        const updatedTask = await updateTask(initialTask.id, updatedTaskData);
        
        if (onTaskUpdated) {
          onTaskUpdated(updatedTask);
        }
      }
      
      setTitle('');
      setDescription('');
      
    } catch (err) {
      setError(`Failed ${mode === 'create' ? 'creating' : 'updating'} your task. Please try again.`);
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} task:`, err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'create') {
      setTitle('');
      setDescription('');
    }
    setError(null);
    
    if (onDismiss) {
      onDismiss();
    }
  };

  const isEditMode = mode === 'edit';

  return (
    <Modal
      visible={visible}
      onDismiss={handleCancel}
      header={isEditMode ? "Edit Task" : "Create New Task"}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              {isSubmitting 
                ? (isEditMode ? 'Saving...' : 'Creating...') 
                : (isEditMode ? 'Save Changes' : 'Create Task')}
            </Button>
          </SpaceBetween>
        </Box>
      }
      size="medium"
    >
      {error && (
        <Alert type="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Form>
        <SpaceBetween direction="vertical" size="l">
          <FormField
            label="Title"
            constraintText="Required"
          >
            <Input
              value={title}
              onChange={({ detail }) => setTitle(detail.value)}
              placeholder="Enter task title"
              disabled={isSubmitting}
            />
          </FormField>
          
          <FormField
            label="Description"
          >
            <Textarea
              value={description}
              onChange={({ detail }) => setDescription(detail.value)}
              placeholder="Enter task description (optional)"
              disabled={isSubmitting}
              rows={5}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

export default TaskForm;
