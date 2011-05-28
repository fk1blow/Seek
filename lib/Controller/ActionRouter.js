var ActiveRouter = require('../Router/ActiveRouter'),
	Request = require('../Http/Request');


var ActionRouter = Klass({
	statics: {
		route: null,
		
		getControllerName: function() {
			var route_controller = this.getCurrentRoute().controller;
			// This pseudo error handling must go
			if(!route_controller) {
				throw new Error('Unable to find a route for:: ' + Request.getUrl())
			}
			return route_controller;
		},
		
		getActionName: function() {
			var route_action = this.getCurrentRoute().action;
			if(!route_action) {
				throw new Error('Unable to find a route(action) for:: ' + Seek.URL.Request.getUrl())
			}
			return route_action;
		},
		
		getParams: function() {
			var route = this.getCurrentRoute();
			var params = {};
			for(var item in route) {
				if(item != 'controller' && item != 'action')
					params[item] = route[item];
			}
			return params || null;
		},
		
		getUrl: function() {
			return this.getCurrentRoute().current_url;
		},
		
		getCurrentRoute: function() {
			return ActiveRouter.getRoute();
		}
	}
});


module.exports = ActionRouter;
