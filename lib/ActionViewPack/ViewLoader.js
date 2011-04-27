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
					var views_path = this._getViewsPath();
					var layouts_path = this.layout_path + '/';
					var file_name = layout_name || this.layout_name;
					var path = views_path + layouts_path + file_name;
					return Seek.File.readFile(path, "utf-8");
				},
				
				loadViewFile: function(view) {
					var views_path = this._getViewsPath();
					var file_name = view;
					var path = views_path + '/' + file_name;
					return Seek.File.readFile(path, "utf-8");
				},
				
				loadExtraViewFile: function(view, extra_path) {
					var views_path = extra_path;
					var file_name = view;
					var path = views_path + '/' + file_name;
					return Seek.File.readFile(path, "utf-8");
				},
				
				_getViewsPath: function() {
					return Config.getPathFor('views');
				}
			}
		}
	});
	
});