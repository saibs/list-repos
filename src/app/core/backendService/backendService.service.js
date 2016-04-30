/**
 * @ngdoc service
 * @name backendService.service:BackendService
 *
 * @description
 *
 */
class BackendService {
	constructor($http) {
		this.$http = $http;
		this.githubBaseAPI = 'https://api.github.com';
	}
	/**
	 * @ngdoc method
	 * @name backendService.service:BackendService#searchRepos
	 * @methodOf backendService.service:BackendService
	 *
	 * @description
	 * Retrieve github repos of a user.
	 *
	 * @param {String} user name
	 * @returns {Promise} an $http promise object resolving an Object containing repos
	 */
	searchRepos(userName) {
		return this.$http({
			method: 'GET',
			url: `${this.githubBaseAPI}/users/${userName}/repos`
		});
	}
}

export default BackendService;

