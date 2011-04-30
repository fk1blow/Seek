var eco = require('eco');
var fs = require('fs');


function cl(o) {
	console.log(o);
}


Module('Seek', function() {
	
	Module('View', function() {
		
		Class('Base', {
			my: {
				has: {
					renderer: {
						init: null
					},
					
					has_already_rendered: {
						init: false
					}
				},
				
				methods: {
					/**
					 * @name renderToLayout
					 * @description Renders a layout - also includes a view defined by @content_for_layout
					 */
					renderToLayout: function(view, locales, layout) {
						var self = this;
						var response = eco.render(Seek.View.File.loadTemplate(layout), {
							content_for_layout: this._loadContentForLayout(view, locales),
							renderPartial: function(partial, locales) {
								self.renderPartial(partial, locales);
							}
						});
						this._setRenderer(new Seek.Renderer.HTML({ body: response }));
					},
					
					/**
					 * @name renderXML
					 * @description renders an XML
					 */
					renderHTML: function(html) {
						this._setRenderer(new Seek.Renderer.HTML({ body: html }));
					},
					
					/**
					 * @name renderXML
					 * @description renders an XML
					 */
					renderXML: function(xml) {
						this._setRenderer(new Seek.Renderer.XML({ body: xml }));
					},
					
					/**
					 * @name renderJSON
					 * @description renders an JSON string
					 */
					renderJSON: function(json) {
						this._setRenderer(new Seek.Renderer.JSON({ body: json }));
					},
					
					/**
					 * @name renderPartial
					 * @description Renders a partial file to a view, layout, etc
					 */
					renderPartial: function(partial, locales) {
						//cl(partial)
						//cl(locales)
					},
					
					/**
					 * Renders a view(similar to renderView)
					 * - the main difference is that this method is used to load view files
					 *   from withing the framework directories itself(EX: /Error/errorTemplate.html.ejs)
					 */
					renderExtraView: function(view, extra_path, locales, extra_headers, status_code) {
						var v = Seek.View.File.loadExtraViewFile(view, extra_path);
						var p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						Seek.URL.Response.sendToBody(eco.render(v, p), extra_headers, status_code);
					},
					
					// Returns the response renderer (could be a view, layout, html, xml, json, etc)
					getResponse: function(auto_reset) {
						var r = this.renderer.render();
						if(this.renderer == null) {
							throw new Error('Unable to return a view response:: null renderer object.');
						}
						if(auto_reset) {
							this.clearResponse();
						}
						this.has_already_rendered = false;
						return r;
					},
					
					// Interogates to see if it has something to respond with
					hasSomeResponse: function() {
						return (this.renderer != null) ? true : false;
					},
					
					// Clear the response renderer in case of an Error, etc...
					clearResponse: function() {
						this.renderer = null;
						this.has_already_rendered = false;
					},
					
					/**
					 * @name _setRenderer
					 * @description Set the main renderer object
					 */
					_setRenderer: function(renderer) {
						if(this.has_already_rendered) {
							throw new Error('Render called multiple times');
							this.has_already_rendered = false;
						}
						this.has_already_rendered = true;
						this.renderer = renderer;
					},
					
					_loadContentForLayout: function(view, locales) {
						var self = this;
						var v = Seek.View.File.loadViewFile(view),
						p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						p['renderPartial'] = function(partial, locales) {
							self.renderPartial(partial, locales);
						}
						return eco.render(v, p);
					}
				}
			}
		});
		
	});
	
});