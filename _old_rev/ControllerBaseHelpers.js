/**
 * @package ActionModule.BaseUtils
 */
Module('ActionModule', function() {
	
	Class('BaseHelpers', {
		my: {
			methods: {
				getControllerName: function(controllerName) {
					var route = ActiveDispatcher.Router.getCurrentRoute();
					return ActionModule.Utils.upcase(route.controller) + 'Controller';
				},
				
				getActionName: function(actionName) {
					return ActiveDispatcher.Router.getCurrentRoute().action;
				},
				
				getRouteObject: function(route) {
					return ActiveDispatcher.Router.getCurrentRoute();
				},
				
				loadControllerFile: function(controller_filename) {
					ActionModule.Utils.loadFile(controller_filename, 'controller');
				}
			}
		}
	});
	
});


