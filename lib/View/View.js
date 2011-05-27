var fs = require('fs'),
	Response = require('../Http/Response'),
	Mimes = require('../Http/Mimes'),
	ViewUtils = require('./Utils'),
	ejs = require('ejs');


var getMime = function(mime) {
	return { 'Content-type': Mimes[mime] };
}


var Renderer = Klass({
	statics: {
		renderToResponse: function(response, content_type) {
			if(typeof(response) == 'string') {
				Response.sendToBody(response, getMime(content_type));
			}
		},
	},
	
	attributes: {
		debugmode: false,
		default_extension: '.ejs',
		default_content_type: { 'Content-type': 'text/html' }
	},
	
	methods: {
		renderLayout: function(view, locals, layout, content_type) {
			var self = this;
			var layout_locals = {
				content_for_layout: this._loadContentForLayout(view, locals)
			};
			for(var i in locals) {
				layout_locals[i] = locals[i];
			}
			var response = ejs.render(ViewUtils.loadTemplate(layout), {
				locals: layout_locals
			});
			return response;
		},
		
		renderView: function(view, locals) {
			var self = this;
			var v = ViewUtils.loadViewFile(view);
			return ejs.render(v, { locals: locals });
		},
		
		renderStringToLayout: function(output_string, locals, layout, content_type) {
			var self = this;
			var layout_locals = {
				content_for_layout: output_string
			};
			for(var i in locals) {
				layout_locals[i] = locals[i];
			}
			var response = ejs.render(ViewUtils.loadTemplate(layout), {
				locals: layout_locals
			});
			return response;
		},
		
		renderString: function(output_string) {
			var v = output_string;
			return ejs.render(v);
		},
		
		_loadContentForLayout: function(view, locals) {
			var self = this;
			var v = ViewUtils.loadViewFile(view);
			return ejs.render(v, { locals: locals });
		},
	}
});


var Template = Klass({
	Extends: Renderer,
	
	attributes: {
		view: null,
		layout: true,
		locals: null,
		content_type: { 'Content-type': 'text/html' }
	},
	
	methods: {
		initialize: function(options) {
			// Sets the template's layout
			this._setLayout(options.layout);
			
			// Sets the view that vill render(if not set to false)
			this._setView(options.view);
			
			// Sets the content-type of the response
			this._setContentType(options.as);
			
			// Sets the local variables available to the layout and the view
			this._setLocals(options.locals);
			
			// Finally renders the template
			this._render();
			
			// Debugs the object
			this._debug();
		},
		
		_render: function() {
			var response = '';
			if(this.layout == false || this.layout == null) {
				response = this.renderView(this.view, this.locals);
			} else {
				response = this.renderLayout(this.view, this.locals, this.layout, this.content_type);
			}
			Response.sendToBody(response, this.content_type);
		},
		
		_setLayout: function(layout) {
			this.layout = (layout === true) ? ('default.html' + this.default_extension) : layout;
		},
		
		_setView: function(view) {
			this.view = view + this.default_extension;
		},
		
		_setLocals: function(locals) {
			this.locals = locals;
		},
		
		_setContentType: function(ctype) {
			this.content_type = getMime(ctype);
		},
		
		_debug: function() {
			if(!this.debugmode) return true;
			cl('__Renderer.Template__')
			cl('layout:: ', this.layout);
			cl('view:: ', this.view);
			cl('locals:: ', this.locals);
			cl('content-type:: ', this.content_type);
		}
	}
});


var View = Klass({
	Extends: Renderer,
	
	attributes: {
		view: null,
		locals: null,
		content_type: { 'Content-type': 'text/html' }
	},
	
	methods: {
		initialize: function(options) {
			// Sets the view that vill render(if not set to false)
			this._setView(options.view);
			
			// Sets the content-type of the response
			this._setContentType(options.as);
			
			// Sets the local variables available to the layout and the view
			this._setLocals(options.locals);
			
			// Finally renders the view
			this._render();
			
			// Debugs the object
			this._debug();
		},
		
		_render: function() {
			var response = this.renderView(this.view, this.locals);
			Response.sendToBody(response, this.content_type);
		},
		
		_setView: function(view) {
			this.view = view + this.default_extension;
		},
		
		_setLocals: function(locals) {
			this.locals = locals;
		},
		
		_setContentType: function(ctype) {
			this.content_type = getMime(ctype);
		},
		
		_debug: function() {
			if(!this.debugmode) return true;
			cl('__Renderer.View__')
			cl('view:: ', this.view);
			cl('locals:: ', this.locals);
			cl('content-type:: ', this.content_type);
		}
	}
});


var Mixed = Klass({
	Extends: Renderer,
	
	attributes: {
		what: false,
		view: false,
		layout: true,
		locals: null,
		content_type: { 'Content-type': 'text/html' }
	},
	
	methods: {
		initialize: function(options) {
			// Sets the template's layout
			this._setLayout(options.layout);
			
			// Sets the view that vill render(if not set to false)
			this._setView(options.view);
			
			// Sets the what object
			this._setWhat(options.what)
			
			// Sets the content-type of the response
			this._setContentType(options.as);
			
			// Sets the local variables available to the layout and the view
			this._setLocals(options.locals);
			
			// Finally renders the template
			this._render();
			
			// Debugs the object
			this._debug();
		},
		
		_render: function() {
			var has_layout = (this.layout != null && this.layout != false),
				has_view = (this.view != null && this.view != false),
				has_what = (!has_view && (this.what != null && this.what != false)),
				response = '';
			
			// What Layout == true
			if(has_what && has_layout) {
				response = this.renderStringToLayout(this.what, this.locals, this.layout, this.content_type);
			}
			// What Layout == false
			if(has_what && has_layout == false) {
				response = this.renderString(this.what);
			}
			// View Layout == true
			if(has_view && has_layout) {
				response = this.renderLayout(this.view, this.locals, this.layout, this.content_type);
			}
			// View Layout == false
			if(has_view && has_layout == false) {
				response = this.renderView(this.view, this.locals);
			}
			Response.sendToBody(response, this.content_type);
		},
		
		_setLayout: function(layout) {
			this.layout = (layout === true) ? ('default.html' + this.default_extension) : layout;
		},
		
		_setView: function(view) {
			this.view = (view === null) ? view : view + this.default_extension;
		},
		
		_setWhat: function(what) {
			this.what = what
		},
		
		_setLocals: function(locals) {
			this.locals = locals;
		},
		
		_setContentType: function(ctype) {
			this.content_type = getMime(ctype);
		},
		
		_debug: function() {
			if(!this.debugmode) return true;
			cl('__Renderer.Mixed__')
			cl('what:: ', this.what);
			cl('view:: ', this.view);
			cl('locals:: ', this.locals);
			cl('content-type:: ', this.content_type);
		}
	}
});


/**
 * BaseView
 */
var BaseView = {
	module_classes: {Mixed: Mixed, View: View, Template: Template}
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
