define(function(require){
	
	require('routes');

	angular.element().ready(function() {
		angular.bootstrap(document, ['app']);
	});
	
});