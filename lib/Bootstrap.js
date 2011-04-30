function cl(o) {
	console.log(o);
}


/**
 * Application config and boostrap
 */
var AppPaths = (function() {
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
	
	return {
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
}());


/**
 * Set the Application's default controller/
 * @default ApplicationController
 */
var AppController = (function() {
	return {}
}());


/**
 * Config main class
 * @description The config class  loads all the configuration files
 * and sets the main attributes needed for the application
 */
Class('Config', {
	my: {
		has: {
			routes: {
				init: null
			},
			
			environment: {
				init: null
			},
			
			app_paths: {
				init: function() { return AppPaths.getAllPaths(); }
			},
			
			config_path: {
				init: AppPaths.getPathFor('config')
			}
		},
		
		methods: {
			setRoutes: function() {
				this.routes = require(this.config_path + '/routes.js')
			},
			
			setEnvironment: function() {
				this.environment = require(this.config_path + '/environment.js')
			},
			
			getPathFor: function(what) {
				return AppPaths.getPathFor(what);
			}
		}
	}
});


Class('Bootstrap', {
	methods: {
		initialize: function() {
			Config.setRoutes();
			Config.setEnvironment();
		}
	}
});

