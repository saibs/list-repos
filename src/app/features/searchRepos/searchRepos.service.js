import angular from 'angular';

class SearchReposService {
	constructor($q, BackendService) {
		this.$q = $q;
		this.BackendService = BackendService;
		this.repos = [];
	}
	search(userName) {
		return this.BackendService
			.searchRepos(userName)
			.then((response) => {
				angular.copy(response.data, this.repos);
				return this.repos;
			}, (error) => {
				this.repos = [];
				return this.$q.reject(error);
			});
	}
}

export default SearchReposService;
