
export class Project {
    constructor(id, name, toDo) {
        this.id = id;
        this.name = name;
        this.toDo = toDo;
    }

    addToDoItem(item) {
        this.toDo.append(item);
    }
}

const ProjectModule = (function () {
    const projectList = [];

    const getProjectList = () => projectList;

    const addProject = (name) => {
        const toDo = [];
        let newID = crypto.randomUUID();
        const project = new Project(newID, name, toDo);
        projectList.push(project);
    }

    return {
        getProjectList, addProject
    }
})();

export {ProjectModule};