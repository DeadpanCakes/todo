import * as job from "./job.js";
import { formContainerDiv, renderCatOptions, populateFormContainer } from "./jobForm.js";
import { jobList } from "./jobList.js";
import * as dom from "./dom.js";
import * as card from "./card.js";

// const cook = job.taskMixin(job.makeJob("cook","today","high","cook yummy food","pizza and ice cream for dessert", "task"),"daily");
// const read = job.taskMixin(job.makeJob("read","tomorrow","low","read a book!", "war and peace", "task"),"daily");
const dailies = job.projectMixin(job.makeJob("Dailies", 2021, "high", "Stuff to do every day", "Boring chores", "project"), "daily");
const weeklies = job.projectMixin(job.makeJob("Weeklies", 2021, "medium", "Things to do throughout the week", "Less boring chores", "project"), "weekly")

jobList.addProject(dailies);
// jobList.addTask(cook);
// jobList.addTask(read);
jobList.addProject(weeklies);

dom.getContentContainer().appendChild(card.renderList(jobList.getProjectArr()))

document.getElementById("listTab").addEventListener("click", () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(card.renderList(jobList.getProjectArr()));
})
document.getElementById("formTab").addEventListener("click", () => {
    dom.initContainer(dom.getContentContainer());
    dom.getContentContainer().appendChild(populateFormContainer("project"));
})

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