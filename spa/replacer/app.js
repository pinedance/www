var myapp = angular.module('myapp', []);

myapp.controller('MainCtrl', function ($scope) {
    
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
    
    $scope.getMyWordsets = function(event){
        if(event.keyCode === 17 || event.keyCode === 13){
            $scope.wordsets = eval( $scope.myWordsets ); 
            console.log( $scope.wordsets.length )
        }
    }
    
    $scope.convert = function(){
        
        var tmp = $scope.content;
        var arr = $scope.wordsets;
        
        for(var i in arr){
            tmp = tmp.gsub(arr[i][0], arr[i][1])
        }
        $scope.converted_content = tmp;
    }

    $scope.saveFile = function () {
			var blob = new Blob([$scope.converted_content], { type:"text;charset=utf-8;" });			
			var downloadLink = angular.element('<a></a>');
                 downloadLink.attr('href', window.URL.createObjectURL(blob));
                 downloadLink.attr('download', 'result.txt');
                 downloadLink[0].click();
	}; //http://stackoverflow.com/questions/16514509/how-do-you-serve-a-file-for-download-with-angularjs-or-javascript
    
});

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