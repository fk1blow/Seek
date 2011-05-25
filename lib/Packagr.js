var Config = require('./Config');


var Packages = {
	SeekControllers: {
		'Base': './Controller/BaseController'
	},
	
	Config: {
		'Config': './Config'
	},
	
	Router: {
		'Base': './Router/Router'
	},
	
	TempDatabase: {
		'BaseDB': './ModelPack/DatabaseConnection'
	},
	
	Url: {
		'Response': './Http/Response'
	},
	
	Controllers: {
		modules_path: Config.getPathFor('controllers')
	},
	
	Views: {
		modules_path: Config.getPathFor('views')
	},
	
	AppConfig: {
		modules_path: Config.getPathFor('config')
	}
}


var Packagr = Klass({
	statics: {
		p: null,
		
		from: function(where) {
			this.p = where;
			return this;
		},
		
		load: function(what) {
			if(Packages[this.p].hasOwnProperty('modules_path')) {
				return this._loadFromApp(
					Packages[this.p]['modules_path'],
					what
				);
			}
			
			return require(Packages[this.p][what]);
		},
		
		_loadFromApp: function(from, what) {
			return require(from + '/' + what);
		}
	}
});


module.exports = Packagr;