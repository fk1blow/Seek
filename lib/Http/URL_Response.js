var UrlResponse = Klass({
	statics: {
		_response: {
			init: null
		},
		
		has_responded: {
			init: false
		},
		
		setResponseObject: function(response) {
			this._response = response;
			this.has_responded = false;
		},
		
		sendToBody: function(body, headers, status) {
			this._response.body = body;
			for(var i in headers) {
				this._setHeader(i, headers[i]);
			}
			this._setHeader('Content-Length', body.length);
			this._response.statusCode = status || 200;
			this._setBody(body);
		},
		
		hasResponded: function() {
			return this.has_responded;
		},
		
		_setBody: function(body) {
			this._response.end(body);
			this.has_responded = true;
		},
		
		_setHeader: function(header, value) {
			this._response.setHeader(header, value);
		}
	}
});


module.exports = UrlResponse;
