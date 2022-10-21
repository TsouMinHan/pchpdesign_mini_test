const ROOT_URL = 'http://127.0.0.1:5000';

const getFetch = function(url) {
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ROOT_URL },
    })
}

const postFetch = function(url, data) {
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ROOT_URL },
    })
}

const patchFetch = function(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ROOT_URL },
    })
}

let data = {
    addTaskObj: {
        'name': '',
        'description': '',
        'importance': 1,
        'priority': 1,
        'status': 1,
    },
    taskList: []
}

let vm = new Vue({
    el: "#app",
    data: data,
    delimiters: ["[[", "]]"],
    mounted: function() {
        this.getTask();
    },
    methods: {
        getTask: function() {
            getFetch(`${ROOT_URL}/api/v1/task`)
                .then(response => response.json())
                .then(data => {
                    this.taskList = data.task_list;
                })
        },
        addTask: function() {
            if (this.addTaskObj.name.length === 0) {
                alert('Task name is empty!');
                return;
            }

            postFetch(`${ROOT_URL}/api/v1/task`, this.addTaskObj)
                .then(response => {
                    if (response.status === 201) {
                        location.reload();
                    } else {
                        alert('add task failed!')
                    }
                })
                .catch(error => {
                    alert(`add task failed! error code: ${error}`)
                })
        },
        listTasks: function() {
            this.taskList.sort(task_compare);
        },
        updateTask: function(taskId) {
            let updateTask = this.taskList.find((ele) => ele.id === taskId);

            if (updateTask === 'undefined') alert('update failed!');

            if (updateTask.status === true || updateTask.status === 1) {
                updateTask.status = 0;
            } else if (updateTask.status === false || updateTask.status === 0) {
                updateTask.status = 1;
            }

            patchFetch(`${ROOT_URL}/api/v1/task/${taskId}`, updateTask)
                .then(response => {
                    if (response.status === 204) {
                        location.reload();
                    } else {
                        alert('update task failed!')
                    }
                })
                .catch(error => {
                    alert(`update task failed! error code: ${error}`)
                })
        }
    },
    computed: {}
})

function task_compare(a, b) {
    // 因為重要程度是由大到小，判斷要反過來

    if (a.importance < b.importance) {
        return 1;
    }

    if (a.importance > b.importance) {
        return -1;
    }

    if (a.priority < b.priority) {
        return 1;
    }

    if (a.priority > b.priority) {
        return -1;
    }

    return 0;
}

objs.sort(compare);