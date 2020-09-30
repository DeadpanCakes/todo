import * as job from "./job.js";
import { populateForm } from "./jobForm.js";


const cook = job.taskMixin(job.makeJob("cook","today","high","cook yummy food","pizza and ice cream for dessert", "task"),"daily");
const read = job.taskMixin(job.makeJob("read","tomorrow","low","read a book!", "war and peace", "task"),"daily");
const dailies = job.projectMixin(job.makeJob("dailies","today","high","stuff to do every day","boring chores", "project"),"daily");
console.log(populateForm("task"))

document.getElementById("projectList").appendChild(populateForm("task"))
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