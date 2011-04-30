function cl(o) {
    console.log(o);
}


Module('Seek', function() {

	Module('ActionModule', function() {
		
		Class('BaseController', {
			does: Seek.View.Viewable,
			
			has: {
				request: {
					init: null
				},
				
				url: {
					init: null
				},
				
				params: {
					init: null
				},
				
				controller_name: {
					init: null
				},
				
				action_name: {
					init: null
				}
			},
			
			methods: {
				renderToLayout: function(view, locales) {
				   Seek.View.Base.renderToLayout(view, locales, this.layout);
				},
				
				renderHTML: function(html) {
					Seek.View.Base.renderHTML(html);
				},
				
				renderXML: function(xml) {
					Seek.View.Base.renderXML(xml);
				},
				
				renderJSON: function(json) {
					Seek.View.Base.renderJSON(json);
				}
			}
		});
		
	});

});