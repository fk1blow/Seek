Module('Seek', function() {

	Class('ActiveRequest', {
		
		my: {
			methods: {
				handleRequest: function(req, res) {
					Seek.URL.Base.handle(req, res);
					Seek.Dispatcher.begin(req);
					Seek.URL.Base.handleNoResponse();
				}
			}
		}
		
	});

});