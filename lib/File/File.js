var fs = require('fs');


Module('Seek', function() {
	
	Class('File', {
		my: {
			methods: {
				loadFile: function(filename) {
					require(filename);
				},
				
				readFile: function(file, charset) {
					var c = charset || "utf-8";
					return fs.readFileSync(file, c);
				}
			}
		}
	});
	
});