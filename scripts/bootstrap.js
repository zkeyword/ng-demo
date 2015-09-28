define(function(require){
	
	require('routes');
	
	angular.element().ready(function() {
		console.log('IN: bootstrap');
		angular.bootstrap(document, ['app']);
	});
	
});