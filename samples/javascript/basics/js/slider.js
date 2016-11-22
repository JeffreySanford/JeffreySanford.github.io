// Image Box Slider

function changeImage() {
  	var img = document.getElementById("mainImage");
	var images = [];
	images[0] = "img/htmlCssJs.png";
	images[1] = "img/javascriptCode.jpg";
	images[2] = "img/javascriptWordCloud.jpg";
	images[3] = "img/javascriptWordCloud.jpg";
	images[4] = "img/keepCalmAndLearnJavaScript.jpg";
	img.src = images[x];
    x++;

    if(x >= images.length){
        x = 0;
    } 

    fadeImg(img, 5000, true);
    setTimeout("changeImage()", 5000);
}

function fadeImg(el, val, fade){
    if(fade === true){
        val--;
    }else{
        val ++;
    }

    if(val > 0 && val < 100){
        el.style.opacity = val / 100;
        setTimeout(function(){
        	fadeImg(el, val, fade);
        }, 5000);
    }
}
