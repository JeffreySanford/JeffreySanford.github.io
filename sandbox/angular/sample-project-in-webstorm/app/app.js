'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
config(['$routeProvider', function($routeProvider) {

  $routeProvider
      .when('/view1', {
          templateUrl: 'app/view1/view1.html',
          controller: 'view1'
      })
      .otherwise({redirectTo: '/view1'});
}]);
