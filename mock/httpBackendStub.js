import angular from 'angular';
import 'angular-mocks';
import app from '../src/app/app.module';

import httpMocks from './httpMocks';

(function() {

	if (localStorage.getItem('mock') === '0') {
		return; // do nothing special - this app is not gonna use stubbed backend
	}

	console.log('======== USING STUBBED BACKEND ========');
	initializeStubbedBackend();

	function initializeStubbedBackend() {
		angular.module(app.name)
			.config(function($provide) {
				$provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
				// delay mock backend responses by 1 second
				const DELAY_MS = 2000;

				$provide.decorator('$httpBackend', function($delegate) {
					const proxy = function(method, url, data, callback, headers) {
						const interceptor = function() {
							const _this = this, _arguments = arguments;

							setTimeout(function() {
								// return result to the client AFTER delay
								callback.apply(_this, _arguments);
							}, DELAY_MS);
						};

						return $delegate.call(this, method, url, data, interceptor, headers);
					};

					for (const key in $delegate) {
						proxy[key] = $delegate[key];
					}
					return proxy;
				});
			})
			.run(httpMocks);
	}
})();
