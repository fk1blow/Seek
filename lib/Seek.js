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
		'module_includes': ['ActiveRequest',
							'ActiveServer']
	},
	
	ActionControllerPack: {
		'module_path': '/ActionControllerPack',
		'module_includes': ['ActionController',
							'ActionFilters',
							'ActionView',
							'BaseController',
							'ControllerBuilder',
							'Exceptions',
							'Request',
							'ActionRouter',
							'Standardizr']
	},
	
	TemplatePack: {
		'module_path': '/TemplatePack',
		'module_includes': ['ActionView',
							'ViewLoader',
							'Partial',
							'ViewHelpers',
							'ViewRenderer']
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
 * Main Seek class Object
 * @todo Instantiate this class instead of static a call
 */
Class('Seek', {
	my: {
		has: {
			modules_loaded: {
				init: false
			}
		},
		
		methods: {
			initialize: function() {
				this.loadModules();
				if(this.modules_loaded)
					var bootstrap = new Boostrap();
			},
			
			loadModules: function() {
				var modules = SeekModules;
				
				for(var item in modules) {
					var mp = modules[item]['module_path'];
					var mi = modules[item]['module_includes'];
					if(!fs.lstatSync(__dirname + mp).isDirectory()) {
						return false;
					}
					this._loadFromDirectory(mp, mi);
				}
				
				this.modules_loaded = true;
			},
			
			_loadFromDirectory: function(mp, mi) {
				var self = this;
				fs.readdirSync(__dirname + mp).forEach(function(f) {
					if(self._isRequired(f, mp) && self._isJSFile(f)) {
						var fname = __dirname + mp + '/' + f;
						var name = fname.substr(0, fname.lastIndexOf('.'));
						require(name);
					}
				});
			},
			
			_isJSFile: function(filename) {
				return /\.js$/.test(filename);
			},
			
			_isRequired: function(filename, modules) {
				return modules.indexOf(filename.replace('.js', '') >= 0);
			}
		}
	}
});


module.exports = Seek;

