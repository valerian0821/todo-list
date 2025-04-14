
export class Project {
    constructor(id, name, tasks) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    addToDoItem(item) {
        this.tasks.append(item);
    }
}

const ProjectModule = (function () {
    const projectList = [];

    const getProjectList = () => projectList;

    const addProject = (name) => {
        const tasks = [];
        let newID = crypto.randomUUID();
        const project = new Project(newID, name, tasks);
        projectList.push(project);
    }

    const changeProjName = (projID, projName) => {
        for (let i = 0; i < projectList.length; i++) {
            if (projID === projectList[i].id) {
                projectList[i].name = projName;
                break;
            }
        }
    }

    const delProj = (projID) => {
        const index = projectList.findIndex(project => project.id === projID);
        if (index !== -1) projectList.splice(index, 1);
    }

    const getLocalStorageProjects = (storedProjList) => {
        for (let i = 0; i < storedProjList.length; i++) {
            projectList.push(storedProjList[i]);
        }
    }

    return {
        getProjectList, addProject, changeProjName, delProj, getLocalStorageProjects
    }
})();

export {ProjectModule};