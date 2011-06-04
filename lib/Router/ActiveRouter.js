var Router = require('./Router'),
	Request = require('../Http/Request'),
	url = require('url');


var ActiveRouter = Klass({
	statics: {
		route: null,
		
		init: function() {
			this.route = Router.Request.parseRoute(Request.Factory().getUrl() + '/', true);
		},
		
		getRoute: function() {
			return this.route;
		},
		
		getControllerName: function() {
			var route_controller = this.getRoute().controller;
			// This pseudo error handling must go
			if(!route_controller) {
				throw new Error('Unable to find a route for:: ' + Request.Factory().getUrl())
			}
			return route_controller;
		},
		
		getController: function() {
			return this.getControllerName();
		},
		
		getActionName: function() {
			var route_action = this.getRoute().action;
			if(!route_action) {
				throw new Error('Unable to find a route(action) for:: ' + Request.Factory().getUrl())
			}
			return route_action;
		},
		
		getAction: function() {
			return this.getActionName();
		},
		
		getParams: function() {
			var route = this.getRoute();
			var params = {};
			var counter = 0;
			for(var item in route) {
				if(item != 'controller' && item != 'action') {
					params[item] = route[item];
					counter++;
				}
			}
			if(counter == 0) {
				params = url.parse(Request.Factory().getUrl(), true).query;
			}
			return params;
		},
		
		getUrl: function() {
			return this.getRoute().current_url;
		}
	}
	
});


module.exports = ActiveRouter;
