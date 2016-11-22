				
<script>
// Attach a submit handler to the form
$( "#AddFundsForm" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('addfundsbtn').disabled=true;	 
// Get some values from elements on the page:
var $form = $( this ),
card_number_value = $form.find( "input[name='card_number']" ).val(),
card_value_value = $form.find( "input[name='card_value']" ).val(),
card_serial_value = $form.find( "input[name='card_serial']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { card_number: card_number_value, card_value:card_value_value, card_serial:card_serial_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#AddFundsResponse" ).html(data);
			 document.getElementById('addfundsbtn').disabled=false;	 
});
});
</script>

				
<script>
// Attach a submit handler to the form
$( "#TransFundsForm" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('transfundsbtn').disabled=true;
// Get some values from elements on the page:
var $form = $( this ),
receiver_value = $form.find( "input[name='receiver']" ).val(),
transfer_amount_value = $form.find( "input[name='transfer_amount']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { receiver: receiver_value, transfer_amount: transfer_amount_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#TransFundsResponse" ).html(data);
			 document.getElementById('transfundsbtn').disabled=false;
});
});
</script>


				
<script>
// Attach a submit handler to the form
$( "#NewOrderForm" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('neworderbtn').disabled=true;	 
// Get some values from elements on the page:
var $form = $( this ),
original_link_value = $form.find( "input[name='original_link']" ).val(),
item_name_value = $form.find( "input[name='item_name']" ).val(),
item_color_value = $form.find( "input[name='item_color']" ).val(),
item_size_value = $form.find( "input[name='item_size']" ).val(),
item_model_value = $form.find( "input[name='item_model']" ).val(),
item_specs_value = $form.find( "input[name='item_specs']" ).val(),
quantity_value = $form.find( "input[name='quantity']" ).val(),
delivery_value = $form.find( "select[name='delivery']" ).val(),
notes_value = $form.find( "input[name='notes']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { original_link: original_link_value, item_name:item_name_value, item_color:item_color_value, item_size:item_size_value, item_model:item_model_value, item_specs:item_specs_value, quantity:quantity_value, delivery:delivery_value, notes:notes_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#NewOrderResponse" ).html(data);
			 document.getElementById('neworderbtn').disabled=false;	 
});
});
</script>