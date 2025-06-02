from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    isCompleted: bool = False

class Task(TaskBase):
    id: str
    created_at: datetime