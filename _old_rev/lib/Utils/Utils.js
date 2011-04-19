Module('Seek', function() {
	Class('Utils', {
		my: {
			methods: {
				loadFile: function(filename) {
					require(filename);
				}
			}
		}
	});
});