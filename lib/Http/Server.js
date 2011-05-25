var HttpDispatcher = require('./HttpDispatcher');


var Utils = (function() {
	var isFavicon = function(req) {
		if(req['url'] == '/favicon.ico')
			return true;
	}
	
	var isUnknown = function(req) {
		if(typeof(req.method) == 'undefined')
			return true;
	}
	
	return {
		isConcreteRequest: function(req) {
			if(isFavicon(req) || isUnknown(req)) {
				return false;
			}
			return true;
		}
	}
}());


/**
 * Server
 * @package Http
 */
var ActiveServer = Klass({
	statics: {
		handleRequest: function(req, res) {
			if(Utils.isConcreteRequest(req)) {
				HttpDispatcher.handleRequest(req, res);
			} else {
				this._setFakeResponse(res);
			}
		},
		
		_setFakeResponse: function(res) {
			var body = 'favicon.ico';
			res.setHeader('Content-Length', body.length);
			res.end(body);
		}
	}
});


module.exports = ActiveServer;
