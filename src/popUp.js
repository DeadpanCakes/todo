import * as dom from "./dom"
import { emitter } from "./emitter";
import * as interfacer from "./interfacer.js";

const popUp = () => {
    const window = dom.makeDiv();
    window.classList.add("popUp");
    return { window };
};

const delConfirmMixin = () => {
    return Object.assign(popUp(), {
        confirmBtn: dom.makeBtn(),
        cancelBtn: dom.makeBtn(),
        populateText (context) {
            this.window.textContent = `Are You Sure You Want To Delete ${context}?`
        },
        populateBtns() {
            this.confirmBtn.textContent = "Yes";
            this.cancelBtn.textContent = "No";
            this.window.appendChild(this.confirmBtn);
            this.window.appendChild(this.cancelBtn);
        },
        addBtnEvents(obj) {
            const confirmDel = (obj) => emitter.emit("confirmDel", obj);
            this.confirmBtn.addEventListener("click", (e) => {
                confirmDel(obj);
                e.target.removeEventListener("click", confirmDel);
            });
            this.cancelBtn.addEventListener("click", () => this.hideWindow());
        },
        displayWindow(container, context) {
            const objName = findObj(context).name
            this.populateText(objName);
            this.populateBtns();
            this.addBtnEvents(context);
            container.appendChild(this.window);
        },
        hideWindow() {
            const container = this.window.parentElement;
            container.removeChild(this.window);
        }
    });
};

const failValidMixin = () => {
    return Object.assign({
        confirmBtn: dom.makeBtn(),
        populateText: function (context) {
            this.window.textContent = `${context} Field Not Properly Filled Out`;
        },
        populateBtn() {
            this.confirmBtn.textContent = "OK";
            this.window.appendChild(this.confirmBtn);
        },
        addBtnEvents() {
            this.confirmBtn.addEventListener("click", () => this.hideWindow())
        },
        displayWindow(container, context) {
            console.log(container, context)
            this.populateText(findField(context));
            this.populateBtn();
            this.addBtnEvents();
            container.appendChild(this.window);
        },
        hideWindow() {
            const container = this.window.parentElement;
            container.removeChild(this.window);
        }
    }, popUp());
};

const findField = (element) => {
    switch (element.id) {
        case "nameField":
            return "Name";
        case "dateField":
            return "Date";
        case "descField":
            return "Description";
        case "notesField":
            return "Notes"
    };
};

const findObj = (element) => {
    if (!!interfacer.objToCard.getProject(element)) {
        return interfacer.objToCard.getProject(element);
    } else {
        return interfacer.objToCard.findTask(element);
    }
}

const delConfirm = (() => delConfirmMixin())();
const failValid = (() => failValidMixin())();

export { delConfirm, failValid };