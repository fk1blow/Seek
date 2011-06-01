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
			
			// Sets the request data - POST requests
			this._setPostParams(data);
			
			// Sets the request params - GET requests
			this._setRequestParams();
		},
		
		_setPostParams: function(data) {
			if(this.request.method === 'POST') {
				this.data = data;
			}
		},
		
		_setRequestParams: function() {
			if(this.request.method === 'GET') {
				this.params = url.parse(this.request.url, true).query;
			}
		},
		
		getParams: function() {
			return this.params;
		},
		
		getData: function() {
			return this.data;
		},
		
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
		},
		
		isAjax: function() {
			var r = this.request.headers['X-Requested-With'] || '';
			return r.toLowerCase() === 'xmlhttprequest';
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
