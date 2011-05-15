var fs = require('fs');


var Filesystem = Klass({
	statics: {
		loadFile: function(filename) {
			return require(filename);
		},
		
		readFile: function(file, charset) {
			var c = charset || "utf-8";
			return fs.readFileSync(file, c);
		}
	}
});


module.exports = Filesystem;
