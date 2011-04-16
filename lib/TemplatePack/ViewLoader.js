Module('ActionView', function() {
	
	Class('ViewLoader', {
		my: {
			has: {
				layout_name: {
					init: 'app_layout.js.html'
				},
				
				layout_path: {
					init: '/layouts'
				}
			},
			
			methods: {
				loadLayoutFile: function() {
					var f = ActionView.Utils.loadFile({
						'from': this.layout_path + '/',
						'file': this.layout_name
					});
					
					return f;
				},
				
				loadViewFile: function(view) {
					var f = ActionView.Utils.loadFile({
						'from': '/',
						'file': view
					});
					return f;
				}
			}
		}
	});
	
});