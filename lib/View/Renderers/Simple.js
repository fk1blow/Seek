var Renderer = require('./Renderer');


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
			cl('__Renderer.View__')
			cl('view:: ', this.view);
			cl('locals:: ', this.locals);
			cl('content-type:: ', this.content_type);
		}
	}
});


module.exports = View;