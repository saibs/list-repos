import angular from 'angular';
import 'angular-ui-router';
import SearchReposService from './searchRepos.service';
import reposListComponent from './_reposList/reposList.component';
import searchReposComponent from './searchRepos.component';

const searchReposModule = angular.module('searchRepos', [
	'ui.router'
])
.config(($stateProvider) => {

	$stateProvider
		.state('search-repos', {
			url: '/search',
			template: '<search-repos layout="row" flex></search-repos>'
		});
})
.service('SearchReposService', SearchReposService)
.component('reposList', reposListComponent)
.component('searchRepos', searchReposComponent);

export default searchReposModule;
