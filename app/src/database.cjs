
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const { applicationFolder } = require('./exploring.cjs');

function instantiateDatabase ()
{
	const dbPath = applicationFolder() + 'notes-database.db';
	const isNewInstance = !fs.existsSync(dbPath);

	const db = new sqlite3.Database(dbPath, error =>
	{
		if(error)
		{
			console.error("An error ocurred when openning/creating database", error.message);
			return;
		}

		/* If the database is new, then creates its tables */
		if(isNewInstance)
		{
			console.log("Database is new");

			db.exec();
		}
	});

	//db.exec();
}

module.exports = {
		instantiateDatabase
};
