(function IFEE() {
    'use strict';

    function findMaxSubArray(array) {
        var maxSum = 0,                         // sum of the current subset
            max = Number.NEGATIVE_INFINITY,     // sum of the current largest subset
            leftIndex = 0,                      // this is the left side index of the accepted subset
            rightIndex = array.length - 1,      // this is the right side index of the accepted subset
            objReturn;                          // the return object

        var i,                                  // outer loop counter
            j,                                  // inner loop counter
            len = array.length;                 // length of the input array
        for (i = 0; i < len; i += 1) {          // starts the outer loop (set)
            maxSum = 0;
            for (j = i; j < len; ++j) {         // starts the inner loop (subset)

                maxSum += array[j];

                if (max < maxSum) {             // the largest sum is smaller than the current subset sum

                    leftIndex = i;
                    max = maxSum;
                    rightIndex = j;

                }
            }
        }
        objReturn = {left: leftIndex, right: rightIndex, sum: max};
        return objReturn;
    }

    // here are the known sets for testing

    var array = [1, 2, -100, 300, 400];  //  should return 700 [300, 400]
    findMaxSubArray(array);

    array = [1, 2, 4, -10, -1, 20];     //  should return 20 [20]
    findMaxSubArray(array);

}());