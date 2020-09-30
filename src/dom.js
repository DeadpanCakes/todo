/*
Break out dom manip code into this module
*/

const makeDiv = () => document.createElement("div");
const makeSpan = () => document.createElement("span");
const makeForm = () => document.createElement("form");
const makeLabel = () => document.createElement("label");
const makeInput = () => document.createElement("input");
const makeSelect = () => document.createElement("select");
const makeOption = () => document.createElement("option");
const makeTextArea = () => document.createElement("textarea");

const getContentContainer = () => document.getElementById("contentContainer")
const getToggleTasks = () => document.getElementById("toggleTasks")

const initContainer = container => {
    for (let i=0;0<container.childElementCount;i++) {
        container.removeChild(container.lastElementChild);
    };
};

export {
    makeDiv,
    makeSpan,
    makeForm,
    makeLabel,
    makeInput,
    makeSelect,
    makeOption,
    makeTextArea,
    getContentContainer,
    getToggleTasks,
    initContainer
}