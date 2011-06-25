var Renderer = require('./Renderer');


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
			this.layout = (layout === true) ? (Config.env.defaults.layout) : layout;
		},
		
		_setView: function(view) {
			this.view = (view === null) ? view : view;
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


module.exports = Mixed;