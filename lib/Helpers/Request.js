var Request = require('./Request');


/**
 * @package Http
 * @name Helper
 * @description adds basic request helper - format, isAjax, etc
 */
var Helper = {
	request: function() {
		return Request.Factory().request;
	},
	
	isAjax: function() {
		var r = this.request().headers['X-Requested-With'] || '';
		return r.toLowerCase() === 'xmlhttprequest';
	},
	
	format: function(format, callback) {
		//cl(this.request())
		//cl(format)
	}
}


module.exports = Helper;
