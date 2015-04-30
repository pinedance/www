(function(){
    
	var app = angular.module('gofangApp', ['firebase', 'ngTagsInput']);
	app.controller('FormulaCtrl', ['$scope', '$http', '$q', '$firebase', function($scope, $http, $q, $firebase) {
			
		////copyright
		$scope.copyrightYear = function(){
			var thisYear = new Date().getFullYear();
			var startYear = 2015;
			if (thisYear > startYear) { 
				return(startYear + '-' + thisYear);
			} else {
				return(thisYear);
			}
		}
		
		//// firebase
		var ref = new Firebase("https://gofangapp.firebaseio.com/");
		var sync = $firebase(ref);
		var data = sync.$asObject();
	
		$scope.loadItems = function(query) {
			var deferred = $q.defer();
			var filtered = Object.keys(data.herbs).filter(function(s) { return s.indexOf(query) > -1; });
			deferred.resolve( filtered.map(function(item){ return { "herb": item } }) );
			return deferred.promise;
		};  ///solution : http://stackoverflow.com/questions/23069562/autocomplete-using-ngtagsinput-cannot-read-property-then-of-undefined
		
		$scope.find = function(){
			var tmp_in = $scope.inHerbs.map(function(item) { return item.herb });
			var tmp_out = $scope.outHerbs.map(function(item) { return item.herb });
			
			if ((tmp_in.length + tmp_out.length)==0){
				$scope.results = [];
			} else {
				var handler = Object.keys(data.formulas);
			
				for(var i=0; i < tmp_in.length ; i++){ 
					if(data.herbs[tmp_in[i]]){
						handler = handler.intersection( data.herbs[tmp_in[i]].link );
					} else {
						continue;
					}
				};
				for(var j=0; j < tmp_out.length ; j++){
					if(data.herbs[tmp_out[j]]){
						handler = handler.diff( data.herbs[tmp_out[j]].link );
					} else {
						continue;
					}
				};

				$scope.results = handler;
			}
		}

		$scope.showDetail = function(formula){ 
			$scope.detail = data.formulas[formula];
			$scope.herbdetails = Object.keys(data.formulas[formula].ing);
			$scope.yack = "약징 내용";
		}
		
		$scope.showHerbDetail = function(h){
			$scope.yack = data.herbs[h].txYG;
		}
		
		$scope.resetForms = function(){
			$scope.inHerbs = [];
			$scope.outHerbs = [];
			$scope.results = [];
			$scope.detail = false;
		}
		
		
		
	}]);
})();