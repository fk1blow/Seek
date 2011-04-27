Module('Seek', function() {
	
	Class('ActiveRouter', {
		
		my: {
			has: {
				route: {
					is: 'rw',
					init: null
				}
			},
			
			methods: {
				initRouter: function(req) {
					this.route = ActiveRouter.Base.Request.parseRoute(req.url + '/', true);
				},
				
				getRoute: function() {
					return this.route;
				}
			}
		}
		
	});
	
});