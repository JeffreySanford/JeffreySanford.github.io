(function(){
  var counterInteger = 0;
  var displayInteger ="";

  function counter(){
    var counter = document.getElementById("counter");
    counterInteger  += 1;
    if (counterInteger > 100 && counterInteger<6000) {
        if (counterInteger%100 == 0) {
         displayInteger = (counterInteger/100) + " sec";
        }
    }else if (counterInteger > 6000 ) {
      if (counterInteger%6000 == 0) {
        if (counterInteger/6000 == 1){
          displayInteger = (counterInteger/6000) + " minute";
        } else {
        displayInteger = (counterInteger/6000) + " minutes";
        }
      }
    }else{
      displayInteger = counterInteger + " ms";
    }



    counter.innerHTML = displayInteger;
  }
$(document).ready(function() {
      $("#my-menu").mmenu().on( "closed.mm", function() {
            $(".menu-button").show();
         });
      $(".menu-button").click(function() {
        $(".menu-button").hide();
        $("#my-menu").trigger("open.mm");
      });
      setInterval(function(){ counter(); }, 1);
   });
}());
