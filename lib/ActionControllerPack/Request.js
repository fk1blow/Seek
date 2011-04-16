Module('ActionModule', function() {
	
	Class('ActionRequest', {
		my: {
			methods: {
				getRequest: function() {
					return ActiveDispatcher.Request.getRequest();
				},
				
				getRequestMethod: function() {
					return ActiveDispatcher.Request.getRequest().method;
				},
				
				getURL: function() {
					return ActiveDispatcher.Request.getRequest().url;
				}
			}
		}
	});
	
});