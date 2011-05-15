var ApplicationController = require('./ApplicationController');


 var PlaylistsController = Klass({
	Extends: ApplicationController,
	
	methods: {
		index: function() {
			//this.renderHTML('no shitty worlds');
			//console.log('x')
			this.renderToLayout('playlists/index.html.ejs');
			//cl('x')
			//this.renderHTML('<div>mama are flori dar tata nu are</div>');
		},
		
		show: function() {
			//this.renderToLayout('playlists/show.html.ejs', {
			//	id: this.params.playlist_id
			//});
			
			//Seek.URL.Response.sendToBody('im just a simple... ');
			
			//var s = 's'
			
			this.renderHTML('Hello worlds');
			
			//this.renderXML('<?xml version="1.0"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>');
			//this.renderJSON({
			//	a: 'asa',
			//	b: 'asa'
			//});
			
			//throw new Error('asdas');
			//cl('s')
			
			
			//cl(s.s.s.s)
		},
		
		search: function() {
			//console.log('#search action');
		},
		
		list_all: function() {
			this.renderXML('<?xml version="1.0"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>');
			//this.renderJSON({
			//	a: 'asa',
			//	b: 'asa'
			//});
			//this.renderToLayout('playlists/list.html.ejs');
		}
	}
});


module.exports = PlaylistsController;
