/**
 * Application config and boostrap
 */
var paths = {
	'app': 				APP_PATH,
	'application': 		APP_PATH, // Alias
	'controllers': 		APP_PATH + '/controllers',
	'views': 			APP_PATH + '/views',
	'helpers':			APP_PATH + '/helpers',
	'models':			APP_PATH + '/models',
	'vendors':			ROOT_PATH + '/vendor',
	'config':			ROOT_PATH + '/config',
	'error_template':	'' // If the path is not defined, the default one will be set
}


var AppPaths = Klass({
	statics: {
		getAllPaths: function() {
			return paths;
		},
		
		getPathFor: function(what) {
			if(typeof(what) === 'string') {
				return paths[what];
			}
			return false;
		}
	}
});


/**
 * Config main class
 * @description The config class  loads all the configuration files
 * and sets the main attributes needed for the application
 */
var Config = Klass({
	statics: {
		routes: {
			init: null
		},
		
		environment: {
			init: null
		},
		
		app_paths: function() {
			return AppPaths.getAllPaths()
		},
		
		config_path: function() {
			return AppPaths.getPathFor('config');
		},
		
		setRoutes: function() {
			this.routes = require(this.config_path() + '/routes.js')
		},
		
		setEnvironment: function() {
			this.environment = require(this.config_path() + '/environment.js')
		},
		
		getPathFor: function(what) {
			return AppPaths.getPathFor(what);
		}
	}
});


module.exports = Config;