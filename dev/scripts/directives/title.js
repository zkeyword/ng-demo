define(function(require){
	
	'use strict';
	
    require('app').directive('title', ['$rootScope', '$timeout',
		function($rootScope, $timeout) {
			return {
				link: function() {

					var listener = function(event, toState) {

						$timeout(function() {
							console.log(toState)
							$rootScope.title = (toState.data && toState.data.pageTitle) 
							? toState.data.pageTitle 
							: 'Default title';
						});
					};

					$rootScope.$on('$stateChangeSuccess', listener);
				}
			};
		}
	]);
	
});