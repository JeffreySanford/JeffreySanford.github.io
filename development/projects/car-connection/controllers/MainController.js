(function () {
    "use strict";
    function MainController($scope, $http) {
        $http.get("js/json/owners.json")
            .success(function (responce) {
                $scope.owners = responce;
            })
            .error(function (responce, status, headers, config) {
                $scope.errorMessage = "Couldn't load the list of Buyers.json, error # " + status;
            });
    }
}());
    /* Reference: 
                    Used in:
                                find.html
                                about.html
                    ng-controller="mainController" 
    */