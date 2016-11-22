/*global angular, window */

(function () {
    'use strict';

    var portfolioModule = angular.module('portfolioModule', ['ngRoute', 'ngAnimate', 'ngResource']);

    // configure our routes
    portfolioModule.config(function ($routeProvider) {
        $routeProvider
            // route for the landing index page
            .when('/home', {
                templateUrl: 'app/views/partials/home.html',
                controller: 'homeController'
            })
            // route for the art pages
            .when('/art', {
                templateUrl: 'app/views/partials/art.html',
                controller: 'artController'
            })
            .when('/art/:catagory', {
                templateUrl: 'app/views/partials/art.html',
                controller: 'artController'
            })
            // route for the about pages
            .when('/about', {
                templateUrl: 'app/views/partials/about.html',
                controller: 'aboutController'
            })
            .otherwise({redirectTo: '/home'});
    });

    portfolioModule.controller('homeController', function ($scope) {
        $scope.title = "Home";
        $scope.content = ['This is the home content.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam accusantium eveniet dolores temporibus, ullam praesentium id iure. Voluptatibus voluptatum possimus magnam ducimus distinctio cupiditate quos repudiandae ipsam aliquam, deserunt culpa?', 'Soluta ratione velit cupiditate sequi deleniti, nisi impedit nihil ab, nesciunt enim perferendis id mollitia laudantium voluptate minus vero aliquid ipsam. Voluptatibus amet hic quod, totam perferendis explicabo? Inventore, architecto.', 'Accusantium reprehenderit fugiat dignissimos officia optio perferendis, iure, veritatis ad labore dolore amet quas adipisci deserunt illo. Laudantium ab obcaecati perspiciatis voluptatem nesciunt, quam sed atque est odio quo aspernatur.'];
    });

    portfolioModule.controller('artController', function ($scope, $routeParams) {
        var xmlhttp = new XMLHttpRequest();
        var url = "data/artwork.json";

        $scope.title = "Designs";
        $scope.params = $routeParams;

        xmlhttp.onreadystatechange = function () {
            var posInSet;

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log("rest event success");
                console.dir(xmlhttp.responseText);

                var art = JSON.parse(xmlhttp.responseText);
                var catagory = art.catagory;
                var innerWidth = window.innerWidth;


                if (innerWidth >= 1281) {

                    console.log("desktop view");
                    console.log("window width is " + innerWidth);
                    console.dir(catagory);

                    posInSet = 6;
                    $scope.thumbOne = catagory[0].image;
                    $scope.thumbTwo = catagory[1].image;
                    $scope.thumbThree = catagory[2].image;
                    $scope.thumbFour = catagory[3].image;
                    $scope.thumbFive = catagory[4].image;
                    $scope.thumbSix = catagory[5].image;

                    var item = 0;
                    window.setInterval(function () {
                        var lastThumb, currentThumb;

                        if (item === 6) {
                            item = 1;
                            console.log(item);
                        } else {
                            item = item + 1;
                            console.log(item);
                        }

                        if (item !== 1) {
                            lastThumb = "thumbnail" + (item - 1);
                        } else {
                            lastThumb = "thumbnail6";
                        }

                        currentThumb = "thumbnail" + (item);

                        var last = document.getElementById(lastThumb);
                        var current = document.getElementById(currentThumb);

                        $(last).removeClass('highlightThumb');
                        $(current).toggleClass('highlightThumb');

                        /* replace the main image */

                        var mainImage = document.getElementById("main-image");
                        var mainImageTitle = document.getElementById("main-image-title");
                        var mainImageSub = document.getElementById("main-image-sub");

                        mainImage.src = catagory[item - 1].image;
                        mainImageTitle.innerHTML = catagory[item - 1].title;
                        mainImageSub.innerHTML = catagory[item - 1].teaser;

                    }, 3000);

                } else if (innerWidth < 1281 && innerWidth > 769) {

                    console.log("tablet view");
                    console.log(innerWidth);
                    posInSet = 6;

                    $scope.thumbOne = catagory[0].image;
                    $scope.thumbTwo = catagory[1].image;
                    $scope.thumbThree = catagory[2].image;
                    $scope.thumbFour = catagory[3].image;
                    $scope.thumbFive = catagory[4].image;
                    $scope.thumbSix = catagory[5].image;

                    var item = 0;
                    window.setInterval(function () {
                        var lastThumb, currentThumb;

                        if (item === 6) {
                            item = 1;
                            console.log(item);
                        } else {
                            item = item + 1;
                            console.log(item);
                        }

                        if (item !== 1) {
                            lastThumb = "thumbnail" + (item - 1);
                        } else {
                            lastThumb = "thumbnail6";
                        }

                        currentThumb = "thumbnail" + (item);

                        var last = document.getElementById(lastThumb);
                        var current = document.getElementById(currentThumb);

                        $(last).removeClass('highlightThumb');
                        $(current).toggleClass('highlightThumb');

                        /* replace the main image */

                        var mainImage = document.getElementById("main-image");
                        var mainImageTitle = document.getElementById("main-image-title");
                        var mainImageSub = document.getElementById("main-image-sub");

                        mainImage.src = catagory[item - 1].image;
                        mainImageTitle.innerHTML = catagory[item - 1].title;
                        mainImageSub.innerHTML = catagory[item - 1].teaser;

                    }, 3000);

                } else if (innerWidth <= 768) {

                    console.log("mobile view");
                    console.log(innerWidth);
                    posInSet = 4;

                    $scope.thumbOne = catagory[0].image;
                    $scope.thumbTwo = catagory[1].image;
                    $scope.thumbThree = catagory[2].image;
                    $scope.thumbFour = catagory[3].image;
                    
                    var item = 0;
                    window.setInterval(function () {
                        var lastThumb, currentThumb;

                        if (item === 4) {
                            item = 1;
                            console.log(item);
                        } else {
                            item = item + 1;
                            console.log(item);
                        }

                        if (item !== 1) {
                            lastThumb = "mobile-thumbnail" + (item - 1);
                        } else {
                            lastThumb = "mobile-thumbnail4";
                        }

                        currentThumb = "thumbnail" + (item);

                        var last = document.getElementById(lastThumb);
                        var current = document.getElementById(currentThumb);

                        $(last).removeClass('highlightThumb');
                        $(current).toggleClass('highlightThumb');

                        /* replace the main image */

                        var mainImage = document.getElementById("mobile-main-image");
                        var mainImageTitle = document.getElementById("mobile-main-image-title");
                        var mainImageSub = document.getElementById("mobile-main-image-sub");

                        mainImage.src = catagory[item - 1].image;
                        mainImageTitle.innerHTML = catagory[item - 1].title;
                        mainImageSub.innerHTML = catagory[item - 1].teaser;

                    }, 3000);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();


    });

    portfolioModule.controller('aboutController', function ($scope) {
        $scope.title = "About";
        $scope.content = ['B.S. Native Girl (Brenda Smith) is a member of the Port Gamble S’Klallam tribe. Born in 1974, she was raised by her mother Juanita Roberts, Colville member. Her father Phil Finton non-tribal. Though he has the touch of being artistic and teaching his daughters.', 'Brenda enjoyed painting classes with her father as a young girl. Around the age of 17 her father taught her how to chainsaw carve, she loved to carve bears, benches, and tried a few eagles as well. After a time, Brenda steered her art passion towards tribal art. She began to google artists, learning as much as she could from the internet. She would gaze into photos of masterpieces and study the cuts, shapes, read meanings. Take in as much as she could.', 'Brenda decided to enroll as a full-time student at Northwest Indian College (NWIC) while working full time at a local casino. Brenda furthered her education in Tribal Probation, Casino Management along with taking weaving, tool-making, and carving classes. She used those skills to start making many more art pieces. Brenda gifted many of her art pieces for celebrations, birthdays any holiday. Brenda was always one to make something special for that special someone. Her art seemed to catch the eye of many sold mostly through word of mouth and friends of friends, then came the internet. She seemed to have done very well in the last few years making over 1000 new pieces in a year, with most finding new homes.', 'Approximately 2005 Brenda was commissioned for a 15’ totem pole. After she submitted her design and was chosen by the Port Gamble Tribes committee, Brenda was eager to start and complete her very first commissioned totem pole. Months of carving, putting her heart and soul into every detail the Totem pole was completed and delivered. Unfortunately, the totem was never raised and while being stored it was damaged. Years later Brenda was commissioned to repair the original totem. After bringing the totem to her workshop, Brenda quickly realized the damage was going to cause her to change the whole design, from the rotten wood, to the deep cracks and broken off pieces. Heartbroken, Brenda took the totem from her last art piece to what looked as a new log. Brenda came up with a new design that seemed to fit perfectly with the story that would be told at the ceremony when risen. The restored/designed totem was completed 2015, it is being stored on the reservation at Brenda’s workshop until the tribe decides when they are going to have the raising of the totem ceremony.'];
    });
}());
