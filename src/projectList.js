import { lastDayOfWeek } from "date-fns";
import { objToStorage } from "./interfacer.js";

const projectList = (() => {
    let projectArr = [];

    const addProject = newProject => {
        projectArr.push(newProject);
        objToStorage.storeAllObj();
    }
    const removeProject = project => {
        if (projectArr.indexOf(project) > -1) {
            let newArr;
            newArr = (projectArr.slice(0, projectArr.indexOf(project))).concat(projectArr.slice(projectArr.indexOf(project) + 1))
            projectArr = newArr;
            objToStorage.removeObj(project.name)
        }
    }
    const sortProjects = (criteria) => {
        console.log(projectArr[0].name,projectArr[1].name)
        switch (criteria) {
            case "date":
                projectArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                break;

            case "priority":
                const lowArr = projectArr.filter(project => project.priority === "low");
                const medArr = projectArr.filter(project => project.priority === "medium");
                const highArr = projectArr.filter(project => project.priority === "high");
                lowArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                medArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                highArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                projectArr = highArr.concat(medArr.concat(lowArr));
                break;
            case "added":
                projectArr.sort((a, b) => new Date(a.getTimeCreated()) - new Date(b.getTimeCreated()));
                break;
        };
        console.log(projectArr[0].name,projectArr[1].name)
    };

    return {
        addProject,
        removeProject,
        sortProjects,
        get projectArr() { return projectArr },
        get projectNames() { return projectArr.map((obj) => obj.name)
        }
    };
})();

export { projectList };