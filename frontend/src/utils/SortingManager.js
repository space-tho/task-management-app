/**
 * Task filtering and sorting logic
 */

/**
 * Filter tasks based on search query and status filter
 * @param {Array} tasks - Array of task objects
 * @param {string} searchQuery - Text to search in title and description
 * @param {string} statusFilter - Filter by status ('all', 'completed', 'pending')
 * @returns {Array} Filtered tasks
 */
export const filterTasks = (tasks, searchQuery, statusFilter) => {
  return tasks.filter(task => {
    const matchesSearch = !searchQuery.trim() ||
      (task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus =
      statusFilter === 'all' || 
      (statusFilter === 'completed' && task.isCompleted) ||
      (statusFilter === 'pending' && !task.isCompleted);
    
    return matchesSearch && matchesStatus;
  });
};

/**
 * Sort tasks based on column and order
 * @param {Array} tasks - Array of task objects
 * @param {Object} sortingColumn - Column to sort by {sortingField: string}
 * @param {boolean} sortingDescending - Whether to sort in descending order
 * @returns {Array} Sorted tasks
 */
export const sortTasks = (tasks, sortingColumn, sortingDescending) => {
  const sortField = sortingColumn.sortingField;
  const order = sortingDescending ? -1 : 1;
  
  return [...tasks].sort((a, b) => {
    if (sortField === 'title') {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return order * (titleA < titleB ? -1 : titleA > titleB ? 1 : 0);
    } else if (sortField === 'created_at') {
      return order * (new Date(a.created_at) - new Date(b.created_at));
    } else {
      return 0;
    }
  });
};

/**
 * Filter and sort tasks in one operation
 * @param {Array} tasks - Array of task objects
 * @param {string} searchQuery - Text to search in title and description
 * @param {string} statusFilter - Filter by status ('all', 'completed', 'pending')
 * @param {Object} sortingColumn - Column to sort by {sortingField: string}
 * @param {boolean} sortingDescending - Whether to sort in descending order
 * @returns {Array} Filtered and sorted tasks
 */
export const filterAndSortTasks = (tasks, searchQuery, statusFilter, sortingColumn, sortingDescending) => {
  const filteredTasks = filterTasks(tasks, searchQuery, statusFilter);
  return sortTasks(filteredTasks, sortingColumn, sortingDescending);
};
