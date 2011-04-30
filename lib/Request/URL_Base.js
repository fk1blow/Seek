Module('Seek', function() {
	
	Module('URL', function() {
		
		Class('Base', {
			my: {
				methods: {
					init: function(req, res) {
						Seek.URL.Request.setRequestObject(req);
						Seek.URL.Response.setResponseObject(res);
					}
				}
			}
		});
		
	});
	
});
