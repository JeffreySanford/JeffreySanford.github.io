(function IIFE() {
    'use strict';

    console.log("javascript loaded");

    $(document).ready(function () {
        console.log("on ready fired");
        $(".navbar-nav li a").click(function (event) {
            $(".navbar-collapse").collapse('hide');
        });
    });

}());