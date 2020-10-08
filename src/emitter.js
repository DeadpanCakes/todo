const emitter = (() => {
    const events = {};
    const on = (event,fn) => {
        if (!events[event]) {
            events[event] = [];
            events[event].push(fn)
        } else {
            events[event].push(fn)
        }
    }
    const emit = (event,arg1,arg2,arg3,arg4,arg5) => {
        for (let i=0;i<events[event].length;i++) {
            events[event][i](arg1,arg2,arg3,arg4,arg5);
        }
    }
    return {
        on,
        emit,
        get events() { return events }
    }
})();

export { emitter }