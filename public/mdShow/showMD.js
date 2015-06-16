angular.module('showMD', ['ngRoute', 'ngSanitize', 'ng-marked'])

.controller('showMdCtrl', ['$scope', 'mdParser', 'marked', function($scope, mdParser, marked) {
    
    $scope.file = {}
    $scope.init = {}
    
    // load sidebar
    mdParser.mdSetOpt();
    mdParser.mdRender("archive/sidebar.md", function(data){ // callback due to async
        $scope.file.markdown = data;
        $scope.file.html = marked(data);
    });

    $scope.showTitles = function(){
        var title = angular.element('h2, h3, h4, h5, h6')
        if(!$scope.init.slide){ slide(title) ; $scope.init.slide=true}

        if ($scope.init.contentsCollapsed) {
            title.nextUntil( 'h2, h3, h4, h5, h6' ).slideDown();
            title.removeClass('collapsed');
        } else {
            title.nextUntil( 'h2, h3, h4, h5, h6' ).slideUp();
            title.addClass('collapsed');
        }
        $scope.init.contentsCollapsed = !$scope.init.contentsCollapsed;
    }

    function slide(title){
        title.on('click', function(e) {
        // ignore links inside headers
        if ( angular.element(e.target).is('a') ) {
            return;
        }
        var $currentTarget = angular.element(e.currentTarget);
        var $currentTarget = angular.element(e.currentTarget);

        if ($currentTarget.hasClass('collapsed')) {
            $currentTarget.nextUntil( 'h2, h3, h4, h5, h6' ).slideDown();
        } else {
            $currentTarget.nextUntil( 'h2, h3, h4, h5, h6' ).slideUp();
        }
        $currentTarget.toggleClass('collapsed');
        });
    }
    
}])

.controller('mdCtrl', ['$scope', '$routeParams', '$timeout', 'mdParser', 'marked', function($scope, $routeParams, $timeout, mdParser, marked) {
    
    var defaultFolder = 'archive/';
    $scope.file = {};
    
    $scope.file.name = ( $routeParams.url )? $routeParams.url : defaultFolder.concat($routeParams.docName).concat('.md');
    // intro?url=[markdown file URL주소]

    // load page
    mdParser.mdSetOpt();
    mdParser.mdRender($scope.file.name, function(data){ // callback due to async
        data = data || "# 잘못된 주소입니다.\n\n해당 문서가 없습니다.\n\n주소를 확인하세요."
        $scope.file.markdown = data;
        $scope.file.html = marked(data);
    });
    
    function addHead(){
        angular.element('h1').prepend("<i class='fa fa-diamond'></i>  ");
        angular.element('h2').prepend("<i class='fa fa-cube'></i>  ");
        angular.element('h3').prepend("<i class='fa fa-cubes'></i>  ");
        angular.element('h4').prepend("<i class='fa fa-caret-square-o-right'></i>  ");
        angular.element('h5').prepend("<i class='fa fa-check-square'></i>  ");

    }
    
    $scope.$on('$routeChangeSuccess', function(event, next, current){
        $timeout(function () {
            addHead();
        }, 300);
    })
    
}])
    
.factory('mdParser', ['$http', 'marked', function($http, marked) {

    // marked() : from marked.js
    var option = {
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
    };
    
    function mdSetOpt(opt){
        marked.setOptions(opt || option);
        console.log('marked is setted!')
    }

    function mdRender(fileName, callback){ $http.get(fileName).
        success(function(data, status, headers, config) {
            callback(data)
        }).
        error(function(data, status, headers, config) {
            console.log ('$http.get failed :' + fileName);
            callback(false);
        });
    };

    return {
        mdSetOpt: mdSetOpt,
        mdRender: mdRender,
    }

}])
    
.config(['$routeProvider',
            
    function($routeProvider){
        $routeProvider.
            when('/', {
                redirectTo: '/intro'
            }).
            when('/:docName', {
                templateUrl: 'public/mdShow/mdDoc.html',
                controller: 'mdCtrl'
            }).
            otherwise({
                redirectTo: '/error'        
            });
        
}]);

