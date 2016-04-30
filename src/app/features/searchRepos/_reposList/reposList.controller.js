class ReposListController {
	constructor($window) {
		this.$window = $window;
	}
	openRepoLink(repo) {
		this.$window.open(repo.html_url, '_blank');
	}
}

export default ReposListController;
