function cl(o) {
    console.log(o);
}


Module('ActionModule', function() {
	
	Class('Filters', {
		my: {
			has: {
				before_filters: {
					init: {
						call: null,
						only: null
					}
				},
				
				after_filters: {
					init: {
						call: null,
						only: null
					}
				},
				
				controllerInstance: {
					init: null
				}
			},
			
			methods: {
				initializeFilters: function(controller) {
					if(!controller instanceof(Object)) {
						return false;
					}
					this.controllerInstance = controller;
					this._setBefore();
					this._setAfter();
				},
				
				_isCallable: function(action, when) {
					var item_in = null;
					var item = this[when + '_filters']['only'];
					
					if(item != null) {
						item_in = item.indexOf(action);
					}
					
					if(item_in >= 0) {
						this._callAction(this[when + '_filters']['call']);
					}
				},
				
				_callAction: function(action) {
					this.controllerInstance[action].call();
				},
				
				executeBefore: function(action) {
					if(this.before_filters.call == null) {
						return false;
					}
					this._isCallable(action, 'before');
				},
				
				executeAfter: function(action) {
					if(this.after_filters.call == null) {
						return false;
					}
					this._isCallable(action, 'after');
				},
				
				_setBefore: function() {
					this._setDefaults('before');
				},
				
				_setAfter: function() {
					this._setDefaults('after');
				},
				
				_setDefaults: function(for_filter) {
					var ci = this.controllerInstance;
					this[for_filter + '_filters'].call = ci[for_filter].call || null;
					this[for_filter + '_filters'].only = ci[for_filter].only || null;
				}
			}
		}
	});
	
});