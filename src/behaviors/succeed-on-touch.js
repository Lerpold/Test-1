"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;
let createDecorator = jibo.bt.createDecorator;
let factory = jibo.bt.factory;

module.exports = createDecorator({
    constructor: function(options) {
        this.onTouch = options.onTouch;
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

factory.addBehavior(module, "project");
