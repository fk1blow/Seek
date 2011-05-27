var HttpDispatcher = require('./HttpDispatcher');


var Utils = {
        isFavicon: function(req) {
		if(req['url'] == '/favicon.ico')
			return true;
	}
	
	isUnknown: function(req) {
		if(typeof(req.method) == 'undefined')
			return true;
	},

	isConcreteRequest: function(req) {
		if(this.isFavicon(req) || this.isUnknown(req)) {
			return false;
		}
		return true;
	}
};


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
