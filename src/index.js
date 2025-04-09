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

const navBar = document.getElementById("nav-bar");
const content = document.getElementById("content");
const addProjBtn = document.getElementById("add-proj-btn");
const projContent = document.getElementById("proj-content");
const contentHeader = document.getElementById("content-header");
DOMController.loadTaskHeader();
addDefaultProj();
printDefaultProj();
DOMController.activateAddProjBtn();

export { navBar, content, addProjBtn, projContent, contentHeader };
