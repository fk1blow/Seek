function cl(o) {
    console.log(o);
}


Module('Seek', function() {

	Module('ActionModule', function() {
		
		Class('BaseController', {
			does: Seek.View.Roles.Viewable,
			
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
				renderHTML: function(html) {
				   Seek.Mimes.Html.Base.renderHTML(html);
				},
				
				renderXML: function(xml) {
				   Seek.Mimes.XML.Base.renderXML(xml);
				},
				
				renderToLayout: function(view, locales) {
				   Seek.View.Base.renderToLayout(view, locales, this.layout);
				}
			}
		});
		
	});

});