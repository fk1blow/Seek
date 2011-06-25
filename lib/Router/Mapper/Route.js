var Inflection = require('../../Inflection/Inflection');


var Route = Klass({
	attributes: {
		_crud_actions: [ 'index', 'show', 'add', 'create', 'edit', 'update', 'destroy' ],
		_lazy_actions: [ 'show', 'edit', 'update', 'destroy' ],
		_resources: [] // this array should be used to retrieve the new routes builded by a route class
	},
	
	methods: {
		getResources: function() {
			
		},
		
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
});





module.exports = Route;
