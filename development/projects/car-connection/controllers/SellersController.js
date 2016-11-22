(function () {
    "use strict";
    alert("Resources Controller Loaded");
    function RsourcesController($scope, $http) {
        $http.get("js/json/owners.json")
            .success(function (responce) {
                $scope.owners = responce;
            });
    }
}());