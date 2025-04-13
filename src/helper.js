import { ProjectModule } from "./project.js";
import { DOMController } from "./DOM.js";
import { TaskModule } from "./task.js";

export function handleProjSubmit(event) {
    event.preventDefault();
    const projName = document.getElementById("title").value;
    ProjectModule.addProject(projName);
    DOMController.eraseProjList();
    const projList = ProjectModule.getProjectList();
    DOMController.generateProjList(projList);
}

export function handleEditProjSubmit(projID, formData) {
    const projName = formData.get("title");
    ProjectModule.changeProjName(projID, projName);
    DOMController.eraseProjList();
    const projList = ProjectModule.getProjectList();
    DOMController.generateProjList(projList);
    DOMController.generateCurrentProjBox(projName, projID);
}

export function handleTaskSubmit(projID, formData) {
    const taskName = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");
    TaskModule.addTask(projID, taskName, description, dueDate, priority);
    DOMController.eraseTaskList();
    DOMController.generateTaskList(getTaskList());
}

export function handleEditTaskSubmit(taskID, formData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");
    TaskModule.editTask(taskID, title, description, dueDate, priority);
    DOMController.eraseTaskList();
    DOMController.generateTaskList(getTaskList());
}

export function getProjList() {
    return ProjectModule.getProjectList();
}

export function getTaskList() {
    return TaskModule.getTaskList();
}

export function delProj(projID) {
    ProjectModule.delProj(projID);
}

export function delProjTasks(projID) {
    TaskModule.delProjectTasks(projID);
}
