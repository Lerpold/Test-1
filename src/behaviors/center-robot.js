"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;

module.exports = jibo.bt.registerBehavior({
    name: "CenterRobot",
    namespace: "project",
    constructor: function(isGlobal) {
        this.isGlobal = isGlobal;
        this.status = Status.INVALID;
    },
    start: function() {
        this.status = Status.IN_PROGRESS;
        let dofs = jibo.animate.dofs;
        var thiz = this;
        jibo.animate.centerRobot(dofs.ALL, this.isGlobal, function() {
            thiz.status = Status.SUCCEEDED;
        });
        return true;
    },
    stop: function() {

    },
    update: function() {
        return this.status;
    }
});