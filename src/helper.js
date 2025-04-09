import { ProjectModule } from "./project.js";
import { DOMController } from "./DOM.js";

export function handleNewProjSubmit(event) {
    event.preventDefault();
    const newProjName = document.getElementById("title").value;
    ProjectModule.addProject(newProjName);
    DOMController.eraseProjList();
    const newProjList = ProjectModule.getProjectList();
    DOMController.generateProjList(newProjList);
}
