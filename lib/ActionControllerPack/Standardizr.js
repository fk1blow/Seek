var ActionRouter = require('./ActionRouter');


/**
 * @package ActionModule
 * @name Standardize
 */
var Standardizr = Klass({
	statics: {
		prefix: 'Controller',
		
		object_name: null,
		
		standardizeName: function(controller_name) {
			this.object_name = this.toUpcase(controller_name)
			return this.object_name + this.prefix;
		},
		
		getControllerAction: function() {
			var r = ActionRouter.getActionName();
			return r || null;
		},
		
		toUpcase: function(string) {
			if(!this.isDefined(string)) return false;
			return string.substr(0, 1).toUpperCase() + string.substr(1);
		},
		
		isString: function(string) {
			if(!this.isDefined(string)) return false;
			var regexp = /^[a-zA-Z]+[a-zA-Z\_]+[a-zA-Z]+$/i;
			return regexp.test(string);
		},
		
		isDefined: function(string) {
			if(typeof(string) != 'undefined') return true;
		}
	}
});


module.exports = Standardizr;
