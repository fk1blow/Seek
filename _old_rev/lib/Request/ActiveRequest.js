/**
 * Request main class
 *
 * @description
 * 	- Interface between the framework and the server
 * 	- Independent from the server implementation
 */
Class('ActiveRequest.Utils', {
	my: {
		methods: {
			isConcreteRequest: function(req) {
				if(this._isFavicon(req) || this._isUnknown(req)) {
					return false;
				}
				return true;
			},
			
			_isFavicon: function(req) {
				if(req['url'] == '/favicon.ico')
					return true;
			},
			
			_isUnknown: function(req) {
				if(typeof(req.method) == 'undefined')
					return true;
			}
		}
	}
});


/**
 * @todo
 * - Refactor this entire package
 * - Make the body more accessible
 */
Class('ActiveRequest', {
	my: {
		has: {
			response: {
				init: null
			},
			
			request: {
				init: null
			}
		},
		
		methods: {
			handleRequest: function(req, res) {
				this._init(req, res);
				Seek.ActiveDispatcher.begin(req);
				this._setDefaults();
			},
			
			_init: function(req, res) {
				this.request = req;
				this.response = res;
			},
			
			_setDefaults: function() {
				if(typeof(this.response.body) == 'undefined') {
					this.setResponse('default response');
				}
			},
			
			setResponse: function(body, headers, status) {
				this.response.body = body;
				for(var i in headers) {
					this.setHeader(i, headers[i]);
				}
				this.setHeader('Content-Length', body.length);
				this.response.statusCode = status || 200;
				this.setBody(body);
			},
			
			setBody: function(body) {
				this.response.end(body);
			},
			
			setHeader: function(header, value) {
				this.response.setHeader(header, value);
			}
		}
	}
});