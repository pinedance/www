var app = angular.module('auth', ['ngRoute']);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
    
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.auth = function(myput){
        alert(myput)
        
        var data = {
            serial: myput
        }
        
        $http.post('myapibox.herokuapp.com/auth', data ).
          success(function(data, status, headers, config) {
            console.log(data)

          }).
          error(function(data, status, headers, config) {
            console.log(data)

          });
        
    }

}]);