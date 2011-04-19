function cl(o) {
    console.log(o);
}


Module('ActionModule', function() {
	
	Class('ActionRouter', {
		my: {
			methods: {
				getControllerName: function() {
					return this.getCurrentRoute().controller;
				},
				
				getActionName: function() {
					return this.getCurrentRoute().action;
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
				
				getCurrentRoute: function() {
					return Seek.ActiveDispatcher.Router.getCurrentRoute();
				}
			}
		}
	});
	
});