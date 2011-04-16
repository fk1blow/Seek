function cl(o) {
    console.log(o);
}


/**
 * @class ActiveDispatcher
 */
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
			},
			
			errors: {
				init: {}
			}
		},
		
		methods: {
			begin: function(req) {
				this.initErrors();
				ActiveDispatcher.Request.initRequest(req)
				ActiveDispatcher.Router.initRouter(req);
				ActiveDispatcher.Controller.initController(req);
				this.resetErrors();
			},
			
			initErrors: function() {
				this.errors = [];
			},
			
			resetErrors: function() {
				for(var item in this.errors) {
					if(this.errors[item] === null) {
						delete this.errors[item];
					}
				}
			}
		}
	}
});


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
				var route = ActiveDispatcher.Router.getCurrentRoute();
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

