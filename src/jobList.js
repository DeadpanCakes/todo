/*
write an object that privately stores all of the tasks along with inbuilt methods to add, remove
interface? IIFE
input? none for the object, objects for the arrays
output object
*/

const jobList = (() => {
    let projectArr = ["test", "health", "dailies", "weekly", "work", "school", "art"];
    let taskArr = [];
    const addProject = newProject => projectArr.push(newProject);
    const addTask = newTask => taskArr.push(newTask);
    const removeProject = project => {
        if (projectArr.indexOf(project) > -1) {
            let newArr;
            newArr = (projectArr.slice(0, projectArr.indexOf(project))).concat(projectArr.slice(projectArr.indexOf(project) + 1))
            projectArr = newArr;
        }
    }
    const removeTask = task => {
        if (taskArr.indexOf(task) > -1) {
            let newArr;
            newArr = (taskArr.slice(0, taskArr.indexOf(task))).concat(taskArr.slice(taskArr.indexOf(task) + 1))
            taskArr = newArr;
        }
    }
    const getProjectArr = () => projectArr;
    const getTaskArr = () => taskArr;
    return { addProject, addTask, removeProject, removeTask, getProjectArr, getTaskArr };
})();

export { jobList }