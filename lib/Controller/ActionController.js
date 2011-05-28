var Config = require('../Config'),
	File = require('../File/File'),
	Standardizr = require('./Standardizr'),
	ActionRouter = require('./ActionRouter'),
	BaseController = require('./BaseController'),
	Validator = require('./Validator');


var ActionDispatcher = Klass({
	statics: {
		dispatch: function(res) {
			Controller.init();
			if(Config.env.default_response)
				res.end(Config.env.default_response);
		}
	}
});


var Controller = Klass({
	statics: {
		controller: {
			default_name: null,
			object_name: null,
			instance: null,
			action: null,
		},
		
		init: function() {
			this._setDefaults();
			
			// Validate
			this._validateNames();
			
			// Here be dragons
			this._loadAppController();
			
			// Builds the instance
			this._buildInstance();
			
			// Invokes the action
			this._callAction();
		},
		
		_validateNames: function() {
			var cn_valid = Validator.validate('c_n', this.controller.default_name);
			var co_valid = Validator.validate('c_o', this.controller.object_name);
			var an_valid = Validator.validate('a_n', this.controller.action);
			
			if(!cn_valid) {
				throw new Error('Invalid controller route name:: ' + this.controller.default_name);
			}
			if(!co_valid) {
				throw new Error('Invalid controller object name:: ' + this.controller.object_name);
			}
			if(!an_valid) {
				throw new Error('Invalid action name:: ' + this.controller.action);
			}
		},
		
		_setDefaults: function() {
			this.controller.default_name = ActionRouter.getControllerName();
			this.controller.object_name = Standardizr.standardizeName(this.controller.default_name);
			this.controller.action = ActionRouter.getActionName();
		},
		
		// The magic instance builder
		_buildInstance: function() {
			var c = this._loadControllerFile(this.controller.object_name);
			
			// Constructing instance
			this.controller.instance = new c();
		},
		
		// Invokes controller's action
		_callAction: function() {
			var action = Standardizr.getControllerAction();
			
			if(typeof(this.controller.instance[action]) != 'function') {
				throw new Error('Unable to find action:: ' + action);
			}
			
			// Calling the controller's instance method (action)
			this.controller.instance[action]();
		},
		
		// Loads the ApplicationController
		_loadAppController: function() {
			if(typeof(ApplicationController) != 'function') {
				var f = this._loadControllerFile('ApplicationController');
			}
			if(typeof(f) != 'function') {
				throw new Error('Unable to find ApplicationController');
			}
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
