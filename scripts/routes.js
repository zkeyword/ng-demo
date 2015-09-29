define(function(require) {
	
	'use strict';
	
	require('directives/start-directive');
	require('services/date');
	require('services/dialog');
	require('services/template');
	
	
	require('controllers/HomeViewController');
	require('controllers/ContactViewController');
	require('controllers/formViewController');

	return require('app').config([
		'$stateProvider', 
		'$urlRouterProvider',
		function(
			$stateProvider,
			$urlRouterProvider
		) {
			
			$stateProvider
				.state('home', {
					url: '/',
					views: {
						'': {
							templateUrl: './views/home.html',
							controller: 'HomeViewController'
						},
						'left@home': {
							template: '这里是第一列的内容'
						},
						'right@home': {
							template: '这里是第一列的内容'
						}
					}
				})
				.state('home.form', {
					url: 'form/',
					views: {
						'right@home': {
							templateUrl: './views/form.html',
							controller: 'formViewController'
						}
					}
				})
				.state('contact', {
					url: "/contact",
					templateUrl: './views/contact.html',
					controller: function($scope) {
						console.log(2222222222)
					}
				})
				.state('contact.detail', {
					url: "/detail/:id",
					templateUrl: './views/contact.detail.html',
					params: {
						id: '1',
					},
					controller: function ($scope, $stateParams) {
						$scope.stateParams = $stateParams;
						console.log( $stateParams )
					}
				})
				.state('contact.edit', {
					url: '/edit/:id',
					templateUrl: './views/contact.edit.html',
					params: {
						id: '1',
					},
					controller: function($scope) {
						console.log(11111111111111111111111111111111111111)
					}
				})
				.state('form', {
					url: '/form',
					templateUrl: './views/form.html',
					params: {
						id: '1',
					},
					controller: function($scope) {
						console.log(11111111111111111111111111111111111111)
					}
				});
			
			$urlRouterProvider.otherwise('/');
		}
	]);
});
