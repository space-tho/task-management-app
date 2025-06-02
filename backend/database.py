import uuid
from datetime import datetime
from typing import Dict, List, Optional
from models import Task, TaskBase

class TaskDatabase:
    def __init__(self):
        self.tasks: Dict[str, dict] = {}

    def get_all_tasks(self) -> List[Task]:
        return [Task(**task) for task in self.tasks.values()]
    
    def create_task(self, task: TaskBase) -> Task:
        task_id = str(uuid.uuid4())
        task_dict = task.model_dump()
        task_dict.update({
            "id": task_id,
            "created_at": datetime.now()
        })
        self.tasks[task_id] = task_dict
        return Task(**task_dict)

    def delete_task(self, task_id: str) -> bool:
        if task_id in self.tasks:
            del self.tasks[task_id]
            return True
        return False

    def update_task(self, task_id: str, task_update: TaskBase) -> Optional[Task]:
        if task_id not in self.tasks:
            return None
        existing_task = self.tasks[task_id]
        updated_task = task_update.model_dump()
        updated_task.update({
            "id": task_id,
            "created_at": existing_task["created_at"]
        })
        self.tasks[task_id] = updated_task
        return Task(**updated_task)

task_db = TaskDatabase()
