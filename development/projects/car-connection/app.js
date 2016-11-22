/*global angular:false, otherVar:true*/
(function () {
	"use strict";
	var carConn = angular.module('carConn', ['ngRoute', 'ngAnimate', 'ngResource']).
    value('name', 'fred smith');

	carConn.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
            /*  Landing page */
				controller: 'MainController',
				templateUrl: 'views/partials/mainView.html',
            })
            .when('/find', {
            /*  ADMIN:  Will list all the resource members */
                controller: 'MainController',
                templateUrl: 'views/partials/find.html'
            })
            .when('/buyers', {
            /*  ADMIN:  Used as a main page for the buyers */
                controller: 'BuyersController',
                templateUrl: 'views/partials/buyers.html'
            })
            .when('/buyer', {
            /*  USER:  Used as a main page for the individual buyer */
                controller: 'BuyersController',
                templateUrl: 'views/partials/buyer.html'
            })
            .when('/buyer/:buyerID', {
            /*  USER:  Used as a main page for the individual buyer */
                controller: 'BuyersController',
                templateUrl: 'views/partials/buyer.html'
            })
            .when('/sellers', {
            /*  ADMIN: Used for the sellers main page */
                controller: 'SellersController',
                templateUrl: 'views/partials/sellers.html'
            })
            .when('/sellers/:sellerID', {
            /*  USER:  Used as a main page for the individual seller */
                controller: 'SellersController',
                templateUrl: 'views/partials/seller.html'
            })
            .when('/about', {
            /*  Will list all the resource members */
                controller: 'MainController',
                templateUrl: 'views/partials/about.html'
            })
			.otherwise({redirectTo: '/admin' });
            /*  Redirect all other queries to the admin section */
    });

    carConn.controller('MainController', function MainController($scope, $http) {
        $http.get("js/json/owners.json")
            .success(function (responce) {
                $scope.owners = responce;
            });
        });

    carConn.controller('BuyersController', function BuyersController($scope, $http) {
        $http.get("js/json/buyers.json")
            .success(function (responce) {
                $scope.buyers = responce;
            });
        $http.get("js/json/owners.json")
            .success(function (responce) {
                $scope.owners = responce;
            });
        });

    carConn.controller('SellersController', function BuyersController($scope, $http) {
        $http.get("js/json/sellers.json")
            .success(function (responce) {
                $scope.owners = responce;
            });
        });
}());


/* Notes:

angular.module('myModule', []).
  value('a', 123).
  factory('a', function() { return 123; }).
  directive('directiveName', ...).
  filter('filterName', ...);

// is same as

angular.module('myModule', []).
  config(function($provide, $compileProvider, $filterProvider) {
    $provide.value('a', 123);
    $provide.factory('a', function() { return 123; });
    $compileProvider.directive('directiveName', ...);
    $filterProvider.register('filterName', ...);
  });

  */
