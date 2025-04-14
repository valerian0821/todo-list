import { handleProjSubmit, handleEditProjSubmit, handleTaskSubmit, handleEditTaskSubmit,
     getTaskList, delProj, getProjList, delProjTasks, delTask, changeCompleteStatus } from "./helper.js";
import { addProjBtn, projContent, contentHeader, taskNav, taskContent, taskBtnSect} from "./index.js";
import { ProjectModule } from "./project.js";
import { TaskModule } from "./task.js";
import { differenceInDays } from "date-fns";

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

    const initializePage = () => {
        loadTaskHeader();
        loadAddTaskBtn();
        activateAddTaskBtn(currentProjID);
        generateTaskList(getTaskList());
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
        const projCloseBtn = document.getElementById("close-proj-btn");
        projCloseBtn.addEventListener("click", (event) => {
            event.preventDefault();
            projDialog.close();
            projDialog.remove();
        });
    }

    const createProjForm = (projName = "") => {
        let innerDialog = `
            <form id="proj-form" method="post">
                <div>
                    <button type="button" id="close-proj-btn">X</button>
                </div>
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

    const generateTaskBox = (taskProjID, taskID, taskName, taskDescription, taskDueDate, taskPriority, taskComplete) => {
        
        //Create taskbox
        const taskBox = document.createElement("div");
        taskBox.id = "task-box";
        taskContent.appendChild(taskBox);

        //Create checkbox      
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        determineCheckStatus(taskComplete, checkbox);
        taskBox.appendChild(checkbox);
        checkbox.addEventListener("change", () => {
            changeCompleteStatus(taskID);
            eraseTaskList();
            generateTaskList(getTaskList());
        });

        //Create priority color display
        const priorityDiv = document.createElement("div");
        priorityDiv.id = "priority-box";
        setPriorityColor(taskPriority, priorityDiv);
        taskBox.appendChild(priorityDiv);

        //Create title and dueDate display
        const displayDiv = document.createElement("div");
        taskBox.appendChild(displayDiv);

        const title = document.createElement("p");
        title.textContent = taskName;
        displayDiv.appendChild(title);

        const dueDate = document.createElement("p");
        displayDueDate(taskDueDate, dueDate);
        displayDiv.appendChild(dueDate);

        //Create edit and delete button
        const editDelDiv = document.createElement("div");
        taskBox.appendChild(editDelDiv);

        const editBtn = document.createElement("button");
        editBtn.textContent = "E";
        editDelDiv.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
            editTask(taskID, taskName, taskDescription, taskDueDate, taskPriority);
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "D";
        editDelDiv.appendChild(delBtn);
        delBtn.addEventListener("click", () => {
            delTask(taskID);
            eraseTaskList();
            generateTaskList(getTaskList());
        });
    }

    const determineCheckStatus = (taskComplete, checkbox) => {
        if (taskComplete) {
            checkbox.defaultChecked = true;
        }
    }

    const setPriorityColor = (taskPriority, priorityDiv) => {
        priorityDiv.classList.toggle("low-priority", false);
        priorityDiv.classList.toggle("medium-priority", false);
        priorityDiv.classList.toggle("high-priority", false);
        if (taskPriority === "low") {
            priorityDiv.classList.toggle("low-priority", true);
        } else if (taskPriority === "medium") {
            priorityDiv.classList.toggle("medium-priority", true);
        } else {
            priorityDiv.classList.toggle("high-priority", true);
        }
    }

    const displayDueDate = (taskDueDate, dueDate) => {
        if (taskDueDate === "") {
            dueDate.textContent = "No Due Date";
        } else {
            const taskYear = taskDueDate.substring(0, 4);
            const taskMonth = taskDueDate.substring(5, 7);
            const taskDay = taskDueDate.substring(8, 10);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
            const currentDay = String(currentDate.getDate()).padStart(2, '0');
            const { differenceInDays } = require("date-fns");
            const result = differenceInDays(new Date(taskYear, taskMonth, taskDay), new Date(currentYear, currentMonth, currentDay));
            if (result === 0) {
                dueDate.textContent = "Due Today";
            } else if (result < 0) {
                dueDate.textContent = "Overdue";
            } else if (result === 1) {
                dueDate.textContent = "Due Tomorrow";
            } else {
                dueDate.textContent = `Due in ${result} Days`;
            }
        }    
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
            let taskComplete = currentTaskList[i].complete;
            generateTaskBox(taskProjID, taskID, taskName, taskDescription, taskDueDate, taskPriority, taskComplete);
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

    const createTaskDialog = (title, description, dueDate, priority) => {
        const taskDialog = document.createElement("dialog");
        taskDialog.innerHTML = createTaskForm(title, description, dueDate, priority);
        taskContent.appendChild(taskDialog);
        taskDialog.showModal();
        const taskCloseBtn = document.getElementById("close-task-btn");
        taskCloseBtn.addEventListener("click", (event) => {
            event.preventDefault();
            taskDialog.close();
            taskDialog.remove();
        })
        return taskDialog;
    }

    const createTaskForm = (title = "", description = "", dueDate = "", priority = "") => {
        let innerDialog = `
            <form id="task-form" method="post">
                <div>
                    <button type="button" id="close-task-btn">X</button>
                </div>
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value="${title}" required>        
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="5" cols="40">${description}</textarea>
                </div>
                <div>
                    <label for="due-date">Due Date:</label>
                    <input type="date" id="due-date" name="due-date" value="${dueDate}">
                </div>
                <div>
                    <label for="priority">Priority:</label>
                    <select id="priority" name="priority" required>
                        <option value="low" ${priority === "low" ? "selected" : ""}>Low</option>
                        <option value="medium" ${priority === "medium" ? "selected" : ""}>Medium</option>
                        <option value="high" ${priority === "high" ? "selected" : ""}>High</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Enter</button>
                </div>
            </form>`;
        return innerDialog;
    }

    const editTask = (taskID, title, description, dueDate, priority) => {
        const taskDialog = createTaskDialog(title, description, dueDate, priority);
        activateEditTaskFormListener(taskID, taskDialog);
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

    const activateEditTaskFormListener = (taskID, taskDialog) => {
        const taskForm = document.getElementById("task-form");
        taskForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(taskForm);
            handleEditTaskSubmit(taskID, formData);
            taskDialog.close();
            taskDialog.remove();
        });
    }

    const eraseTaskList = () => {
        taskContent.textContent = "";
    }

    return {
        loadTaskHeader, generateProjBox, generateProjList, activateAddProjBtn, eraseProjList, activateEditProjListener, 
        generateCurrentProjBox, activateTaskNav, loadAddTaskBtn, activateAddTaskBtn, generateTaskList, eraseTaskList, initializePage
    }
})();

export {DOMController};