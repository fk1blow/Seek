Class('PlaylistsController', {
	isa: ApplicationController,
	
	methods: {
		index: function() {
			this.renderToLayout('playlists/index.html.js');
		},
		
		show: function() {
			this.renderToLayout('playlists/show.html.ejs', {
				id: this.params.playlist_id
			});
		},
		
		search: function() {
			//console.log('#search action');
		},
		
		list_all: function() {
			this.renderXML('<?xml version="1.0"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>');
			//this.renderToLayout('playlists/list.html.ejs');
		}
	}
});