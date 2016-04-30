import HeaderBarModule from './headerBar.module';
import HeaderBarController from './headerBar.controller';
import HeaderBarComponent from './headerBar.component';
import HeaderBarTemplate from './headerBar.html';

describe('HeaderBar', () => {
	let makeController;

	beforeEach(window.module(HeaderBarModule.name));
	beforeEach(inject(() => {
		makeController = () => {
			return new HeaderBarController();
		};
	}));

	describe('Module', () => {
		// top-level specs: i.e., routes, injection, naming
	});

	describe('Controller', () => {
		// controller specs
		it('to be defined', () => {
			const controller = makeController();

			expect(controller).toBeDefined();
		});
	});


	describe('Component', () => {
		// component/directive specs
		const component = HeaderBarComponent;

		it('includes the intended template', () => {
			expect(component.template).toEqual(HeaderBarTemplate);
		});

		it('invokes the right controller', () => {
			expect(component.controller).toEqual(HeaderBarController);
		});
	});
});
