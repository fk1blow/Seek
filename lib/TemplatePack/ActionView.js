var eco = require('eco');
var fs = require('fs');

function cl(o) {
	console.log(o);
}


Module('ActionView', function() {
	
	Class('Base', {
		my: {
			has: {
				layout: {
					init: null
				},
				
				view: {
					init: null
				},
				
				view_params: {
					init: null
				},
				
				body: {
					init: null
				}
			},
			
			methods: {
				render: function(view, params) {
					// Initializers
					this.view_params = params;
					this.view = view;
					
					// Load layout
					this.layout = ActionView.ViewLoader.loadLayoutFile();
					
					// Render layout
					ActionView.Renderer.renderLayout(this.layout, this.view, this.view_params);
				}
			}
		}
	});
	
	
	Class('Renderer', {
		my: {
			has: {},
			
			methods: {
				renderLayout: function(layout, view, params) {
					var self = this;
					
					//var p = {
					//	render: function(what) {
					//		return self._renderInContext(what, params);
					//	},
					//	view: view
					//};
					//
					//for(var i in params) {
					//	p[i] = params[i];
					//}
					
					var r = eco.render(layout, {
						eco: eco
					});
					
					ActiveRequest.setResponse(r);
				},
				
				_renderInContext: function(what, params) {
					//var p = {};
					//
					//for(var i in params) {
					//	p[i] = params[i];
					//}
					//
					//return eco.render(what, params);
				},
				
				renderView: function(view, locals) {
					var v = ActionView.ViewLoader.loadViewFile(view);
					
					var p = {};
					
					for(var i in locals) {
						p[i] = locals[i];
					}
					
					return eco.render(v, p);
				}
			}
		}
	});
	
});


// Utils.loadFile(Config.getPathFor('controllers') + '/' + file);