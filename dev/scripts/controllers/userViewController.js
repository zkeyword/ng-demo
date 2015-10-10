define(function(require){
	
	require('app').controller('userViewController', [
	    '$rootScope',
        '$scope',
		'$http',
		'$stateParams',
		'dateService',
		'template',
		'createDialog',
		'page',
		
        function(
        	$rootScope,
			$scope,
			$http,
			$stateParams,
			dateService,
			template,
			createDialog,
			page
		){
			
			$scope.id = $stateParams.id;
			
			var url = "data/data.json"
						
			$http.get(url).success(function(response) {
				$scope.list = response;
			});
			
			$scope.del = function(id, item){
				createDialog({
					id: 'simpleDialog',
					template: template('popHtml', item),
					title: '系统提示',
					backdrop: true,
					success: {label: '确定', fn: function() {
						console.log(item)
					}}
				});
			};
			
			page();
			
			$scope.pageClass = 'page-user';
        }
    ]);
});