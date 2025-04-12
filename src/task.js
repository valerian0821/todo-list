

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

    return {
        getTaskList, addTask
    }
})();

export {TaskModule};