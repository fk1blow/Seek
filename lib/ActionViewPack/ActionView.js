var eco = require('eco');
var fs = require('fs');

function cl(o) {
	console.log(o);
}


Module('Seek', function() {
	
	Module('View', function() {
		
		Class('Stacker', {
			my: {
				has: {
					stack: {
						init: {
							layout: null,
							view: null,
							locales: null
						}
					}
				},
				
				methods: {
					setStack: function(layout, view, locales) {
						this.stack.layout = layout;
						this.stack.view = view;
						this.stack.locales = locales;
					},
					
					getStack: function(reset_after) {
						return this.stack;
						if(reset_after) this.reset();
					},
					
					reset: function() {
						this.stack.layout = null;
						this.stack.view = null;
						this.stack.locales = null;
					}
				}
			}
		});
		
		
		Class('Base', {
			my: {
				has: {
					layout: { init: null },
					view: { init: null },
					locales: { init: null }
				},
				
				methods: {
					hasStack: function() {
						var stack = Seek.View.Stacker.getStack();
						var no_stack = 0;
						for(var i in stack) {
							if(stack[i] != null) {
								no_stack += 1;
							}
						}
						return (no_stack == 0) ? false : true;
					},
					
					renderToLayout: function(view, locales, layout) {
						// Initializers
						this.layout = Seek.ViewLoader.loadTemplate(layout);
						this.view = view;
						this.locales = locales;
						
						// Stack handlers
						Seek.View.Stacker.setStack(this.layout, this.view, this.locales);
					},
					
					renderView: function(view, locales, extra_path) {
						Seek.View.Renderer.renderView(view, locales);
					},
					
					renderExtraView: function(view, extra_path, locales, extra_headers, status_code) {
						Seek.View.Renderer.renderExtraView(view, extra_path, locales, extra_headers, status_code);
					},
					
					sendStack: function() {
						var stack = Seek.View.Stacker.getStack(true);
						Seek.View.Renderer.renderLayout(stack.layout, stack.view, stack.locales);
						this.clearStack();
					},
					
					clearStack: function() {
						Seek.View.Stacker.reset();
					}
				}
			}
		});
		
		
		Class('Renderer', {
			my: {
				has: {},
				
				methods: {
					renderLayout: function(layout, view, locales) {
						var self = this,
						c = Seek.View.Renderer._loadContentForLayout(view, locales),
						r = eco.render(layout, {
							eco: eco,
							content_for_layout: c
						});
						this._sendToBody(r);
					},
					
					_loadContentForLayout: function(view, locales) {
						var v = Seek.ViewLoader.loadViewFile(view),
						p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						return eco.render(v, p);
					},
					
					/**
					 * Renders only a View without the need of a layout
					 */
					renderView: function(view, locales) {
						var v = Seek.ViewLoader.loadViewFile(view),
						p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						this._sendToBody(eco.render(v, p));
					},
					
					/**
					 * @todo TBD
					 * Renders a partial file
					 * The partials are locate in /view/partials
					 */
					render: function(view, locales) {
						var v = Seek.ViewLoader.loadViewFile(view),
						p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						return eco.render(v, p);
					},
					
					/**
					 * Renders a view(similar to renderView)
					 * - the main difference is that this method is used to load view files
					 *   from withing the framework directories itself(EX: /Error/errorTemplate.html.ejs)
					 */
					renderExtraView: function(view, extra_path, locales, extra_headers, status_code) {
						var v = Seek.ViewLoader.loadExtraViewFile(view, extra_path);
						var p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						var r = eco.render(v, p);
						this._sendToBody(r, extra_headers, status_code);
					},
					
					/**
					 * This will send the response(usually html within this package) to ActiveRequest
					 */
					_sendToBody: function(response, extra_headers, status_code) {
						var headers = extra_headers || { 'Content-type': 'text/html' };
						Seek.URL.Response.sendToBody(response, headers, status_code);
					}
				}
			}
		});
		
		
		/**
		 * View specific roles
		 */
		Module('Roles', function() {
		
			Role('Viewable', {
				has: {
					layout: {
						init: null
					},
					view: {
						init: null
					}
				},
				
				methods: {
					/**
					 * @name renderHTML
					 * @description should render only plain html, without the help of the layout
					 * @param html {String} string containing html text
					 */
					renderHTML: function(html) {},
					
					/**
					 * @name renderXML
					 * @description renders plain xml to response object
					 * @param xml {String} self-explanatory
					 */
					renderXML: function(xml) {},
					
					/**
					 * @name renderToLayout
					 * @description Renders the desired view to the layout
					 * @param view {String} string containing the view's name
					 * @param locales {Object} an object containing the locales sent to the layout
					 */
					renderToLayout: function(view, locales) {}
				}
			});
			
		});
		
	});
	
});