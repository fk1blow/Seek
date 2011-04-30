function cl(o) {
    console.log(o);
}


/**
 * Error object
 *
 * - should make an object defining the section of the modules where the error has occured
 * - this class should be called from everywhere within the framework
 */
Module('Seek', function() {
	
	Class('Errors', {
		my: {
			has: {
				errors: {
					init: null
				},
				
				section: {
					init: null
				},
				
				types: {
					init: ['not_defined', 'non_object_property_load', 'non_object_property_call']
				}
			},
			
			methods: {
				add: function(err_object) {
					this.errors = err_object;
					this.errors.headers = err_object.headers || 500;
				},
				
				retrieve: function() {
					return this.errors;
				},
				
				reset: function() {
					this.errors = null;
				},
				
				handleErrors: function() {
					Seek.HandleError.renderError(this.errors);
					this.reset();
				},
				
				hasErrors: function() {
					return (this.errors == null) ? false : true;
				}
			}
		}
	});
	
	
	Class('HandleError', {
		my: {
			has: {
				handle_error_output: {
					init: 'view'
				}
			},
			
			methods: {
				renderError: function(errors) {
					Seek.View.Base.renderExtraView('errorTemplate.html.ejs',
						__dirname + '/../Error/', {
							title: errors.error_object,
							error_stack_message: errors.error_object,
							error_stack: errors.error_object.stack.replace(errors.error_object, '').split(/\n/i),
							request_object: {
								url: Seek.URL.Request.getUrl(),
								params: ActionModule.ActionRouter.getParams()
							},
							controller: 'someController',
							action: 'someAction'
						}, null, 500);
				}
			}
		}
	});
	
});