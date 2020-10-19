const checkIfEmpty = (value) => {
    return !value;
};

const validate = (arr) => {
    return arr.filter((field) => checkIfEmpty(field.value));
};

export { validate };