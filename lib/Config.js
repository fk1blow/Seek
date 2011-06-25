/**
 * Application paths
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
	'public':			ROOT_PATH + '/public',
	'error_template':	'' // If the path is not defined, the default one will be set
}


var AppPath = Klass({
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
		
		env: {},
		
		app_path: function() {
			return AppPath.getAllPaths();
		},
		
		config_path: function() {
			return AppPath.getPathFor('config');
		},
		
		setRoutes: function() {
			this.routes = require(this.config_path() + '/routes.js');
		},
		
		setEnvironment: function() {
			var env = require(this.config_path() + '/environment.js');
			
			this.env.defaults = {
				response: env.default_response || null,
				layout: env.default_layout || 'default_layout',
				state: env.state || 'development'
			}
		},
		
		getPathFor: function(what) {
			return AppPath.getPathFor(what);
		}
	}
});


module.exports = Config;
