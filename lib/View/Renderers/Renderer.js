var ViewUtils = require('../Utils'),
	Response = require('../../Http/Response'),
	Mimes = require('../../Http/Mimes');


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
		default_extension: '.html.ejs',
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


module.exports = Renderer;
