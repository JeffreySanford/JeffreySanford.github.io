(function IFEE() {
    'use strict';

    exports.index = function pageLanding(req, res) {
        console.log("landing view triggered");

        res.render('default', {
            title: 'Landing' //insert an object to the template
        });
    };
}());