var Config = require('./Config');


var Bootstrap = Klass({
	methods: {
		initialize: function() {
			Config.setRoutes();
			Config.setEnvironment();
		}
	}
});


exports.Bootstrap = Bootstrap;
