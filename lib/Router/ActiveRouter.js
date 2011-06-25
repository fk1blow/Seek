var Parser = require('./Parser/Parser'),
	Request = require('../Http/Request'),
	url = require('url');


var ActiveRouter = Klass({
	statics: {
		_route: {},
		
		init: function() {
			// current request url
			this.current_url = Request.Factory().getUrl();
			
			// Reset the route object
			this._route = {};
			
			// ...and pals
			this._route = Parser.parseRouteFor(this.current_url);
			
			if(this._route) {
				this._route['params'] = this.getParams();
				this._route['url'] = this.current_url;
			}
		},
		
		getRoute: function() {
			return this._route;
		},
		
		getParams: function() {
			var route = this.getRoute(), params = {}, counter = 0;
			for(var item in route) {
				if(item != 'controller' && item != 'action') {
					params[item] = route[item];
					counter++;
				}
			}
			if(counter == 0) {
				params = url.parse(this.current_url, true).query;
			}
			return params;
		}
	}
	
});


module.exports = ActiveRouter;