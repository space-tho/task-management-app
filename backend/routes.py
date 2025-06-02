from fastapi import APIRouter, HTTPException
from typing import List
from models import Task, TaskBase
from database import task_db

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.get("/", response_model=List[Task])
async def get_all_tasks():
    return task_db.get_all_tasks()

@router.post("/", response_model=Task)
async def create_task(task: TaskBase):
    return task_db.create_task(task)

@router.post("/{task_id}", response_model=Task)
async def update_task(task_id: str, task: TaskBase):
    updated_task = task_db.update_task(task_id, task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    success = task_db.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None
