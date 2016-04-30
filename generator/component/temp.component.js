import template from './<%= name %>.html';
import controller from './<%= name %>.controller';

const <%= name %>Component = {
	restrict: 'E',
	bindings: {},
	template,
	controller,
	controllerAs: 'vm'
};

export default <%= name %>Component;
