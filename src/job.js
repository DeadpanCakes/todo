import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

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

const makeTask = (name, dueDate, priority, desc, notes, project) => {
    return taskMixin(Object.create(makeJob(name, dueDate, priority, desc, notes)), project)
};
const makeProject = (name, dueDate, priority, desc, notes, type) => {
    return projectMixin(Object.create(makeJob(name, dueDate, priority, desc, notes, type)), type)
};

export {
    makeTask,
    makeProject
};