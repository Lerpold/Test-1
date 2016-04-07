"use strict";

let jibo = require ('jibo');
let Status = jibo.bt.Status;

function start() {
    let root = jibo.bt.create('../behaviors/21-take-photo');
    root.start();
    let intervalId = setInterval(function() {
        if (root.status !== Status.IN_PROGRESS) {
            clearInterval(intervalId);
            console.log('Behavior tree finished with status ' + root.status);
        } else {
            root.update();
        }
    }, 33);
}

jibo.init(function() {
    //We need to require any custom behaviors so that they can register themselves
    //with the behavior factory.
    require('./behaviors/center-robot');
    require('./behaviors/succeed-on-touch');
    require('./behaviors/fail-on-touch');
    //Setup code for displaying Jibo's eye.
    let eyeElement = document.getElementById('eye');
    jibo.visualize.createRobotRenderer(eyeElement, jibo.visualize.DisplayType.EYE, function() {
      start();
    });
});
