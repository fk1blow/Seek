Module('Seek', function() {

	Class('ActiveRequest', {
		my: {
			methods: {
				handleRequest: function(req, res) {
					Seek.URL.Base.handle(req, res);
					Seek.ActiveDispatcher.begin(req);
					Seek.URL.Base.handleNoResponse();
				}
			}
		}
	});

});