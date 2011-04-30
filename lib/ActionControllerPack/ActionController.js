function cl(o) {
    console.log(o);
}

/**
 * @package ActionModule
 * @name BaseController
 */
Module('Seek', function() {

	Module('ActionModule', function() {
		
		Class('ActionDispatcher', {
			my: {
				methods: {
					init: function() {
						Seek.ActionModule.ActionController.init();
					}
				}
			}
		});
		
		
		Class('ActionController', {
			my: {
				has: {
					controller: {
						is: 'rw',
						init: {
							default_name: { init: null },
							object_name: { init: null },
							instance: { init: null },
							action: { init: null }
						}
					}
				},
				
				methods: {
					init: function() {
						this._setDefaults();
						this._extendBaseController();
						
						// Here be dragons
						this._loadAppController();
						
						// Builds the instance
						this._buildInstance();
						
						// Invokes the action
						this._callAction();
					},
					
					_setDefaults: function() {
						this.controller.default_name = ActionModule.ActionRouter.getControllerName();
						this.controller.object_name = Seek.ActionModule.Standardizr.standardizeName(this.controller.default_name);
						this.controller.action = ActionModule.ActionRouter.getActionName();
					},
					
					_extendBaseController: function() {
						Seek.ActionModule.BaseController.meta.extend({
							has : { 
								request : {
									init: Seek.URL.Request.getRequest()
								},
								url: {
									init: Seek.URL.Request.getUrl()
								},
								params: {
									// Define a method inside Seek.Router's body
									init: ActionModule.ActionRouter.getParams()
								},
								controller_name: {
									init: this.controller.default_name
								},
								action_name: {
									init: this.controller.action
								}
							} 
						});
					},
					
					// The magic instance builder
					_buildInstance: function() {
						this._loadControllerFile(this.controller.object_name);
						
						if(!Seek.ActionModule.Validators.hasValidName(this.controller.object_name)) {
							throw new Error('Unable to find #' + this.controller.object_name);
						}
						if(!Seek.ActionModule.Validators.hasValidMeta(this.controller.object_name)) {
							throw new Error('Invalid controller meta #' + this.controller.object_name);
						}
						if(!Seek.ActionModule.Validators.isAJooseObject(this.controller.object_name)) {
							throw new Error('Not a valid object #' + this.controller.object_name);
						}
						
						// Constructing instance
						this.controller.instance = new global[this.controller.object_name]();
					},
					
					// Invokes controller's action
					_callAction: function() {
						var action = Seek.ActionModule.Standardizr.getControllerAction();
						
						if(!Seek.ActionModule.Validators.hasMethod(this.controller.object_name, action)) {
							throw new ReferenceError('Unable to find action #' + action + ' in #' + this.controller.object_name);
						}
						
						// Calling the controller's instance method (action)
						this.controller.instance[action]();
					},
					
					// Loads the ApplicationController
					_loadAppController: function() {
						this._loadControllerFile('ApplicationController');
					},
					
					// Loads a controller givend the object name EX: 'UsersController'
					_loadControllerFile: function(controller_object_name) {
						var file = controller_object_name;
						var f = Seek.File.loadFile(Config.getPathFor('controllers') + '/' + file);
					}
				}
			}
		});
		
	});
	
});