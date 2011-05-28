var Validator = Klass({
	statics: {
		rules: {
			'controller_name': 		/[a-z]+/,
			'controller_object': 	/^[A-Z]{1}[a-zA-Z]+/,
			'action_name':			/[a-z]+/
		},
		
		controllerObject: function(val) {
			return this.rules.controller_object.test(val);
		},
		
		controllerName: function(val) {
			return this.rules.controller_name.test(val);
		},
		
		actionName: function(val) {
			return this.rules.action_name.test(val);
		}
	}
});


var ControllerValidator = Klass({
	statics: {
		aliases: {
			'c_n': 'controllerName',
			'c_o': 'controllerObject',
			'a_n': 'actionName'
		},
		
		validate: function(what, on) {
			var m = this.aliases[what];
			if(m) {
				return Validator[m].call(Validator, on);
			}
		}
	}
});


module.exports = ControllerValidator;
