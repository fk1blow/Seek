var fs = require('fs'),
ejs = require('ejs'),
File = require('./File'),
UrlResponse = require('../Http/URL_Response');


var ActionView = Klass({
	statics: {
		renderer: null,
		
		has_already_rendered: false,
		
		content_types: {
			xml: {  'Content-type': 'text/xml' },
			html: { 'Content-type': 'text/html' },
			json: { 'Content-type': 'application/json' }
		},
		
		/**
		 * @name renderToLayout
		 * @description Renders a layout - also includes a view defined by @content_for_layout
		 */
		renderToLayout: function(view, locales, layout) {
			var self = this;
			var cfl = this._loadContentForLayout(view, locales);
			
			var response = ejs.render(File.loadTemplate(layout), {
				locals: {
					content_for_layout: cfl,
					renderPartial: function(partial, locales) {
						self.renderPartial(partial, locales);
					}
				}
			});
			this._sendResponseBody(response, this.content_types.html);
		},
		
		_loadContentForLayout: function(view, locales) {
			var self = this;
			var v = File.loadViewFile(view),
			p = {};
			for(var i in locales) {
				p[i] = locales[i];
			}
			p['renderPartial'] = function(partial, locales) {
				self.renderPartial(partial, locales);
			}
			return ejs.render(v, p);
		},
		
		/**
		 * @name renderXML
		 * @description renders an XML
		 */
		renderHTML: function(body) {
			this._sendResponseBody(body, this.content_types.html);
		},
		
		/**
		 * @name renderXML
		 * @description renders an XML
		 */
		renderXML: function(body) {
			this._sendResponseBody(body, this.content_types.xml);
		},
		
		/**
		 * @name renderJSON
		 * @description renders an JSON string
		 */
		renderJSON: function(body) {
			this._sendResponseBody(JSON.stringify(body), this.content_types.json);
		},
		
		/**
		 * @name renderPartial
		 * @description Renders a partial file to a view, layout, etc
		 */
		renderPartial: function(partial, locales) {
			//
		},
		
		/**
		 * Renders a view(similar to renderView)
		 * - the main difference is that this method is used to load view files
		 *   from withing the framework directories itself(EX: /Error/errorTemplate.html.ejs)
		 */
		renderExtraView: function(view, extra_path, locales, extra_headers, status_code) {
			var v = File.loadExtraViewFile(view, extra_path);
			var p = {};
			for(var i in locales) {
				p[i] = locales[i];
			}
			Seek.URL.Response.sendToBody(ejs.render(v, p), extra_headers, status_code);
		},
		
		
		_sendResponseBody: function(body, content_type) {
			UrlResponse.sendToBody(body, content_type);
		}
	}
});


module.exports = ActionView;
