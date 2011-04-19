var fs = require('fs');


Module('Seek', function() {
	
	Module('ActionView', function() {
	
		Class('File', {
			my: {
				methods: {
					readFile: function(obj_params) {
						//console.log(Config.getPathFor('views') + obj_params.from + obj_params.file , "utf-8")
						return fs.readFileSync(Config.getPathFor('views') + obj_params.from + obj_params.file , "utf-8");
					}
				}
			}
		});
		
	});
	
})
