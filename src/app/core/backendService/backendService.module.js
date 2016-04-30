import angular from 'angular';
import BackendService from './backendService.service';

const Backend = angular.module('app.backendService', [])
	.service('BackendService', BackendService);

export default Backend;
