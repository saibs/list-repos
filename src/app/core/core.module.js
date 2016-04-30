/*eslint-env node */

import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-animate';
import BackendService from './backendService/backendService.module';

/**
 * @ngdoc overview
 * @name _core
 *
 * @description
 *  The core application module, contents of this module are available to the whole app
 */
const coreModule = angular.module('app.core', [
	// Angular modules
	'ui.router',
	'ngMaterial',
	BackendService.name
]);

export default coreModule;
