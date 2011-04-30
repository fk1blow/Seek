function cl(o) {
	console.log(o);
}


Module('Seek', function() {
	
	Module('Renderer', function() {
		
		/**
		 * @class Seek.Renderer.Html
		 * @extends Seek.Renderer.Base
		 * @description a concrete implementation of the Renderer.Base for HTML
		 */
		Class('HTML', {
			isa: Seek.Renderer.Base,
			
			has: {
				body: {
					init: null
				},
				
				type: {
					init: { 'Content-type': 'text/html' }
				}
			},
			
			methods: {
				initialize: function(options) {
					this.body = options.body || ' ';
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