function cl(o) {
    console.log(o);
}


Module('Seek', function() {

	Class('ActiveRequest', {
		
		my: {
			has: {
				_request_object: {
					init: null
				},
				
				_response_object: {
					init: null
				},
				
				halted: {
					is: 'rw',
					init: false
				}
			},
			
			methods: {
				handleRequest: function(req, res) {
					// URL.Base initialize
					Seek.URL.Base.init(req, res);
					
					// Initialize the router engine
					Seek.ActiveRouter.initRouter(req);
					
					// Initialize controllers and shit and/or Capture controller errors
					this._handleDispatcher();
					
					// handle errors
					this._handleErrors();
					
					// Handle framework response(html, xml, etc)
					this._handleResponse();
					
					// Fallback to a default response
					this._handleFallbackResponse();
				},
				
				_handleDispatcher: function() {
					try {
						Seek.ActionModule.ActionDispatcher.init();
					} catch(err) {
						Seek.Errors.add({ error_object: err });
					}
				},
				
				_handleErrors: function() {
					if(Seek.Errors.retrieve()) {
						Seek.Errors.handleErrors();
						Seek.View.Base.clearResponse();
					}
				},
				
				_handleResponse: function() {
					if(Seek.View.Base.hasSomeResponse() && !Seek.URL.Response.hasResponded()) {
						var r = Seek.View.Base.getResponse(true);
						Seek.URL.Response.sendToBody(r.body, r.type);
					}
				},
				
				_handleFallbackResponse: function() {
					if(!Seek.URL.Response.hasResponded()) {
						Seek.URL.Response.sendToBody('default response');
					}
				}
			}
		}
		
	});

});