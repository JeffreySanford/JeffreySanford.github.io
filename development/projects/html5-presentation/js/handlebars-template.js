$.getJSON("data/pageinformation.json", function(json) {
    var pageInformation = json;
    
    var videoTemplate = Handlebars.compile( $("#handlebars-video-wrapper").html());
    var videoSource = videoTemplate(pageInformation);
    $('#video-wrapper').append(videoSource);

    var backgroundTemplate = Handlebars.compile( $("#handlebars-background-wrapper").html());
    var backgroundSource = backgroundTemplate(pageInformation);
    $('#mainpage-container').append(backgroundSource);

    var mainPageContentWrapper = Handlebars.compile( $("#mainpage-content-wrapper").html());
    var mainPageSource = mainPageContentWrapper(pageInformation);
    $('#mainpage-container').append(mainPageSource);

    var audioTemplate = Handlebars.compile( $("#handlebars-audio-wrapper").html());
    var audioSource = audioTemplate(pageInformation);
    $('#audio-wrapper').append(audioSource);



    var modalContentWrapper = Handlebars.compile( $("#modal-content-wrapper").html());
    var modalSource = modalContentWrapper(pageInformation);
    $('#modal-container').append(modalSource);

});
