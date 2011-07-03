var ActiveMapper = require('../ActiveMapper');


var RouteStack = RouteStack || ActiveMapper.retrieveStack('indexed');


function removeQS(url) {
	return url.split(/\?|;/)[0];
}


var RouteCache = {
	_stack: {},
	
	get: function(index) {
		return this._stack[index];
	},
	
	set: function(index, value) {
		if(!this._stack[index])
			this._stack[index] = value;
	},
	
	inCache: function(index) {
		return this._stack[index];
	}
}


var Parser = (function() {
	var named_items = {};
	var current_url = null;
	
	var setNamedItems = function(route) {
		setDynamicSegments(route.path, current_url, route.constraints)
		setSpecialSegments(route);
	}
	
	var setSpecialSegments = function(route) {
		if(!route)
			return;
		if(!named_items['action'])
			named_items['action'] = route.action;
		if(!named_items['controller'])
			named_items['controller'] = route.controller;
	}
	
	var setDynamicSegments = function(route_path, current_url, constraints) {
		var route_segments = route_path.match(/:?([a-z\d]+[\w\-]*[a-z\d]+)/g);
		var url_segments = current_url.match(/([a-z\d]+[\w\-]*[a-z\d]+)/g);
		var segments_length = route_segments.length;
		
		for(var i = 0; i < segments_length; i++) {
			if(!url_segments[i]) continue;
			
			if(route_segments[i].match(/:([a-z\d]+[\w\-]*[a-z\d]+)/g))
				named_items[route_segments[i].replace(':', '')] = url_segments[i].replace('/', '');
			//cl(url_segments[i])
			//cl(route_segments[i])
		}
		//cl(route_segments)
		//cl(url_segments)
		//cl(named_items)
	}
	
	return {
		parsed_routes: {},
		
		parseRouteFor: function(url, method) {
			named_items    		= {};
			current_url    		= removeQS(url);
			var route_found 	= false;
			var current_method  = method || 'GET';
			
			if(RouteCache.inCache(current_url)) {
				return RouteCache.get(current_url);
			}
			
			var l = RouteStack.length;
			for(var i = 0; i < l; i++) {
				//cl(RouteStack[i].regex)
				if(RouteStack[i].regex.test(current_url) && RouteStack[i].method == current_method) {
					setNamedItems(RouteStack[i]);
					route_found = true;
					//cl('passed...')
					break;
				}
			}
			
			if(!route_found) {
				return false;
			}
			
			//cl(named_items)
			
			RouteCache.set(current_url, named_items);
			
			return named_items;
			//return {controller:'playlists', action: 'catch_all'}
		}
	}
}());


module.exports = Parser;
