var url = require('url'),
	querystring = require('querystring');


var Request = Klass({
	attributes: {
		request: null,
		
		data: null,
		
		method: null,
		
		url: null,
		
		headers: null,
		
		ip_address: null,
		
		params: null,
		
		_method_params: ['get', 'post']
	},
	
	methods: {
		initialize: function(request, data) {
			if(typeof(request) != 'object') {
				throw new Error('Invalid request object. Halting!');
			}
			
			// Sets the main request object
			this.request = request;
			
			// Sets the request data - POST data
			this._setPostParams(data);
		},
		
		_setPostParams: function(data) {
			if(this.request.method === 'POST') {
				this.data = data;
			}
		},
		
		getData: function() {
			return this.data;
		},
		
		// this will fail...doooh
		getRequest: function(request_object) {
			return request_object;
		},
		
		getMethod: function() {
			return this.request.method;
		},
		
		getUrl: function() {
			return this.request.url;
		},
		
		getHeaders: function() {
			return this.request.headers;
		},
		
		getRemoteAddress: function() {
			return this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
		}
	}
});


/**
 * Request interface
 * @todo Refactor
 * @package Http
 */
var RequestFactory = (function() {
	var instance = null;
	
	return {
		instance: null,
		
		Build: function(req, callback) {
			var self = this;
			
			if(req.method === 'POST') {
				var _REQUEST_DATA = {};
				var _CONTENT = '';
				
				req.addListener('data', function(chunk) {
					_CONTENT += chunk;
				});
				
				req.addListener('end', function() {
					_REQUEST_DATA = querystring.parse(_CONTENT);
					self.instance = new Request(req, _REQUEST_DATA);
					callback.call(callback)
				});
			} else {
				this.instance = new Request(req);
				callback.call(callback)
			}
			return this.instance;
		},
		
		Factory: function() {
			return this.instance;
		}
	}
})();


module.exports = RequestFactory;
