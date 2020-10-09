import * as job from "./job.js";
import { populateFormContainer } from "./jobForm.js";
import { projectList } from "./projectList.js";
import * as dom from "./dom.js";
import * as card from "./card.js";
import { emitter } from "./emitter.js";

const cook = job.makeTask("Cook", 2021, "high", "Cook yummy food", "Pizza and ice cream for dessert", "task", "Dailies");
const read = job.makeTask("Read", 2021, "low", "Read a book!", "War and Peace", "task", "Dailies");
const gym = job.makeTask("Gym", 2021, "medium", "Go to the gym!", "Actually probably don't there's a pandemic!", "task", "Weeklies")
const dailies = job.makeProject("Dailies", 2021, "high", "Stuff to do every day", "Boring chores", "project", "daily");
const weeklies = job.makeProject("Weeklies", 2021, "medium", "Things to do throughout the week", "Less boring chores", "project", "weekly")

projectList.addProject(dailies);
projectList.addProject(weeklies);
dailies.addTask(cook);
dailies.addTask(read);
weeklies.addTask(gym);


emitter.on("allTasksBtnPressed", dom.toggleAllTasks);
dom.getToggleTasks().addEventListener("click", () => emitter.emit("allTasksBtnPressed"));

dom.getContentContainer().appendChild(card.projectListRenderer(projectList.projectArr).renderProjectList());

const goToList = () => {
    dom.goToList()
}
document.getElementById("listTab").addEventListener("click", goToList);

const goToForm = () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(populateFormContainer("project"));
};
document.getElementById("formTab").addEventListener("click", goToForm);
dom.assignTaskClass();

emitter.on("editRequested", dom.replaceEdit);
emitter.on("editSubmitted", dom.submitEdit);
emitter.on("editSubmitted", dom.goToList);
emitter.on("expandBtnPressed", dom.toggleExpandDiv);
emitter.on("projectExpandBtnPressed", dom.toggleAddElement);
emitter.on("projectExpandBtnPressed", dom.toggleTaskList);
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