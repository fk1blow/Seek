var Response = require('./Response'),
	Request = require('./Request'),
	ActionDispatcher = require('../Controller/Controller'),
	Config = require('../Config'),
	File = require('../File/File'),
	Mimes = require('./Mimes'),
	url = require('url');


var StaticRequest = {
	default_extensions: /\.(js|html|css|swf|jpg|jpeg|png|gif)$/,
	
	hasAssets: function(req) {
		var path = url.parse(req.url).pathname;
		var regexp = this.default_extensions;
		var is_asset = regexp.test(path);
		
		if(is_asset) {
			var matches = path.match(regexp);
			this.getAsset(Config.getPathFor('public') + path, matches[1]);
			return true;
		}
		return false;
	},
	
	getAsset: function(file_path, ctype) {
		var r = File.readFile(file_path);
		Response.sendToBody(r, {'Content-type': Mimes[ctype]});
	}
}

/**
 * HttpDispatcher
 * @package Http
 */
var HttpDispatcher = {
	handleRequest: function(req, res) {
		this._handleInitializers(req, res);
	},
	
	_handleInitializers: function(req, res) {
		// Setting the main Response object
		Response.setObject(res);
		
		// Builds the request object
		Request.Build(req, function() {
			if(!StaticRequest.hasAssets(req)) {
				ActionDispatcher.dispatch(res);
			}
		});
	}
};


module.exports = HttpDispatcher;
