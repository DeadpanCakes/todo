import { animationController } from "./anmationController.js";
import { objToCard, objToStorage } from "./interfacer.js";
import { emitter } from "./emitter.js";
import { projectList } from "./projectList.js";
import * as card from "./card.js";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

const makeDiv = () => document.createElement("div");
const makeSpan = () => document.createElement("span");
const makeUl = () => document.createElement("ul");
const makeLi = () => document.createElement("li");
const makeH1 = () => document.createElement("h1");
const makeH2 = () => document.createElement("h2")
const makeH3 = () => document.createElement("h3");
const makeP = () => document.createElement("p");
const makeBtn = () => document.createElement("button");
const makeForm = () => document.createElement("form");
const makeLabel = () => document.createElement("label");
const makeInput = () => document.createElement("input");
const makeSelect = () => document.createElement("select");
const makeOption = () => document.createElement("option");
const makeTextArea = () => document.createElement("textarea");

const getContentContainer = () => document.getElementById("contentContainer")
const getToggleTasks = () => document.getElementById("toggleTasks")
const getProjectElements = () => document.querySelectorAll(".cardContainer");
const getSortByDate = () => document.getElementById("sortDate");
const getSortByPriority = () => document.getElementById("sortPriority")
const getSortByAdded = () => document.getElementById("sortAdded");

const initContainer = container => {
    for (let i = 0; 0 < container.childElementCount; i++) {
        container.removeChild(container.lastElementChild);
    };
};

const assignTaskClass = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        if (!card.classList.contains("projects") && (!card.classList.contains("tasks"))) {
            card.classList.add("tasks");
        };
    });
};

const sortList = (criteria) => {
    projectList.sortProjects(criteria);
    goToList();
}

const toggleAddElement = (elementArr, container) => {
    for (let i = 0; i < elementArr.length; i++) {
        if (container.contains(elementArr[i])) {
            container.removeChild(elementArr[i])
        } else {
            container.appendChild(elementArr[i]);
        }
    }
}

const replaceEdit = (element) => {
    replaceElement(makeEditElement(element), element)
}

const makeEditElement = (element) => {
    const className = element.classList[0];
    const editForm = makeForm();
    let editInput;
    const submitBtn = makeInput();
    switch (className) {
        case "cardDate":
            editInput = makeInput();
            editInput.type = "date";
            break;
        case "cardNotes":
            editInput = makeTextArea();
            break;
        default:
            editInput = makeInput()
            editInput.type = "text";
            break;
    }
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        emitter.emit("editSubmitted", editInput.value, e.target, element.classList[0])
    });
    submitBtn.type = "submit";
    submitBtn.value = "O";
    editInput.value = element.textContent;
    editForm.appendChild(editInput);
    editForm.appendChild(submitBtn);
    return editForm;
}

const editObj = (obj, newContent, className) => {
    switch (className) {
        case "cardName":
            obj.changeName(newContent);
            break;
        case "cardDate":
            obj.changeDueDate(newContent);
            break;
        case "cardDesc":
            obj.changeDesc(newContent);
            break;
        case "cardNotes":
            obj.changeNotes(newContent);
            break;
    }
}

const makeEditedElement = (elementContent, className) => {
    let newElement;
    switch (className) {
        case "cardName":
            newElement = makeH1();
            newElement.classList.add("cardName");
            newElement.textContent = elementContent;
            break;
        case "cardDate":
            newElement = makeH2();
            newElement.classList.add("cardDate");
            newElement.textContent = `Due Date: ${elementContent}`;
            break;
        case "cardDesc":
            newElement = makeH3();
            newElement.classList.add("cardDesc");
            newElement.textContent = elementContent;
            break;
        case "cardNotes":
            newElement = makeP();
            newElement.classList.add("cardNotes");
            newElement.textContent = elementContent;
            break;
    }
    return newElement;
}

const delOldObjName = (oldObjName) => {
    console.log(oldObjName, localStorage[oldObjName]);
    localStorage.removeItem(oldObjName);
}

const formatDate = (className, formInput) => {
    return format(new Date(zonedTimeToUtc(formInput.toString())), "PPP");
}

const submitEdit = (newElementContent, oldElement, className) => {
    if (!!objToCard.getProject(oldElement)) {
        const project = objToCard.getProject(oldElement);
        if (className === "cardName") {
            delOldObjName(project.name)
        };
        editObj(project, newElementContent, className);
        if (className === "cardDate") {
            newElementContent = formatDate(className,newElementContent);
        };
        replaceElement(makeEditedElement(newElementContent,className), oldElement);
    } else {
        const task = objToCard.findTask(oldElement);
        if (className === "cardName") {
            delOldObjName(task.name)
        };
        editObj(task, newElementContent, className);
        if (className === "cardDate") {
            newElementContent = formatDate(className,newElementContent);
        };
        replaceElement(makeEditedElement(newElementContent,className), oldElement);
    }
}

const replaceElement = (newElement, element) => {
    element.parentNode.replaceChild(newElement, element)
}

const toggleCssClass = (elements, cssClass) => {
    elements.classList.toggle(cssClass);
};

const toggleTaskList = (taskListArr) => {
    if (!animationController.isPlaying) {
        taskListArr.forEach(task => toggleCssClass(task, "shownTasks"));
    }
}

const toggleExpandDiv = (container, element) => {
    if (container.classList.contains("expandedCard")) {
        element.classList.remove("expandedDiv");
        container.classList.remove("expandedCard");
    } else {
        setTimeout(() => element.classList.add("expandedDiv"), 200);
        container.classList.add("expandedCard");
    }
}

const toggleAllTasks = () => {
    const tasks = document.querySelectorAll(".tasks")
    tasks.forEach((task) => toggleCssClass(task, "shownTasks"));
};

const renderList = () => {
    const projectArr = projectList.projectArr;
    const projectUl = card.projectListRenderer(projectArr).renderProjectList();
    return projectUl;
}

const goToList = () => {
    const container = getContentContainer();
    initContainer(container);
    container.appendChild(renderList());
}

const removeObj = (element) => {
    if (!!objToCard.getProject(element)) {
        const project = objToCard.getProject(element);
        projectList.removeProject(project)
        goToList();
    } else {
        const task = objToCard.findTask(element);
        const projectCat = objToCard.findProjectCat(element);
        projectCat.removeTask(task);
        goToList();
    }
}

const changePriority = (element) => {
    if (!!objToCard.getProject(element)) {
        const project = objToCard.getProject(element);
        project.changePriority(element.value);
    } else {
        const task = objToCard.findTask(element);
        task.changePriority(element.value)
    }
}

const toggleCompletion = (element) => {
    if (!!objToCard.getProject(element)) {
        const project = objToCard.getProject(element);
        project.changeCompletion();
        if (project.completion) {
            element.textContent = "X"
        } else {
            element.textContent = "";
        }
        console.log(project.completion)
    } else {
        const task = objToCard.findTask(element);
        task.changeCompletion();
        if (task.completion) {
            element.textContent = "X"
        } else {
            element.textContent = "";
        }
    }
    objToStorage.storeAllObj();
}

export {
    makeDiv,
    makeSpan,
    makeUl,
    makeLi,
    makeH1,
    makeH2,
    makeH3,
    makeP,
    makeBtn,
    makeForm,
    makeLabel,
    makeInput,
    makeSelect,
    makeOption,
    makeTextArea,
    getContentContainer,
    getToggleTasks,
    getProjectElements,
    getSortByDate,
    getSortByPriority,
    getSortByAdded,
    initContainer,
    sortList,
    toggleAddElement,
    replaceEdit,
    makeEditElement,
    submitEdit,
    replaceElement,
    assignTaskClass,
    toggleTaskList,
    toggleExpandDiv,
    toggleAllTasks,
    renderList,
    goToList,
    removeObj,
    changePriority,
    toggleCompletion
}
