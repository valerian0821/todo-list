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
    const taskList = TaskModule.getTaskList();
    console.log(taskList);
}
