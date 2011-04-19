function cl(o) {
    console.log(o);
}


Module('ActionModule', function() {
	
	Class('ControllerBuilder', {
		my: {
			has: {
				controller_object: {
					init: null
				},
				
				controllerInstance: {
					init: null
				}
			},
			
			methods: {
				buildControllerInstance: function(controller) {
					this._setControllerObject();
					this._loadControllerFile();
					this._instantiate();
				},
				
				callControllerAction: function() {
					var action = ActionModule.Standardizr.getControllerAction();
					//try {
						this.controllerInstance[action]();
					//} catch(err) {
					//	Seek.Errors.set({
					//		section: {
					//			'controller': this.controller_object ,
					//			'action': action
					//		},
					//		message: 'Undefined method ' + err.arguments[0] + ' in ' +
					//			this.controller_object + '.' + action
					//	});
					//	
					//	cl(Seek.Errors.get())
					//}
				},
				
				getControllerInstance: function() {
					return this.controllerInstance || null;
				},
				
				_setControllerObject: function() {
					this.controller_object = ActionModule.Standardizr.getControllerObject();
				},
				
				_instantiate: function() {
					var controller_eval = eval('PlaylistsController');
					
					if(typeof(controller_eval) === 'function') {
						try {
							this.controllerInstance = new controller_eval();
						} catch(err) {
							console.log('Could not instantiate controller:: ', this.controller_object);
						}
					}
				},
				
				_loadControllerFile: function() {
					var file = this.controller_object;
					Seek.Utils.loadFile(Config.getPathFor('controllers') + '/' + file);
				}
			}
		}
	});
	
});