Module('Seek', function() {
	
	Class('Errors', {
		my: {
			methods: {
				
			}
		}
	});
	
});




/**
 * Error object
 *
 * - should make an object defining the section of the modules where the error has occured
 * - this class should be called from everywhere within the framework
 */
//Module('Seek', function() {
//	Class('Errors', {
//		my: {
//			has: {
//				errors: {
//					init: function() { return new Array(); }
//				},
//				
//				section: {
//					init: null
//				},
//				
//				headers: {
//					init: function() { return {code: 500} }
//				}
//			},
//			
//			methods: {
//				set: function(errObject) {
//					var temp = errObject;
//					temp.headers = this.headers
//					this.errors.push(temp);
//				},
//				
//				get: function() {
//					return this.errors;
//				}
//			}
//		}
//	});
//});