var adsenseControllers = angular.module('adsenseControllers', []);

adsenseControllers.controller('MainController', ['$scope', '$http', function ($scope, $http){
  $http.get('data/mainData.json').success(function(data) {
    $scope.mainData = data;
  });
  $scope.title ='Main Page Title';
  $scope.page = 'This is the Main Page';
  $scope.description = 'This is a description of the Main Page';
}]);

adsenseControllers.controller('PeopleController', ['$scope', '$http', function ($scope, $http){
  $http.get('data/peopleData.json').success(function(data) {
    $scope.peopleData = data;
  });
  $scope.title ='People Page Title';
  $scope.page = 'This is the People Page';
  $scope.description = 'This is a description of the People Page';
}]);

adsenseControllers.controller('PeopleDetailController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.PeopleId = $routeParams.PeopleId;
  }]);

adsenseControllers.controller('FoodController', ['$scope', '$http', function ($scope, $http){
  $http.get('data/foodData.json').success(function(data) {
    $scope.foodData = data;
  });
  $scope.title ='Food Page Title';
  $scope.page = 'This is the Food Page';
  $scope.dsescription = 'This is a description of the Food Page';
}]);

adsenseControllers.controller('FoodDetailController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.FoodId = $routeParams.FoodId;
  }]);

adsenseControllers.controller('RecipesController', ['$scope', '$http', function ($scope, $http){
  $http.get('data/recipesData.json').success(function(data) {
    $scope.json = data;
    /*console.log('Recipes' + data);*/
  });

  $scope.title ='Recipes Page Title';
  $scope.page = 'This is the Recipes Page';
  $scope.description = 'This is a description of the Recipes Page';
  $scope.noimageavailable = 'articles/images/noimageavailable.png';

}]);

adsenseControllers.controller('RecipesDetailController',
  function ($scope, $routeParams, $http) {
    $http.get('data/recipesData.json').success(function(data) {
/* console.log('Data from the recipesData.json file:' + data); */
/*console.log('The entire recipe collection is called recipes:' + recipes);*/
      for(var i = 0; i < data.recipes.length; i++) {
/* console.log('Match the id from the currently select recipe id against the
routeParams:' + data.recipes[i].id, $routeParams.recipesId); */
        if(data.recipes[i].id === $routeParams.recipesId) {
          $scope.recipe = data.recipes[i];
          $scope.title ='Recipe Details Page Title';
          $scope.page = 'The is the Recipe Detail Page';
          $scope.description = 'This is a description of the Recipe Detail Page';
          $scope.concatURL = 'articles/recipes/' + data.recipes[i].url;
          console.log($scope.concatURL);
          return $scope.recipe;
        }
      }
    });
  });
