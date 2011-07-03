var Stacker = {
	_stack: [],
	
	add: function(route_object) {
		if(!route_object && route_object.length < 1)
			return false;
		this._addRoutesToStack(route_object);
	},
	
	retrieve: function() {
		return this._stack;
	},
	
	_addRoutesToStack: function(routes_object) {
		var is = {
			name:			routes_object.getName(),
			path:			routes_object.getPath(),
			regex:			routes_object.getRegex(),
			controller: 	routes_object.getController(),
			action:			routes_object.getAction(),
			method: 		routes_object.getMethod(),
			constraints:	routes_object.getConstraints() 
		};
		this._stack.push(is);
	}
}


module.exports = Stacker;
