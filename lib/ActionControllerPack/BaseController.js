function cl(o) {
    console.log(o);
}


Module('ActionModule', function() {

	Class('BaseController', {
		has: {
			request: {
				init: null
			},
			
			url: {
				init: null
			},
			
			params: {
				init: null
			},
			
			controller_name: {
				init: null
			},
			
			action_name: {
				init: null
			},
			
			template_mame: {
				init: null
			},
			
			view_name: {
				init: null
			}
		},
		
		methods: {
			render: function(view, object_params) {
				ActionView.Base.render(view, object_params);
			}
		}
	});

});