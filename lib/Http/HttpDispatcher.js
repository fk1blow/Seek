var Response = require('./Response'),
	Request = require('./Request'),
	ActiveRouter = require('../Router/ActiveRouter'),
	Controllers = require('../Controller/ActionController');


/**
 * HttpDispatcher
 * @package Http
 * 
 * @todo move the router handling outside http package
 * The ActionController should deal with the router objects...
 */
var HttpDispatcher = Klass({
	statics: {
		handleRequest: function(req, res) {
			this._handleInitializers(req, res);
			this._handleDispatcher(res);
		},
		
		_handleInitializers: function(req, res) {
			Request.setObject(req);
			Response.setObject(res);
			ActiveRouter.initRouter(req);
		},
		
		_handleDispatcher: function(res) {
			Controllers.dispatch(res);
		}
	}
});


module.exports = HttpDispatcher;

