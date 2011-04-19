Module('Seek', function() {
	
	/**
	 * @todo
	 * Move this class's attributes to ActionView.js, and the methods to File.js
	 */
	Class('ViewLoader', {
		my: {
			has: {
				layout_name: {
					init: 'default.html.ejs'
				},
				
				layout_path: {
					init: '/layouts'
				}
			},
			
			methods: {
				loadTemplate: function(layout_name) {
					var f = Seek.ActionView.File.readFile({
						'from': this.layout_path + '/',
						'file': layout_name || this.layout_name
					});
					return f;
				},
				
				loadViewFile: function(view) {
					var f = Seek.ActionView.File.readFile({
						'from': '/',
						'file': view
					});
					return f;
				}
			}
		}
	});
	
});