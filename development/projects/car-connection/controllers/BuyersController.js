/*global angular:false, otherVar:true*/
(function () {
	"use strict";
	var carConn = angular.module('carConn');
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

    var user = new Array();
    var user[1] = "100 Main Street";
    $scope.user.city = "Atlanta";
    $scope.user.state = "Georgia";
    $scope.user.zipcode = "30221";
    $scope.user.emailAddr = "fsmith@gmail.com";
    $scope.user.name = "Fred Smith";
    
}());


/*

http://stackoverflow.com/questions/11181058/adding-a-row-to-json
To add another item in the array, you create an array and add to it, as it is an array of arrays:

people.DATA.push(["new", "99"]);

object.element.push({"json", "value"});

Creating the CRUD methods in Angular
http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
*/