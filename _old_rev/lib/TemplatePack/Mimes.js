/**
 * @package lib/TemplatePack/Mimes.js
 * @description
 * 		This modules adds some methods to ActionView
 * 		all these methods will bypass the layout or the views
 */
Module('Seek', function() {
	
	Module('Mimes', function() {
	
		Module('Html', function() {
			
			Class('Base', {
				
				my: {
					methods: {
						/**
						 * @name renderHTML
						 * @description renders plain html to ActiveRequest
						 */
						renderHTML: function(htmlData) {
							ActiveRequest.setResponse(htmlData, {
								'Content-type': 'text/html'
							});
							Seek.View.Base.setRendered(true);
						}
					}
				}
				
			});
			
		});
		
		
		Module('XML', function() {
			
			Class('Base', {
				
				my: {
					methods: {
						/**
						 * @name renderXML
						 * @description renders plain xml to ActiveRequest
						 */
						renderXML: function(xmlData) {
							ActiveRequest.setResponse(xmlData, {
								'Content-type': 'text/xml'
							});
							Seek.View.Base.setRendered(true);
						}
					}
				}
				
			});
			
		});
		
	});
	
});