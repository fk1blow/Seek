var Parser = require('./Parser/Parser'),
	Request = require('../Http/Request'),
	url = require('url');


var ActiveRouter = Klass({
	statics: {
		_route: {},
		_current_url: null,
		
		init: function() {
			// current request url
			this._current_url = Request.Factory().getUrl();
			
			// Reset the route object
			this._route = {};
			
			// ...and pals
			this._route = Parser.parseRouteFor(this._current_url, Request.Factory().getMethod());
			this._route['url'] = this._current_url.split(/\?|;/)[0];
		},
		
		getRoute: function() {
			return this._route;
		},
		
		getParams: function() {
			var route = this.getRoute(), params = {};
			for(var item in route) {
				params[item] = route[item];
			}
			var qs = url.parse(this._current_url, true).query;
			for(var i in qs) {
				params[i] = qs[i];
			}
			return params;
		}
	}
	
});


module.exports = ActiveRouter;