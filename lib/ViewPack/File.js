var Config = require('../Config');
var fs = require('fs');
var File = require('../File/File');


var ActionViewFile = Klass({
	statics: {
		layout_name: 'default.html.ejs',
		
		layout_path: '/layouts',
		
		loadTemplate: function(layout_name) {
			var views_path = this._getViewsPath();
			var file_name = layout_name || this.layout_name;
			var path = views_path + this.layout_path + '/' + file_name;
			//console.log('layout ::', path)
			return fs.readFileSync(path, "utf-8");
		},
		
		loadViewFile: function(view) {
			var views_path = this._getViewsPath();
			var file_name = view;
			var path = views_path + '/' + file_name;
			//console.log('view ::', path)
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


module.exports = ActionViewFile;