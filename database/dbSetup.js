// establishing a connection with a MYSQL database using the Sequalise ORM library

// import Sequelize - an Object-Relational Mapping (ORM) library
const Sequelize = require('sequelize');

// bring in the database credentials from dbConfig
const db = require('./dbConfig');

// instantiates Sequelize with database parameters
const sequelize = new Sequelize(db.database, db.username, db.password, {
	host: db.host,			    //  name or ip address hosting MySQL
	dialect: 'mysql',			// tells squelize that MySQL will be used
	operatorsAliases: false,
	
	define: {
		timestamps: false		// do not automatically add timestamp fields
	},
	
	pool: {						// configure the connection pool for your database
		max: 5,                 // max no. of connections
		min: 0,                 // min no. of connections
		acquire: 30000,         // max time (in ms) that a connection can be held before it it released
		idle: 10000             // max time (in ms) that a connection can remain idle in the pool
	},

	dialectModule: require('mysql2'),  // specify the library that Sequelize should use for the db dialect
	
    dialectOptions: {                  // provide additionl configuration options
	  authPlugins: {
		mysql_clear_password: () => () => Buffer.from(db.password + '\0')
	  }
	}

});

module.exports = sequelize; // export the sequelize object