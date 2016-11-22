$(document).ready(function(){
  /*  Fade function for displaying the content box - slider
      Different functions exist at:
      http://kenwheeler.github.io/slick/
  */
  $('.fade').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
  autoplaySpeed: 2000
  });
});
