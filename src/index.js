import "./styles.css";
import {ProjectModule, Project} from "./project.js";
import { DOMController } from "./DOM.js";
import { getProjList } from "./helper.js";


function addDefaultProj() {
    const projName = "Default Project";
    ProjectModule.addProject(projName);
}

function printDefaultProj() {
    const projList = ProjectModule.getProjectList();
    DOMController.generateProjList(projList);
}

const projContent = document.getElementById("proj-list");
addDefaultProj();
printDefaultProj();
export { projContent };
