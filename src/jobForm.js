import * as job from "./job.js";
import {projectList} from "./projectList.js";
import * as dom from "./dom.js";
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

const formContainerDiv = dom.makeDiv();
const formTabDiv = dom.makeDiv();
const taskTab = dom.makeSpan();
taskTab.id = "taskTab";
taskTab.textContent = "Add Task";
taskTab.addEventListener("click", () => {
    dom.initContainer(formContainerDiv);
    renderCatOptions(projectList.getProjectNames());
    populateFormContainer("task");
});
const projectTab = dom.makeSpan();
projectTab.id = "projectTab";
projectTab.textContent = "Add Project";
projectTab.addEventListener("click", () => {
    dom.initContainer(formContainerDiv);
    populateFormContainer("project");
});

formTabDiv.appendChild(projectTab);
formTabDiv.appendChild(taskTab);

const typeLabel = dom.makeLabel();
typeLabel.for = "typeField";
typeLabel.textContent = "Project Type";
const typeSelect = dom.makeSelect();
typeSelect.id = "typeField";
const dailyOption = dom.makeOption();
dailyOption.value = "daily";
dailyOption.textContent = "Daily";
const weeklyOption = dom.makeOption();
weeklyOption.value = "weekly";
weeklyOption.textContent = "Weekly";
const longTermOption = dom.makeOption();
longTermOption.value = "longTerm";
longTermOption.textContent = "Long Term";
typeSelect.appendChild(dailyOption);
typeSelect.appendChild(weeklyOption);
typeSelect.appendChild(longTermOption);

const categoryLabel = dom.makeLabel();
categoryLabel.for = "categoryField";
categoryLabel.textContent = "Belongs To:";
const categorySelect = dom.makeSelect();
categorySelect.id = "categoryField";

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
        const newOption = dom.makeOption();
        newOption.value = catArr[i];
        newOption.textContent = catArr[i];
        catElementArr.push(newOption);
    }
    return catElementArr;
}

const populateCatOptions = catElementArr => {
    dom.initContainer(categorySelect)
    for (let i=0;i<catElementArr.length;i++){
        categorySelect.appendChild(catElementArr[i])
    }
}

const renderCatOptions = (projectArr) => {
    const optionsArr = genCatOptions(projectArr);
    const catElementArr = genCatElements(optionsArr);
    populateCatOptions(catElementArr);
}

/*
write a fn to dynamically create option elements, each of which corresponds to one listing in projectList.projectArr
*/


const nameLabel = dom.makeLabel();
nameLabel.for = 'nameField';
nameLabel.textContent = 'Name';
const nameInput = dom.makeInput();
nameInput.id = "nameField";
nameInput.type = "text";

const dateLabel = dom.makeLabel();
dateLabel.for = "dateField";
dateLabel.textContent = "Due Date";
const dateInput = dom.makeInput();
dateInput.id = "dateField";
dateInput.type = "date";

const priorityLabel = dom.makeLabel();
priorityLabel.for = "priorityField";
priorityLabel.textContent = "Priority"
const prioritySelect = dom.makeSelect();
prioritySelect.id = "priorityField";
const highOption = dom.makeOption();
highOption.value = "high";
highOption.textContent = "High";
const mediumOption = dom.makeOption();
mediumOption.value = "medium";
mediumOption.textContent = "Medium";
const lowOption = dom.makeOption();
lowOption.value = "low";
lowOption.textContent = "Low";
prioritySelect.appendChild(highOption);
prioritySelect.appendChild(mediumOption);
prioritySelect.appendChild(lowOption);

const descLabel = dom.makeLabel();
descLabel.for = "descField";
descLabel.textContent = "Description";
const descTextArea = dom.makeTextArea();
descTextArea.id = "descField";

const notesLabel = dom.makeLabel();
notesLabel.for = "notesField";
notesLabel.textContent = "Notes";
const notesTextArea = dom.makeTextArea();
notesTextArea.id = "notesField";

const projectSubmitInput = dom.makeInput();
projectSubmitInput.id = "projectSubmitBtn";
projectSubmitInput.type = "submit";
projectSubmitInput.value = "Submit";
projectSubmitInput.addEventListener("click", e => {
    e.preventDefault();
    projectList.addProject(job.makeProject(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, typeSelect.value));
    clearForm();
})

const taskSubmitInput = dom.makeInput();
taskSubmitInput.id = "projectSubmitBtn";
taskSubmitInput.type = "submit";
taskSubmitInput.value = "Sumbit";
taskSubmitInput.addEventListener("click", e => {
    e.preventDefault();
    /*
    Write fns to accept categorySelect.value to find appropriate project object and call its addTask method, using the new object as an argument;
    input = catSelect
    output = corresponding project
    write fn that finds index of selected category
    const findIndex = (projectArr, categoryName) => projectArr.indexOf(categoryName);
    write fn to accept an index and a task obj, and call the indexed project obj's addTask method, passing in the new obj
    const addNewTask = (projectIndex, task) => projectList.getProjectArr()[projectIndex].addTask(task);
    */
    categorySelect.value;
    (job.makeTask(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value));
    clearForm();
})

const clearForm = () => {
    nameInput.value = "";
    dateInput.value =  "";
    descTextArea.value = "";
    notesTextArea.value = "";
}

const populateFormContainer = (tab) => {
    const formContainer = formContainerDiv;
    dom.initContainer(formContainer);
    formContainerDiv.appendChild(formTabDiv);
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
    const projectForm = dom.makeForm();
    const taskForm = dom.makeForm();
    if (tab === "project") {
        form = projectForm;
        form.id = "projectForm";
        formArr = Array.from(projectFormArr);
    } else if (tab === "task") {
        formArr = Array.from(taskFormArr);
        form = taskForm;
        form.id = "taskForm";
    }
    for (let i = 0; i < formArr.length; i++) {
        form.appendChild(formArr[i]);
    };
    formContainer.appendChild(form);
    return formContainer;
};

export { formContainerDiv, renderCatOptions, populateFormContainer }