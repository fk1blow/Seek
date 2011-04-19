function cl(o) {
    console.log(o);
}

/**
 * Node.js filesystem
 */
var fs = require('fs');


/**
 * Joose.js class system
 */
require('task-joose-nodejs').Class;


/**
 * Root path => /
 */
global.ROOT_PATH = process.cwd();


/**
 * Application path => /app
 */
global.APP_PATH = process.cwd() + '/app';


/**
 * Seek framework specific paths
 */
var SeekModules = {
	ActiveRequest: {
		'module_path': '/Request',
		'module_includes': ['Url',
							'ActiveRequest',
							'ActiveServer']
	},
	
	ViewPack: {
		'module_path': '/TemplatePack',
		'module_includes': ['ActionView',
							'ViewLoader',
							'Mimes',
							'File',
							'ViewHelpers',
							'ViewRenderer']
	},
	
	ActionControllerPack: {
		'module_path': '/ActionControllerPack',
		'module_includes': ['ActionController',
							'ActionFilters',
							'ActionView',
							'BaseController',
							'ControllerBuilder',
							'Request',
							'ActionRouter',
							'Standardizr']
	},
	
	Router: {
		'module_path': '/Router',
		'module_includes': ['Router']
	},
	
	Utils: {
		'module_path': '/Utils',
		'module_includes': ['Utils',
							'Error']
	},
	
	ActiveDispatcher: {
		'module_path': '/ActiveDispatcher',
		'module_includes': ['ActiveDispatcher']
	},
	
	Bootstrap: {
		'module_path': '',
		'module_includes': ['Bootstrap']
	}
}


/**
 * Main Seek object
 * @todo Instantiate this class instead of static a call
 */
Module('Seek', function() {
	Class('Initializer', {
		has: {
			modules_loaded: {
				init: false
			}
		},
		
		methods: {
			initialize: function() {
				this.loadModules();
				
				// If all modules are loaded then init the Bootstrap
				if(this.modules_loaded)
					var bootstrap = new Bootstrap();
			},
			
			loadModules: function() {
				var modules = SeekModules;
				for(var item in modules) {
					var mp = modules[item]['module_path'];
					var mi = modules[item]['module_includes'];
					if(fs.lstatSync(__dirname + mp).isDirectory())
						this._loadFromDirectory(mp, mi);
				}
				this.modules_loaded = true;
			},
			
			_loadFromDirectory: function(mp, mi) {
				var self = this;
				fs.readdirSync(__dirname + mp).forEach(function(f) {
					if(self._isRequired(f, mi) && self._isJsFile(f)) {
						var fname = __dirname + mp + '/' + f;
						var name = fname.substr(0, fname.lastIndexOf('.'));
						require(name);
					}
				});
			},
			
			_isJsFile: function(filename) {
				return /\.js$/.test(filename);
			},
			
			_isRequired: function(filename, module) {
				return module.indexOf(filename.replace('.js', '')) >= 0;
			}
		}
	});
});


module.exports = Seek;
