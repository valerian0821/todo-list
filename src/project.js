
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

    return {
        getProjectList, addProject, changeProjName
    }
})();

export {ProjectModule};