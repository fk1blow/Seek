var Router = require('./Router'),
	Request = require('../Http/Request');


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
		
		getActionName: function() {
			var route_action = this.getRoute().action;
			if(!route_action) {
				throw new Error('Unable to find a route(action) for:: ' + Request.Factory().getUrl())
			}
			return route_action;
		},
		
		getParams: function() {
			var route = this.getRoute();
			var params = {};
			for(var item in route) {
				if(item != 'controller' && item != 'action')
					params[item] = route[item];
			}
			return params || null;
		},
		
		getUrl: function() {
			return this.getRoute().current_url;
		}
	}
	
});


module.exports = ActiveRouter;
