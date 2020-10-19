const checkIfEmpty = (string) => {
    return !string;
};

const validate = (arr) => {
    return arr.filter((field) => checkIfEmpty(field.value));
};

export { validate };