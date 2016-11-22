/*  Start jQuery code
    Adapated from tutorial at:  http://www.sanwebe.com/2011/12/making-simple-jquery-ajax-contact-form
 */
$(document).ready(function() {
    $("#submit_btn").click(function() {

        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
            $(this).css('border-color','');
            if(!$.trim($(this).val())){ //if this field is empty
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
        });

        if(proceed) //everything looks good! proceed...
        {
            console.log("All variables have been qualified in JavaScript.");
            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input[name=name]').val(),
                'user_email'    : $('input[name=email]').val(),
                'phone_number'  : $('input[name=phone]').val(),
                /* 'subject'       : $('select[name=subject]').val(), */
                'msg'           : $('textarea[name=message]').val()
            };

            //Ajax post data to server
            $.post('php/sendMail.php', post_data, function(response){
              console.log(response);
                if(response.type == 'error'){ //load json data from server and output message
                    output = '<div class="error">'+response.text+'</div>';
                    console.log("JavaScript submission has failed to PHP.");
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    console.log("JavaScript submission has succeeded to PHP.");
                    //reset values in all input fields
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
                    $("#contact_form #contact_body").slideUp(); //hide form after success
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
        $(this).css('border-color','');
        $("#result").slideUp();
    });

});
