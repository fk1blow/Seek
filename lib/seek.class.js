function objectLength(obj) {
    var result = 0;
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result++;
        }
    }
    return result;
}


var __extends = function(child, parent) {
    var constrains = ['__classname', 'initialize'];
    var tmp_child_proto = {};
    
    for(var i in parent.prototype) {
        if(constrains.indexOf(i) < 0) {
            tmp_child_proto[i] =  parent.prototype[i];
        }
    }
    for(var i in child.prototype) {
        tmp_child_proto[i] =  child.prototype[i];
    }
    
    var ctor = function(){};
    ctor.prototype = tmp_child_proto;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    
    if (typeof parent.extended === "function") parent.extended(child);
    child.__superClass__ = parent.prototype;
  };



var ClassBuilder = (function() {
    var dummy_context = null;
    
    return {
        // Extended function
        extends: function(child, parent) {
            __extends(child, parent);
        },
        
        // Adds the instance methods to the prototype
        createInstance: function(body) {
            dummy_context = function(init_params) {
                var args = [];
                for(var i in arguments) {
                    args[i] = arguments[i];
                }
                // trying to call only the instance's initialize method and not the parent's initialize
                // i don't know if this will work as expected
                if(typeof(this.initialize) != 'undefined')
                    this.initialize.apply(this, args);
            };
            var c = dummy_context;
            
            var tmp_methods = {};
            
            if(body && body.methods) {
                for(var i in body.methods) {
                    tmp_methods[i] = body.methods[i]
                }
            }
            if(body && body.attributes) {
                for(var i in body.attributes) {
                    tmp_methods[i] = body.attributes[i]
                }
            }
            c.prototype = tmp_methods;
            this.createDefaults(c);
            
            return dummy_context;
        },
        
        // Adds default methods to object instances
        createDefaults: function(class_object) {
            class_object.prototype.getClassName = function() {
                return this.__classname;
            }
        },
        
        // Adds the static properties(methods, attributes)
        createStatic: function(context, methods) {
            for(var i in methods) {
                context[i] = methods[i];
            }
        }
    }
}());


function Class(body) {
    var options = {
        Extends: null,
        attributes: null,
        methods: null,
        statics: null
    }
    
    if(body) {
        options.Extends = body.Extends;
        options.attributes = body.attributes;
        options.methods = body.methods;
        options.statics = body.statics;
    }
    
    // Creates the actual function(or class, whatever)
    var c = ClassBuilder.createInstance(body);
    
    // Handles extends parent
    if(options.Extends != null) {
        ClassBuilder.extends(c, body.Extends);
    }
    
    // Static (class) methods
    if(options.statics != null) {
        ClassBuilder.createStatic(c, options.statics);
    }
    
    return c;
}


exports.Class = Class;

