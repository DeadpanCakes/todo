/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! exports provided: makeDiv, makeSpan, makeForm, makeLabel, makeInput, makeSelect, makeOption, makeTextArea, getContentContainer, getToggleTasks, initContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeDiv\", function() { return makeDiv; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeSpan\", function() { return makeSpan; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeForm\", function() { return makeForm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeLabel\", function() { return makeLabel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeInput\", function() { return makeInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeSelect\", function() { return makeSelect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeOption\", function() { return makeOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeTextArea\", function() { return makeTextArea; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContentContainer\", function() { return getContentContainer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToggleTasks\", function() { return getToggleTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initContainer\", function() { return initContainer; });\n/*\nBreak out dom manip code into this module\n*/\n\nconst makeDiv = () => document.createElement(\"div\");\nconst makeSpan = () => document.createElement(\"span\");\nconst makeForm = () => document.createElement(\"form\");\nconst makeLabel = () => document.createElement(\"label\");\nconst makeInput = () => document.createElement(\"input\");\nconst makeSelect = () => document.createElement(\"select\");\nconst makeOption = () => document.createElement(\"option\");\nconst makeTextArea = () => document.createElement(\"textarea\");\n\nconst getContentContainer = () => document.getElementById(\"contentContainer\")\nconst getToggleTasks = () => document.getElementById(\"toggleTasks\")\n\nconst initContainer = container => {\n    for (let i=0;i<container.childNodes.length;i++) {\n        container.removeChild(container.lastElementChild);\n    };\n};\n\n\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _job_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./job.js */ \"./src/job.js\");\n/* harmony import */ var _jobForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jobForm.js */ \"./src/jobForm.js\");\n/* harmony import */ var _jobList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jobList.js */ \"./src/jobList.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n\n\n\nconst cook = _job_js__WEBPACK_IMPORTED_MODULE_0__[\"taskMixin\"](_job_js__WEBPACK_IMPORTED_MODULE_0__[\"makeJob\"](\"cook\",\"today\",\"high\",\"cook yummy food\",\"pizza and ice cream for dessert\", \"task\"),\"daily\");\nconst read = _job_js__WEBPACK_IMPORTED_MODULE_0__[\"taskMixin\"](_job_js__WEBPACK_IMPORTED_MODULE_0__[\"makeJob\"](\"read\",\"tomorrow\",\"low\",\"read a book!\", \"war and peace\", \"task\"),\"daily\");\nconst dailies = _job_js__WEBPACK_IMPORTED_MODULE_0__[\"projectMixin\"](_job_js__WEBPACK_IMPORTED_MODULE_0__[\"makeJob\"](\"dailies\",\"today\",\"high\",\"stuff to do every day\",\"boring chores\", \"project\"),\"daily\");\nconst weeklies = _job_js__WEBPACK_IMPORTED_MODULE_0__[\"projectMixin\"](_job_js__WEBPACK_IMPORTED_MODULE_0__[\"makeJob\"](\"weeklies\", \"sunday\", \"medium\", \"things to do throughout the week\", \"less boring chores\",\"project\"), \"weekly\")\n\n_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].addProject(dailies);\n_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].addTask(cook);\n_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].addTask(read);\n_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].addProject(weeklies);\nObject(_jobForm_js__WEBPACK_IMPORTED_MODULE_1__[\"renderCatOptions\"])(_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].getProjectNames())\nconsole.log(_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].getProjectArr())\n\nconst checkList = () => console.log(_jobList_js__WEBPACK_IMPORTED_MODULE_2__[\"jobList\"].getProjectArr());\ndocument.getElementById(\"listTab\").addEventListener(\"click\", () => {\n    console.log(\"This would display a list of project and task cards\");\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"initContainer\"](_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"getContentContainer\"]());\n})\ndocument.getElementById(\"formTab\").addEventListener(\"click\", () => {\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"initContainer\"](_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"getContentContainer\"]());\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"getContentContainer\"]().appendChild(Object(_jobForm_js__WEBPACK_IMPORTED_MODULE_1__[\"populateFormContainer\"])(\"project\"));\n})\n\n\n/*\nMaking a to-do list\nParts:\n    TopNav\n        Expand All Tasks (Minimizes Groups)\n    Project List\n        Project Card\n            Completion Checkbox\n            Name\n            Priority\n            Due Date\n            Expand for more info\n                Description\n                Notes\n                Task Card\n                    Name\n                    Priority\n                    Due Date\n                    Expand for more info\n                        Description\n                        Notes\n                    Delete Btn (With Confirmation)\n            Delete Btn (With Confirmation)\n    Form Tab\n        Form Tab Has Two Tabs\n            Project Tab\n                Name\n                Project Type\n                    Dailies\n                    Weekly\n                    Long Term\n                Due Date\n                    Greyed Out If Daily\n                    Pick A Day of the Week if Weekly (Sunday By Default)\n                Priority\n                    Greyed Out If Daily or Weekly\n                Description\n                Notes\n            New Task Tab\n                Name\n                Due Date\n                Priority\n                Description\n                What Project They Belong To\n                Notes\nInterface?\n    Main section that contains the main list or form to add items to the list depending on what tab is currently selected\n    Nav at the bottom of the screen to jump between tabs\n    Nav at the top of the page that offers extra controls, like expanding all tasks and hiding/minimizing groupings\n*/\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/job.js":
/*!********************!*\
  !*** ./src/job.js ***!
  \********************/
/*! exports provided: makeJob, taskMixin, projectMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeJob\", function() { return makeJob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskMixin\", function() { return taskMixin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectMixin\", function() { return projectMixin; });\n/*\nWrite a fn to create a job\ninput:\n    name, duedate, priority\noutput:\n    job object\nwrite factory to accept name, dueDate, priority\nshould also have optional values for description and notes\nwrite mixins to turn jobs into tasks and projects\n    task mixin will introduce project property (what project does this task belong to?)\n    project mixin will introduce project type property (daily, weekly, long term)\n*/\n\nconst makeJob = (name, dueDate, priority, desc, notes, jobType) => {\n    const getName = () => name;\n    const getDueDate = () => dueDate;\n    const getPriority = () => priority;\n    const getDesc = () => desc;\n    const getNotes = () => notes;\n    const getJobType = () => jobType;\n    const changeName = (newName) => name = newName;\n    const changeDueDate = (newDueDate) => dueDate = newDueDate;\n    const changePriority = (newPriority) => priority = newPriority;\n    const changeDesc = (newDesc) => desc = newDesc;\n    const changeNotes = (newNotes) => notes = newNotes;\n    return {\n        getName,\n        getDueDate,\n        getPriority,\n        getDesc,\n        getNotes,\n        getJobType,\n        changeName,\n        changeDueDate,\n        changePriority,\n        changeDesc,\n        changeNotes\n    };\n}\n\nconst taskMixin = (job, project) => {\n    return Object.assign(Object.create(job), { getProject() { return project } });\n};\n\nconst projectMixin = (job, projectType) => {\n    return Object.assign(Object.create(job), { getProjectType() { return projectType } });\n};\n\n\n\n//# sourceURL=webpack:///./src/job.js?");

/***/ }),

/***/ "./src/jobForm.js":
/*!************************!*\
  !*** ./src/jobForm.js ***!
  \************************/
/*! exports provided: formContainerDiv, renderCatOptions, populateFormContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formContainerDiv\", function() { return formContainerDiv; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderCatOptions\", function() { return renderCatOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"populateFormContainer\", function() { return populateFormContainer; });\n/* harmony import */ var _job_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./job.js */ \"./src/job.js\");\n/* harmony import */ var _jobList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jobList.js */ \"./src/jobList.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n/*\nwrite a dom form element to accept info for job instantiation\ninterface (may break these two into individual modules)\n    form\n        Project Tab\n            Project type label\n            preject type field (dropdown?)\n            Name label\n            name field\n            date label\n            date field\n            priority label\n            priority field (color dropdown?)\n            description label\n            desc field\n            notes label\n            notes field\n            submitbtn\n        Task Tab\n            Project category label\n            preject category field (dropdown?)\n            Name label\n            name field\n            date label\n            date field\n            priority label\n            priority field (color dropdown?)\n            description label\n            desc field\n            notes label\n            notes field\n            submitbtn\n*/\n\nconst formContainerDiv = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeDiv\"]();\nconst formTabDiv = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeDiv\"]();\nconst taskTab = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeSpan\"]();\ntaskTab.id = \"taskTab\";\ntaskTab.textContent = \"Add Task\";\ntaskTab.addEventListener(\"click\", () => {\n    _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"initContainer\"](formContainerDiv);\n    populateFormContainer(\"task\");\n});\nconst projectTab = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeSpan\"]();\nprojectTab.id = \"projectTab\";\nprojectTab.textContent = \"Add Project\";\nprojectTab.addEventListener(\"click\", () => {\n    _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"initContainer\"](formContainerDiv);\n    populateFormContainer(\"project\");\n});\n\nformTabDiv.appendChild(projectTab);\nformTabDiv.appendChild(taskTab);\n\nconst typeLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\ntypeLabel.for = \"typeField\";\ntypeLabel.textContent = \"Project Type\";\nconst typeSelect = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeSelect\"]();\ntypeSelect.id = \"typeField\";\nconst dailyOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\ndailyOption.value = \"daily\";\ndailyOption.textContent = \"Daily\";\nconst weeklyOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\nweeklyOption.value = \"weekly\";\nweeklyOption.textContent = \"Weekly\";\nconst longTermOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\nlongTermOption.value = \"longTerm\";\nlongTermOption.textContent = \"Long Term\";\ntypeSelect.appendChild(dailyOption);\ntypeSelect.appendChild(weeklyOption);\ntypeSelect.appendChild(longTermOption);\n\nconst categoryLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\ncategoryLabel.for = \"categoryField\";\ncategoryLabel.textContent = \"Belongs To:\";\nconst categorySelect = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeSelect\"]();\ncategorySelect.id = \"categoryField\";\n\nconst genCatOptions = projects => {\n    const optionsArr = []\n    for (let i=0;i<projects.length;i++){\n        optionsArr.push(projects[i]);\n    }\n    return optionsArr;\n}\n\nconst genCatElements = catArr => {\n    const catElementArr = []\n    for (let i=0;i<catArr.length;i++) {\n        const newOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\n        newOption.value = catArr[i];\n        newOption.textContent = catArr[i];\n        catElementArr.push(newOption);\n    }\n    return catElementArr;\n}\n\nconst populateCatOptions = catElementArr => {\n    for (let i=0;i<catElementArr.length;i++){\n        categorySelect.appendChild(catElementArr[i])\n    }\n}\n\nconst renderCatOptions = (projectArr) => {\n    const optionsArr = genCatOptions(projectArr);\n    const catElementArr = genCatElements(optionsArr);\n    populateCatOptions(catElementArr);\n}\n\n/*\nwrite a fn to dynamically create option elements, each of which corresponds to one listing in jobList.projectArr\n*/\n\n\nconst nameLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\nnameLabel.for = 'nameField';\nnameLabel.textContent = 'Name';\nconst nameInput = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeInput\"]();\nnameInput.id = \"nameField\";\nnameInput.type = \"text\";\n\nconst dateLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\ndateLabel.for = \"dateField\";\ndateLabel.textContent = \"Due Date\";\nconst dateInput = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeInput\"]();\ndateInput.id = \"dateField\";\ndateInput.type = \"date\";\n\nconst priorityLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\npriorityLabel.for = \"priorityField\";\npriorityLabel.textContent = \"Priority\"\nconst prioritySelect = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeSelect\"]();\nprioritySelect.id = \"priorityField\";\nconst highOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\nhighOption.value = \"high\";\nhighOption.textContent = \"High\";\nconst mediumOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\nmediumOption.value = \"medium\";\nmediumOption.textContent = \"Medium\";\nconst lowOption = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeOption\"]();\nlowOption.value = \"low\";\nlowOption.textContent = \"Low\";\nprioritySelect.appendChild(highOption);\nprioritySelect.appendChild(mediumOption);\nprioritySelect.appendChild(lowOption);\n\nconst descLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\ndescLabel.for = \"descField\";\ndescLabel.textContent = \"Description\";\nconst descTextArea = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeTextArea\"]();\ndescTextArea.id = \"descField\";\n\nconst notesLabel = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeLabel\"]();\nnotesLabel.for = \"notesField\";\nnotesLabel.textContent = \"Notes\";\nconst notesTextArea = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeTextArea\"]();\nnotesTextArea.id = \"notesField\";\n\nconst projectSubmitInput = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeInput\"]();\nprojectSubmitInput.id = \"projectSubmitBtn\";\nprojectSubmitInput.type = \"submit\";\nprojectSubmitInput.value = \"Submit\";\nprojectSubmitInput.addEventListener(\"click\", e => {\n    e.preventDefault();\n    _jobList_js__WEBPACK_IMPORTED_MODULE_1__[\"jobList\"].addProject(_job_js__WEBPACK_IMPORTED_MODULE_0__[\"projectMixin\"](_job_js__WEBPACK_IMPORTED_MODULE_0__[\"makeJob\"](nameInput.value, dateInput.value, prioritySelect.value, descTextArea.value, notesTextArea.value, nameInput.value)))\n})\n\nconst taskSubmitInput = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeInput\"]();\ntaskSubmitInput.id = \"projectSubmitBtn\";\ntaskSubmitInput.type = \"submit\";\ntaskSubmitInput.value = \"Sumbit\";\n\nconst populateFormContainer = (tab) => {\n    const formContainer = formContainerDiv;\n    formContainerDiv.appendChild(formTabDiv);\n    let form;\n    let formArr;\n    const projectFormArr = [\n        typeLabel,\n        typeSelect,\n        nameLabel,\n        nameInput,\n        dateLabel,\n        dateInput,\n        priorityLabel,\n        prioritySelect,\n        descLabel,\n        descTextArea,\n        notesLabel,\n        notesTextArea,\n        projectSubmitInput\n    ];\n    const taskFormArr = [\n        categoryLabel,\n        categorySelect,\n        nameLabel,\n        nameInput,\n        dateLabel,\n        dateInput,\n        priorityLabel,\n        prioritySelect,\n        descLabel,\n        descTextArea,\n        notesLabel,\n        notesTextArea,\n        taskSubmitInput\n    ];\n    const projectForm = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeForm\"]();\n    const taskForm = _dom_js__WEBPACK_IMPORTED_MODULE_2__[\"makeForm\"]();\n    if (tab === \"project\") {\n        form = projectForm;\n        formArr = Array.from(projectFormArr);\n    } else if (tab === \"task\") {\n        formArr = Array.from(taskFormArr);\n        form = taskForm;\n    }\n    for (let i = 0; i < formArr.length; i++) {\n        form.appendChild(formArr[i]);\n    };\n    formContainer.appendChild(form);\n    return formContainer;\n};\n\n\n\n//# sourceURL=webpack:///./src/jobForm.js?");

/***/ }),

/***/ "./src/jobList.js":
/*!************************!*\
  !*** ./src/jobList.js ***!
  \************************/
/*! exports provided: jobList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jobList\", function() { return jobList; });\n/*\nwrite an object that privately stores all of the tasks along with inbuilt methods to add, remove\ninterface? IIFE\ninput? none for the object, objects for the arrays\noutput object\n*/\n\nconst jobList = (() => {\n    let projectArr = [];\n    let taskArr = [];\n    const addProject = newProject => projectArr.push(newProject);\n    const addTask = newTask => taskArr.push(newTask);\n    const removeProject = project => {\n        if (projectArr.indexOf(project) > -1) {\n            let newArr;\n            newArr = (projectArr.slice(0, projectArr.indexOf(project))).concat(projectArr.slice(projectArr.indexOf(project) + 1))\n            projectArr = newArr;\n        }\n    }\n    const removeTask = task => {\n        if (taskArr.indexOf(task) > -1) {\n            let newArr;\n            newArr = (taskArr.slice(0, taskArr.indexOf(task))).concat(taskArr.slice(taskArr.indexOf(task) + 1))\n            taskArr = newArr;\n        }\n    }\n    const getProjectArr = () => projectArr;\n    const getProjectNames = () => projectArr.map((obj) => obj.getName())\n    const getTaskArr = () => taskArr;\n    return { addProject, addTask, removeProject, removeTask, getProjectArr, getProjectNames, getTaskArr };\n})();\n\n\n\n//# sourceURL=webpack:///./src/jobList.js?");

/***/ })

/******/ });