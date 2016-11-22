				
<script>
// Attach a submit handler to the form
$( "#Calculator" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('calculatebtn').disabled=true;	 
// Get some values from elements on the page:
var $form = $( this ),
item_price_value = $form.find( "input[name='item_price']" ).val(),
quantity_value = $form.find( "input[name='quantity']" ).val(),
item_weight_value = $form.find( "input[name='item_weight']" ).val(),
delivery_value = $form.find( "select[name='delivery']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { item_price: item_price_value, quantity: quantity_value, item_weight: item_weight_value, delivery: delivery_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#CalculatorResponse" ).html(data);
			 document.getElementById('calculatebtn').disabled=false;	 
});
});
</script>