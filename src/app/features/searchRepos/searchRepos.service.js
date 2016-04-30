import angular from 'angular';

class SearchReposService {
	constructor(BackendService) {
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
				return error;
			});
	}
}

export default SearchReposService;
