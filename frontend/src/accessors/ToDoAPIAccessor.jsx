import axios from 'axios';

const toDoAPI = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000
});

export const getTasks = async () => {
  const controller = new AbortController();
  const response = await toDoAPI.get('/tasks/', {
    signal: controller.signal
  });
  return response.data;
};

export const createTask = async (task) => {
  const response = await toDoAPI.post('/tasks/', task);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await toDoAPI.post(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await toDoAPI.delete(`/tasks/${id}`);
};
