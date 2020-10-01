import { format } from "date-fns"; 

/*
Write a fn to create a job
input:
    name, duedate, priority
output:
    job object
write factory to accept name, dueDate, priority
should also have optional values for description and notes
write mixins to turn jobs into tasks and projects
    task mixin will introduce project property (what project does this task belong to?)
    project mixin will introduce project type property (daily, weekly, long term)
*/

const makeJob = (name, dueDate, priority, desc, notes, jobType) => {
    const getName = () => name;
    const getDueDate = () => format(dueDate, "do PPP");
    const getPriority = () => priority;
    const getDesc = () => desc;
    const getNotes = () => notes;
    const getJobType = () => jobType;
    const changeName = (newName) => name = newName;
    const changeDueDate = (newDueDate) => dueDate = newDueDate;
    const changePriority = (newPriority) => priority = newPriority;
    const changeDesc = (newDesc) => desc = newDesc;
    const changeNotes = (newNotes) => notes = newNotes;
    return {
        getName,
        getDueDate,
        getPriority,
        getDesc,
        getNotes,
        getJobType,
        changeName,
        changeDueDate,
        changePriority,
        changeDesc,
        changeNotes
    };
}

const taskMixin = (job, project) => {
    return Object.assign(Object.create(job), { getProject() { return project } });
};

const projectMixin = (job, projectType) => {
    return Object.assign(Object.create(job), { getProjectType() { return projectType } });
};

export {
    makeJob,
    taskMixin,
    projectMixin
};