var ActiveMapper = require('../ActiveMapper');


var RouteStack = RouteStack || ActiveMapper.retrieveStack('indexed');


function removeQS(url) {
	return url.split(/\?|;/)[0];
}


function splitString(string, needle) {
	var arr = string.split(needle)
	return arr.splice(1, arr.length);
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
		var path_segments = route.path.match(/\:?[\w\_]+/g);
		var url_segments  = current_url.split('/').slice(1);
		
		for(var i in url_segments) {
			var dynamic_segment = path_segments[i].match(/\:([\w\_]+)/);
			if(dynamic_segment && dynamic_segment[1])
				named_items[dynamic_segment[1]] = url_segments[i] || undefined;
		}
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
	
	return {
		parsed_routes: {},
		
		parseRouteFor: function(url) {
			named_items    		= {};
			current_url    		= removeQS(url);
			var route_found 	= false;
			
			if(RouteCache.inCache(current_url)) {
				return RouteCache.get(current_url);
			}
			
			var l = RouteStack.length;
			for(var i = 0; i < l; i++) {
				if(RouteStack[i].regex.test(current_url)) {
					setNamedItems(RouteStack[i]);
					route_found = true;
					break;
				}
			}
			
			if(!route_found) {
				return false;
			}
			
			RouteCache.set(current_url, named_items);
			return named_items;
		}
	}
}());


module.exports = Parser;
