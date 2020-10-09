import * as dom from "./dom.js";
import { emitter } from "./emitter.js";
import {objToCard} from "./interfacer.js";

const card = (name, dueDate, description, notes) => {
    const card = dom.makeDiv();
    card.id = name;
    card.classList.add("card");

    const minCardContainer = dom.makeDiv();
    minCardContainer.classList.add("minCardContainer");

    const checkRegion = dom.makeDiv();
    checkRegion.classList.add("checkRegion");

    const animateCheck = (event) => {
        if (event.target.classList.contains("checkedRegion")) {
            event.target.classList.remove("checkedRegion");
            setTimeout(() => event.target.textContent = "", 550);
        } else {
            event.target.textContent = "X";
            event.target.classList.add("checkedRegion");
        };
    };
    checkRegion.addEventListener("click", e => animateCheck(e));

    const cardName = dom.makeH1();
    cardName.textContent = name;
    cardName.classList.add("cardName");
    cardName.addEventListener("click", (e) => {
        emitter.emit("editRequested", e.target)
        })

    const cardDate = dom.makeH2();
    cardDate.classList.add("cardDate");
    cardDate.textContent = dueDate;

    const expandBtn = dom.makeBtn();
    expandBtn.classList.add("expandBtn");
    expandBtn.textContent = "V";
    expandBtn.addEventListener("click", () => {
        emitter.emit("expandBtnPressed", card, expandDiv);
    })

    const delBtn = dom.makeBtn();
    delBtn.classList.add("delBtn");
    delBtn.textContent = "X";

    const expandDiv = dom.makeDiv();
    expandDiv.classList.add("expandDiv");

    const cardDesc = dom.makeH3();
    cardDesc.textContent = description;
    cardDesc.classList.add("cardDesc");

    const cardNotes = dom.makeP();
    cardNotes.textContent = notes;
    cardNotes.classList.add("cardNotes");

    const renderCard = () => {
        minCardContainer.appendChild(checkRegion);
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

const projectCardObj = (name, dueDate, desc, notes, taskArr) => {
    return Object.assign(Object.create(card(name, dueDate, desc, notes)), { populateTaskList() { return populateTaskListMixin(taskArr) } });
};

const populateTaskListMixin = objArr => {
    const taskList = []
    objArr.forEach((obj) => taskList.push(card(obj.name, obj.dueDate, obj.desc, obj.notes).renderCard()));
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

            const cardObj = projectCardObj(project.name, project.dueDate, project.desc, project.notes, project.getTaskArr());
            cardObj.expandBtn.addEventListener("click", () => emitter.emit("projectExpandBtnPressed", taskCardArr, taskList))

            const projectCard = cardObj.renderCard();
            projectCard.classList.add("projects");

            const taskCardArr = cardObj.populateTaskList();

            projectContainer.appendChild(projectCard);
            projectContainer.appendChild(taskList);
            projectUl.appendChild(projectContainer);
        })
        return projectUl;
    }
    return { renderProjectList };
};

export { projectListRenderer };