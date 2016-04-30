import angular from 'angular';
import 'angular-ui-router';
import searchReposComponent from './searchRepos.component';

const searchReposModule = angular.module('searchRepos', [
	'ui.router'
])
.component('searchRepos', searchReposComponent);

export default searchReposModule;
