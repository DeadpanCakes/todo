import * as job from "./job.js";
import { populateFormContainer } from "./jobForm.js";
import { projectList } from "./projectList.js";
import * as dom from "./dom.js";
import * as card from "./card.js";
import { emitter } from "./emitter.js";
import { getDaysInMonth } from "date-fns";
import { objToCard, objToStorage } from "./interfacer.js";
import * as popUp from "./popUp.js"

objToStorage.retrieveAllObj();

emitter.on("allTasksBtnPressed", dom.toggleAllTasks);
dom.getToggleTasks().addEventListener("click", () => emitter.emit("allTasksBtnPressed"));

dom.getSortByDate().addEventListener("click", () => emitter.emit("sortBtnPressed", "date"));

dom.getSortByPriority().addEventListener("click", () => emitter.emit("sortBtnPressed", "priority"));

dom.getSortByAdded().addEventListener("click", () => emitter.emit("sortBtnPressed", "added"));

dom.getContentContainer().appendChild(card.projectListRenderer(projectList.projectArr).renderProjectList());

document.getElementById("listTab").addEventListener("click", dom.goToList);

const goToForm = () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(populateFormContainer("project"));
};

document.getElementById("formTab").addEventListener("click", goToForm);
dom.assignTaskClass();

emitter.on("editRequested", dom.replaceEdit);
emitter.on("editSubmitted", dom.submitEdit);
emitter.on("editSubmitted", objToStorage.storeAllObj);
emitter.on("priorityChanged", dom.changePriority)
emitter.on("priorityChanged", objToStorage.storeAllObj);
//emitter.on("delBtnPressed", dom.removeObj);
emitter.on("delBtnPressed", popUp.delConfirm.displayWindow.bind(popUp.delConfirm));
emitter.on("confirmDel", dom.removeObj);
emitter.on("expandBtnPressed", dom.toggleExpandDiv);
emitter.on("sortBtnPressed", dom.sortList);
emitter.on("validationFailed", popUp.failValid.displayWindow.bind(popUp.failValid));