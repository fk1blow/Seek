Module('Seek', function() {
	
	Class('ErrorHandler', {
		my: {
			has: {
				handle_error_output: {
					init: 'view'
				},
				
				error_template_path: {
					init: __dirname + '/../Error/'
				},
				
				error_template_file: {
					init: 'errorTemplate.html.ejs'
				}
			},
			
			methods: {
				renderError: function() {
					Seek.View.Base.renderExtraView(this.error_template_file, {
						error_object: err,
						request: Seek.URL.Request.getRequest(),
						router_object: Seek.ActiveDispatcher.Router.getCurrentRoute(),
						params: Seek.ActionModule.ActionRouter.getParams()
					}, this.error_template);
				}
			}
		}
	});
	
});