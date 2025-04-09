import { handleNewProjSubmit } from "./helper.js";
import { addProjBtn, projContent, contentHeader } from "./index.js";

const DOMController = (function() {
    
    const loadTaskHeader = () => {
        const taskHeader = document.createElement("h1");
        taskHeader.textContent = "All Tasks";
        contentHeader.appendChild(taskHeader);
    }

    const removeContentHeader = () => {
        contentHeader.textContent = "";
    }

    const activateAddProjBtn = () => {
        addProjBtn.addEventListener("click", createNewProjDialog);
    }

    const createNewProjDialog = () => {
        const newProjDialog = document.createElement("dialog");
        newProjDialog.id = "new-proj-dialog";
        newProjDialog.innerHTML = createNewProjForm();
        projContent.appendChild(newProjDialog);
        activateNewProjFormListener();
        newProjDialog.showModal();
    }

    const createNewProjForm = () => {
        let innerDialog = `
            <form id="new-proj-form" method="post">
                <div>
                    <h2>Add New Project</h2>
                </div>
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div>
                    <button type="submit">Enter</button>
                </div>
            </form>`;
        return innerDialog;
    }

    const activateNewProjFormListener = () => {
        const newProjForm = document.getElementById("new-proj-form");
        newProjForm.addEventListener("submit", handleNewProjSubmit);
    }

    const generateProjBox = (projName, projNumber) => {
        const projBox = document.createElement("div");
        projBox.classList.add("projBox");
        projContent.appendChild(projBox);

        const projText = document.createElement("p");
        projText.textContent = `${projNumber}. ${projName}`;
        projBox.appendChild(projText);

        projText.addEventListener("click", () => {
            generateCurrentProjHeader(projName);
        });
    }

    const generateCurrentProjHeader = (projName) => {
        removeContentHeader();
        const projHeader = document.createElement("h1");
        projHeader.textContent = projName;
        contentHeader.appendChild(projHeader);
    }

    const generateProjList = (projList) => {
        for (let i = 0; i < projList.length; i++) {
            let projNumber = i + 1;
            let projName = projList[i].name;
            generateProjBox(projName, projNumber);
        }
    }

    const eraseProjList = () => {
        projContent.textContent = "";
    }

    return {
        loadTaskHeader, generateProjBox, generateProjList, activateAddProjBtn, eraseProjList
    }
})();

export {DOMController};