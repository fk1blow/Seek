/**
 * Error object
 *
 * - should make an object defining the section of the modules where the error has occured
 * - this class should be called from everywhere within the framework
 */
/*
var Error = [];

var te = {
    section: 'ActionControler',
    error: 'controller not found',
    headers: {
        code: 500
    }
}

Error.push(te)
*/


Class('Errors', {
	my: {
		has: {
			errors: {
				init: function() { return new Array(); }
			}
		},
		
		methods: {
			set: function(errObject) {
				this.errors.push(errObject);
			},
			
			get: function() {
				return this.errors;
			}
		}
	}
});