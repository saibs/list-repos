class <%= upCaseName %>Controller {
	constructor($scope, $element, $attrs, <%= upCaseName %>Service) {
		'ngInject';

		this.name = '<%= name %>';

		// refs
		this.$scope = $scope;
		this.$element = $element;
		this.$attrs = $attrs;
		this.<%= upCaseName %>Service = <%= upCaseName %>Service;
	}

	$onInit() {

	}

	$postLink() {

	}

	$onChanges() {

	}

	$onDestroy() {

	}
}

export default <%= upCaseName %>Controller;
