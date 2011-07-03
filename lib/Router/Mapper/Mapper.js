var SimpleRoute = require('./SimpleRoute'),
	ResourceRoute = require('./ResourceRoute'),
	Stacker = require('../Stacker/Stacker');


/**
 * @class Mapper
 * Abstract
 */
var Mapper = {
	_crud_actions: ['index', 'show', 'add', 'create', 'edit', 'update', 'destroy'],
	
	addSimpleRoute: function(resource, options) {
		if(!resource || typeof(resource) != 'string') {
			return;
		}
		if(options && typeof(options) != 'object') {
			return;
		}
		
		var Route = new SimpleRoute(resource, options);
		Stacker.add(Route);
		
		var r = Stacker.retrieve();
		//cl('_from stack::	', r[0].regex)
	},
	
	addResourceRoute: function(resource, options) {
		if(!resource || typeof(resource) != 'string') {
			return;
		}
		if(options && typeof(options) != 'object') {
			return;
		}
		
		for(var i = 0; i < this._crud_actions.length; i++) {
			// if the route has only array, create only those methods
			if(options && options.only) {
				if(options.only.indexOf(this._crud_actions[i]) >= 0) {
					var Route = new ResourceRoute(resource, this._crud_actions[i], options);
					Stacker.add(Route);
				}
			}
			// else create all available CRUD methods
			else {
				var Route = new ResourceRoute(resource, this._crud_actions[i], options);
				Stacker.add(Route);
			}
		}
		
		var r = Stacker.retrieve();
		//cl(r)
	}
};


module.exports = Mapper;
