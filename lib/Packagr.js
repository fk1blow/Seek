var Packages = {
	SeekControllers: {
		'Base': './ActionControllerPack/BaseController'
	},
	
	Router: {
		'Base': './Router/Router'
	}
}


var Loader = Klass({
	statics: {
		p: null,
		
		from: function(where) {
			this.p = where;
			return this;
		},
		
		load: function(what) {
			return require(Packages[this.p][what]);
		}
	}
});


module.exports = Loader;