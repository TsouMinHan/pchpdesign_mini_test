
from flask import request
from flask_restful import Resource

from ..model import task_list_db

class TaskListAPI(Resource):
    def get(self):
        output_ls = task_list_db.get_all_task()

        return {'task_list': output_ls}, 200

    def post(self):
        data = request.get_json()

        task_list_db.add_task(**data)
        
        return {}, 201

    def patch(self, task_id):
        data = request.get_json()
        
        if data.get('id'): # 回傳的資料有帶 id 過去，但回來的時候不會用到
            del data['id']

        task_list_db.update_task(task_id, **data)

        return {}, 204

    def delete(self):
        pass
