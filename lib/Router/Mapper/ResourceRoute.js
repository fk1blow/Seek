var Route = require('./Route');


/**
 * @class ResourceRoute
 * @description Rest-ful routes implementation
 */
var ResourceRoute = Klass({
	Extends: Route,
	
	attributes: {
		_name: null,
		_path: null,
		_controller: null,
		_action: null,
		_method: null,
		_regex: null,
		_special_segments: ['controller', 'action', 'method', 'only'],
		_methods_actions: {
			create: 'POST',
			update: 'PUT',
			destroy: 'DELETE'
		}
	},
	
	methods: {
		initialize: function(resource, action, options) {
			// adds the controller
			this._addController(resource);
			
			// add the action - the resource action is built from the action param instead of options[to]
			this._addAction(action);
			
			// adds the method - different for every method name(create = POST, update = PUT)
			this._addMethod(action);
			
			// Generates a route name eg: favorites_show
			this._generateName();
			
			// we should generate the path before the regex is built
			this._generatePath(resource);
			
			// Generates the route's regex
			this._generateRegex(options);
		},
		
		
		_addController: function(resource) {
			if(resource && typeof(resource) == 'string') {
				this._controller = resource.pluralize();
			}
		},
		
		_addAction: function(action) {
			if(action && typeof(action) == 'string')
				this._action = action;
		},
		
		_addMethod: function() {
			if(!this._action) this._method = 'GET';
			
			if(this._methods_actions[this._action]) {
				this._method = this._methods_actions[this._action];
			} else {
				this._method = 'GET';
			}
		},
		
		_generateName: function() {
			if(this._controller && this._action) {
				this._name = Array(this._controller, this._action).join('_');
			}
			return;
		},
		
		_generateRegex: function(options) {
			var constrained = this.constraintize(this._path, this._getConstraints(options));
            var standard = this.standardize(constrained);
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
		
		_generatePath: function(resource_path) {
			var action = this._action, controller = this._controller;
			if(this._lazy_actions.indexOf(this._action) >= 0) {
				action += '/:id';
			}
			this._path = '/' + Array(controller, action).join('/');
		},
		
		
		/**
		 * @public
		 * Getters
		 */
		getName: function() {
			return this._name;
		},
		
		getPath: function() {
			return this._path;
		},
		
		getController: function() {
			return this._controller;
		},
		
		getAction: function() {
			return this._action;
		},
		
		getName: function() {
			return this._name;
		},
		
		getMethod: function() {
			return this._method;
		},
		
		getRegex: function() {
			return this._regex;
		}
	}
});


module.exports = ResourceRoute;
