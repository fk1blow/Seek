
/**
 * Root path => /
 */
GLOBAL.ROOT_PATH = process.cwd();


/**
 * Application path => /app
 */
GLOBAL.APP_PATH = process.cwd() + '/app';


/**
 * Instead of trying to declare this shortcut function in every module
 */
GLOBAL.cl = function(o) {
    console.log(o);
}


/**
 * Global Class system
 */
GLOBAL.Klass = require('./seek.class').Class;


/**
 * @name Packages
 * @description Loads file from seek framework... temporarely global 
 */
GLOBAL.Packagr = require('./Packagr');


/**
 * Node.js filesystem
 */
var fs = require('fs');


/**
 * Loads the Bootstrap
 */
var Bootstrap = require('./Bootstrap').Bootstrap;


/**
 * ActiveServer object
 */
var ActiveServer = require('./Http/ActiveServer');


/**
 * Seek framework required packages
 */
var SeekModules = {
	Utils: {
		'module_path': '/Utils',
		'module_includes': ['Utils']
	},
	
	File: {
		'module_path': '/File',
		'module_includes': 'File'
	},
	
	Router: {
		'module_path': '/Router',
		'module_includes': ['Router',
							'ActiveRouter']
	},
	
	Http: {
		'module_path': '/Http',
		'module_includes': ['URL_Base',
							'URL_Response',
							'URL_Request',
							'ActiveRequest',
							'ActiveServer']
	},
	
	ActionViewPack: {
		'module_path': '/ActionViewPack',
		'module_includes': ['ActionView',
							'Stack',
							'Viewable',
							'File',
							'Helpers']
	},
	
	ActionControllerPack: {
		'module_path': '/ActionControllerPack',
		'module_includes': ['ActionController',
							'Validators',
							'Filters',
							'BaseController',
							'ActionRouter',
							'Standardizr']
	},
	
	Errors: {
		'module_path': '/Error',
		'module_includes': ['Error',
							'ErrorHandler']
	},
	
	Bootstrap: {
		'module_path': '',
		'module_includes': ['Bootstrap']
	}
}


/**
 * Main Seek object
 */
var Seek = Klass({
	methods: {
		initialize: function() {
			console.log('creating a new seek...');
			var bootstrap = new Bootstrap();
		},
		
		handleRequest: function(req, res) {
			ActiveServer.handleRequest(req, res);
		}
	}
});


module.exports = Seek;
