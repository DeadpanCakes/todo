/*
write an object that privately stores all of the tasks along with inbuilt methods to add, remove
interface? IIFE
input? none for the object, objects for the arrays
output object
*/

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
    const getProjectArr = () => projectArr;
    const getProjectNames = () => projectArr.map((obj) => obj.getName());
    return { addProject, removeProject, getProjectArr, getProjectNames };
})();

export { projectList };