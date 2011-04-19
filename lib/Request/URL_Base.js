Module('Seek', function() {
	
	Module('URL', function() {
		
		Class('Base', {
			my: {
				methods: {
					handle: function(req, res) {
						Seek.URL.Request.setRequestObject(req);
						Seek.URL.Response.setResponseObject(res);
					},
					
					handleNoResponse: function() {
						if(typeof(Seek.URL.Response.getBody()) == 'undefined') {
							Seek.URL.Response.sendToBody('default response');
						}
					},
					
					getMethod: function() {
						return this.method;
					},
					
					getURL: function() {
						return this.url;
					},
					
					getRequestObject: function() {
						return this.request_object;
					}
				}
			}
		});
		
	});
	
});