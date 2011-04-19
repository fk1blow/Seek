Module('Seek', function() {
	
	Module('URL', function() {
		
		Class('Request', {
			my: {
				has: {
					request: {
						is: 'rw',
						init: null
					},
					
					url: {
						is: 'rw',
						init: null
					},
					
					method: {
						is: 'rw',
						init: null
					}
				},
				
				methods: {
					setRequestObject: function(request_value) {
						this.request = request_value;
						this.request.url = request_value.url
						this.request.method = request_value.method;
					},
					
					getRequest: function() {
						return this.request;
					}
				}
			}
		});
		
	});
	
});