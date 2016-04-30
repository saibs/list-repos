class SearchReposController {
	constructor($location, $mdToast, SearchReposService) {
		this.$location = $location;
		this.$mdToast = $mdToast;
		this.SearchReposService = SearchReposService;

		this.userName = this.$location.search().q;
		if (this.userName) {
			this.search(this.userName);
		}
	}
	search(userName) {
		this.$location.search({q: userName});
		this.isLoading = true;
		this.SearchReposService
			.search(userName)
			.then((repos) => {
				if (!repos.length) {
					this.showError('No repositories found');
				}
			}, (error)=> {
				switch (error.status) {
					case 404:
						this.showError(error.statusText);
						break;
					default:
						this.showError('Something Went Wrong');
						break;
				}
			})
			.finally(() => {
				this.isLoading = false;
			});
	}
	submit() {
		this.search(this.userName);
	}
	showError(msg) {
		this.$mdToast.show(
			this.$mdToast
				.simple()
				.textContent(msg)
				.position('top right')
				.hideDelay(2000)
		);
	}
}

export default SearchReposController;
