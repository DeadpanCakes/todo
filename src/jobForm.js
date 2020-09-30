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

const categoryLabel = makeLabel();
categoryLabel.for = "categoryField";
categoryLabel.textContent = "Belongs To:";
const categorySelect = makeSelect();
categorySelect.id = "categoryField";

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
        notesTextArea
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
        notesTextArea
    ];
    const projectForm = makeForm();
    const taskForm = makeForm();
    if (tab ===  "project") {
        form = projectForm;
        formArr = Array.from(projectFormArr);
    } else if (tab === "task") {
        formArr = Array.from(taskFormArr);
        form = taskForm;
    }
    for (let i=0;i<formArr.length;i++) {
        form.appendChild(formArr[i]);
    };
    return form;
};

export { populateForm }

