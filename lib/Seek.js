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
    console.log.apply(console, Array.prototype.slice.call(arguments));
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
var ActiveServer = require('./Http/Server');


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
		'module_includes': ['HttpDispatcher',
							'Mimes',
							'Request',
							'Response',
							'Server']
	},
	
	View: {
		'module_path': '/ActionViewPack',
		'module_includes': ['View',
							'Utils',
							'Mimes']
	},
	
	Controller: {
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
			console.log('Seeking application...');
			var bootstrap = new Bootstrap();
		}
	}
});


exports.Seek = Seek;


exports.handleRequest = function(req, res) {
	ActiveServer.handleRequest(req, res);
}
