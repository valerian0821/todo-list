

export class Task {
    constructor(projID, taskID, title, description, dueDate, priority) {
        this.projID = projID;
        this.taskID = taskID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const TaskModule = (function () {
    const taskList = [];

    const getTaskList = () => taskList;

    const addTask = (projID, title, description, dueDate, priority) => {
        let taskID = crypto.randomUUID();
        const task = new Task(projID, taskID, title, description, dueDate, priority);
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

    return {
        getTaskList, addTask, delProjectTasks, editTask
    }
})();

export {TaskModule};