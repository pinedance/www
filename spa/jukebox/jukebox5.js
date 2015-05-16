(function(global, factory){   

console.log(global)

var app = angular.module('myApp', ["firebase"]);

app.controller('MainCtrl', ["$scope", "$firebase", function ($scope, $firebase) {

    var ref = new Firebase("https://brilliant-torch-7744.firebaseio.com/"); 
    var mainObj = $firebase(ref).$asObject();

    mainObj.$bindTo($scope, "data").then(function() {
        //setPlayLists();
        // $scope.pplaylist = $scope.playlists[0]; 
        //setSongs();
    });
    console.log(global.youtube)
    $scope.youtube = global.youtube
    console.log($scope.youtube);
}]); //MainCtrl

app.directive('youtube', function(){
    return {
        district: 'E',
        template: '<iframe id="myplayer" src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1" type="text/html" width="320" height="185" frameborder="0"></iframe>',
        link: function(element, scope, attr){

            }
        
        }
}); // directive
    
}(window)); //js