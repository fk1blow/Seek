var Sequelize = require("sequelize").Sequelize;


var DatabaseConnection = Klass({
	
	methods: {
		initialize: function() {
			throw new Error('Cannot instantiate DataseConnection')
		}
	},
	
	statics: {
		_db_connection: {
			instance: null,
			module: Sequelize
		},
		
		getInstance: function() {
			
			if(this._db_connection.instance == null) {
				this._buildInstance();
			}
			return this._db_connection;
		},
		
		_buildInstance: function() {
			this._db_connection.instance = new Sequelize('nodejs_mysql_test', 'root', 'panamea', {
				host: "127.0.0.1",
				disableLogging: false
			});
		}
	}
	
});


module.exports = DatabaseConnection;