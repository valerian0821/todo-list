import { projContent } from "./index.js";

const DOMController = (function() {
    
    const generateProjBox = (projName, projNumber) => {
        const projBox = document.createElement("div");
        projBox.textContent = `${projNumber}. ${projName}`;
        projBox.classList.add("projBox");
        projContent.appendChild(projBox);
    }

    const generateProjList = (projList) => {
        for (let i = 0; i < projList.length; i++) {
            let projNumber = i + 1;
            let projName = projList[i].name;
            generateProjBox(projName, projNumber);
        }
    }

    return {
        generateProjBox, generateProjList
    }
})();

export {DOMController};