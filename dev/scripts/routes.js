define(function(require) {
	
	'use strict';
	
	require('directives/start-directive');
	require('directives/title');
	require('services/date');
	require('services/dialog');
	require('services/template');
	require('services/page');
	
	require('controllers/homeViewController');
	require('controllers/userViewController');
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
							templateUrl: './dest/views/layout.html',
							controller: 'homeViewController'
						},
						'header@home': {
							templateUrl: './dest/views/common/header.html'
						},
						'footer@home': {
							templateUrl: './dest/views/common/footer.html'
						},
						'left@home': {
							templateUrl: './dest/views/common/menu.html'
						},
						'right@home': {
							templateUrl: './dest/views/index.html'
						}
					},
					data:{
						pageTitle: 'home'
					}
				})
				.state('home.user', {
					url: 'user',
					views: {
						'right@home': {
							templateUrl: './dest/views/user/index.html',
							controller: 'userViewController'
						}
					},
					data:{
						pageTitle: 'user'
					}
				})
				.state('home.user.add', {
					url: '/add',
					views: {
						'right@home': {
							templateUrl: './dest/views/user/add.html',
							controller: 'userViewController'
						}
					}
				})
				.state('home.user.detail', {
					url: '/detail/:id',
					params: {
						id: '1',
					},
					views: {
						'right@home': {
							templateUrl: './dest/views/user/detail.html',
							controller: 'userViewController'
						}
					}
				});
				
			
			$urlRouterProvider.otherwise('/');
			
			/*
			http://www.cnblogs.com/liulangmao/p/3906721.html
			*/
			
			/* http://stackoverflow.com/questions/30409740/angular-ui-router-dynamic-routing-based-on-slug-from-api-ajax-call-load-view-ba */
			/* $stateProvider
				.state('home', {
					url: '/',
					views: {
						'': {
							templateUrl: './dest/views/layout.html',
							controller: 'homeViewController'
						},
						'header@home': {
							templateUrl: './dest/views/common/header.html'
						},
						'footer@home': {
							templateUrl: './dest/views/common/footer.html'
						},
						'left@home': {
							templateUrl: './dest/views/common/menu.html'
						},
						'right@home': {
							templateUrl: './dest/views/index.html'
						}
					},
					data:{
						pageTitle: 'home'
					}
				})
				.state('user', {
					url: '/:slug',
					views: {
						'': {
							templateProvider: ['$stateParams', '$templateRequest', function($stateParams, $templateRequest){
								var tplName = './dest/views/user/index.html';
								return $templateRequest(tplName);
							}],
							controllerProvider: ['$stateParams', 'type', function($stateParams, type){
								console.log($stateParams.slug, type.slug)
								return $stateParams.slug + 'ViewController';
							}],
							resolve: {
							  type: ['$http', '$stateParams',
								function($http, $stateParams) {
								// $http.get({
									// method: "GET",
									// url: "http://localhost/api/" + $stateParams.slug
								// }).success(function(response, status, headers, config){
									response = {slug: "john-smith",type: "user"}
									// return response.type
								// })
								  return $stateParams.slug
								}
							  ]
							}
						}
					}
				}) */
			
			
			
		}
	]);
});
