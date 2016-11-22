<script> function bigDiv(x) { x.style.width="200px"; } function normalDiv(x) { x.style.width=""; } </script>

<script>
// Attach a submit handler to the form
$( "#SearchJobs" ).submit(function( event ) {
// Stop form from submitting normally
event.preventDefault();
document.getElementById('btnSearchJobs').disabled=true;	 
// Get some values from elements on the page:
var $form = $( this ),
j_title_value = $form.find( "input[name='j_title']" ).val(),
cmd_value = $form.find( "input[name='cmd']" ).val(),
url = $form.attr( "action" );
// Send the data using post
var posting = $.post( url, { j_title: j_title_value, cmd: cmd_value } );
// Put the results in a div
posting.done(function( data ) {
             /* Put the results in a div */
             $( "#SearchJobsRes" ).html(data);
			 document.getElementById('btnSearchJobs').disabled=false;	
});
});
</script>