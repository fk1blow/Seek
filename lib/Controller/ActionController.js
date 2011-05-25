var Config = require('../Config'),
File = require('../File/File'),
Standardizr = require('./Standardizr'),
ActionRouter = require('./ActionRouter');
BaseController = require('./BaseController');


var ActionDispatcher = Klass({
	statics: {
		dispatch: function(res) {
			ActionController.init(res);
			res.end('default');
		}
	}
});


var ActionController = Klass({
	statics: {
		controller: {
			default_name: null,
			object_name: null,
			instance: null,
			action: null
		},
		
		stack: {},
		
		init: function(res) {
			this._setDefaults();
			
			// Here be dragons
			this._loadAppController();
			
			// Builds the instance
			this._buildInstance();
			
			// Invokes the action
			this._callAction();
		},
		
		_setDefaults: function() {
			this.controller.default_name = ActionRouter.getControllerName();
			this.controller.object_name = Standardizr.standardizeName(this.controller.default_name);
			this.controller.action = ActionRouter.getActionName();
		},
		
		// The magic instance builder
		_buildInstance: function() {
			var c = this._loadControllerFile(this.controller.object_name);
			
			//if(!Seek.ActionModule.Validators.hasValidName(this.controller.object_name)) {
			//	throw new Error('Unable to find #' + this.controller.object_name);
			//}
			//if(!Seek.ActionModule.Validators.hasValidMeta(this.controller.object_name)) {
			//	throw new Error('Invalid controller meta #' + this.controller.object_name);
			//}
			//if(!Seek.ActionModule.Validators.isAJooseObject(this.controller.object_name)) {
			//	throw new Error('Not a valid object #' + this.controller.object_name);
			//}
			
			// Constructing instance
			this.controller.instance = new c();
		},
		
		// Invokes controller's action
		_callAction: function() {
			var action = Standardizr.getControllerAction();
			
			//if(!Seek.ActionModule.Validators.hasMethod(this.controller.object_name, action)) {
			//	throw new ReferenceError('Unable to find action #' + action + ' in #' + this.controller.object_name);
			//}
			
			// Calling the controller's instance method (action)
			this.controller.instance[action]();
		},
		
		// Loads the ApplicationController
		_loadAppController: function() {
			if(typeof(ApplicationController) != 'function')
				this._loadControllerFile('ApplicationController');
		},
		
		// Loads a controller givend the object name EX: 'UsersController'
		_loadControllerFile: function(controller_object_name) {
			var file = controller_object_name;
			var f = File.loadFile(Config.getPathFor('controllers') + '/' + file);
			return f;
		}
	}
});


module.exports = ActionDispatcher;
