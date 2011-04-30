Module('Seek', function() {
	
	Module('Renderer', function() {
		
		/**
		 * @name Seek.Renderer.Base
		 * @description Abstrac class from Renderer module
		 */ 
		Class('Base', {
			has: {
				'body': {
					init: null
				},
				
				'Content-type': {
					init: null
				}
			},
			
			methods: {
				render: function() {}
			}
		});
		
	});
	
});