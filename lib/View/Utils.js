var Config = require('../Config'),
	fs = require('fs'),
	File = require('../File/File');


var ViewUtils = Klass({
	statics: {
		layout_name: function() { return Config.env.defaults.layout },
		
		ext: '.html.ejs',
		
		layout_path: '/layouts',
		
		loadTemplate: function(layout_name) {
			var views_path = this._getViewsPath();
			var file_name = layout_name + this.ext || this.layout_name() + this.ext;
			var path = views_path + this.layout_path + '/' + file_name;
			
			return fs.readFileSync(path, "utf-8");
		},
		
		loadViewFile: function(view) {
			var views_path = this._getViewsPath();
			var file_name = view + this.ext;
			var path = views_path + '/' + file_name;
			
			return fs.readFileSync(path, "utf-8");
		},
		
		loadExtraViewFile: function(view, extra_path) {
			var views_path = extra_path;
			var file_name = view;
			var path = views_path + '/' + file_name;
			return File.readFile(path, "utf-8");
		},
		
		_getViewsPath: function() {
			return Config.getPathFor('views');
		}
	}
});


module.exports = ViewUtils;
