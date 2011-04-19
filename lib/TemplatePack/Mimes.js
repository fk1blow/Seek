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
							Seek.URL.Response.sendToBody(htmlData, {
								'Content-type': 'text/html'
							});
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
							Seek.URL.Response.sendToBody(xmlData, {
								'Content-type': 'text/xml'
							});
						}
					}
				}
				
			});
			
		});
		
	});
	
});