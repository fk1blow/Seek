var Router = require('./Router');


var ActiveRouter = Klass({
	statics: {
		route: null,
		
		initRouter: function(req) {
			this.route = Router.Request.parseRoute(req.url + '/', true);
		},
		
		getRoute: function() {
			return this.route;
		}
	}
	
});


module.exports = ActiveRouter;
