var Config = require('../Config'),
	File = require('../File/File'),
	ActiveRouter = require('../Router/ActiveRouter'),
	Request = require('../Http/Request'),
	Validator = require('./Validator');


/**
 * Standardizr
 * @description standardizes some the router ouput(:action, :controller, :params)
 */
var Standardizr = {
	prefix: 'Controller',
	
	standardizeName: function(controller_name) {
		var on = this.toUpcase(controller_name)
		return on + this.prefix;
	},
	
	toUpcase: function(string) {
		if(!this.isDefined(string)) return false;
		return string.substr(0, 1).toUpperCase() + string.substr(1);
	},
	
	isString: function(string) {
		if(!this.isDefined(string)) return false;
		var regexp = /^[a-zA-Z]+[a-zA-Z\_]+[a-zA-Z]+$/i;
		return regexp.test(string);
	},
	
	isDefined: function(string) {
		if(typeof(string) != 'undefined') return true;
	}
};


/**
 * Main dispatch object
 * 
 * @description calls the router initiali setup and the controller init(instance, action, etc)
 * @todo remove res param - get the response by Response.Factory.get('response')
 */
var ControllerDispatcher = {
	dispatch: function(res) {
		ActiveRouter.init();
		Controller.init();
		
		if(Config.env.defaults.response) {
			res.end(Config.env.defaults.response);
		}
	}
};


/**
 * Controller
 * @description main Controller object.
 *  Deals with:
 * - controller instantiation
 * - action calling
 */
var Controller = {
	controller_stack: {},
	
	controller: {
		default_name: null,
		object_name: null,
		instance: null,
		action: null,
	},
	
	init: function() {
		this.setDefaults();
		
		// Here be dragons
		this.loadAppController();
		
		// Builds the instance
		this.buildInstance();
		
		// Invokes the action
		this.callAction();
	},
	
	setDefaults: function() {
		this.controller.default_name = ActiveRouter.getRoute().controller;
		this.controller.object_name = Standardizr.standardizeName(this.controller.default_name);
		this.controller.action = ActiveRouter.getRoute().action;
	},
	
	// The magic instance builder
	buildInstance: function() {
		var c = this.loadControllerFile(this.controller.object_name);
		// Constructing instance
		this.controller.instance = new c();
	},
	
	// Invokes controller's action
	callAction: function() {
		var action = this.controller.action;
		if(typeof(this.controller.instance[action]) != 'function') {
			throw new Error('Unable to find action:: ' + action);
		}
		// Calling the controller's instance method (action)
		this.controller.instance[action]();
	},
	
	// Loads the ApplicationController
	loadAppController: function() {
		if(typeof(ApplicationController) != 'function') {
			var f = this.loadControllerFile('ApplicationController');
		}
		if(typeof(f) != 'function') {
			throw new Error('Unable to find ApplicationController');
		}
	},
	
	// Loads a controller given the object name EX: 'UsersController'
	loadControllerFile: function(controller_object_name) {
		var f = this._loadFromStack(controller_object_name);
		this._pushToStack(controller_object_name, f);
		return f;
	},
	
	_pushToStack: function(cname, file) {
		if(!this.controller_stack[cname])
			this.controller_stack[cname] = file;
	},
	
	_loadFromStack: function(cname) {
		var f = null;
		if(this.controller_stack[cname])
			f = this.controller_stack[cname];
		else
			f = File.loadFile(Config.getPathFor('controllers') + '/' + cname);
		return f;
	},
	
	_inStack: function(cname) {
		return this.controller_stack[cname];
	}
};


module.exports = ControllerDispatcher;
