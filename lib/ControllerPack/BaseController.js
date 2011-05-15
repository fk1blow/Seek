var ActionRouter = require('./ActionRouter');
var ActionView = require('../ViewPack/ActionView');


var BaseController = Klass({
	attributes: {
		url: function() { return ActionRouter.getUrl() },
		
		params: function() { return ActionRouter.getParams() },
		
		controller_name: function() { return ActionRouter.getControllerName() },
		
		action_name: function() { return ActionRouter.getActionName() }
	},
	
	methods: {
		renderToLayout: function(view, locales) {
		   ActionView.renderToLayout(view, locales, this.layout);
		},
		
		renderHTML: function(html) {
			ActionView.renderHTML(html);
		},
		
		renderXML: function(xml) {
			ActionView.renderXML(xml);
		},
		
		renderJSON: function(json) {
			ActionView.renderJSON(json);
		}
	}
});


module.exports = BaseController;
