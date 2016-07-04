import component from '../<%= name %>.component';
import template from '../<%= name %>.html';
import controller from '../<%= name %>.controller';

describe('Component: <%= name %>', function() {
	it('includes the intended template', () => {
		expect(component.template).toEqual(template);
	});

	it('invokes the right controller', () => {
		expect(component.controller).toEqual(controller);
	});
});
