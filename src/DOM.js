import { handleProjSubmit, handleEditProjSubmit, handleTaskSubmit, getTaskList, delProj, getProjList, delProjTasks } from "./helper.js";
import { addProjBtn, projContent, contentHeader, taskNav, taskContent, taskBtnSect} from "./index.js";
import { ProjectModule } from "./project.js";
import { TaskModule } from "./task.js";

const DOMController = (function() {
    let currentProjID = "solo";
    
    const loadTaskHeader = () => {
        const taskHeader = document.createElement("h1");
        taskHeader.textContent = "Solo Tasks";
        contentHeader.appendChild(taskHeader);
    }

    const removeContentHeader = () => {
        contentHeader.textContent = "";
    }

    const activateTaskNav = () => {
        taskNav.addEventListener("click", () => {
            let projID = "solo";
            removeContentHeader();
            loadTaskHeader();
            eraseTaskList();
            changeCurrentProjID(projID);
            taskBtnSect.textContent = "";
            loadAddTaskBtn();
            activateAddTaskBtn(currentProjID);
            generateTaskList(getTaskList());
        });
    }

    const activateAddProjBtn = () => {
        addProjBtn.addEventListener("click", () => {
            createProjDialog();
            activateProjFormListener();
        });
    }

    const createProjDialog = (projName) => {
        const projDialog = document.createElement("dialog");
        projDialog.innerHTML = createProjForm(projName);
        projContent.appendChild(projDialog);
        projDialog.showModal();
    }

    const createProjForm = (projName = "") => {
        let innerDialog = `
            <form id="proj-form" method="dialog">
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value="${projName}"required>
                </div>
                <div>
                    <button type="submit">Enter</button>
                </div>
            </form>`;
        return innerDialog;
    }

    const activateProjFormListener = () => {
        const projForm = document.getElementById("proj-form");
        projForm.addEventListener("submit", handleProjSubmit);
    }

    const activateEditProjListener = (projID) => {
        const projForm = document.getElementById("proj-form");
        projForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(projForm);
            handleEditProjSubmit(projID, formData);
        });
    }

    const generateProjBox = (projName, projNumber, projID) => {
        const projBox = document.createElement("div");
        projBox.classList.add("projBox");
        projContent.appendChild(projBox);

        const projText = document.createElement("p");
        projText.textContent = `${projNumber}. ${projName}`;
        projBox.appendChild(projText);

        projText.addEventListener("click", () => {
            eraseTaskList();
            changeCurrentProjID(projID);
            generateCurrentProjBox(projName, currentProjID);
            taskBtnSect.textContent = "";
            loadAddTaskBtn();
            activateAddTaskBtn(currentProjID);
            generateTaskList(getTaskList());
        });

    }

    const generateCurrentProjBox = (projName, projID) => {
        removeContentHeader();

        const projHeader = document.createElement("h1");
        projHeader.textContent = projName;
        contentHeader.appendChild(projHeader);

        const projEditBtn = document.createElement("button");
        projEditBtn.textContent = "Edit";
        contentHeader.appendChild(projEditBtn);
        projEditBtn.addEventListener("click", () => {
            editProjName(projID, projName);
        });

        const projDelBtn = document.createElement("button");
        projDelBtn.textContent = "Delete";
        contentHeader.appendChild(projDelBtn);
        projDelBtn.addEventListener("click", () => {
            delProj(projID);
            delProjTasks(projID);
            eraseTaskList();
            taskBtnSect.textContent = "";
            removeContentHeader();
            changeCurrentProjID("");
            eraseProjList();
            generateProjList(getProjList());
        });
    }

    const editProjName = (projID, projName) => {
        createProjDialog(projName);
        activateEditProjListener(projID);
    }

    const generateProjList = (projList) => {
        for (let i = 0; i < projList.length; i++) {
            let projNumber = i + 1;
            let projName = projList[i].name;
            let projID = projList[i].id;
            generateProjBox(projName, projNumber, projID);
        }
    }

    const eraseProjList = () => {
        projContent.textContent = "";
    }

    const changeCurrentProjID = (projID) => {
        currentProjID = projID;
    }

    const generateTaskBox = (taskProjID, taskID, taskName, taskDescription, taskDueDate, taskPriority) => {
        
        //Create taskbox
        const taskBox = document.createElement("div");
        taskBox.id = "task-box";
        taskContent.appendChild(taskBox);

        //Create checkbox
        const checkboxDiv = document.createElement("div");
        taskBox.appendChild(checkboxDiv);
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxDiv.appendChild(checkbox);

        //Create priority color display
        const priorityDiv = document.createElement("div");
        priorityDiv.id = "priority-box";
        taskBox.appendChild(priorityDiv);

        //Create title and dueDate display
        const displayDiv = document.createElement("div");
        taskBox.appendChild(displayDiv);

        const title = document.createElement("p");
        title.textContent = taskName;
        displayDiv.appendChild(title);

        const dueDate = document.createElement("p");
        dueDate.textContent = taskDueDate;
        displayDiv.appendChild(dueDate);

        //Create edit and delete button
        const editDelDiv = document.createElement("div");
        taskBox.appendChild(editDelDiv);

        const editBtn = document.createElement("button");
        editBtn.textContent = "E";
        editDelDiv.appendChild(editBtn);

        const delBtn = document.createElement("button");
        delBtn.textContent = "D";
        editDelDiv.appendChild(delBtn);
    }

    const generateTaskList = (taskList) => {
        const currentTaskList = getCurrentTaskList(taskList);
        for (let i = 0; i < currentTaskList.length; i++) {
            let taskProjID = currentTaskList[i].projID;
            let taskID = currentTaskList[i].taskID;
            let taskName = currentTaskList[i].title;
            let taskDescription = currentTaskList[i].description;
            let taskDueDate = currentTaskList[i].dueDate;
            let taskPriority = currentTaskList[i].priority;
            generateTaskBox(taskProjID, taskID, taskName, taskDescription, taskDueDate, taskPriority);
        }
    }

    const getCurrentTaskList = (taskList) => {
        return taskList.filter(task => task.projID === currentProjID);
    }

    const loadAddTaskBtn = () => {
        const addTaskBtn = document.createElement("button");
        addTaskBtn.id = "add-task-btn";
        addTaskBtn.textContent = "+";
        taskBtnSect.appendChild(addTaskBtn);
    }

    const activateAddTaskBtn = (projID) => {
        const addTaskBtn = document.getElementById("add-task-btn");
        addTaskBtn.addEventListener("click", () => {
            const taskDialog = createTaskDialog();
            activateTaskFormListener(projID, taskDialog);
        });
    }

    const createTaskDialog = () => {
        const taskDialog = document.createElement("dialog");
        taskDialog.innerHTML = createTaskForm();
        taskContent.appendChild(taskDialog);
        taskDialog.showModal();
        return taskDialog;
    }

    const createTaskForm = () => {
        let innerDialog = `
            <form id="task-form" method="dialog">
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>        
                </div>
                <div>
                    <label for="description">Description:</label>
                    <input type="textarea" id="description" name="description" rows="5" cols="40" required>
                </div>
                <div>
                    <label for="due-date">Due Date:</label>
                    <input type="date" id="due-date" name="due-date">
                </div>
                <div>
                    <label for="priority">Priority:</label>
                    <select id="priority" name="priority" required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Enter</button>
                </div>
            </form>`;
        return innerDialog;
    }

    const activateTaskFormListener = (projID, taskDialog) => {
        const taskForm = document.getElementById("task-form");
        taskForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(taskForm);
            handleTaskSubmit(projID, formData);
            taskDialog.close();
            taskDialog.remove();
        });
    }

    const eraseTaskList = () => {
        taskContent.textContent = "";
    }

    return {
        loadTaskHeader, generateProjBox, generateProjList, activateAddProjBtn, eraseProjList, activateEditProjListener, 
        generateCurrentProjBox, activateTaskNav, loadAddTaskBtn, activateAddTaskBtn, generateTaskList, eraseTaskList
    }
})();

export {DOMController};