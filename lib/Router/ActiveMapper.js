var Mapper = require('./Mapper/Mapper'),
    Stacker = require('./Stacker/Stacker');


var ActiveMapper = {
    match: function(path, options) {
        Mapper.addSimpleRoute(path, options);
    },
    
    resource: function(resource, options) {
        Mapper.addResourceRoute(resource, options);
    },
    
    retrieveStack: function() {
        return Stacker.retrieve();
    }
}


module.exports = ActiveMapper;
