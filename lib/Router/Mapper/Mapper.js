var ResourceRoute = require('./ResourceRoute'),
	SimpleRoute = require('./SimpleRoute'),
	Stacker = require('../Stacker/Stacker');


/**
 * @class Mapper
 * Abstract
 */
var Mapper = {
	_crud_actions: ['index', 'show', 'add', 'create', 'edit', 'update', 'destroy'],
	
	addSimpleRoute: function(resource, options) {
		var Route = new SimpleRoute(resource, options);
		Stacker.add(Route);
		
		//var r = Stacker.retrieve();
		//cl(r)
	},
	
	addResourceRoute: function(resource, options) {
		for(var i = 0; i < this._crud_actions.length; i++) {
			if(options && options.only) {
				if(options.only.indexOf(this._crud_actions[i]) >= 0) {
					var Route = new ResourceRoute(resource, this._crud_actions[i], options);
					Stacker.add(Route);
				}
			} else {
				var Route = new ResourceRoute(resource, this._crud_actions[i], options);
				Stacker.add(Route);
			}
		}
		
		//var r = Stacker.retrieve();
		//cl(r)
	}
};


module.exports = Mapper;
