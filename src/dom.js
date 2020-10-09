import { animationController } from "./anmationController.js";
import { objToCard } from "./interfacer.js";
import { emitter } from "./emitter.js";
import { projectList } from "./projectList.js";
import * as card from "./card.js";

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

const getContentContainer = () => {
    return document.getElementById("contentContainer")
}
const getToggleTasks = () => document.getElementById("toggleTasks")
const getProjectElements = () => document.querySelectorAll(".cardContainer");

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
            console.log("editingobj")
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

const submitEdit = (newElementContent, oldElement, className) => {
    const obj = objToCard.getObj(oldElement);
    console.log(obj.dueDate);
    editObj(obj, newElementContent, className);
    console.log(obj.dueDate);
}

const replaceElement = (newElement, element) => {
    element.parentNode.replaceChild(newElement, element)
}

const toggleCssClass = (elements, cssClass) => {
    elements.classList.toggle(cssClass);
};

const toggleTaskList = (taskListArr) => {
    console.log(taskListArr)
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
    const obj = objToCard.getObj(element);
    if (!projectList.projectArr.some((i) => i === obj)) {
        const task = objToCard.findTask(element);
        const project = objToCard.findProjectCat(element);
        project.removeTask(task);
        goToList();
    } else {
        console.log("projectreached")
        projectList.removeProject(obj)
        goToList();
    }
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
    initContainer,
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
    removeObj
}
