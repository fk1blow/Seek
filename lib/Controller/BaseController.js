var ActiveRouter = require('../Router/ActiveRouter'),
	View = require('../View/View'),
	Request = require('../Http/Request');


function toUpcase(string) {
	return string.substr(0, 1).toUpperCase() + string.substr(1);
}


var BaseController = Klass({
	attributes: {},
	
	methods: {
		render: function(view, options) {
			View.render(view, options);
		},
		
		renderToResponse: function(string_output, content_type) {
			View.renderToResponse(string_output, content_type);
		},
		
		request: function(field) {
			if(field && field.length > 0) {
				var f_method = 'get' + toUpcase(field);
				try {
					return Request.Factory()[f_method]();
				} catch(e) {
					throw new Error('Unable to call ' + f_method);
				}
			}
			return null;
		},
		
		router: function(field) {
			if(field && field.length > 0) {
				var f_method = 'get' + toUpcase(field);
				try {
					return ActiveRouter[f_method]();
				} catch(e) {
					throw new Error('Unable to call ' + f_method);
				}
			}
			return null;
		}
	}
});


module.exports = BaseController;
