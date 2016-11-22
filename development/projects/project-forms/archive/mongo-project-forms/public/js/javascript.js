
/*global window */
(function IFEE() {
    'use strict';

    window.onload = function onLoadFunction() {
        console.info("main javascript file loaded.");
    };
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}());