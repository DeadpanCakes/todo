import * as job from "./job.js";
import { renderCatOptions, populateForm } from "./jobForm.js";
import {jobList} from "./jobList.js";


const cook = job.taskMixin(job.makeJob("cook","today","high","cook yummy food","pizza and ice cream for dessert", "task"),"daily");
const read = job.taskMixin(job.makeJob("read","tomorrow","low","read a book!", "war and peace", "task"),"daily");
const dailies = job.projectMixin(job.makeJob("dailies","today","high","stuff to do every day","boring chores", "project"),"daily");
console.log(populateForm("task"))

const checkList = () => renderCatOptions(jobList.getProjectArr());
document.getElementById("toggleTasks").addEventListener("click", checkList)
//document.getElementById("contentContainer").appendChild(populateForm("task"))
document.getElementById("taskTab").addEventListener("click", () => {
    console.log("This would display a list of project and task cards");
})
document.getElementById("formTab").addEventListener("click", () => {
    document.getElementById("contentContainer").appendChild(populateForm("project"));
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