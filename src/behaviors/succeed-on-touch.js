"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;

module.exports = jibo.bt.registerDecorator({
    name: "SucceedOnTouch",
    namespace: "project",
    constructor: function(onTouch) {
        this.onTouch = onTouch;
        this.status = Status.INVALID;
        this.onClickBind =this.onClick.bind(this);
    },
    start: function() {
        this.status = Status.IN_PROGRESS;
        document.addEventListener('click', this.onClickBind);
        return true;
    },
    onClick: function() {
        this.status = Status.SUCCEEDED;
        this.cleanup();
    },
    cleanup: function() {
        document.removeEventListener('onclick', this.onClickBind)
    },
    stop: function() {
        //cleanup if this decorator is stopped
        this.cleanup();
    },
    update: function(result) {
        if(this.status === Status.SUCCEEDED) {
            return Status.SUCCEEDED;
        }
        return result;
    }
});