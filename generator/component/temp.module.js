import angular from 'angular';
import service from './<%= name %>.service';
import component from './<%= name %>.component';

const <%= name %>Module = angular.module('<%= name %>', [
])
	.service('<%= upCaseName %>Service', service)
	.component('<%= name %>', component);

export default <%= name %>Module;
