import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { objToStorage } from "./interfacer";

const makeJob = (name, dueDate, priority, desc, notes) => {
    const timeCreated = new Date;
    const changeName = (newName) => name = newName;
    const changeDueDate = (newDueDate) => dueDate = newDueDate;
    const changePriority = (newPriority) => priority = newPriority;
    const changeDesc = (newDesc) => desc = newDesc;
    const changeNotes = (newNotes) => notes = newNotes;
    return {
        get timeOfCreation() { return timeCreated },
        get name() { return name },
        get dueDate() { return dueDate },
        get formattedDueDate() { return format(new Date(zonedTimeToUtc(dueDate.toString())), "PPP") },
        get priority() { return priority },
        get desc() { return desc },
        get notes() { return notes },
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
        addTask(task) { 
            this.taskArr.push(task)
            objToStorage.storeAllObj();
        },
        removeTask(task) {
            if (this.taskArr.indexOf(task) > -1) {
                let newArr;
                newArr = (this.taskArr.slice(0, this.taskArr.indexOf(task))).concat(this.taskArr.slice(this.taskArr.indexOf(task) + 1))
                this.taskArr = newArr;
                objToStorage.removeObj(task.name);
            };
        },
        getTaskArr() { return this.taskArr },
        getTaskNames() { return this.taskArr.map((task) => task.name)},
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