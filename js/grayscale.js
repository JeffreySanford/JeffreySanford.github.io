/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
 
//  preload the images if already cache to improve page performance.
// Example:  $('<img src="img/1.jpg"/>');
$('<img src="img/downloads-bg.jpg"/>');
$('<img src="img/intro-bg.jpg"/>');

//  For use preloading when the page has not been cached.  Comments to the console for
//  functionality. 

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
        console.log ('img preloaded')
    });
}

// Usage:

$(['img/downloads-bg.jpg','img/intro-bg.jpg']).preload();

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//  onHover highlight the border of the selected item
$(".portfolio-link").children('img').hover(function() {
  $(this).css("border","2px solid #219ab3");
  $(this).css("border-radius", "200px")
  },function() {
  $(this).css("border","0");
});

//  When the projects are mouseovered, the description 
//  of the project will be displayed.
//After the DOM is loaded ---

$(function() {
  $(".project-box").hover(function () {
    $(this).css("height","200px");
    $(this).children('.project-description').css("display","block");
  },
  function () {
    $(this).css("height","70px");
    $(this).children('.project-description').css("display","none");
  });
});