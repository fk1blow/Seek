/**
 * Request interface
 * @package Http
 */
var Request = Klass({
	statics: {
		_request: null,
		
		_url: null,
		
		_method: null,
		
		setObject: function(request_object) {
			this._request = request_object;
			this._url = request_object;
			this._method = request_object;
		},
		
		getRequest: function() {
			return this._request;
		},
		
		getUrl: function() {
			return this._url;
		},
		
		getMethod: function() {
			return this._method;
		}
	}
});


module.exports = Request;
