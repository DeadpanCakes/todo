import * as dom from "./dom.js"

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
    const cardContainer = dom.makeDiv()
    cardContainer.classList.add("card")
    const cardName = dom.makeH1();
    cardName.textContent = obj.getName();
    const cardDate = dom.makeH2();
    cardDate.textContent = obj.getDueDate()
    const expandBtn = dom.makeBtn();
    expandBtn.addEventListener("click",() => console.log("expand"));
    const cardDesc = dom.makeP();
    cardDesc.textContent = obj.getDesc();
    const cardNotes = dom.makeP();
    cardNotes.textContent = obj.getNotes();
    cardContainer.appendChild(cardName);
    cardContainer.appendChild(cardDate);
    cardContainer.appendChild(expandBtn);
    cardContainer.appendChild(cardDesc);
    cardContainer.appendChild(cardNotes);
    return cardContainer;
};

const renderList = objArr =>  {
    const taskList = dom.makeUl();
    for (let i=0;i<objArr.length;i++) {
        taskList.appendChild(renderCard(objArr[i]))
    }
    return taskList;
}

export {renderList}