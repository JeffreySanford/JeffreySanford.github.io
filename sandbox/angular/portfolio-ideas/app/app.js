/*global angular */

(function () {
    'use strict';

    var portfolioModule = angular.module('portfolioModule', ['ngRoute', 'ngAnimate', 'ngResource']);

    // configure our routes
    portfolioModule.config(function ($routeProvider) {
        $routeProvider
        // route for the landing index page
            .when('/', {
                templateUrl: 'app/views/partials/home.html',
                controller: 'mainController'
            })
        // route for the designs pages
            .when('/design', {
                templateUrl: 'app/views/partials/designs.html',
                controller: 'designsController'
            })
            .when('/design/:design_type', {
                templateUrl: 'app/views/partials/design-types/design-type-page.html',
                controller: 'designTypeController'
            })
            /*  These don't work yet -- implimentation of a page for single site documentation */
            .when('/design/:design_type/:design_project', {
                templateUrl: 'app/views/partials/design-types/design-project.html',
                controller: 'designTypeController'
            })
        // route for the development pages
            .when('/development', {
                templateUrl: 'app/views/partials/development.html',
                controller: 'developmentController'
            })
            .when('/development/:development_type', {
                templateUrl: 'app/views/partials/development-types/development-type-page.html',
                controller: 'developmentTypeController'
            })
            /*  These don't work yet -- implimentation of a page for single site documentation */
            .when('/development/:development_type/:developement_project', {
                templateUrl: 'app/views/partials/development-types/development-project.html',
                controller: 'developmentTypeController'
            })
        // route for the confirm purchases page
            .when('/about', {
                templateUrl: 'app/views/partials/about.html',
                controller: 'aboutController'
            });
//            .otherwise({redirectTo: '/home'});
    });
    // create the controller and inject Angular's $scope
    portfolioModule.controller('mainController', function ($scope) {
        $scope.title = "Home";
    });
    // create the controller and inject Angular's $scope
    portfolioModule.controller('designsController', function ($scope, $timeout) {
        $scope.title = "Designs";
        $scope.designProjects = [];

        var xmlhttp = new XMLHttpRequest();
        var url = "../data/site-data.json";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                $timeout(function () {
                    $scope.designTypes = response.designTypes;
                }, 500, true);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    });
    portfolioModule.controller('designTypeController', function ($scope, $timeout, $routeParams) {
        $scope.title = "Design Type";

        var xmlhttp = new XMLHttpRequest();
        var url = "../data/site-data.json";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                $timeout(function () {
                    $scope.designProjects = response.designProjects;
                }, 500, true);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        $scope.params = $routeParams;
    });
    portfolioModule.controller('developmentController', function ($scope, $timeout) {
        $scope.title = "Development";

        var xmlhttp = new XMLHttpRequest();
        var url = "../data/site-data.json";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                $timeout(function () {
                    $scope.developmentTypes = response.developmentTypes;
                }, 500, true);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    });
    portfolioModule.controller('developmentTypeController', function ($scope, $timeout, $routeParams) {
        $scope.title = "Development Projects";

        var xmlhttp = new XMLHttpRequest();
        var url = "../data/site-data.json";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var response = JSON.parse(xmlhttp.responseText);
                $timeout(function () {
                    $scope.developmentProjects = response.developmentProjects;
                }, 500, true);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        $scope.params = $routeParams;
    });
    portfolioModule.controller('aboutController', function ($scope) {
        $scope.title = "About";
    });
}());