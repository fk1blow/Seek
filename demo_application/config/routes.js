ActiveRouter.Base.Router.map('/playlists/show/:playlist_id', { controller: 'playlists', action: 'show' });

ActiveRouter.Base.Router.map('/playlists', { controller: 'playlists', action: 'index' });

ActiveRouter.Base.Router.map('/playlists/search', { controller: 'playlists', action: 'search' });

ActiveRouter.Base.Router.map('/playlists/list', { controller: 'playlists', action: 'list_all' });

ActiveRouter.Base.Router.map('/:controller/:action');
