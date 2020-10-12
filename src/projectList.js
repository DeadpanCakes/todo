import { lastDayOfWeek } from "date-fns";

const projectList = (() => {
    let projectArr = [];
    const addProject = newProject => projectArr.push(newProject);
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
                const priorityToNum = (priority) => {
                    switch (priority) {
                        case "low":
                            return 1;
                        case "medium":
                            return 2;
                        case "high":
                            return 3;
                    };
                };
                projectArr.sort((a, b) => {
                    return priorityToNum(b.priority) - priorityToNum(a.priority)
                });
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