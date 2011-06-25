var Route = require('./Route').Route,
	Utils = require('./Route').Utils;


/**
 * @class ResourceRoute
 * @description Rest-ful routes implementation
 */
var ResourceRoute = Klass({
	Extends: Route,
	
	attributes: {
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
			var constrained = Utils.constraintize(this._path, this._getConstraints(options));
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
		
		_generatePath: function(resource_path) {
			var action, controller = this._controller;
			
			switch(this._action) {
				case 'index':
				case 'create':
					action = '';
				break;
				
				case 'edit':
					action = '/:id/' + this._action;
				break;
				
				case 'show':
				case 'destroy':
				case 'update':
					action = '/:id';
				break;
				
				case 'add':
					action = '/add';
				break;
			}
			this._path = '/' + controller + action;
		}
	}
});


module.exports = ResourceRoute;
