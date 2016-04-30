import SearchReposModule from './searchRepos.module';
import SearchReposController from './searchRepos.controller';
import SearchReposComponent from './searchRepos.component';
import SearchReposTemplate from './searchRepos.html';
import Core from '../../core/core.module';

describe('SearchRepos', () => {
	let $location,
		$mdToast,
		makeController,
		$q,
		SearchReposService;

	beforeEach(() => {
		window.module(Core.name);
		window.module(SearchReposModule.name);
	});
	beforeEach(inject((_$location_, _$mdToast_, _$q_) => {
		$location = _$location_;
		$mdToast = _$mdToast_;
		$q = _$q_;
		SearchReposService = {
			search: () => {
				return $q.resolve([{}]);
			}
		};
		makeController = () => {
			return new SearchReposController($location, $mdToast, SearchReposService);
		};
	}));

	describe('Module', () => {
		// top-level specs: i.e., routes, injection, naming
	});

	describe('Controller', () => {
		// controller specs
		let controller;

		beforeEach(() => {
			controller = makeController();
		});

		it('to be defined', () => {
			expect(controller).toBeDefined();
		});
		it('should call SearchService search method', () => {
			spyOn(SearchReposService, ['search']).and.callThrough();
			controller.search('Kibo007');
			expect(SearchReposService.search).toHaveBeenCalled();
			expect(controller.isLoading).toBe(true);
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
