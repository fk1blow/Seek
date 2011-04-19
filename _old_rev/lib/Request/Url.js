Module('Seek', function() {
	
	Class('Url', {
		my: {
			has: {
				request: {
					init: null
				}
			},
			
			methods: {
				setRequestObject: function(req) {
					this.request = req;
				},
				
				get: function() {
					return this.request;
				}
			}
		}
	});
	
});