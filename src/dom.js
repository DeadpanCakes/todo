
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
    for (let i=0;0<container.childElementCount;i++) {
        container.removeChild(container.lastElementChild);
    };
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
    initContainer
}