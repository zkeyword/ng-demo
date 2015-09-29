require.config({
	baseUrl: 'scripts',
	paths: {
		'angular' : '../lib/angular.min',
		'uiRouter' : '../lib/angular-ui-router.min',
		'angular-animate' : '../lib/angular-animate.min',
		'require' : '../lib/require',
		'template' : '../lib/template'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ['angular']
		},
		'uiRouter': {
			deps: ['angular']
		}
	},
	deps: ['bootstrap']
});
