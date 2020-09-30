import * as job from "./job.js";
import {jobList} from "./jobList.js";
/*
write a dom form element to accept info for job instantiation
interface (may break these two into individual modules)
    form
        Project Tab
            Project type label
            preject type field (dropdown?)
            Name label
            name field
            date label
            date field
            priority label
            priority field (color dropdown?)
            description label
            desc field
            notes label
            notes field
            submitbtn
        Task Tab
            Project category label
            preject category field (dropdown?)
            Name label
            name field
            date label
            date field
            priority label
            priority field (color dropdown?)
            description label
            desc field
            notes label
            notes field
            submitbtn
*/

const makeForm = () => document.createElement("form");
const makeLabel = () => document.createElement("label");
const makeInput = () => document.createElement("input");
const makeSelect = () => document.createElement("select");
const makeOption = () => document.createElement("option");
const makeTextArea = () => document.createElement("textarea")

const typeLabel = makeLabel();
typeLabel.for = "typeField";
typeLabel.textContent = "Project Type";
const typeSelect = makeSelect();
typeSelect.id = "typeField";
const dailyOption = makeOption();
dailyOption.value = "daily";
dailyOption.textContent = "Daily";
const weeklyOption = makeOption();
weeklyOption.value = "weekly";
weeklyOption.textContent = "Weekly";
const longTermOption = makeOption();
longTermOption.value = "longTerm";
longTermOption.textContent = "Long Term";
typeSelect.appendChild(dailyOption);
typeSelect.appendChild(weeklyOption);
typeSelect.appendChild(longTermOption);

const categoryLabel = makeLabel();
categoryLabel.for = "categoryField";
categoryLabel.textContent = "Belongs To:";
const categorySelect = makeSelect();
categorySelect.id = "categoryField";

const categoryArr = ["test", "health", "dailies", "weekly", "work", "school", "art"];

const genCatOptions = projects => {
    const optionsArr = []
    for (let i=0;i<projects.length;i++){
        optionsArr.push(projects[i]);
    }
    return optionsArr;
}

const genCatElements = catArr => {
    const catElementArr = []
    for (let i=0;i<catArr.length;i++) {
        const newOption = makeOption();
        newOption.value = catArr[i];
        newOption.textContent = catArr[i];
        catElementArr.push(newOption);
    }
    return catElementArr;
}

const populateCatOptions = catElementArr => {
    for (let i=0;i<catElementArr.length;i++){
        categorySelect.appendChild(catElementArr[i])
    }
}

const renderCatOptions = (projects) => {
    const optionsArr = genCatOptions(projects);
    const catElementArr = genCatElements(optionsArr);
    populateCatOptions(catElementArr);
}

/*
write a fn to dynamically create option elements, each of which corresponds to one listing in jobList.projectArr
*/


const nameLabel = makeLabel();
nameLabel.for = 'nameField';
nameLabel.textContent = 'Name';
const nameInput = makeInput();
nameInput.id = "nameField";
nameInput.type = "text";

const dateLabel = makeLabel();
dateLabel.for = "dateField";
dateLabel.textContent = "Due Date";
const dateInput = makeInput();
dateInput.id = "dateField";
dateInput.type = "date";

const priorityLabel = makeLabel();
priorityLabel.for = "priorityField";
priorityLabel.textContent = "Priority"
const prioritySelect = makeSelect();
prioritySelect.id = "priorityField";
const highOption = makeOption();
highOption.value = "high";
highOption.textContent = "High";
const mediumOption = makeOption();
mediumOption.value = "medium";
mediumOption.textContent = "Medium";
const lowOption = makeOption();
lowOption.value = "low";
lowOption.textContent = "Low";
prioritySelect.appendChild(highOption);
prioritySelect.appendChild(mediumOption);
prioritySelect.appendChild(lowOption);

const descLabel = makeLabel();
descLabel.for = "descField";
descLabel.textContent = "Description";
const descTextArea = makeTextArea();
descTextArea.id = "descField";

const notesLabel = makeLabel();
notesLabel.for = "notesField";
notesLabel.textContent = "Notes";
const notesTextArea = makeTextArea();
notesTextArea.id = "notesField";

const projectSubmitInput = makeInput();
projectSubmitInput.id = "projectSubmitBtn";
projectSubmitInput.type = "submit";
projectSubmitInput.value = "Submit";
projectSubmitInput.addEventListener("click", e => {
    e.preventDefault();
    jobList.addProject(job.projectMixin(job.makeJob(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, nameInput.value)))
})

const taskSubmitInput = makeInput();
taskSubmitInput.id = "projectSubmitBtn";
taskSubmitInput.type = "submit";
taskSubmitInput.value = "Sumbit";

const populateForm = (tab) => {
    let form;
    let formArr;
    const projectFormArr = [
        typeLabel,
        typeSelect,
        nameLabel,
        nameInput,
        dateLabel,
        dateInput,
        priorityLabel,
        prioritySelect,
        descLabel,
        descTextArea,
        notesLabel,
        notesTextArea,
        projectSubmitInput
    ];
    const taskFormArr = [
        categoryLabel,
        categorySelect,
        nameLabel,
        nameInput,
        dateLabel,
        dateInput,
        priorityLabel,
        prioritySelect,
        descLabel,
        descTextArea,
        notesLabel,
        notesTextArea,
        taskSubmitInput
    ];
    const projectForm = makeForm();
    const taskForm = makeForm();
    if (tab === "project") {
        form = projectForm;
        formArr = Array.from(projectFormArr);
    } else if (tab === "task") {
        formArr = Array.from(taskFormArr);
        form = taskForm;
    }
    for (let i = 0; i < formArr.length; i++) {
        form.appendChild(formArr[i]);
    };
    return form;
};

export { renderCatOptions, populateForm }