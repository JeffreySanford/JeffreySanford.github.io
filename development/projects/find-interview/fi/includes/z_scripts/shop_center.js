				
<script>
// Attach a submit handler to the form
$( "#ShopCenterOrder" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('YesImSure').disabled=true;	 
// Get some values from elements on the page:
var $form = $( this ),
item_value = $form.find( "input[name='item']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { item: item_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#ShopCenterOrderResponse" ).html(data);
			 document.getElementById('YesImSure').disabled=false;	 
});
});
</script>