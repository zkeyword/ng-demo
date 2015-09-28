define(function(require){
	
	require('app').controller('ContactViewController', [
        '$scope',
		'$http',
		'dateService',
		
        function(
			$scope,
			$http,
			dateService
		){
			console.log('IN: second-controller');
			$scope.hello = 'Hello World from second-controller';
			if(!dateService.getNow()) {
				dateService.setNow();
			}
			$scope.myDate = dateService.getNow();
			$scope.myOtherDate = dateService.getTimeFromNow(
				dateService.minutes(5)
			);
			
			var url  = "data/data.json",
				url2 = "data/data2.json"
			
			$scope.isShow = true;
			
			$http.get(url).success( function(response) {
				$scope.students = response;
			});
			
			$scope.getStudents = function(){
				$http.get(url2).success( function(response) {
					$scope.students = response;
				});
			}

			$scope.pageClass = 'page-about';
        }
    ]);
});