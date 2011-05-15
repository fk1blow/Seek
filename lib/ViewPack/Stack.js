Module('Seek', function() {
	
	Module('View', function() {
		
		Class('Stacker', {
			my: {
				has: {
					_stack: {
						init: {
							layout: null,
							view: null,
							locales: null
						}
					}
				},
				
				methods: {
					setStack: function(layout, view, locales) {
						this._stack.layout = layout;
						this._stack.view = view;
						this._stack.locales = locales;
					},
					
					getStack: function(reset_after) {
						return this._stack;
						if(reset_after) this.reset();
					},
					
					reset: function() {
						this._stack.layout = null;
						this._stack.view = null;
						this._stack.locales = null;
					}
				}
			}
		});
		
	});
	
});