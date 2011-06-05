var Router = Packagr.from('Router').load('Base');

// will map to PlaylistsController::show
// params = [id, hidden]
Router.Base.map("/playlists/show\?id=[0-9]+&hidden=[a-z]+", { controller: 'playlists', action: 'show' });

// maps to PlaylistsController::show
Router.Base.map('/playlists/show/:playlist_id', { controller: 'playlists', action: 'show' });

// will map to PlaylistsController::index
Router.Base.map('/playlists', { controller: 'playlists', action: 'index' });

Router.Base.map('/playlists/search', { controller: 'playlists', action: 'search' });

Router.Base.map('/playlists/list', { controller: 'playlists', action: 'list_all' });

Router.Base.map('/users/index', { controller: 'users', action: 'index' });