import pymysql

class TaskList():
    def __init__(self):
        self.db_settings = {
            'host': '127.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': '123456',
            'db': 'interview',
            'charset': 'utf8',
        }

        self.table_name = 'task_list'

        self.start_connection()
    
    def start_connection(self):
        self.conn = pymysql.connect(**self.db_settings)

    def close_connection(self):
        self.conn.close()

    def get_all_task(self):
        with self.conn.cursor() as cursor:
            command = '''
                SELECT * FROM task_list
            '''

            cursor.execute(command)
            result = cursor.fetchall()

        output_ls = []
        
        for r in result:
            dc = {
                'id': r[0],
                'name': r[1],
                'description': r[2],
                'importance': r[3],
                'priority': r[4],
                'status': r[5]
            }
            output_ls.append(dc)
        
        return output_ls

    def get_task(self):
        pass

    def update_task(self, _id, name, description, importance, priority, status):
        with self.conn.cursor() as cursor:
            command = f'''
                UPDATE task_list
                SET name=%s, description=%s, importance=%s, 
                    priority=%s, status=%s
                WHERE id=%s
            '''

            cursor.execute(command, (name, description, importance, priority, status, _id))
        
        self.conn.commit()

    def add_task(self, name, description, importance, priority, status):        
        with self.conn.cursor() as cursor:
            command = '''
                INSERT INTO task_list(name, description, importance, priority, status)
                VALUES (%s, %s, %s, %s, %s)
            '''

            cursor.execute(command, (name, description, importance, priority, status))
        
        self.conn.commit()

    def delete_task(self):
        pass