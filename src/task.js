

export class Task {
    constructor(projID, taskID, title, description, dueDate, priority, complete) {
        this.projID = projID;
        this.taskID = taskID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
    }
}

const TaskModule = (function () {
    const taskList = [];

    const getTaskList = () => taskList;

    const addTask = (projID, title, description, dueDate, priority) => {
        let taskID = crypto.randomUUID();
        let complete = false;
        const task = new Task(projID, taskID, title, description, dueDate, priority, complete);
        taskList.push(task);
    }

    const delProjectTasks = (projID) => {
        for (let i = taskList.length - 1; i >= 0; i--) {
            if (taskList[i].projID === projID) {
                taskList.splice(i, 1);
            }
        }
    }

    const editTask = (taskID, title, description, dueDate, priority) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskID === taskList[i].taskID) {
                taskList[i].title = title;
                taskList[i].description = description;
                taskList[i].dueDate = dueDate;
                taskList[i].priority = priority;
                break;
            }
        }
    }

    const delTask = (taskID) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskID === taskList[i].taskID) {
                taskList.splice(i, 1);
                break;
            }
        }
    }

    const changeCompleteStatus = (taskID) => {
        for (let i = 0; i < taskList.length; i++) {
            if (taskID === taskList[i].taskID) {
                taskList[i].complete = !taskList[i].complete;
            }
        }
    }

    return {
        getTaskList, addTask, delProjectTasks, editTask, delTask, changeCompleteStatus
    }
})();

export {TaskModule};