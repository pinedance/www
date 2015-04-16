var myapp = angular.module('myapp', []);

//////////////////////////////////////////////////////

myapp.controller('MainCtrl', function ($scope) {
    
    $scope.phase = 0;
    
    $scope.showContent = function($file){
        $scope.file = $file;
        
        if( $scope.wordsets instanceof Array && $scope.file.content ){
            $scope.phase = 2;
        } else {
            $scope.phase = 1;
        }
    };

    $scope.saveFile = function(){
        $scope.phase = 4;
        return true;
    };
    
    function makeFileLink(content) {
    
        var blob = new Blob([content], { type:"text;charset=utf-8;" });
        return (window.URL || window.webkitURL).createObjectURL( blob );
    
	}; //http://stackoverflow.com/questions/16514509/how-do-you-serve-a-file-for-download-with-angularjs-or-javascript

    $scope.chageFilename = function(newFilename){
        $('#saveFile').attr('download', newFilename);
    }

    $scope.getMyWordsets = function(event){
       // if(event.keyCode){
            $scope.wordsets = eval( $scope.myWordsets ); 
            if( $scope.wordsets instanceof Array && ($scope.wordsets.length > 0) && ($scope.wordsets[0].length === 2) && $scope.file.content ){
                $scope.phase = 2;
            } else {
                $scope.phase = 1;
            }
       // }
    };
    
    $scope.convert = function(filename){
        
        var tmp = $scope.file.content;
        var arr = $scope.wordsets;

        for(var i=0, a; a=arr[i]; i++){
            tmp = tmp.gsub(a[0], a[1]);
        }
        $scope.converted_content = tmp;
        $scope.url = makeFileLink($scope.converted_content);
        
        $scope.phase = 3;
    }

    $scope.init = function(opt){
        if(opt==='wordsets'){
            delete $scope.myWordsets;delete $scope.wordsets;
            $scope.phase = $scope.file ? 1 : 0;
        } else {
            // init input file 
            $("input[type='file']").val(null);
            delete $scope.file;delete $scope.converted_content;
            $scope.phase = 0;
            
        }
    }
    
     $scope.msgs = [
            {
                glyphicon : "glyphicon glyphicon-open-file",
                message : 'Select text file'
            },
            {
                glyphicon : "glyphicon glyphicon-edit",
                message : 'Input word sets'
            },
            {
                glyphicon : "glyphicon glyphicon-retweet",
                message : 'Push button to replace'
            },
            {
                glyphicon : "glyphicon glyphicon-save-file",
                message : 'Push button to save file'
            },
            {
                glyphicon : "glyphicon glyphicon-check",
                message : 'Check output file, please'
            },
        ]
                        
});

/////////////////////////////////////////////////////////

myapp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
                
                var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
                
				var reader = new FileReader();
                
                reader.onload = function(onLoadEvent) {
                    
                    var myfile = {
                        content: onLoadEvent.target.result,
                        name: file.name,
                        size: file.size,
                        lastModifiedDate: file.lastModifiedDate
                    }
                    
					scope.$apply(function() {
						fn(scope, { $file: myfile });
					});
				};

				reader.readAsText( file );
                
			});
		}
	};
}); // https://veamospues.wordpress.com/2014/01/27/reading-files-with-angularjs/

/////////////////////////////////////////////////////////

myapp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]) // unsafe 문제 해결
//http://stackoverflow.com/questions/16514509/how-do-you-serve-a-file-for-download-with-angularjs-or-javascript