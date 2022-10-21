from app.model.task_list import TaskList

tl = TaskList()

tl.start_connection()

tl.update_task(2, 'task_two', 'this is task_two', 1, 5, 2)

tl.close_connection()