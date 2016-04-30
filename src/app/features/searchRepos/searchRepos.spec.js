import SearchReposModule from './searchRepos.module';
import SearchReposController from './searchRepos.controller';
import SearchReposComponent from './searchRepos.component';
import SearchReposTemplate from './searchRepos.html';

describe('SearchRepos', () => {
	let makeController;

	beforeEach(window.module(SearchReposModule.name));
	beforeEach(inject(() => {
		makeController = () => {
			return new SearchReposController();
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

	describe('Template', () => {
		// template specs
		// tip: use regex to ensure correct bindings are used e.g., {{  }}
		it('has name in template [REMOVE]', () => {
			expect(SearchReposTemplate).toMatch(/{{\s?vm\.name\s?}}/g);
		});
	});

	describe('Component', () => {
		// component/directive specs
		const component = SearchReposComponent;

		it('includes the intended template', () => {
			expect(component.template).toEqual(SearchReposTemplate);
		});

		it('invokes the right controller', () => {
			expect(component.controller).toEqual(SearchReposController);
		});
	});
});
