var UrlRequest = Klass({
	statics: {
		request: {
			is: 'rw',
			init: null
		},
		
		url: {
			is: 'rw',
			init: null
		},
		
		method: {
			is: 'rw',
			init: null
		},
		
		setRequestObject: function(request_value) {
			//this.request = request_value;
			//this.url = request_value.url
			//this.method = request_value.method;
		},
		
		getRequest: function() {
			return this.request;
		}
	}
});


module.exports = UrlRequest;
