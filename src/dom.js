import { animationController } from "./anmationController.js";
import { emitter } from "./emitter.js";

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
    if (!animationController.isPlaying) {
        animationController.toggleAnim()
        for (let i = 0; i < elementArr.length; i++) {
            if (container.contains(elementArr[i])) {
                setTimeout(() => container.removeChild(elementArr[i]), 500);
            } else {
                container.appendChild(elementArr[i]);
            }
        }
        animationController.toggleAnim();
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
    switch(element.nodeName) {
        case "P":
            editForm.appendChild(input)
            break;
        default:
            input.type = "text";
            break;
    }
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        emitter.emit("editSubmitted", input.value, e.target, element.nodeName)
    })
    return editForm;
}

const submitEdit = (newElementContent, oldElement, nodeType) => {
    let newElement
    switch (nodeType) {
        case "H1":
            newElement = makeH1();
            break;
        case "H2":
            newElement = makeH2();
            break;
        case "H3":
            newElement = makeH3();
            break;
        case "P":
            newElement = makeP();
            break;
    }
    newElement.textContent = newElementContent
    newElement.addEventListener("click", (e) => emitter.emit("editRequested", e.target))
    replaceElement(newElement,oldElement);
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
    toggleAllTasks
}
