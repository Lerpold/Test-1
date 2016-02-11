"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;
let SucceedOnTouch = require('./succeed-on-touch');

module.exports = jibo.bt.registerDecorator({
    name: "FailOnTouch",
    namespace: "project",
    constructor: function(onTouch) {
        this.decorator = SucceedOnTouch(onTouch);
    },
    start: function() {
        return this.decorator.start();
    },
    stop: function() {
        this.decorator.stop();
    },
    update: function(result) {
        let status = this.decorator.update(result);
        if(status === Status.SUCCEEDED) {
            return Status.FAILED;
        }
        return status;
    }
});