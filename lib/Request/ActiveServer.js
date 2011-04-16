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
				res.setHeader('Content-Length', 11);
				res.end('favicon.ico');
			}
		}
	}
});