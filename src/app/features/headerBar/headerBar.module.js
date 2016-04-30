import angular from 'angular';
import headerBarComponent from './headerBar.component';

const headerBarModule = angular.module('headerBar', [])
.component('headerBar', headerBarComponent);

export default headerBarModule;
