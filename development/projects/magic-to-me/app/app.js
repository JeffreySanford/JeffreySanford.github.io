/*
  Using AngularJS version: 1.2.21
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js"></script>

  Create the module and name it magicToMe
  also include ngRoute for all our routing needs
 */
var magicToMe = angular.module('magicToMe', ['ngRoute', 'ngAnimate', 'ngResource']);

// configure our routes
magicToMe.config(function($routeProvider) {
  $routeProvider
    // route for the landing index page
    .when('/', {
      templateUrl : 'app/templates/main.html',
      controller : 'mainCtrl'
    })
    // route for the Facebook page
    .when('/facebook', {
      templateUrl : 'app/templates/facebook.html',
      controller  : 'facebookCtrl'
    })
    // route for the Twitter page
    .when('/twitter', {
      templateUrl : 'app/templates/twitter.html',
      controller  : 'twitterCtrl'
    })
    // route for the Instagram page
    .when('/instagram', {
      templateUrl : 'app/templates/instagram.html',
      controller  : 'instagramCtrl'
    })
    .otherwise({redirectTo: '/'});
});

// create the controller and inject Angular's $scope
magicToMe.controller('mainCtrl', function($scope) {
  // create a message to display in our view
  $scope.heading = '#MagicToMe Campaign';
  $scope.message = 'This is the combination page.  (needs reworded)This section contains the information from the various social media sites about the #magicToMe campaign.  Post on your favorite social media site with the hashtag #MagicToMe and share your idea on what magic is created by coffee for you. (needs reworded)';
  $scope.pageClass = 'page-main';
});

magicToMe.controller('facebookCtrl', function($scope) {
  // create a message to display in our view
  $scope.heading = '#MagicToMe Campaign on Facebook';
  $scope.message = '(needs reworded)This section contains the information from the various social media sites about the #magicToMe campaign.  Post on your favorite social media site with the hashtag #MagicToMe and share your idea on what magic is created by coffee for you. (needs reworded)';
  $scope.pageClass = 'page-facebook';
});

magicToMe.controller('twitterCtrl', function($scope) {
  // create a message to display in our view
  $scope.heading = '#MagicToMe Campaign on Twitter';
  $scope.message = '(needs reworded)This section contains the information from the various social media sites about the #magicToMe campaign.  Post on your favorite social media site with the hashtag #MagicToMe and share your idea on what magic is created by coffee for you. (needs reworded)';
  $scope.pageClass = 'page-twitter';
  $scope.hashtag = 'magictome';
});

magicToMe.controller('instagramCtrl', function($scope) {
  // create a message to display in our view
  $scope.heading = '#MagicToMe Campaign on Instagram';
  $scope.message = '(needs reworded)This section contains the information from the various social media sites about the #magicToMe campaign.  Post on your favorite social media site with the hashtag #MagicToMe and share your idea on what magic is created by coffee for you. (needs reworded)';
  $scope.pageClass = 'page-instagram';
});
