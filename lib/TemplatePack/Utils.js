var fs = require('fs');


Module('ActionView', function() {
	
	Class('Utils', {
		my: {
			methods: {
				loadFile: function(obj_params) {
					//console.log(Config.getPathFor('views') + obj_params.from + obj_params.file)
					return fs.readFileSync(Config.getPathFor('views') + obj_params.from + obj_params.file , "utf-8");
				}
			}
		}
	});
	
});