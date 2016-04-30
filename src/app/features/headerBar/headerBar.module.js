import angular from 'angular';
import 'angular-ui-router';
import headerBarComponent from './headerBar.component';

const headerBarModule = angular.module('headerBar', [
	'ui.router'
])
.component('headerBar', headerBarComponent);

export default headerBarModule;
