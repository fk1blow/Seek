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
			
			// Generates the route's regex
			this._generateRegex(path, options);
			
			this._generatePath(path);
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
			var constrained = Utils.constraintize(path, this._getConstraints(options));
            var standard = Utils.standardize(constrained);
			var r = new RegExp('^' + standard + '$');
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
