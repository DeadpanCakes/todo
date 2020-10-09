import { projectList } from "./projectList.js";

const objToCard = (() => {
    const getObj = (elementInfo) => {
        const id = elementInfo.parentNode.parentNode.id;
        let objIndex
        if (projectList.projectNames.some(name => name === id)) {
            objIndex = projectList.projectNames.indexOf(id);
        }
        console.log("reached")
        return projectList.projectArr[objIndex];
    }
    const getCard = (projectName) => document.getElementById(projectName);
    return { getObj, getCard }
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