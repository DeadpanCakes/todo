import { projectList } from "./projectList";

const checkIfEmpty = (string) => {
    return !string;
};

const validate = (arr) => {
    return arr.filter((field) => checkIfEmpty(field.value));
};

const checkForDupe = (name) => {
    projectList.projectNames.some((i) => i === name);
}

export { validate, checkForDupe };