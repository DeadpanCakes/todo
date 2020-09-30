/*
Break out dom manip code into this module
*/

const initContainer = container => {
    for (let i=0;i<container.childNodes.length;i++) {
        container.removeChild(container.lastElementChild);
    };
};

export {initContainer}