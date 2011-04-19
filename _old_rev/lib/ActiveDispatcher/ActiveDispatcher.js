function cl(o) {
    console.log(o);
}


/**
 * @class ActiveDispatcher
 */
Module('Seek', function() {
	
	Class('ActiveDispatcher', {
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
					Seek.ActiveDispatcher.Request.initRequest(req)
					Seek.ActiveDispatcher.Router.initRouter(req);
					Seek.ActiveDispatcher.Controller.initController(req);
					
					
					//ActiveRequest.setResponse('ssasa', {}, 500);
					//cl(Seek.Errors.get());
				}
			}
		}
	});
	
	
	/**
	 * This should be the main Error handlong object
	 */
	//Module('Dispatcher', function() {
	//	Class('Errors', {
	//		my: {
	//			methods: {
	//				
	//			}
	//		}
	//	});
	//});


	/**
	 * concrete Controller dispatch
	 */
	Class('ActiveDispatcher.Controller', {
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
					ActionModule.ActionController.init();
				}
			}
		}
	});
	
	
	/**
	 * concrete Request dispatch
	 */
	Class('ActiveDispatcher.Request', {
		my: {
			has: {
				request: {
					init: null
				}
			},
			
			methods: {
				initRequest: function(req) {
					this.request = req;
				},
				
				getRequest: function() {
					return this.request;
				}
			}
		}
	});
	
	
	/**
	 * concrete Router dispatch
	 */
	Class('ActiveDispatcher.Router', {
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

