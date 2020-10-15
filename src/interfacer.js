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
        for (let i = 0; i < projectList.projectArr.length; i++) {
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

        if (projectList.projectNames.indexOf(objInfo[0]) > -1) {
            objInfo.push(obj.getProjectType());
        } else {
            objInfo.push(obj.getProject());
        }

        objInfo.push(obj.getTimeCreated());
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

    const checkForProject = (arr) => {
        const category = arr[arr.length - 2];
        switch (category) {
            case "daily":
                return true;
            case "weekly":
                return true;
            case "longTerm":
                return true;
            default:
                return false
        }
    }

    const retrieveProjects = () => {
        for (let obj in localStorage) {
            if (localStorage.hasOwnProperty(obj)) {
                const parsedObj = JSON.parse(localStorage[obj]);
                if (checkForProject(parsedObj)) {
                    projectList.addProject(job.makeProject(...parsedObj));
                }
            }
        }
    }

    const retrieveTasks = () => {
        for (let obj in localStorage) {
            if (localStorage.hasOwnProperty(obj)) {
                const parsedObj = JSON.parse(localStorage[obj]);
                if (!checkForProject(parsedObj)) {
                    const task = job.makeTask(...parsedObj)
                    const projectIndex = projectList.projectNames.indexOf(task.getProject())
                    if (projectIndex <0) {
                        console.log(task.getProject())
                    } else {
                        projectList.projectArr[projectIndex].addTask(task);
                    }
                }
            }
        }
    }

    const removeObj = (name) => {
        if (localStorage[name]) {
            localStorage.removeItem(name);
        }
    }

    const retrieveAllObj = () => {
        retrieveProjects();
        retrieveTasks();
    }
    return { storeAllObj, retrieveAllObj, removeObj }
})();

export { objToCard, objToStorage }