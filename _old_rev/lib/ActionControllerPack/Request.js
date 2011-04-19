Module('ActionModule', function() {
	
	Class('ActionRequest', {
		my: {
			methods: {
				getRequest: function() {
					return Seek.ActiveDispatcher.Request.getRequest();
				},
				
				getRequestMethod: function() {
					return Seek.ActiveDispatcher.Request.getRequest().method;
				},
				
				getURL: function() {
					return Seek.ActiveDispatcher.Request.getRequest().url;
				}
			}
		}
	});
	
});