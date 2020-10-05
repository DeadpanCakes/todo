import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
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

const makeJob = (name, dueDate, priority, desc, notes) => {
    const getName = () => name;
    const getDueDate = () => format(new Date(zonedTimeToUtc(dueDate.toString())), "PPP");
    const getPriority = () => priority;
    const getDesc = () => desc;
    const getNotes = () => notes;
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
    return Object.assign(Object.create(job), {
        taskArr: [],
        addTask(task) { this.taskArr.push(task) },
        removeTask(task) {
            if (this.taskArr.indexOf(task) > -1) {
                let newArr;
                newArr = (this.taskArr.slice(0, this.taskArr.indexOf(task))).concat(this.taskArr.slice(this.taskArr.indexOf(task) + 1))
                this.taskArr = newArr;
            };
        },
        getTaskArr() { return this.taskArr },
        getTaskNames() { return this.taskArr.map((task) => task.getName())},
        getProjectType() { return projectType }
    });
};

const makeTask = (name, dueDate, priority, desc, notes, project) => taskMixin(Object.create(makeJob(name, dueDate, priority, desc, notes)), project);
const makeProject = (name, dueDate, priority, desc, notes, type) => projectMixin(Object.create(makeJob(name, dueDate, priority, desc, notes, type)), type);

export {
    makeTask,
    makeProject
};