define(function(require){
	
	require('app').controller('HomeViewController', [
        '$scope',
		'dateService',
		
        function(
			$scope,
			dateService
		){
			console.log('IN: Controller first-controller');
			$scope.hello = '<span>Hello World from first-controller</span><script type="text/javascript">alert("xxx")</script>';
			if(!dateService.getNow()) {
				dateService.setNow();
			}
			$scope.myDate = dateService.getNow();
			$scope.myOtherDate = dateService.getTimeFromNow(
				dateService.hours(5)
			);
			
			$scope.pageClass = 'page-home'
        }
    ]);
});