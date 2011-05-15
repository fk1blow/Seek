var ActionDispatcher = require('../ActionControllerPack/ActionController'),
ActiveRouter = require('../Router/ActiveRouter');
UrlBase = require('./URL_Base');


var ActiveRequest = Klass({
	statics: {
		handleRequest: function(req, res) {
			// Initializer URL.Base and the Router
			this._handleInitializers(req, res);
			
			this._handleDispatcher(res, res);
			
			//this._handleErrors();
			
			//this._handleResponse();
			
			//this._handleFallbackResponse();
			
			//res.end('xrx');
		},
		
		_handleInitializers: function(req, res) {
			UrlBase.initUrl(req, res);
			ActiveRouter.initRouter(req);
		},
		
		_handleDispatcher: function() {
			//try {
				ActionDispatcher.init();
			//} catch(err) {
				//Seek.Errors.add({ error_object: err });
			//}
		},
		
		// below, there shouldn't be anything else. The response will be sent async from the action
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
		
		// disabled in evented environment
		_handleFallbackResponse: function() {
			if(!Seek.URL.Response.hasResponded()) {
				Seek.URL.Response.sendToBody('default response');
			}
		}
	}
});


module.exports = ActiveRequest;

