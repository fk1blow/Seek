var ActiveRouter = require('../Router/ActiveRouter'),
	View = require('../View/View'),
	Request = require('../Http/Request'),
	Helper = require('../Helpers/Helper');


var BaseController = Klass({
	attributes: {},
	
	methods: {
		render: function(view, options) {
			View.render(view, options);
		},
		
		renderToResponse: function(string_output, content_type) {
			View.renderToResponse(string_output, content_type);
		},
		
		/**
		 * Gets the request default attributes
		 * - request object
		 * - query string params
		 * - method type
		 * - current url
		 * - post data
		 */
		request: function(field) {
			if(field && field.length > 0) {
				var f_method = 'get' + Helper.Common.toUpcase(field);
				try {
					return Request.Factory()[f_method]();
				} catch(e) {
					throw new Error('Unable to call ' + f_method);
				}
			}
			return null;
		},
		
		
		/**
		 * Gets the router default attributes
		 * - controller name
		 * - action name
		 * - params
		 */
		router: function(field) {
			if(field && field.length > 0) {
				var f_method = 'get' + Helper.Common.toUpcase(field);
				try {
					return ActiveRouter[f_method]();
				} catch(e) {
					throw new Error('Unable to call ' + f_method);
				}
			}
			return null;
		},
		
		/**
		 * @name isAjax
		 * Return true if request is ajax, false otherwise
		 */
		isAjax: function() {
			return Helper.Request.isAjax();
		},
		
		/**
		 * @name format
		 * Calls the callback function if the request content-type or return boolean
		 */
		format: function(options) {
			return Helper.Request.format(options);
		}
	}
});


module.exports = BaseController;
