import { min } from "date-fns";
import * as dom from "./dom.js";
import { emitter } from "./emitter.js";
import { objToCard } from "./interfacer.js";
import { projectList } from "./projectList.js";

const card = (name, dueDate, priority, description, notes, completion) => {
    const card = dom.makeDiv();
    card.id = name;
    card.classList.add("card");

    const minCardContainer = dom.makeDiv();
    minCardContainer.classList.add("minCardContainer");

    const checkBtn = dom.makeBtn();
    checkBtn.classList.add("checkBtn");

    if (completion) {
        checkBtn.textContent = "X";
    }

    checkBtn.addEventListener("click", e => emitter.emit("completionBtnPressed", e.target));

    const prioritySelectLabel = dom.makeLabel();
    prioritySelectLabel.classList = "prioritySelectLabel"
    prioritySelectLabel.for = "priority";
    prioritySelectLabel.textContent = "Priority";
    const prioritySelect = dom.makeSelect();
    prioritySelect.classList.add("prioritySelect");
    prioritySelect.name = "priority";
    const highOption = dom.makeOption();
    highOption.value = "high";
    highOption.textContent = "High";
    const mediumOption = dom.makeOption();
    mediumOption.value = "medium";
    mediumOption.textContent = "Medium";
    const lowOption = dom.makeOption();
    lowOption.value = "low";
    lowOption.textContent = "Low";
    prioritySelect.appendChild(highOption);
    prioritySelect.appendChild(mediumOption);
    prioritySelect.appendChild(lowOption);
    const setDefaultSelect = (defaultValue) => {
        switch (defaultValue) {
            case "high":
                highOption.selected = "selected";
                break;
            case "medium":
                mediumOption.selected = "selected";
                break;
            case "low":
                lowOption.selected = "selected";
                break;
        }
    }
    prioritySelect.addEventListener("change", (e) => emitter.emit("priorityChanged", e.target))

    const determineColor = () => {
        if (completion) {
            minCardContainer.style.backgroundColor = "gray";
            expandDiv.style.backgroundColor = "lightgray";
        } else {
            switch (priority) {
                case "high":
                    minCardContainer.style.backgroundColor = "red";
                    expandDiv.style.backgroundColor = "pink";
                    break;
                case "medium":
                    minCardContainer.style.backgroundColor = "yellow";
                    expandDiv.style.backgroundColor = "palegoldenrod";
                    break;
                case "low":
                    minCardContainer.style.backgroundColor = "blue";
                    expandDiv.style.backgroundColor = "paleturquoise";
            }
        }
    }

    const cardName = dom.makeH1();
    cardName.textContent = name;
    cardName.classList.add("cardName");
    cardName.addEventListener("click", (e) => emitter.emit("editRequested", e.target));

    const cardDate = dom.makeH2();
    cardDate.classList.add("cardDate");
    cardDate.textContent = `Due Date: ${dueDate}`;
    cardDate.addEventListener("click", (e) => emitter.emit("editRequested", e.target));

    const expandBtn = dom.makeBtn();
    expandBtn.classList.add("expandBtn");
    expandBtn.textContent = "V";
    expandBtn.addEventListener("click", () => {
        emitter.emit("expandBtnPressed", card, expandDiv);
    });

    const delBtn = dom.makeBtn();
    delBtn.classList.add("delBtn");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
        emitter.emit("delBtnPressed", dom.getContentContainer(), e.target)
    });

    const expandDiv = dom.makeDiv();
    expandDiv.classList.add("expandDiv");

    const cardDesc = dom.makeH3();
    cardDesc.textContent = description;
    cardDesc.classList.add("cardDesc");
    cardDesc.addEventListener("click", (e) => emitter.emit("editRequested", e.target));

    const cardNotes = dom.makeP();
    cardNotes.textContent = notes;
    cardNotes.classList.add("cardNotes");
    cardNotes.addEventListener("click", (e) => emitter.emit("editRequested", e.target));

    const renderCard = () => {
        minCardContainer.appendChild(checkBtn);
        minCardContainer.appendChild(prioritySelectLabel);
        minCardContainer.appendChild(prioritySelect);
        setDefaultSelect(priority);
        determineColor();
        minCardContainer.appendChild(cardName);
        minCardContainer.appendChild(cardDate);
        minCardContainer.appendChild(expandBtn);
        minCardContainer.appendChild(delBtn);
        expandDiv.appendChild(cardDesc);
        expandDiv.appendChild(cardNotes);
        card.appendChild(minCardContainer);
        card.appendChild(expandDiv);
        return card;
    }

    return { renderCard, expandBtn };
};

const projectCardObj = (name, dueDate, priority, desc, notes, completion, taskArr) => {
    return Object.assign(Object.create(card(name, dueDate, priority, desc, notes, completion)), { populateTaskList() { return populateTaskListMixin(taskArr) } });
};

const populateTaskListMixin = objArr => {
    const taskList = []
    objArr.forEach((obj) => taskList.push(card(obj.name, obj.formattedDueDate, obj.priority, obj.desc, obj.notes, obj.completion).renderCard()));
    taskList.forEach(task => task.classList.add("tasks"));
    return taskList;
};

const projectListRenderer = (projectArr) => {
    const renderProjectList = () => {
        const projectUl = dom.makeUl();
        projectUl.classList.add("projectList");
        projectArr.forEach((project) => {
            const projectContainer = dom.makeLi();
            projectContainer.classList.add("projectContainers");

            const taskList = dom.makeUl();
            taskList.classList.add("taskLists");

            const toggleExpand = () => {
                if (taskList.hasChildNodes()) {
                    hideExpand();
                } else {
                    showExpand();
                }
            }

            const showExpand = () => {
                taskCardArr.forEach(task => taskList.appendChild(task));
            }

            const hideExpand = () => {
                dom.initContainer(taskList)
            }

            const cardObj = projectCardObj(project.name, project.formattedDueDate, project.priority, project.desc, project.notes, project.completion, project.getTaskArr());
            cardObj.expandBtn.addEventListener("click", () => toggleExpand(taskCardArr, taskList));

            const projectCard = cardObj.renderCard();
            projectCard.classList.add("projects");

            const taskCardArr = cardObj.populateTaskList();

            emitter.on("allTasksBtnPressed", showExpand);

            projectContainer.appendChild(projectCard);
            projectContainer.appendChild(taskList);
            projectUl.appendChild(projectContainer);
        })
        return projectUl;
    }
    return { renderProjectList };
};

export { projectListRenderer };