import { lastDayOfWeek } from "date-fns";

const projectList = (() => {
    let projectArr = [];

    const addProject = newProject => {
        projectArr.push(newProject);
    }
    const removeProject = project => {
        if (projectArr.indexOf(project) > -1) {
            let newArr;
            newArr = (projectArr.slice(0, projectArr.indexOf(project))).concat(projectArr.slice(projectArr.indexOf(project) + 1))
            projectArr = newArr;
        }
    }
    const sortProjects = (criteria) => {
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
                console.log("reached");
                projectArr.sort((a,b) => a.timeOfCreation - b.timeOfCreation);
        };
    };
    return {
        addProject,
        removeProject,
        sortProjects,
        get projectArr() { return projectArr },
        get projectNames() { return projectArr.map((obj) => obj.name) }
    };
})();

export { projectList };