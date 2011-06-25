var Inflection = require('../../Inflection/Inflection');


var Route = Klass({
	attributes: {
		_name: 			null,
		_path: 			null,
		_controller: 	null,
		_action: 		null,
		_method: 		null,
		_regex: 		null,
		_crud_actions: 	[ 'index', 'show', 'add', 'create', 'edit', 'update', 'destroy' ],
		_lazy_actions: 	[ 'show', 'edit', 'update', 'destroy' ]
	},
	
	methods: {
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


var Utils = {
	constraintize: function(path, constraints) {
		var rc = constraints,
			ref = null;
		
		for(var i in rc) {
			if(rc.hasOwnProperty(i))
				ref = ((ref) ? ref : path).replace(':'+i, rc[i]);
		}
		// replace all the remaining segments
		if(ref) {
			ref = this.replaceWith((ref) ? ref : path, /:[\w]+/g, '[\\w\\_]+');
		} else {
			ref = this.replaceWith(path, /:[\w]+/g, '[\\w\\_]+');
		}
		return ref;
	},
	
	standardize: function(route_path) {
		var res = route_path.replace(/\)/g, ')?').replace(/[\/]+/g, '\\/');
		return res
	},
	
	splitString: function(string, needle) {
		var arr = string.split(needle)
		return arr.splice(1, arr.length);
	},
	
	replaceWith: function(target, needle, haystack) {
		return target.replace(needle, haystack);
	},
	
	removeQS: function(url) {
		return url.split(/\?|;/)[0];
	}
}





exports.Route = Route;

exports.Utils = Utils;
