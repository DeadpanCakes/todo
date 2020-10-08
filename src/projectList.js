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
    return {
        addProject,
        removeProject,
        get projectArr() { return projectArr },
        get projectNames() { return projectArr.map((obj) => obj.getName())}
    };
})();

export { projectList };