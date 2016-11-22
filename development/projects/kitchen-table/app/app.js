var adsense = angular.module('adsense', [
  'ngRoute',
  'adsenseControllers'
]);

adsense.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController'
      }).
      when('/food', {
        templateUrl: 'app/views/food.html',
        controller: 'FoodController'
      }).
      when('/food/:foodId', {
        templateUrl: 'app/views/food-detail.html',
        controller: 'FoodDetailController'
      }).
      when('/recipes', {
        templateUrl: 'app/views/recipes.html',
        controller: 'RecipesController'
      }).
      when('/recipes/:recipesId', {
        templateUrl: 'app/views/recipes-detail.html',
        controller: 'RecipesDetailController'
      }).
      when('/people', {
        templateUrl: 'app/views/people.html',
        controller: 'PeopleController'
      }).
      when('/people/:peopleID', {
        templateUrl: 'app/views/people-detail.html',
        controller: 'PeopleDetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
