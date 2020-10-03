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
    const minCardContainer = dom.makeDiv();
    minCardContainer.classList.add("minCardContainer");
    const checkRegion = dom.makeDiv();
    checkRegion.classList.add("checkRegion");
    checkRegion.addEventListener("click", e => {
        if (e.target.classList.contains("checkedRegion")) {
            e.target.classList.remove("checkedRegion")
            setTimeout(() => e.target.textContent = "", 550);
        } else {
            e.target.textContent = "X";
            e.target.classList.add("checkedRegion");
        }
    });
    const cardName = dom.makeH1();
    cardName.textContent = obj.getName();
    cardName.classList.add("cardName");
    const cardDate = dom.makeH2();
    cardDate.classList.add("cardDate");
    cardDate.textContent = obj.getDueDate();
    const expandBtn = dom.makeBtn();
    expandBtn.addEventListener("click",() => {
        if (expandDiv.style.display === "block") {
            expandDiv.style.display = "none";
        } else {
            expandDiv.style.display = "block";
        }
    })
    expandBtn.classList.add("expandBtn");
    expandBtn.textContent = "V";
    const delBtn = dom.makeBtn();
    delBtn.classList.add("delBtn");
    delBtn.textContent = "X"
    const expandDiv = dom.makeDiv();
    expandDiv.classList.add("expandDiv");
    const cardDesc = dom.makeH3();
    cardDesc.textContent = obj.getDesc();
    cardDesc.classList.add("cardDesc");
    const cardNotes = dom.makeP();
    cardNotes.textContent = obj.getNotes();
    cardNotes.classList.add("cardNotes");
    minCardContainer.appendChild(checkRegion);
    minCardContainer.appendChild(cardName);
    minCardContainer.appendChild(cardDate);
    minCardContainer.appendChild(expandBtn);
    minCardContainer.appendChild(delBtn);
    expandDiv.appendChild(cardDesc);
    expandDiv.appendChild(cardNotes);
    cardContainer.appendChild(minCardContainer);
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