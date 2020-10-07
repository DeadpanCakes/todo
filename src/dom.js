
const makeDiv = () => document.createElement("div");
const makeSpan = () => document.createElement("span");
const makeUl = () => document.createElement("ul");
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

const toggleCssClass = (element, cssClass) => {
    element.classList.toggle(cssClass);
};

const toggleTaskList = (taskListNodes) => {
    taskListNodes.forEach(task => toggleCssClass(task,"shownTasks"));
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
    assignTaskClass,
    toggleTaskList,
    toggleExpandDiv,
    toggleAllTasks
}
