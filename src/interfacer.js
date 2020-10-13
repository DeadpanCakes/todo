import { projectList } from "./projectList.js";
import * as job from "./job.js";

const objToCard = (() => {

    const getId = (element) => element.parentNode.parentNode.id;

    const getProject = (elementInfo) => {
        const id = getId(elementInfo);
        let objIndex
        if (projectList.projectNames.some(name => name === id)) {
            objIndex = projectList.projectNames.indexOf(id);
        }
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
        return project.getTaskArr()[taskIndex];
    }

    return { getProject, getCard, findProjectCat, findTask }
})();

const objToStorage = (() => {
    const getObjInfo = (obj) => {
        const objInfo = [];
        objInfo.push(obj.name);
        objInfo.push(obj.dueDate);
        objInfo.push(obj.priority);
        objInfo.push(obj.desc);
        objInfo.push(obj.notes);

        if (projectList.projectNames.indexOf(obj.name)>-1) {
            console.log(obj.name);
            objInfo.push(obj.getProjectType());
        } else {
            console.log(obj.name);
            objInfo.push(obj.getProject());
        }
        return objInfo;
    }

    const storeObjInfo = (objInfo) => {
        if (localStorage[objInfo[0]]) {
            localStorage[objInfo[0]] = JSON.stringify(objInfo);
        } else {
            localStorage.setItem(objInfo[0], JSON.stringify(objInfo));
        }
    }

    const storeAllObj = () => {
        projectList.projectArr.forEach((project) => storeObjInfo(getObjInfo(project)))
        projectList.projectArr.forEach((project) => {
            project.getTaskArr().forEach((task) => storeObjInfo(getObjInfo(task)));
        })
    }

    const retrieveAllObj = () => {
        for (obj in localStorage) {
            const parsedObj = JSON.parse(obj);
            if (parsedObj.project) {
                projectList.addProject(job.makeProject(parsedObj))
            } else {
                const task = job.makeTask(parsedObj)
                const projectIndex = projectList.projectNames.indexOf(task.project)
                projectList.projectArr[projectIndex].addTask(task);
            }
        }
    }
    return { storeAllObj, retrieveAllObj}
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

export { objToCard, objToStorage }