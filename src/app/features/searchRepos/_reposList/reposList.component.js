import template from './reposList.html';
import controller from './reposList.controller';

const reposListComponent = {
	restrict: 'E',
	bindings: {
		list: '<'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default reposListComponent;
