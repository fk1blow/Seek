var ActiveRouter = require('../Router/ActiveRouter'),
	View = require('../View/View'),
	Request = require('../Http/Request');


var BaseController = Klass({
	attributes: {
		controller_name: function() { return ActiveRouter.getControllerName() },
		
		action_name: function() { return ActiveRouter.getActionName() },
		
		/**
		 * I can't tell if it's safe to expose all the Request object
		 */
		request: function() { return Request.Factory() }
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
