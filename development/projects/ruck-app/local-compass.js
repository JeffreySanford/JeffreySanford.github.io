(function () {
  // Hide compass for desktop users (without compass, GPS and accelerometers):

  function compassHeading(alpha, beta, gamma) {

    // Convert degrees to radians
    var alphaRad = alpha * (Math.PI / 180);
    var betaRad = beta * (Math.PI / 180);
    var gammaRad = gamma * (Math.PI / 180);

    // Calculate equation components
    var cA = Math.cos(alphaRad);
    var sA = Math.sin(alphaRad);
    var cB = Math.cos(betaRad);
    var sB = Math.sin(betaRad);
    var cG = Math.cos(gammaRad);
    var sG = Math.sin(gammaRad);

    // Calculate A, B, C rotation components
    var rA = - cA * sG - sA * sB * cG;
    var rB = - sA * sG + cA * sB * cG;
    var rC = - cB * cG;

    // Calculate compass heading
    var compassHeading = Math.atan(rA / rB);

    // Convert from half unit circle to whole unit circle
    if(rB < 0) {
      compassHeading += Math.PI;
    }else if(rA < 0) {
      compassHeading += 2 * Math.PI;
    }

    // Convert radians to degrees
    compassHeading *= 180 / Math.PI;

    return compassHeading;

  }
  window.addEventListener('deviceorientation', function(evt) {

    var heading = null;

    if(evt.absolute === true && evt.alpha !== null) {
      heading = compassHeading(evt.alpha, evt.beta, evt.gamma);
      console.log(heading);
    }

    // Do something with 'heading'...

  }, false);

  Compass.noSupport(function () {
    $('.compass').hide();
  });

  // Show instructions for Android users:

  Compass.needGPS(function () {
    $('.go-outside-message').show();          // Step 1: we need GPS signal
    }).needMove(function () {
    $('.go-outside-message').hide()
    $('.move-and-hold-ahead-message').show(); // Step 2: user must go forward
    }).init(function () {
  $('.move-and-hold-ahead-message').hide(); // GPS hack is enabled
  });

  //Add compass heading listener:

  Compass.watch(function (heading) {
    $('.degrees').text(heading);
    $('.compass').css('transform', 'rotate(' + (-heading) + 'deg)');
  });
}());
