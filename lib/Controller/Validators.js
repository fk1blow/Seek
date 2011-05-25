function cl(o) {
    console.log(o);
}


Module('Seek', function() {

	Module('ActionModule', function() {
		
		Class('Validators', {
			my: {
				methods: {
					nameIsString: function(cn) {
						if(cn.length > 0 && typeof(cn) == 'string') {
							return true;
						}
						return false;
					},
					
					hasValidMeta: function(cn) {
						if(typeof(global[cn]) != 'undefined' && typeof(cn) == 'string' && global[cn].meta.name == cn && this.nameIsString(cn)) {
							return true;
						}
						return false
					},
					
					hasValidName: function(cn) {
						if(typeof(cn) == 'string' && cn.length > 0 && typeof(global[cn]) != 'undefined') {
							return /[a-zA-Z]+/i.test(cn);
						}
						return false;
					},
					
					isAJooseObject: function(cn) {
						if(typeof(global[cn]) == 'function' && global[cn].meta.name == cn) {
							return true;
						}
						return false;
					},
					
					hasMethod: function(cn, m) {
						if(typeof(global[cn].meta.methods[m]) == 'object') {
							return true;
						}
						return false;
					}
				}
			}
		});
		
	});
	
});