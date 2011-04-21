ActiveRouter.Base.Router.map('/playlists/show/:playlist_id', { controller: 'playlists', action: 'show' });

ActiveRouter.Base.Router.map('/playlists', { controller: 'playlists', action: 'index' });

ActiveRouter.Base.Router.map('/playlists/search', { controller: 'playlists', action: 'search' });

ActiveRouter.Base.Router.map('/playlists/list', { controller: 'playlists', action: 'list_all' });

//ActiveRouter.Base.Router.map('/:controller/:action');
//
//ActiveRouter.Base.Router.map('/playlists/show/:playlist_id', {
//    controller: 'playlists',
//    action: 'some_action'
//});
//
//ActiveRouter.Base.Router.map('/users/:id', {
//    controller: 'users',
//    action: 'show'
//});
//
//ActiveRouter.Base.Router.map('/users/edit/:id', {
//    controller: 'users',
//    action: 'edit'
//});
//
//ActiveRouter.Base.Router.map('/users/add', {
//    controller: 'users',
//    action: 'add'
//});
//
//ActiveRouter.Base.Router.map('/projects/:id/tickets/:ticket_id', {
//    controller: 'project_tickets',
//    action: 'show'
//});
//
//ActiveRouter.Base.Router.map('/playlists/edit/:playlist_id', {
//    controller: 'playlists',
//    action: 'edit'
//});
//
//ActiveRouter.Base.Router.map('/user/:user_id/items/:item_id', {
//    controller: 'user_items',
//    action: 'show'
//});
//
//ActiveRouter.Base.Router.map('', {
//    controller: 'homepage',
//    action: 'index'
//});