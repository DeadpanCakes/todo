import * as job from "./job.js";
import { projectList } from "./projectList.js";
import * as dom from "./dom.js";
import { validate } from "./formValidation.js";
import * as popUp from "./popUp.js";
import { emitter } from "./emitter.js";

//FormTabDiv not showing up for some reason

const jobForm = (() => {
    const formContainerDiv = dom.makeDiv();
    const formTabDiv = dom.makeDiv();

    const taskTab = dom.makeSpan();
    taskTab.id = "taskTab";
    taskTab.textContent = "Add Task";
    taskTab.addEventListener("click", () => {
        dom.initContainer(formContainerDiv);
        renderCatOptions(projectList.projectNames);
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

    //Making Selector For Project Type
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

    //Making Selector For Task Category and Fn's For Dynamically Populating them w/ Options
    const categoryLabel = dom.makeLabel();
    categoryLabel.for = "categoryField";
    categoryLabel.textContent = "Belongs To:";
    const categorySelect = dom.makeSelect();
    categorySelect.id = "categoryField";

    const genCatOptions = projects => {
        const optionsArr = []
        for (let i = 0; i < projects.length; i++) {
            optionsArr.push(projects[i]);
        }
        return optionsArr;
    }

    const genCatElements = catArr => {
        const catElementArr = []
        for (let i = 0; i < catArr.length; i++) {
            const newOption = dom.makeOption();
            newOption.value = catArr[i];
            newOption.textContent = catArr[i];
            newOption.classList.add("catOption")
            catElementArr.push(newOption);
        }
        return catElementArr;
    }

    const populateCatOptions = catElementArr => {
        dom.initContainer(categorySelect)
        for (let i = 0; i < catElementArr.length; i++) {
            categorySelect.appendChild(catElementArr[i])
        }
    }

    const renderCatOptions = (projectArr) => {
        const optionsArr = genCatOptions(projectArr);
        const catElementArr = genCatElements(optionsArr);
        populateCatOptions(catElementArr);
    }

    //Makning Inputs for name, date, priority, description, and notes
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

    //Making Arr Of Input Fields For Validation
    const inputFields = [nameInput,dateInput,descTextArea,notesTextArea];

    const validateInputs = () => {
        const invalidFields = validate(inputFields);
        invalidFields.forEach((input) => {
            console.log(input);
        })
        return invalidFields;
    }

    //Making separate submit inputs for projects and tasks
    const projectSubmitInput = dom.makeInput();
    projectSubmitInput.id = "projectSubmitBtn";
    projectSubmitInput.type = "submit";
    projectSubmitInput.value = "Submit";
    projectSubmitInput.addEventListener("click", e => {
        if (!validateInputs()[0]) {
            e.preventDefault();
            projectList.addProject(job.makeProject(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, typeSelect.value));
            clearForm();
        } else {
            e.preventDefault();
            emitter.emit("validationFailed", dom.getContentContainer(), validateInputs()[0]);
        }
    })

    const taskSubmitInput = dom.makeInput();
    taskSubmitInput.id = "projectSubmitBtn";
    taskSubmitInput.type = "submit";
    taskSubmitInput.value = "Sumbit";
    taskSubmitInput.addEventListener("click", e => {
        e.preventDefault();
        const newTask = job.makeTask(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, categorySelect.value);
        const findIndex = (projectArr, categoryName) => projectArr.indexOf(categoryName);
        const addNewTask = (projectIndex, task) => projectList.projectArr[projectIndex].addTask(task);
        addNewTask(findIndex(projectList.projectNames, categorySelect.value), newTask);
        clearForm();
    })

    //Method for clearing form between changes
    const clearForm = () => {
        nameInput.value = "";
        dateInput.value = "";
        descTextArea.value = "";
        notesTextArea.value = "";
    }
    return {
        formContainerDiv,
        formTabDiv,
        typeLabel,
        typeSelect,
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
        projectSubmitInput,
        taskSubmitInput,
        clearForm
    }
})();

const populateFormContainer = (tab) => {
    console.log(jobForm.formContainerDiv.childNodes)
    const formContainer = jobForm.formContainerDiv;
    dom.initContainer(formContainer);
    jobForm.formContainerDiv.appendChild(jobForm.formTabDiv);
    let form;
    let formArr;
    const projectFormArr = [
        jobForm.typeLabel,
        jobForm.typeSelect,
        jobForm.nameLabel,
        jobForm.nameInput,
        jobForm.dateLabel,
        jobForm.dateInput,
        jobForm.priorityLabel,
        jobForm.prioritySelect,
        jobForm.descLabel,
        jobForm.descTextArea,
        jobForm.notesLabel,
        jobForm.notesTextArea,
        jobForm.projectSubmitInput
    ];
    const taskFormArr = [
        jobForm.categoryLabel,
        jobForm.categorySelect,
        jobForm.nameLabel,
        jobForm.nameInput,
        jobForm.dateLabel,
        jobForm.dateInput,
        jobForm.priorityLabel,
        jobForm.prioritySelect,
        jobForm.descLabel,
        jobForm.descTextArea,
        jobForm.notesLabel,
        jobForm.notesTextArea,
        jobForm.taskSubmitInput
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

export { populateFormContainer }

// const formContainerDiv = dom.makeDiv();
// const formTabDiv = dom.makeDiv();
// const taskTab = dom.makeSpan();
// taskTab.id = "taskTab";
// taskTab.textContent = "Add Task";
// taskTab.addEventListener("click", () => {
//     dom.initContainer(formContainerDiv);
//     renderCatOptions(projectList.projectNames);
//     populateFormContainer("task");
// });
// const projectTab = dom.makeSpan();
// projectTab.id = "projectTab";
// projectTab.textContent = "Add Project";
// projectTab.addEventListener("click", () => {
//     dom.initContainer(formContainerDiv);
//     populateFormContainer("project");
// });

// formTabDiv.appendChild(projectTab);
// formTabDiv.appendChild(taskTab);

// const typeLabel = dom.makeLabel();
// typeLabel.for = "typeField";
// typeLabel.textContent = "Project Type";
// const typeSelect = dom.makeSelect();
// typeSelect.id = "typeField";
// const dailyOption = dom.makeOption();
// dailyOption.value = "daily";
// dailyOption.textContent = "Daily";
// const weeklyOption = dom.makeOption();
// weeklyOption.value = "weekly";
// weeklyOption.textContent = "Weekly";
// const longTermOption = dom.makeOption();
// longTermOption.value = "longTerm";
// longTermOption.textContent = "Long Term";
// typeSelect.appendChild(dailyOption);
// typeSelect.appendChild(weeklyOption);
// typeSelect.appendChild(longTermOption);

// const categoryLabel = dom.makeLabel();
// categoryLabel.for = "categoryField";
// categoryLabel.textContent = "Belongs To:";
// const categorySelect = dom.makeSelect();
// categorySelect.id = "categoryField";

// const genCatOptions = projects => {
//     const optionsArr = []
//     for (let i = 0; i < projects.length; i++) {
//         optionsArr.push(projects[i]);
//     }
//     return optionsArr;
// }

// const genCatElements = catArr => {
//     const catElementArr = []
//     for (let i = 0; i < catArr.length; i++) {
//         const newOption = dom.makeOption();
//         newOption.value = catArr[i];
//         newOption.textContent = catArr[i];
//         newOption.classList.add("catOption")
//         catElementArr.push(newOption);
//     }
//     return catElementArr;
// }

// const populateCatOptions = catElementArr => {
//     dom.initContainer(categorySelect)
//     for (let i = 0; i < catElementArr.length; i++) {
//         categorySelect.appendChild(catElementArr[i])
//     }
// }

// const renderCatOptions = (projectArr) => {
//     const optionsArr = genCatOptions(projectArr);
//     const catElementArr = genCatElements(optionsArr);
//     populateCatOptions(catElementArr);
// }

// const nameLabel = dom.makeLabel();
// nameLabel.for = 'nameField';
// nameLabel.textContent = 'Name';
// const nameInput = dom.makeInput();
// nameInput.id = "nameField";
// nameInput.type = "text";

// const dateLabel = dom.makeLabel();
// dateLabel.for = "dateField";
// dateLabel.textContent = "Due Date";
// const dateInput = dom.makeInput();
// dateInput.id = "dateField";
// dateInput.type = "date";

// const priorityLabel = dom.makeLabel();
// priorityLabel.for = "priorityField";
// priorityLabel.textContent = "Priority"
// const prioritySelect = dom.makeSelect();
// prioritySelect.id = "priorityField";
// const highOption = dom.makeOption();
// highOption.value = "high";
// highOption.textContent = "High";
// const mediumOption = dom.makeOption();
// mediumOption.value = "medium";
// mediumOption.textContent = "Medium";
// const lowOption = dom.makeOption();
// lowOption.value = "low";
// lowOption.textContent = "Low";
// prioritySelect.appendChild(highOption);
// prioritySelect.appendChild(mediumOption);
// prioritySelect.appendChild(lowOption);

// const descLabel = dom.makeLabel();
// descLabel.for = "descField";
// descLabel.textContent = "Description";
// const descTextArea = dom.makeTextArea();
// descTextArea.id = "descField";

// const notesLabel = dom.makeLabel();
// notesLabel.for = "notesField";
// notesLabel.textContent = "Notes";
// const notesTextArea = dom.makeTextArea();
// notesTextArea.id = "notesField";

// const projectSubmitInput = dom.makeInput();
// projectSubmitInput.id = "projectSubmitBtn";
// projectSubmitInput.type = "submit";
// projectSubmitInput.value = "Submit";
// projectSubmitInput.addEventListener("click", e => {
//     e.preventDefault();
//     projectList.addProject(job.makeProject(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, typeSelect.value));
//     clearForm();
// })

// const taskSubmitInput = dom.makeInput();
// taskSubmitInput.id = "projectSubmitBtn";
// taskSubmitInput.type = "submit";
// taskSubmitInput.value = "Sumbit";
// taskSubmitInput.addEventListener("click", e => {
//     e.preventDefault();
//     const newTask = job.makeTask(nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, categorySelect.value);
//     const findIndex = (projectArr, categoryName) => projectArr.indexOf(categoryName);
//     const addNewTask = (projectIndex, task) => projectList.projectArr[projectIndex].addTask(task);
//     addNewTask(findIndex(projectList.projectNames, categorySelect.value), newTask);
//     clearForm();
// })

// const clearForm = () => {
//     nameInput.value = "";
//     dateInput.value = "";
//     descTextArea.value = "";
//     notesTextArea.value = "";
// }