# Task Management Application

A full-stack task management application with a FastAPI Python backend and React frontend using Cloudscape Design components.

## Features

### Backend (FastAPI)
- RESTful API for managing todo items
- Create, read, update, and delete tasks
- In-memory database with sample data
- API documentation with Swagger UI

### Frontend (React + Cloudscape Design)
- Modern, responsive UI using AWS Cloudscape Design components
- Create and edit tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Search tasks by title or description
- Filter tasks by completion status (All, Completed, Pending)
- Sort tasks by title or creation date

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 20 or higher
- npm

### Backend Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd task-management-app/backend
   ```

2. Activate the virtual environment

   Mac/Linux: `source ./venv/bin/activate`  
   Windows: `.\venv\Scripts\activate`

3. Install backend dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```
   python main.py
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install frontend dependencies:
   ```
   npm install
   npm install axios
   ```

3. Run the frontend development server:
   ```
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## API Documentation

### Todo Item Structure

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "isCompleted": false,
  "created_at": "YYYY-MM-DDTHH:mm:ss.000Z"
}
```

### Endpoints

#### Create a Todo Item

```
POST /tasks/
```

Request body:
```json
{
  "title": "string",
  "description": "string",
  "isCompleted": false
}
```

#### Get All Todo Items

```
GET /tasks/
```

#### Update a Todo Item

```
POST /tasks/{task_id}
```

Request body:
```json
{
  "title": "string",
  "description": "string",
  "isCompleted": true
}
```

#### Delete a Todo Item

```
DELETE /tasks/{task_id}
```

## Frontend Components

### Main Components

- **App**: Main application component
- **TaskList**: Displays the list of tasks with filtering, sorting, and search capabilities
- **TaskForm**: Reusable form component for creating and editing tasks

### Features

1. **Task Management**:
   - Create new tasks with title and description
   - Edit existing tasks
   - Mark tasks as complete or incomplete
   - Delete tasks

2. **Search and Filtering**:
   - Search tasks by title or description
   - Filter tasks by completion status (All, Completed, Pending)
   - Sort tasks by title, status, or creation date

3. **User Interface**:
   - Clean, modern UI using Cloudscape Design components
   - Modal dialogs for creating and editing tasks
   - Status indicators for task completion state

## Technologies Used

- **Backend**: FastAPI, Python
- **Frontend**: React, Cloudscape Design System
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Styling**: CSS with Cloudscape Design components

## Room for Future Enhancements

- Unit test for Python API
- User authentication and authorization
- Persistent database storage (SQL)
