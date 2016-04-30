
/**
 * @ngdoc overview
 * @name bootstrap
 *
 * @description
 * Loads the application on to DOM
 */
import angular from 'angular';
import appModule from './app.module';

class App {
	start() {
		// Fire up the app
		angular.bootstrap(document, [appModule.name]);
	}
}

if (window) {
	//Export app for browser
	window.App = new App();
}

export default App;




