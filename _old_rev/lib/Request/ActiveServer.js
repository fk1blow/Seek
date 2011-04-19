Class('ActiveServer', {
	my: {
		has: {},
		
		methods: {
			deliverRequest: function(req, res) {
				if(ActiveRequest.Utils.isConcreteRequest(req)) {
					ActiveRequest.handleRequest(req, res);
				} else {
					this.setFakeResponse(res);
				}
			},
			
			setFakeResponse: function(res) {
				var body = 'favicon.ico';
				res.setHeader('Content-Length', body.length);
				res.end(body);
			}
		}
	}
});