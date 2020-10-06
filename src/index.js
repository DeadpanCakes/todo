import * as job from "./job.js";
import { populateFormContainer } from "./jobForm.js";
import { projectList } from "./projectList.js";
import * as dom from "./dom.js";
import * as card from "./card.js";

const cook = job.makeTask("cook",2021,"high","cook yummy food","pizza and ice cream for dessert", "task","Dailies");
const read = job.makeTask("read",2021,"low","read a book!", "war and peace", "task","Dailies");
const gym = job.makeTask("gym", 2021, "medium", "go to the gym", "actually probably don't there's a pandemic", "task", "Weeklies")
const dailies = job.makeProject("Dailies", 2021, "high", "Stuff to do every day", "Boring chores", "project", "daily");
const weeklies = job.makeProject("Weeklies", 2021, "medium", "Things to do throughout the week", "Less boring chores", "project", "weekly")

projectList.addProject(dailies);
projectList.addProject(weeklies);
dailies.addTask(cook);
dailies.addTask(read);
weeklies.addTask(gym);


dom.getToggleTasks().addEventListener("click", () => {
    console.log(projectList.getProjectArr()[1].getTaskArr()[0].getName());
})

dom.getContentContainer().appendChild(card.renderProjectList(projectList.getProjectArr()))

console.log(card.projectCard("cook", "2020", "high", "yummy", "food!", projectList.getProjectArr()[0].getTaskArr()).renderTasks);


//dom.getProjectElements()[0].appendChild(card.renderList(projectList.getProjectArr()[0].getTaskArr()));

const goToList = () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(card.renderList(projectList.getProjectArr()));
}
document.getElementById("listTab").addEventListener("click", goToList);

const goToForm = () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(populateFormContainer("project"));
};
document.getElementById("formTab").addEventListener("click", goToForm);

/*
Making a to-do list
Parts:
    TopNav
        Expand All Tasks (Minimizes Groups)
    Project List
        Project Card
            Completion Checkbox
            Name
            Priority
            Due Date
            Expand for more info
                Description
                Notes
                Task Card
                    Name
                    Priority
                    Due Date
                    Expand for more info
                        Description
                        Notes
                    Delete Btn (With Confirmation)
            Delete Btn (With Confirmation)
    Form Tab
        Form Tab Has Two Tabs
            Project Tab
                Name
                Project Type
                    Dailies
                    Weekly
                    Long Term
                Due Date
                    Greyed Out If Daily
                    Pick A Day of the Week if Weekly (Sunday By Default)
                Priority
                    Greyed Out If Daily or Weekly
                Description
                Notes
            New Task Tab
                Name
                Due Date
                Priority
                Description
                What Project They Belong To
                Notes
Interface?
    Main section that contains the main list or form to add items to the list depending on what tab is currently selected
    Nav at the bottom of the screen to jump between tabs
    Nav at the top of the page that offers extra controls, like expanding all tasks and hiding/minimizing groupings
*/