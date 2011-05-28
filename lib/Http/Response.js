/**
 * Response interface
 * @package Http
 */
var Response = Klass({
	statics: {
		_response: {
			init: null
		},
		
		_has_responded: {
			init: false
		},
		
		setObject: function(response) {
			this._response = response;
			this._has_responded = false;
		},
		
		sendToBody: function(body, headers, status) {
			if(this._has_responded) {
				return false;
			}
			for(var i in headers) {
				this._setHeader(i, headers[i]);
			}
			
			this._setHeader('Content-Length', body.length);
			this._response.statusCode = status || 200;	
			this._setBody(body);
		},
		
		_setBody: function(body) {
			this._response.end(body);
			this._has_responded = true;
		},
		
		_setHeader: function(header, value) {
			this._response.setHeader(header, value);
		}
	}
});


module.exports = Response;
