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
					layout: {
						init: null
					},
					view: {
						init: null
					},
					
					locales: {
						init: null
					}
				},
				
				methods: {
					renderToLayout: function(view, locales, layout) {
						// Initializers
						this.locales = locales;
						this.view = view;
						
						/**
						 * Load layout
						 * This should be more module to load a user specific layout if defined
						 */
						this.layout = Seek.ViewLoader.loadTemplate(layout);
						
						// Render layout
						Seek.View.Renderer.renderLayout(this.layout, this.view, this.locales);
					},
					
					_loadContent: function() {
						return View.Renderer._loadContent(this.view, this.locales);
					},
					
					setRendered: function(value) {
						this.has_rendered = value;
					},
					
					hasRendered: function() {
						return this.has_rendered;
					}
				}
			}
		});
		
		
		Class('Renderer', {
			my: {
				has: {},
				
				methods: {
					renderLayout: function(layout, view, locales) {
						var self = this;
						var c = Seek.View.Renderer._loadContentForLayout(view, locales);
						var r = eco.render(layout, {
							eco: eco,
							content_for_layout: c
						});
						
						Seek.URL.Response.sendToBody(r, {
							'Content-type': 'text/html'
						});
					},
					
					_loadContentForLayout: function(view, locales) {
						var v = Seek.ViewLoader.loadViewFile(view);
						var p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						return eco.render(v, p);
					},
					
					/**
					 * Renders a partial file
					 * The partials are locate in /view/partials
					 */
					render: function(view, locales) {
						var v = Seek.ViewLoader.loadViewFile(view);
						var p = {};
						for(var i in locales) {
							p[i] = locales[i];
						}
						return eco.render(v, p);
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