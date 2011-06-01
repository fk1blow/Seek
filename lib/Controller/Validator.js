var Validator = {
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
};


var ControllerValidator = {
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
};


module.exports = ControllerValidator;



/*
 _validateNames: function() {
		var cn_valid = Validator.validate('c_n', this.controller.default_name);
		var co_valid = Validator.validate('c_o', this.controller.object_name);
		var an_valid = Validator.validate('a_n', this.controller.action);
		
		if(!cn_valid) {
			throw new Error('Invalid controller route name:: ' + this.controller.default_name);
		}
		if(!co_valid) {
			throw new Error('Invalid controller object name:: ' + this.controller.object_name);
		}
		if(!an_valid) {
			throw new Error('Invalid action name:: ' + this.controller.action);
		}
	},
*/