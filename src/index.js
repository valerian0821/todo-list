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


const addProjBtn = document.getElementById("add-proj-btn");
const projContent = document.getElementById("proj-content");
const contentHeader = document.getElementById("content-header");
const taskNav = document.getElementById("task-nav");
const taskContent = document.getElementById("tasks-sect");
const taskBtnSect = document.getElementById("task-btn-sect");
DOMController.loadTaskHeader();
addDefaultProj();
printDefaultProj();
DOMController.activateTaskNav();
DOMController.activateAddProjBtn();

export { addProjBtn, projContent, contentHeader, taskNav, taskContent, taskBtnSect };
