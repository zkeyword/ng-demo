define(function (require) {
	'use strict';
	
	require('angular');
	require('uiRouter');
	require('angular-animate');
	
	return angular.module('app', [
		'ui.router',
		'ngAnimate'
	]);
	
});