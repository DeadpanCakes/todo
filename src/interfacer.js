import { projectList } from "./projectList.js";

const objToCard = (() => {

    const getId = (element) => element.parentNode.parentNode.id;

    const getObj = (elementInfo) => {
        const id = getId(elementInfo);
        let objIndex
        if (projectList.projectNames.some(name => name === id)) {
            objIndex = projectList.projectNames.indexOf(id);
        }
        console.log("reached")
        return projectList.projectArr[objIndex];
    }

    const getCard = (projectName) => document.getElementById(projectName);

    const findProjectCat = (taskInfo) => {
        const id = getId(taskInfo);
        for (let i=0;i<projectList.projectArr.length;i++) {
            if (projectList.projectArr[i].getTaskNames().some(j => j === id)) {
                return projectList.projectArr[i];
            }
        }
    }

    const findTask = (taskInfo) => {
        const id = getId(taskInfo);
        const project = findProjectCat(taskInfo)
        const taskIndex = project.getTaskNames().indexOf(id)
        console.log(project.getTaskArr());
        return project.getTaskArr()[taskIndex];
    }

    return { getObj, getCard, findProjectCat, findTask }
})();

/*
write an obj with methods to facilitate communication between objects and corresponding elements to avoid coupling
input card elements
output corresponding object
get an element of a card
find some identifier for that element
reach the identifier from the input
loop through object list to find index of that object by comparing against id
return index of object in object arr arr
*/

export { objToCard }