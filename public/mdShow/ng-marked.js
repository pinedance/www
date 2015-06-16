angular.module('ng-marked', [])
.factory('marked', function($window){
    return $window.marked
})