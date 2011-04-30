function cl(o) {
	console.log(o);
}


Module('Seek', function() {
	
	Module('Renderer', function() {
		
		/**
		 * @class Seek.Renderer.JSON
		 * @extends Seek.Renderer.Base
		 * @description a concrete implementation of the Renderer.Base
		 */
		Class('JSON', {
			isa: Seek.Renderer.Base,
			
			has: {
				body: {
					init: null
				},
				
				type: {
					init: { 'Content-type': 'application/json' }
				}
			},
			
			methods: {
				initialize: function(options) {
					this.body = JSON.stringify(options.body) || ' ';
					this.type = options.type || this.type;
				},
				
				render: function() {
					var tmp = {
						body: this.body,
						type: this.type
					}
					return tmp;
				}
			}
		});
		
	});
	
});