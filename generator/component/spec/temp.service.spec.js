import angular from 'angular';
import module from '../<%= name %>.module';

describe('Service: <%= upCaseName %>Service', function() {
	beforeEach(angular.mock.module(module.name));

	// Providers
	beforeEach(angular.mock.module(function($provide) {
	}));

	// Injections
	beforeEach(inject(function($injector, <%= upCaseName %>Service) {
		this.service = <%= upCaseName %>Service;
	}));

	it('should be defined', function() {
		expect(this.service).toBeDefined();
	});
});
