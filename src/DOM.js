import { handleProjSubmit, handleEditProjSubmit } from "./helper.js";
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
        addProjBtn.addEventListener("click", () => {
            createProjDialog();
            activateProjFormListener();
        });
    }

    const createProjDialog = () => {
        const projDialog = document.createElement("dialog");
        projDialog.innerHTML = createProjForm();
        projContent.appendChild(projDialog);
        projDialog.showModal();
    }

    const createProjForm = () => {
        let innerDialog = `
            <form id="proj-form" method="post">
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
            generateCurrentProjBox(projName, projID);
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
            editProjName(projID);
        })
    }

    const editProjName = (projID) => {
        createProjDialog();
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

    return {
        loadTaskHeader, generateProjBox, generateProjList, activateAddProjBtn, eraseProjList, activateEditProjListener, 
        generateCurrentProjBox
    }
})();

export {DOMController};