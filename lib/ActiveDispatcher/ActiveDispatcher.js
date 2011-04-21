function cl(o) {
    console.log(o);
}


/**
 * @class ActiveDispatcher
 */
Module('Seek', function() {
	
	Class('Dispatcher', {
		my: {
			has: {
				request: {
					init: null
				},
				
				route: {
					init: null
				},
				
				controllerName: {
					init: null
				},
				
				actionName: {
					init: null
				}
			},
			
			methods: {
				begin: function(req) {
					Seek.ActiveDispatcher.Router.initRouter(req);
					Seek.ActiveDispatcher.Controller.initController(req);
				}
			}
		}
	});


	/**
	 * concrete Controller dispatch
	 */
	Module('ActiveDispatcher', function() {
	
		Class('Controller', {
			my: {
				has: {
					controllerName: {
						init: null
					},
					
					actionName: {
						init: null
					}
				},
				
				methods: {
					initController: function(req) {
						var route = Seek.ActiveDispatcher.Router.getCurrentRoute();
						Seek.ActionModule.ActionController.init();
					}
				}
			}
		});
		
	});
	
	
	/**
	 * concrete Router dispatch
	 */
	Module('ActiveDispatcher', function() {
	
		Class('Router', {
			my: {
				has: {
					route: {
						init: null
					}
				},
				
				methods: {
					initRouter: function(req, callback) {
						this.route = ActiveRouter.Base.Request.parseRoute(req.url + '/', true);
					},
					
					getCurrentRoute: function() {
						return this.route;
					}
				}
			}
		});
		
	});
	
});

