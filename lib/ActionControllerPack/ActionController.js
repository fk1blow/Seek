function cl(o) {
    console.log(o);
}

/**
 * @package ActionModule
 * @name BaseController
 */
Module('Seek', function() {

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
						Seek.ActionModule.BaseController.meta.extend({
							has : { 
								request : {
									init: Seek.URL.Request.getRequest()
								},
								url: {
									init: Seek.URL.Request.getUrl()
								},
								params: {
									// Define a method inside Seek.Router's body
									init: ActionModule.ActionRouter.getParams()
								},
								controller_name: {
									init: Seek.ActionModule.Standardizr.getControllerObject()
								},
								action_name: {
									init: this.action_name
								}
							} 
						});
					},
					
					_prepareInvokers: function() {
						this._invokeAppController();
						this._invokeBuilderInstance();
						this._invokeBeforeFilters();
						this._invokeAction();
						this._invokeAfterFilters();
					},
					
					/**
					 * @todo REFACTOR this method!
					 * fucking ugly and hard-coded
					 */
					_invokeAppController: function() {
						var file = 'ApplicationController';
						Seek.File.loadFile(Config.getPathFor('controllers') + '/' + file);
					},
					
					_invokeBuilderInstance: function() {
						ActionModule.ControllerBuilder.buildControllerInstance();
					},
					
					_invokeAction: function() {
						ActionModule.ControllerBuilder.callControllerAction();
					},
					
					
					/**
					 * Action Filters
					 * _prepareFilters
					 * TBD
					 */
					_prepareFilters: function() {},
					
					/**
					 * Action Filters
					 * _invokeBeforeFilters
					 * TBD
					 */
					_invokeBeforeFilters: function() {},
					
					/**
					 * Action Filters
					 * _invokeAfterFilters
					 * TBD
					 */
					_invokeAfterFilters: function() {}
				}
			}
		});
		
	});
	
});