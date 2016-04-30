import angular from 'angular';
import 'angular-ui-router';
import <%= name %>Component from './<%= name %>.component';

const <%= name %>Module = angular.module('<%= name %>', [
	'ui.router'
])
.component('<%= name %>', <%= name %>Component);

export default <%= name %>Module;
