import * as dom from "./dom.js";
import { emitter } from "./emitter.js";

const card = (name, dueDate, description, notes) => {
    const card = dom.makeDiv();
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
    return Object.assign(Object.create(card(name, dueDate, desc, notes)), { renderTasks() { return renderList(taskArr) } });
};

const renderList = objArr => {
    const taskList = dom.makeUl();
    taskList.classList.add("taskList");
    objArr.forEach((obj) => taskList.appendChild(card(obj.getName(), obj.getDueDate(), obj.getDesc(), obj.getNotes()).renderCard()));
    return taskList;
};

const renderProjectList = (projectArr) => {
    const projectList = dom.makeUl();
    projectList.classList.add("projectList");
    projectArr.forEach((project) => {
        const cardContainer = dom.makeDiv();
        cardContainer.classList.add("cardContainers");
        const newCardObj = projectCardObj(project.getName(), project.getDueDate(), project.getDesc(), project.getNotes(), project.getTaskArr());
        const projectCard = newCardObj.renderCard();
        projectCard.classList.add("projects");
        const taskCards = newCardObj.renderTasks();
        newCardObj.expandBtn.addEventListener("click", () => emitter.emit("projectExpandBtnPressed", taskCards.childNodes))
        cardContainer.appendChild(projectCard);
        cardContainer.appendChild(taskCards);
        projectList.appendChild(cardContainer);
    });

    emitter.on("expandBtnPressed", dom.toggleExpandDiv);
    emitter.on("projectExpandBtnPressed", dom.toggleTaskList)
    return projectList;
};

export { renderList, renderProjectList, };