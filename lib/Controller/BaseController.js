var ActionRouter = require('./ActionRouter');
var View = require('../View/View');


var BaseController = Klass({
	attributes: {
		url: function() { return ActionRouter.getUrl() },
		
		params: function() { return ActionRouter.getParams() },
		
		controller_name: function() { return ActionRouter.getControllerName() },
		
		action_name: function() { return ActionRouter.getActionName() }
	},
	
	methods: {
		render: function(view, options) {
			View.render(view, options);
		},
		
		renderToResponse: function(string_output, content_type) {
			View.renderToResponse(string_output, content_type);
		}
	}
});


module.exports = BaseController;
