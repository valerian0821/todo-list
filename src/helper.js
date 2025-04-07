import { ProjectModule } from "./project";

export function getProjList() {
    const projList = ProjectModule.getProjectList();
    return projList;
}
