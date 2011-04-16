Module('ActionModule', function() {
	
	Class('Utils', {
		my: {
			methods: {
				upcase: function(stringVal) {
					return stringVal.substr(0, 1).toUpperCase() + stringVal.substr(1);
				},
				
				loadFile: function(filename, type) {
					switch(type) {
						case 'controller':
							Utils.loadFile(Config.getPathFor('controllers') + '/' + filename);
						break;
						case 'view':
							Utils.loadFile(Config.getPathFor('views') + '/' + filename);
						break;
					}
				}
			}
		}
	});
	
});