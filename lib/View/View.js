var fs = require('fs'),
	Config = require('../Config'),
	Mimes = require('../Http/Mimes'),
	ViewUtils = require('./Utils'),
	Renderer = require('./Renderers/Renderer'),
	Simple = require('./Renderers/Simple'),
	Template = require('./Renderers/Template'),
	Mixed = require('./Renderers/Mixed'),
	ejs = require('ejs');


var getMime = function(mime) {
	return { 'Content-type': Mimes[mime] };
}


/**
 * BaseView
 */
var BaseView = {
	module_classes: {Mixed: Mixed, View: Simple, Template: Template}
};


/**
 * BaseView.Parameterize
 * 
 * @description builds a complex object from a render method call
 */
BaseView.Parameterize = {
	_options: {
		view: null,
		layout: false,
		what: null,
		as: 'html',
		locals: null,
		partial: null
	},
	
	getOptions: function() {
		return this._options;
	},
	
	/**
	 * setByView
	 * 
	 * @param {String} view_param - the view filename that should be rendered
	 * @description by defualt, this method will not render a layout
	 */
	setByView: function(view_param) {
		this._options.view = view_param.view_file;
		this._options.layout = false;
	},
	
	/**
	 * setByObject
	 * 
	 * @param {Object} object_param - the object containing the userd defined options(layout, content-type, locals, etc)
	 * @description by default this method will not render a layout unless defined
	 */
	setByObject: function(object_param) {
		var opt = object_param.options;
		this._options.layout = opt.layout || false;
		
		for(var i in this._options) {
			if(opt[i]) {
				this._options[i] = opt[i]
			}
		}
	},
	
	/**
	 * setByMixed
	 * 
	 * @param {Object} an object with view and options...
	 * @description splits the object into 2 parts - first is the view filename and the section an object
	 * containing user defined options(locals, layout, content-type)
	 */
	setByMixed: function(mixed_object) {
		var opt = mixed_object.options;
		this._options.layout = (opt.layout === false) ? false : opt.layout || true;
		this._options.view = mixed_object.view_file;
		
		for(var i in this._options) {
			if(opt[i]) {
				this._options[i] = opt[i]
			}
		}
	}
}


/**
 * BaseView.Factory
 * @description basic factory - creates a view assining all the necessary params in order to be rendered to the response object
 * @description based on the BaseView.Parameterize.options object
 */
BaseView.Factory = (function(ctx){
	var viewInstance = null;
	
	var renderClasses = {
		MIXED: 'Mixed',
		TEMPLATE: 'Template',
		VIEW: 'View'
	};
	
	return {	
		buildViewInstance: function(type, options) {
			if(options.view && options.what) {
				throw new Error('Both "view" and "what" response objects are defined. Which one to choose?')
			}
			
			var R = renderClasses[type];
			viewInstance = new BaseView.module_classes[R](options);
		}
	}
}(this));


BaseView.Renderer = {
	_renderer_type: null,
	
	render: function(res_end, options) {
		if(typeof(res_end) === 'string' && !options) {
			this._renderer_type = 'VIEW';
			BaseView.Parameterize.setByView({ view_file: res_end });
		}
		if (typeof(res_end) === 'object' && !options) {
			this._renderer_type = 'MIXED';
			BaseView.Parameterize.setByObject({ options: res_end });
		}
		if (typeof(res_end) === 'string' && typeof(options) === 'object') {
			this._renderer_type = 'TEMPLATE';
			BaseView.Parameterize.setByMixed({ view_file: res_end, options: options });
		}
		
		var opt = BaseView.Parameterize.getOptions();
		BaseView.Factory.buildViewInstance(this._renderer_type, opt);
	},
	
	renderToResponse: function(string_output, content_type) {
		Renderer.renderToResponse(string_output, content_type);
	}
};


module.exports = BaseView.Renderer;
