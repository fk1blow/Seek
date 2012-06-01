var Renderer = require('./Renderer');


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
			this.layout = (layout === true) ? (Config.env.defaults.layout) : layout;
		},
		
		_setView: function(view) {
			this.view = view;
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


module.exports = Template;
