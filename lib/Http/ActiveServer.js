var ActiveRequest = require('./ActiveRequest');


var Utils = (function() {
	return {
		isConcreteRequest: function(req) {
			if(this._isFavicon(req) || this._isUnknown(req)) {
				return false;
			}
			return true;
		},
		
		_isFavicon: function(req) {
			if(req['url'] == '/favicon.ico')
				return true;
		},
		
		_isUnknown: function(req) {
			if(typeof(req.method) == 'undefined')
				return true;
		}
	}
}());


var ActiveServer = Klass({
	statics: {
		handleRequest: function(req, res) {
			if(Utils.isConcreteRequest(req)) {
				ActiveRequest.handleRequest(req, res);
			} else {
				this.setFakeResponse(res);
			}
		},
		
		setFakeResponse: function(res) {
			var body = 'favicon.ico';
			res.setHeader('Content-Length', body.length);
			res.end(body);
		}
	}
});


module.exports = ActiveServer;
