function styleTable(){
    $(function() {
        $("#tableStyledInJavascript tr:even").addClass("stripe1");
        $("#tableStyledInJavascript tr:odd").addClass("stripe2");
        $("#tableStyledInJavascript thead th").css( "background-color", "green");
        $("#tableStyledInJavascript thead th").css( "color", "white");

        $("#tableStyledInJavascript tr").hover(function() {
            $(this).toggleClass("highlight").not('thead');
            }, function() {
                $(this).toggleClass("highlight");
                $(this).css('cursor','pointer');
            });        
    });
}

function rotateImages() {
    var $active = $('#changeImages .active');
    var $next = ($('#changeImages .active').next().length > 0) ? $('#changeImages .active').next() : $('#changeImages img:first');
    $active.fadeOut(function(){
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
}

$(document).ready(function () {
        styleTable();
        setInterval("rotateImages()", 3000);
        $("#displayTextWithExpand").accordion( {header: "h3" }).css( 'cursor', 'pointer' );
        
        $("#items div").click(function() {
            $( this ).toggleClass( "selected" );
            var selectedItems = $("#items div.selected p").text();
            console.log(selectedItems);
        });
        
        $("#tableStyledInJavascript").on("click", "td.choosenColor", function showText (evt) {
                $("#colorPanel").animate({width:'toggle'},350);
                var choosenColor= $(this).text();
                $("#colorPanel").html(choosenColor).css("background-color", choosenColor);
                    
                setTimeout(function() {
                    $("#colorPanel").animate({width:'toggle'},200);
                }, 3000);
        });
});