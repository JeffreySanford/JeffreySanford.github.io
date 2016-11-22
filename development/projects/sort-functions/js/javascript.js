"use strict";

//  define the arrays
function questionOne(event) {

    function minWindow(s, t) {

        if ( t.length > s.length ) { 
            return "";
        }
        
        var result = "";

        //character counter for t
        var target = {};
        for (var i=0; i < t.length; i++) {
            
            var c = t.charAt(i);    
            
            if ( target[c]!=null ) {

                target[c] = target[c]+1;
            } else {

                target[c] = 1;  
            }
        } //end for

        // character counter for s
        var map = {};
        var left = 0;
        var minLen = s.length+1;
        
        var count = 0; // the total of mapped characters
        
        for ( var i=0; i<s.length; i++ ) {
            var c = s.charAt(i);
        
            if ( target[c]!=null ) {
  
              if ( map[c]!=null ) {

                if ( map[c]<target[c] ) {
        
                    count++;
                } //end third if
        
                map[c] = map[c]+1;
                
                } else {
        
                    map[c] = 1;
                    count++;
                } //end second if
            } //end first if
        
        if ( count == t.length ) {
            var sc = s.charAt(left);
    
            while ( (map[sc]==null) || map[sc] > target[sc] ) {
        
                if (map[sc]!=null && map[sc] > target[sc]) {
                    map[sc] = map[sc] - 1;
                }
        
                left++;
                sc = s.charAt(left);
            }   

            if (i - left + 1 < minLen) {
    
                result = s.substring(left, i + 1);
                minLen = i - left + 1;
            }    
        }
    }
    
    return result;
    }  //ends fuction minWindow(s, t)
    
    var dataStringS, searchStringX;
    
    if ( event  === 1 ) {

       dataStringS = "ADOBECODEBANC";
	   searchStringX = "ABC";
        
    } else if (event === 2) {
 
       dataStringS = "Lorem ipsum dolor sit amet, consectetur adipiing elit. Etiam aliquam interdum odio. Fuse cursus imperdiet ipsum, ac commodo elit placerat sit amet.";
	   searchStringX = "WINDOW";
        
    } else {
       
       dataStringS = "GHHYGFDJGHTHHLKSIO";
	   searchStringX = "GHH";
        
    }   

    var minimumWindow  = minWindow(dataStringS, searchStringX);
 
    if ( minimumWindow == "" ) {
        
        minimumWindow = '<span style="color:red">NO WINDOWS FOUND</span>';
    
    }

    var responseString = 'The <i>minimum window</i> that contains all the characters in the search string X (<span style="font-size1.2em;color: lightBlue;">' + searchStringX + '</span>) in the array X (<span style="font-size1.2em;color: lightBlue;">' + dataStringS + '</span>) would be the subset (<span style="font-size1.5em;color: lightBlue;">' + minimumWindow + '</span>).';
    return responseString;
    
} // end questioOne      

function questionTwo(testArray) {

     var equilibriums = [];
 
    testArray.forEach(function(_, indexOfArray, arrayOfNumbers) {
        var left = 0, right = 0;
    
        for (var i = 0; i < arrayOfNumbers.length; i++) {
            if (i < indexOfArray) {
                left += testArray[i];
            } else if (i > indexOfArray) {
                right += testArray[i];
            }
        }
    
        if (left === right) {
            equilibriums.push(indexOfArray);
        }
    });
    
    if (equilibriums.length == 0) {
        
        equilibriums.push(-1);
    } 
    
    var strResponse = '<span style="font-size: 2em; color: lightBlue;">' + equilibriums + '</span>&nbsp;&nbsp;&nbsp;The equilibrium index for the array of:<br /><span style="font-size:1.2;color:lightBlue;">[ ' + testArray + ' ].</span>';
    return strResponse;
   
} // end questionTwo function
        
function questionThree(testArray) {
    var arrayHeap = [];
    var indexResponse = 0;
    
    //distinct values

    function BinaryHeap(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }
    
    BinaryHeap.prototype = {
        push: function(element) {
            // Add the new element to the end of the array.
            this.content.push(element);
            // Allow it to bubble up.
            this.bubbleUp(this.content.length - 1);
        },
    
        pop: function() {
            // Store the first element so we can return it later.
            var result = this.content[0];
            // Get the element at the end of the array.
            var end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it sink down.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.sinkDown(0);
            }
        return result;
        },
    
        remove: function(node) {
            var length = this.content.length;
            // To remove a value, we must search through the array to find
            // it.
            for (var i = 0; i < length; i++) {
                if (this.content[i] != node) {
                    continue;
                }
                
                // When it is found, the process seen in 'pop' is repeated
                // to fill up the hole.
                var end = this.content.pop();
                // If the element we popped was the one we needed to remove,
                // we're done.
                if (i == length - 1) {
                    break;
                }
                
                // Otherwise, we replace the removed element with the popped
                // one, and allow it to float up or sink down as appropriate.
                this.content[i] = end;
                this.bubbleUp(i);
                this.sinkDown(i);
                break;
            }
        },
        
        size: function() {
            return this.content.length;
        },
        
        bubbleUp: function(n) {
            // Fetch the element that has to be moved.
            var element = this.content[n], score = this.scoreFunction(element);
            // When at 0, an element can not go up any further.
            while (n > 0) {
                // Compute the parent element's index, and fetch it.
                var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN];
                // If the parent has a lesser score, things are in order and we
                // are done.
                if (score >= this.scoreFunction(parent)) {
                    break;
                }
                // Otherwise, swap the parent with the current element and
                // continue.
                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }
        },
        
        sinkDown: function(n) {
            // Look up the target element and its score.
            var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);
            
            while(true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) * 2, child1N = child2N - 1;
                // This is used to store the new position of the element,
                // if any.
                var swap = null;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    var child1 = this.content[child1N],
                    child1Score = this.scoreFunction(child1);
                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore)
                    swap = child1N;
                }
                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
                }
        
            // No need to swap further, we are done.
            if (swap == null) {
                break;
            }
            
            // Otherwise, swap and continue.
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
            }
        },

        unique: function(arrayHeap) {
            return arrayHeap.reduce(function(p, c) {
                if (p.indexOf(c) < 0) {
                    p.push(c);
                }
                return p;
            }, []);
        } 
    };
    
    var heap = new BinaryHeap(function(x) {
        return x;
    });
    
    for ( var indexTestArray = 0; indexTestArray < testArray.length; indexTestArray++ ) {
        heap.push(testArray[indexTestArray]);
    }

    heap.remove(2);

    while (heap.size() > 0) {
        arrayHeap [indexResponse++] = heap.pop();
    }
    
    var objResponse = {
        stringResponse: 'For test array:<br /><span style="font-size:1.2em;color:lightBlue;">&nbsp;&nbsp;[ ' + testArray + ' ]</span><br/>The distict values are:<br /><span style="font-size:1.2em;color:lightBlue;">&nbsp;&nbsp;[ ' + heap.unique(arrayHeap) + ' ]',
        intUniqueElements: heap.unique(arrayHeap)
    }; 
    var stringTestItemTemplate =    '<div class="col-xs-12 col-md-3"><span style="font-size:4em;color:lightBlue;">' + objResponse.intUniqueElements.length + '</span></div>';
    stringTestItemTemplate +=       '<div class="col-xs-12 col-md-9"><br />' + objResponse.stringResponse + '</div>';

    return stringTestItemTemplate;
};
