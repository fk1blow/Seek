function cl(o) {
    console.log(o);
}

/**
 * @package ActionModule
 * @name Standardize
 */
Module('Seek', function() {

	Module('ActionModule', function() {
		
		Class('Standardizr', {
			my: {
				has: {
					prefix: {
						init: 'Controller'
					},
					object_name: {
						init: null
					}
				},
				
				methods: {
					standardizeName: function(controller_name) {
						this.object_name = this.toUpcase(controller_name)
						return this.object_name + this.prefix;
					},
					
					getControllerAction: function() {
						var r = ActionModule.ActionRouter.getCurrentRoute();
						return r.action || null;
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
			}
		});
		
	});
	
});