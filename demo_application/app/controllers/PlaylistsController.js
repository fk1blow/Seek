var AppController = Packagr.from('Controllers').load('ApplicationController');


var PlaylistsController = Klass({
	Extends: AppController,
	
	methods: {
		show: function() {
			// Renders a view; Layout true
			this.render('playlists/show.html', {
				locals: {user: 'dragos', id: 443}
			});
			
			// Renders a view; Layout false
			//this.render('playlists/list.html');
			
			// Renders a sintrg; Layout false
			//this.render({ what: 'de-te-n'});
			
			// Renders a sintrg; Layout true
			//this.render({ what: 'de-te-n', layout: true});
			
			// Renders a string directly to response; the content-type is html by default and could be overwritten
			//this.renderToResponse('<?xml version="1.0"?><note><to>Tove</to><</note>', 'xml');
		},
		
		index: function() {
			this.render('playlists/index.html', {
				locals: {user: 'dragos', id: 443}
			});
		},
		
		search: function() {
			//console.log('#search action');
		}
	}
});


module.exports = PlaylistsController;
