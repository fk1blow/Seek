var Route = require('./Route').Route,
	Utils = require('./Route').Utils;


/**
 * @class SimpleRoute
 * @description adds simple routes feature to the router(EX: match('/fav/index'))
 */
var SimpleRoute = Klass({
	Extends: Route,
	
	attributes: {
		_special_segments: ['controller', 'action', 'method', 'to']
	},
	
	methods: {
		initialize: function(path, options) {
			// adds the controller
			this._addController(options);
			
			// adds the action
			this._addAction(options);
			
			// adds the method(defaults to GET)
			this._addMethod(options);
			
			// Generates a route name eg: favorites_show
			this._generateName();
			
			// Validates the route given
			if(!this._validateRoute(path)) {
				throw new Error('Invalid route path: ' + "'" + path + "'");
			}
			
			// Generates the route's regex
			this._generateRegex(path, options);
			
			// set the instance's _path attribute
			this._generatePath(path);
		},
		
		_validateRoute: function(route) {
			var reg = /^\/(([\(]+)?\.?:?[a-z\d]+[\w\d\_\-]*[a-z\d]+([\)]+)?)(([\(]+)?\/?\.?:?[a-z]+[\w\_\-]*[a-z]+([\)]+)?){1,}$/g
			var test = reg.test(route);
			cl('testing route path:: ', test);
			return test;
		},
		
		_addController: function(options) {
			if(options && options.to)
				this._controller = options.to.split('#')[0] || null;
		},
		
		_addAction: function(options) {
			if(options && options.to)
				this._action = options.to.split('#')[1] || null;
		},
		
		_generateName: function() {
			if(this._controller && this._action) {
				this._name = Array(this._controller, this._action).join('_');
			}
			return;
		},
		
		_addMethod: function(options) {
			if(options && options.method)
				this._method = options.method;
			else
				this._method = 'GET';
		},
		
		_generateRegex: function(path, options) {
			var s = Utils.standardize(path)
			var c = Utils.constraintize(s, this._getConstraints(options));
			
			cl(s)
			cl(c)
//			var constrained = Utils.constraintize(path, this._getConstraints(options));
//            var standard = Utils.standardize(constrained);
			//this._constraints = this._getConstraints(options);
			
			//cl('_original::		', path);
			//cl('_constrained::		', constrained);
			//cl('_standard::		', standard);
			
			
			var r = new RegExp('^' + c + '$');
			this._regex = r;
		},
		
		_getConstraints: function(options) {
			var c = {};
			if(this._controller)
				c['controller'] = this._controller;
			if(this._action)
				c['action'] = this._action;
			if(options) {
				for(var i in options) {
					if(c[i] && this._special_segments.indexOf(i) >= 0)
						continue;
					c[i] = options[i];
				}
			}
			return c;
		},
		
		_generatePath: function(path) {
			if(path && typeof(path) == 'string')
				this._path = path
		}
	}
});


module.exports = SimpleRoute