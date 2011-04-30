/**
* View specific roles
*/
Module('Seek', function() {

	Module('View', function() {
	
		Role('Viewable', {
			has: {
				layout: {
					init: null
				},
				
				view: {
					init: null
				}
			},
		   
			methods: {
				/**
				 * @name render
				 * @description TBD - this method should work similar to the one in rails
				 */
				render: function(options) {},
				
				/**
				 * @name renderToLayout
				 * @description Renders the desired view to the layout
				 * @param view {String} string containing the view's name
				 * @param locales {Object} an object containing the locales sent to the layout
				 */
				renderToLayout: function(view, locales) {},
				
				/**
				 * @name renderHTML
				 * @description should render only plain html, without the help of the layout
				 * @param html {String} string containing html text
				 */
				renderHTML: function(html) {},
				
				/**
				 * @name renderXML
				 * @description renders plain xml to response object
				 * @param xml {String} self-explanatory
				 */
				renderXML: function(xml) {},
				
				/**
				 * @name renderJSON
				 * @description renders a json to response object
				 * @param xml {String} self-explanatory
				 */
				renderJSON: function(json) {}
			}
	   });
	   
	});

});
