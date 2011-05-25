var IDatabaseConnection = Klass({
	
	/**
	 * @param _db_host
	 * @param _db_user
	 * @param _db_pass
	 * 
	 * These should stay null for security purpose or in the case of an error
	 */
	attributes: {
		_db_host: null,
		
		_db_user: null, 
		
		_db_pass: null,
		
		_connection: null
	},
	
	methods: {
		connect: function() {},
		
		establishConnection: function() {},
		
		setConnection: function() {},
		
		getConnection: function() {}
	}
	
})