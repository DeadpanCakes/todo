import * as dom from "./dom.js";

/*
write fn to create and display a card based on the info contained in the project objects
interface:
    Project List
        Project Card (Color based on priority)
            Completion Checkbox
            Name
            Due Date
            Button to Expand for more info
                Description
                Notes
                Task Card (Color based on priority)
                    Name
                    Due Date
                    Btn to Expand for more info
                        Description
                        Notes
                    Delete Btn (With Confirmation)
            Delete Btn (With Confirmation)
*/

const renderCard = obj => {
    const cardContainer = dom.makeDiv();
    cardContainer.classList.add("card");
    const checkRegion = dom.makeDiv();
    checkRegion.classList.add("checkRegion");
    const cardName = dom.makeH1();
    cardName.textContent = obj.getName();
    cardName.classList.add("cardName");
    const cardDate = dom.makeH2();
    cardDate.classList.add("cardDate");
    cardDate.textContent = obj.getDueDate();
    const expandBtn = dom.makeBtn();
    expandBtn.addEventListener("click",() => {
        if (expandDiv.style.display === "none") {
            expandDiv.style.display = "flex";
        } else {
            expandDiv.style.display = "none";
        }
    })
    expandBtn.classList.add("expandBtn");
    const delBtn = dom.makeBtn();
    delBtn.classList.add("delBtn");
    const expandDiv = dom.makeDiv();
    expandDiv.classList.add("expandDiv");
    const cardDesc = dom.makeP();
    cardDesc.textContent = obj.getDesc();
    cardDesc.classList.add("cardDesc");
    const cardNotes = dom.makeP();
    cardNotes.textContent = obj.getNotes();
    cardNotes.classList.add("cardNotes");
    cardContainer.appendChild(cardName);
    cardContainer.appendChild(cardDate);
    cardContainer.appendChild(expandBtn);
    expandDiv.appendChild(cardDesc);
    expandDiv.appendChild(cardNotes);
    cardContainer.appendChild(expandDiv);
    return cardContainer;
};

const renderList = objArr =>  {
    const taskList = dom.makeUl();
    taskList.classList.add("taskList")
    for (let i=0;i<objArr.length;i++) {
        taskList.appendChild(renderCard(objArr[i]))
    };
    return taskList;
};

export {renderList};