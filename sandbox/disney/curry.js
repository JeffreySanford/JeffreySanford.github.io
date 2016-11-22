(function IFEE() {
    'use strict';

    function add(a) {
        var sum = a;
        function fn(b) {
            sum += b;
            return fn;
        }
        fn.toString = function () {
            return sum;
        }
        return fn;
    }
    /* testing purposes in the console */
    console.log('sum: ' + add(1)(2)); // sum: 3
    console.log('sum: ' + add(2)(2)(2)(2)); // sum: 8
}());
