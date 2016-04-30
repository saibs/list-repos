import angular from 'angular';
import AppCore from './core/core.module';
import Header from './features/headerBar/headerBar.module';
import SearchRepos from './features/searchRepos/searchRepos.module';

// Construct Module
import appComponent from './app.component';
import config from './app.config';

/**
 * @ngdoc overview
 * @name _app
 *
 * @description
 * 	The root application module
 */

const appModule = angular.module('app', [
	// Core
	AppCore.name,

	// Features
	Header.name,
	SearchRepos.name
])
	.component('app', appComponent)
	.config(config);

export default appModule;
