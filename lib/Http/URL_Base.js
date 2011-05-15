var UrlRequest = require('./URL_Request'),
UrlResponse = require('./URL_Response');


var UrlBase = Klass({
	statics: {
		initUrl: function(req, res) {
			UrlRequest.setRequestObject(req);
			UrlResponse.setResponseObject(res);
		}
	}
});


module.exports = UrlBase;
