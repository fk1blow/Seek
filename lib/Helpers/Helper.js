var Common = {
	toUpcase: function(string) {
		return string.substr(0, 1).toUpperCase() + string.substr(1);
	},
	
	getSize: function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	}
}


exports.Common = Common;

exports.Controller = require('./Controller');

exports.Request = require('./Request');
