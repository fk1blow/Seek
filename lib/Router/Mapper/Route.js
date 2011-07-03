var Inflection = require('../../Inflection/Inflection');


var Route = Klass({
	attributes: {
		_name: 			null,
		_path: 			null,
		_controller: 	null,
		_action: 		null,
		_method: 		null,
		_regex: 		null,
		_constraints:	null,
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
		},
		
		getConstraints: function() {
			return this._constraints;
		}
	}
});


var Utils = {
	default_regex: '[\\w\\_]+',
	
	constraintize: function(path, constraints) {
		var tmp_path = path,
			rc = constraints,
			ref = null;
		
		for(var i in rc) {
			if(rc.hasOwnProperty(i)) {
				ref = ((ref) ? ref : tmp_path).replace(':'+i, rc[i].toString().replace(/[\/]+/g, ''));
			}
		}
		
		// replace all the remaining segments if there are some left...
		if(ref) {
			ref = this.replaceWith((ref) ? ref : tmp_path, /:[\w\-]+/g, this.default_regex);
		} else {
			ref = this.replaceWith(tmp_path, /:[\w\_\-]+/g, this.default_regex);
		}
		
		//cl(ref)
		
		return ref;
	},
	
	standardize: function(route_path) {
		//var path_cleaned = route_path.replace(/[\.\,]/)
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
