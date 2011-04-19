Module('ActionModule', function() {
	
	Class('ActionRequest', {
		my: {
			methods: {
				getRequest: function() {
					return Seek.URL.Request.getRequest();
				},
				
				getRequestMethod: function() {
					return Seek.URL.Request.getMethod();
				},
				
				getURL: function() {
					return Seek.URL.Request.getUrl();
				}
			}
		}
	});
	
});