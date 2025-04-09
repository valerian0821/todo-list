import { ProjectModule } from "./project.js";
import { DOMController } from "./DOM.js";

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
