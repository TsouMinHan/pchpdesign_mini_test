
from app import api

from .task_list import TaskListAPI

api.add_resource(TaskListAPI, '/api/v1/task', '/api/v1/task/<string:task_id>')
