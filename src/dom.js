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
    const editForm = makeForm();
    const input = makeInput();
    input.value = element.textContent;
    editForm.appendChild(input);
    switch (element.nodeName) {
        case "P":
            input.type = "textarea";
            break;
        default:
            input.type = "text";
            break;
    }
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        emitter.emit("editSubmitted", input.value, e.target, element.classList[0])
    })
    return editForm;
}

const makeEditedElement = (className) => {
    let element;
    switch (className) {
        case "cardName":
            element = makeH1();
            break;
        case "cardDueDate":
            element = makeH2();
            break;
        case "cardDesc":
            element = makeH3();
            break;
        case "cardNotes":
            element = makeP();
            break;
    }
    return element
}

const editObj = (obj, newContent, className) => {
    switch (className) {
        case "cardName":
            obj.changeName(newContent);
            break;
        case "cardDueDate":
            obj.changeDesc(newContent);
            break;
        case "cardDesc":
            obj.changeDesc(newContent);
            break;
        case "cardNotes":
            obj.channgeNotes(newContent);
            break;
    }
}

const submitEdit = (newElementContent, oldElement, className) => {
    const obj = objToCard.getObj(oldElement);
    console.log(obj.name)
    editObj(obj, newElementContent, className);
    console.log(obj.name)
    initContainer(getContentContainer())
    getContentContainer().appendChild(renderList())
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
    renderList
}
