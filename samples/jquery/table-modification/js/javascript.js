function styleTable(){
    $(function() {
        $("#tableStyledInJavascript tr:even").not('thead').addClass("stripe1");
        $("#tableStyledInJavascript tr:odd").not('thead').addClass("stripe2");

        $("#tableStyledInJavascript tr").hover(
            function() {
            $(this).toggleClass("highlight").not('thead tr');
            },
            function() {
            $(this).toggleClass("highlight").not('thead tr').css( 'cursor', 'pointer' );
            });
            
            $("#tableStyledInJavascript").on("click", "td.choosenColor", function showText (evt) {
                $("#colorPanel").animate({width:'toggle'},350);
                var choosenColor= $(this).text();
                $("#colorPanel").html(choosenColor).css("background-color", choosenColor);
                setTimeout(function() {
                    $("#colorPanel").animate({width:'toggle'},200);
                    }, 3000);
            });

            countRows();

            /* add delete button  .ui-icon-circle-minus*/
            var objCurrentRow = $('#tableStyledInJavascript tr').not('thead tr');
            objCurrentRow.append('<div class="deleteRow"><button>Delete</button></div>')
    });
}

function addRow() {
    $("#btnAdd").on("click", function showText (evt) {
        $("#addRowPanel").toggle();

        $("#addRowPanel").on("click", "#btnAddRow", function submitRow() {
            var inpColor = $("#inpColor").val(); 
            var inpCost = $("#inpCost").val();
            var inpAvailability = $("#inpAvailability option:selected").text(); 
            
            console.info('The input color is: ' + inpColor + 'with the cost of' + inpCost + 'and the availability of ' + inpAvailability + '.');
            countRows();
            
            $("#tableStyledInJavascript tr").last().after('<tr><td>' +inpColor + '</td><td>' + inpCost + '</td><td>' + inpAvailability + '</td></tr>');
            $("#tableStyledInJavascript tr").last().append('<div class="deleteRow"><button>Delete</button></div>');
            $("#tableStyledInJavascript tr:even").addClass("stripe1");
            $("#tableStyledInJavascript tr:odd").addClass("stripe2");
            $("#addRowPanel").toggle();
            
       
            /* Clear the input boxes */
            inpColor ="";
            inpCost ="";
            inpAvailability="";
            });

    });
    countRows();
}

function countRows() {
    var rowCount = $('#tableStyledInJavascript tr').not('thead tr').length;
    console.info('There are ' + rowCount + ' rows in the table.');
    $("#tableStyledInJavascript tr").not('thead tr').removeClass("stripe1 stripe2");
    $("#tableStyledInJavascript tr:even").not('thead tr').addClass("stripe1");
    $("#tableStyledInJavascript tr:odd").not('thead tr').addClass("stripe2");
}

function removeRow(){
    $("#tableStyledInJavascript tbody tr").on('click', function(event) {
        $(this).remove();
        
        countRows();
        //update array with information from the table

        //Export the array to the console formatted for viewing

        return false;
    });
}


$(document).ready(function () {
        styleTable();
        addRow();
        removeRow();
        $('#picturesPanel').find('a').colorbox({width: '450', height: '300'});
 });