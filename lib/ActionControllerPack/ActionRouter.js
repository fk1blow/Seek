function cl(o) {
    console.log(o);
}


Module('ActionModule', function() {
	
	Class('ActionRouter', {
		my: {
			methods: {
				getControllerName: function() {
					var route_controller = this.getCurrentRoute().controller;
					// This pseudo error handling must go
					if(!route_controller) {
						throw new Error('Unable to find a route(controller) for:: ' + Seek.URL.Request.getUrl())
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
					
					//cl(route)
					
					return params || null;
				},
				
				getCurrentRoute: function() {
					return Seek.ActiveRouter.getRoute();
				}
			}
		}
	});
	
});