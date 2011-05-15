var ApplicationController = require('./ApplicationController');


var UsersController = Klass({
	Extends: ApplicationController,
	
	methods: {
		index: function() {
			this.renderHTML('Hello users and such');
			//this.renderToLayout('users/index.html.js');
			//console.log(Seek.URL)
			//cl('s')
		},
		
		show: function() {
			this.renderToLayout('users/show.html.ejs');
		}
	}
});


module.exports = UsersController;
