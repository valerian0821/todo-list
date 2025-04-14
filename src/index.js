import "./styles.css";
import {ProjectModule, Project} from "./project.js";
import { DOMController } from "./DOM.js";
import { addDefaultProj, getLocalStorage } from "./helper.js";

const addProjBtn = document.getElementById("add-proj-btn");
const projContent = document.getElementById("proj-content");
const contentHeader = document.getElementById("content-header");
const taskNav = document.getElementById("task-nav");
const taskContent = document.getElementById("tasks-sect");
const taskBtnSect = document.getElementById("task-btn-sect");

if (localStorage.getItem("projList") === null) {
    addDefaultProj();
} else {
    getLocalStorage();
}

DOMController.initializePage();
export { addProjBtn, projContent, contentHeader, taskNav, taskContent, taskBtnSect };
