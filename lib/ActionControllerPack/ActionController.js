function cl(o) {
    console.log(o);
}

/**
 * @package ActionModule
 * @name BaseController
 */
Module('ActionModule', function() {
	
	Class('ActionController', {
		my: {
			has: {
				controller_name: {
					init: null
				},
				action_name: {
					init: null
				}
			},
			
			methods: {
				init: function() {
					this._buildDefaults();
					this._prepareBaseController();
					this._prepareFilters();
					this._prepareInvokers();
				},
				
				_buildDefaults: function() {
					this.controller_name = ActionModule.ActionRouter.getControllerName();
					this.action_name = ActionModule.ActionRouter.getActionName();
				},
				
				_prepareBaseController: function() {
					ActionModule.BaseController.meta.extend({ 
						has : { 
							request : {
								init: ActionModule.ActionRequest.getRequest()
							},
							url: {
								init: ActionModule.ActionRequest.getURL()
							},
							params: {
								init: ActionModule.ActionRouter.getParams()
							},
							controller_name: {
								init: ActionModule.Standardizr.getControllerObject()
							},
							action_name: {
								init: ActionModule.ActionController.my.action_name
							}
						} 
					});
				},
				
				_prepareInvokers: function() {
					this._invokeAppController();
					this._invokeBuilder();
					this._invokeBeforeFilters();
					this._invokeAction();
					this._invokeAfterFilters();
				},
				
				/**
				 * @todo REFACTOR this method!
				 * fucking ugly and hard-coded
				 * bullshit
				 * i can't figure it out...
				 */
				_invokeAppController: function() {
					var file = 'ApplicationController';
					Utils.loadFile(Config.getPathFor('controllers') + '/' + file);
				},
				
				_invokeBuilder: function() {
					ActionModule.ControllerBuilder.buildControllerInstance();
				},
				
				_invokeAction: function() {
					ActionModule.ControllerBuilder.callControllerAction();
				},
				
				/**
				 * TBD
				 */
				_prepareFilters: function() {},
				
				/**
				 * TBD
				 */
				_invokeBeforeFilters: function() {},
				
				/**
				 * TBD
				 */
				_invokeAfterFilters: function() {}
			}
		}
	});
	
});