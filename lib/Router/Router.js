var Router = {};


Router.Base = (function() {
    var routes = [];
    var request_items = {};
    
    var remap = function(routePath, routeObject) {
        routeObject = routeObject || {};
        return {
            path: routePath,
            controller: routeObject['controller'],
            action: routeObject['action']
        }
    }
    
    return {
        map: function(routePath, routeObject) {
            routes.push(remap(routePath, routeObject));
        },
        
        getRoutes: function() {
            return routes;
        },
        
        mapRequestItems: function(named_items) {
            request_items = named_items;
        },
        
        getRequestItems: function() {
            return request_items;
        }
    };
})();


/**
 * @todo
 * Currently there's a parsed_routes object, wich will cache the already parsed routes speeding up things considerably
 * This objects should be enabled via config(development or production mode enabled)
 */
Router.Request = (function() {
    var route_regexp, route_found;
    var debugging = false;
    var quick_return = false;
    
    return {
        named_items: {},
        
        parsed_routes: {},
        
        current_url: {},
        
        parseRoute: function(url, quick) {
            this.named_items = {};  
            route_found = false;
            quick_return = quick || false;
            current_url = url;
            
            if(this._hasAlreadyParsed(current_url)) {
                return this.parsed_routes[current_url];
            }
            
            var routes = Router.Base.getRoutes();
            for(var item in routes) {
                if(this.routeExists(routes[item])) {
                    route_found = routes[item];
                    break;
                }
            }
            if(!route_found) {
                console.log("Unable to find route for current url:: ", current_url);
                return false;
            }
            this.setSpecialItems(route_found);
            return this.setNamedItems(route_found);
        },
        
        _hasAlreadyParsed: function() {
            if(this.parsed_routes[current_url]) {
                return true;
            }
            return false;
        },
        
        routeExists: function(route) {
            return this.testRoutePath(route);
        },
        
        testRoutePath: function(route) {
            var regex = this.constructRegex(route);
            
            if(regex.test(current_url)) {
                return true;
            }
            return false;
        },
        
        constructRegex: function(route) {
            var f_r = route.path.replace(/:[\w]+/g, "[\\w]+");
            var regex = new RegExp(route_regexp = '^' + this.formalizeQueryString(f_r) + '\\/$');
            return regex;
        },
        
        formalizeQueryString: function(route) {
            var r = route.replace(/\?/g, '\\?');
            return r;
        },
        
        setSpecialItems: function(route) {
            if(route.controller) {
                this.named_items['controller'] = route.controller;
            }
            if(route.action) {
                this.named_items['action'] = route.action;
            }
        },
        
        setNamedItems: function(route) {
            var named_items = route.path.match(new RegExp(/\:+([\w]+)/g));
            var items_matched = {};
            
            for(var item in named_items) {
                var nr = route.path.replace(named_items[item], '([\\w]+)')
                                   .replace(/\:[\w]+/g, '.*?');
                
                var matches = current_url.match(new RegExp(nr));
                
                if(matches && matches[1]) {
                    var item_matched = named_items[item].replace(':', ''); 
                    this.named_items[item_matched] = matches[1];
                    //this.named_items['current_url'] = this.current_url;
                }
            }
            
            Router.Base.mapRequestItems(this.named_items);
            
            this.parsed_routes[current_url] = this.named_items;
            
            if(debugging) {
                this.debugRoutes(route);
            }
            if(quick_return) {
                return Router.Base.getRequestItems();
            }
        },
        
        debugRoutes: function(route) {
            console.log('Current URL::  ', current_url);
            console.log('Matched::      ', route);
            console.log('Named items::  ', this.named_items);
        }
    }
}());


exports.Request = Router.Request;

exports.Base = Router.Base;
