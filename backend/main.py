import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as task_router

app = FastAPI(
    title="To-Do List API",
    description= "An API to manage a user's tasks",
    version="1.0.0",
    debug=True
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=3600,  # Set browser cache to 1 hour
)

app.include_router(task_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)