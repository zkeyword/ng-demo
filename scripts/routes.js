define(function(require) {
	
	'use strict';
	
	require('controllers/HomeViewController');
	require('controllers/ContactViewController');
	require('directives/start-directive');
	require('services/date');

	return require('app').config([
		'$stateProvider', 
		'$urlRouterProvider',
		function(
			$stateProvider,
			$urlRouterProvider
		) {
			
			console.log('IN: start-route');
			
			$stateProvider
				.state('mainview', {
					url: '/',
					templateUrl: './views/first.html',
					controller: 'HomeViewController'
				})
				.state('secondaryview', {
					url: '/second',
					templateUrl: './views/second.html',
					controller: 'ContactViewController'
				});
			
			$urlRouterProvider.otherwise('/');
		}
	]);
});
