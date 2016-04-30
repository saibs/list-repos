import template from './app.template.html';
/**
 * @ngdoc component
 * @name _app.component:appDirective
 * @scope
 * @restrict E
 *
 * @description
 *  The root component for the application
 *
 * @usage
 * <app></app>
 *
 */
const AppComponent = {
	restrict: 'E',
	template: template,
	replace: true
};

export default AppComponent;

