var app = angular.module('showMD', ['ngRoute', 'ngSanitize']);
    
app.controller('mainCtrl', ['$scope', 'mdParser', function($scope, mdParser) {
    
    $scope.file = {}
    $scope.init = {}
    
    // load sidebar
    mdParser.mdSetOpt();
    mdParser.mdRender("sidebar.md", function(data){ // callback due to async
        $scope.file.markdown = data;
        $scope.file.html = marked(data);
    });

//    $scope.$on('$viewContentLoaded', function() {
//    });
    
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
    
    $scope.hideExamples = function(){
        var examples = angular.element("pre code");
        if(!$scope.init.example){ toogle(examples); $scope.init.example=true };
        
        if($scope.init.toggled){
            examples.slideDown();
            examples.parent().children('span').removeClass('collapsed');
        } else {
            examples.slideUp();
            examples.parent().children('span').addClass('collapsed');
        }
            $scope.init.toggled = !$scope.init.toggled;
    }

    function toogle(examples){
        
        examples.parent()
        .prepend("<span class='glyphicon glyphicon-resize-full' aria-hidden='true'></span><br/>")
        .children('span')
        .on('click', function(e) {

            var $currentTarget = angular.element(e.currentTarget);

            if ($currentTarget.hasClass('collapsed')) {
                $currentTarget.parent().children('code').slideDown(); 
            } else {
                $currentTarget.parent().children('code').slideUp();
            }
            $currentTarget.toggleClass('collapsed');
        });
        
    /* old code
        examples.hide();
        var count = examples.length;
        for(var i=0; i<count; i++){
            var idValue = "ex" + i;
            var pointer = "code:eq(" + i + ")";
            var target = angular.element(pointer);
            target.attr('id', idValue);
            target.parent().prepend("<a href=#" + idValue + ">◀ example ▶</a><br/>");
        }

        angular.element('pre a').on('click', function(){
            var myHref = angular.element(this).attr('href');
            angular.element(myHref).toggle();
            return false;
        }) // ref: http://naradesign.net/wp/2011/06/18/1536/
    */
        
    }
    
}]);

app.controller('mdCtrl', ['$scope', '$routeParams', 'mdParser', function($scope, $routeParams, mdParser) {
    
    var defaultFolder = 'archive/';
    $scope.file = {};
    
    $scope.file.name = ( $routeParams.url )? $routeParams.url : defaultFolder.concat($routeParams.docName).concat('.md');
    // intro?url=[markdown file URL주소]
    console.log($scope.file.name)
    
    // load page
    mdParser.mdSetOpt();
    mdParser.mdRender($scope.file.name, function(data){ // callback due to async
        data = data || "# 잘못된 주소입니다.\n\n해당 문서가 없습니다.\n\n주소를 확인하세요."
        $scope.file.markdown = data;
        $scope.file.html = marked(data);
    });
    
}]);
    
app.factory('mdParser', ['$http', function($http) {

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
            console.log(fileName) /////
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

}]);
    
app.config(['$routeProvider',
            
    function($routeProvider){
        $routeProvider.
            when('/', {
                redirectTo: '/intro'
            }).
            when('/:docName', {
                templateUrl: 'template/mdDoc.html',
                controller: 'mdCtrl'
            }).
            otherwise({
                redirectTo: '/error'        
            });
        
}]);

