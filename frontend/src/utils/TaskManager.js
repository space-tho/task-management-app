/**
 * Task management utility functions
 */
import { getTasks, deleteTask, updateTask } from '../accessors/ToDoAPIAccessor.jsx';

/**
 * Fetch tasks and handle loading/error states
 * @param {Function} setTasks - Function to update tasks state
 * @param {Function} setLoading - Function to update loading state
 * @param {Function} setError - Function to update error state
 * @returns {Promise<void>}
 */
export const fetchTasksData = async (setTasks, setLoading, setError) => {
  try {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setError(null);
  } catch (err) {
    setError(err.message);
    console.error('Error fetching tasks:', err);
  } finally {
    setLoading(false);
  }
};

/**
 * Handle task deletion with confirmation
 * @param {string} id - Task ID to delete
 * @param {Function} updateTasksState - Function to update tasks state after deletion
 * @param {Function} setError - Function to set error state if deletion fails
 * @returns {Promise<void>}
 */
export const handleTaskDeletion = async (id, updateTasksState, setError) => {
  try {
    await deleteTask(id);
    updateTasksState(prevTasks => prevTasks.filter(task => task.id !== id));
  } catch (err) {
    setError(err.message);
    console.error('Error deleting task:', err);
  }
};

/**
 * Toggle the completion status of a task
 * @param {Object} task - Task object to update
 * @returns {Promise<Object>} - Promise resolving to updated task
 * @throws {Error} If update fails
 */
export const toggleTaskCompletion = async (task) => {
  try {

  } catch (err) {
    throw new Error('Failed to update task status. Please try again.');
  }
};

/**
 * Handle toggling task completion status
 * @param {string} id - Task ID to toggle
 * @param {Array} tasks - Current tasks array
 * @param {Function} updateTasksState - Function to update tasks state after toggle
 * @param {Function} setError - Function to set error state if toggle fails
 * @param {Function} setUpdatingTaskIds - Function to update the set of tasks being updated
 * @returns {Promise<void>}
 */
export const handleTaskCompletionToggle = async (id, tasks, updateTasksState, setError, setUpdatingTaskIds) => {
  try {
    setUpdatingTaskIds(prev => new Set(prev).add(id));
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    const updatedTaskData = {
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      isCompleted: !taskToUpdate.isCompleted
    };

    const updatedTask = await updateTask(taskToUpdate.id, updatedTaskData);
    
    updateTasksState(prevTasks => prevTasks.map(task =>
      task.id === id ? updatedTask : task
    ));
  } catch (err) {
    setError(err.message);
    console.error('Error updating task:', err);
  } finally {
    setUpdatingTaskIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }
};
