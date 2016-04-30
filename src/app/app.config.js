
/**
 * @ngdoc overview
 * @name _app
 *
 * @description
 * 	The root application route
 *
 */
const appConfig = function(
	$urlRouterProvider) {

	$urlRouterProvider
		.when('', '/search')
		.otherwise('/search');
};

export default appConfig;
