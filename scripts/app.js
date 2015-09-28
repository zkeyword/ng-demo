define(function (require) {
	'use strict';
	
	console.log('IN: start-module');
	
	require('angular');
	require('uiRouter');
	require('angular-animate');
	
	return angular.module('app', [
		'ui.router',
		'ngAnimate'
	]);
	
	/*var app = angular.module('app', [
		'ui.router',
		'ngAnimate'
	]);
	
	 app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function(
			$controllerProvider,
			$compileProvider,
			$filterProvider,
			$provide
		){
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
        }
    ]); 
	
	return app;*/

});