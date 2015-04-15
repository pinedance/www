var myapp = angular.module('myapp', []);

//////////////////////////////////////////////////////

myapp.controller('MainCtrl', function ($scope) {
    
    $scope.phase = 1;
    
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        $scope.phase = 2;
    };

    $scope.saveFile = function(){
        $scope.phase = 5;
        return true;
    };
    
    function makeFileLink(content) {
    
        var blob = new Blob([content], { type:"text;charset=utf-8;" });
        return (window.URL || window.webkitURL).createObjectURL( blob );
    
	}; //http://stackoverflow.com/questions/16514509/how-do-you-serve-a-file-for-download-with-angularjs-or-javascript

    

    $scope.getMyWordsets = function(event){
        if(event.keyCode === 17 || event.keyCode === 13){
            $scope.wordsets = eval( $scope.myWordsets ); 
            $scope.phase = 3;
        }
    };
    
    $scope.convert = function(filename){
        
        var tmp = $scope.content;
        var arr = $scope.wordsets;

        for(var i=0, a; a=arr[i]; i++){
            tmp = tmp.gsub(a[0], a[1]);
        }
        $scope.converted_content = tmp;
        $scope.url = makeFileLink($scope.converted_content);
        
        $scope.phase = 4;
    }

    $scope.init = function(opt){
        if(opt==='wordsets'){
            delete $scope.myWordsets;delete $scope.wordsets;
            $scope.phase = 2;
        } else {
            $scope.phase = 1;
            $('.file-input-name').remove();
            delete $scope.content;delete $scope.converted_content;
        }
    }
    
    
});

/////////////////////////////////////////////////////////

myapp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
                
				var reader = new FileReader();
                reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
}); // https://veamospues.wordpress.com/2014/01/27/reading-files-with-angularjs/

/////////////////////////////////////////////////////////

myapp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}])