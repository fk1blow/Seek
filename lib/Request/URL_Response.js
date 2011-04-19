Module('Seek', function() {
	
	Module('URL', function() {
		
		Class('Response', {
			my: {
				has: {
					_response: {
						init: null
					}
				},
				
				methods: {
					setResponseObject: function(response) {
						this._response = response;
					},
					
					getBody: function() {
						return this._response.body;
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
					
					_setBody: function(body) {
						this._response.end(body);
					},
					
					_setHeader: function(header, value) {
						this._response.setHeader(header, value);
					}
				}
			}
		});
		
	});
	
});