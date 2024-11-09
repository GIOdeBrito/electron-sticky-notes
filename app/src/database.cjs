
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const { applicationFolder, readLocalFile } = require('./file-system.cjs');

var DB = null;

function instantiateDatabase ()
{
	const isNewInstance = !fs.existsSync(databasePath());

	DB = new sqlite3.Database(databasePath(), async (error) =>
	{
		if(error)
		{
			console.error("An error ocurred when openning/creating database", error.message);
			return;
		}

		if(!isNewInstance)
		{
			return;
		}

		manageNewDatabase();
	});
}

/**
* Runs a query and returns only the first row.
* @param {string} input - Can either be a SQL command or a path to a file.
* @param {object} options - Extra configurations for the query.
* @param {Array<string | number>} options.params - The parameters to be appended for the query.
* @param {boolean} options.isFile - If the input parameter is a path to a file, this options must be set true.
* @async
* @returns {object | Error}
*/
async function queryFirst (input, options = { params: [], isFile: false })
{
	const db = new sqlite3.Database(databasePath());

	let query = input;

	if(options?.isFile ?? false)
	{
		query = await readLocalFile(input);
	}

	return new Promise((resolve, reject) =>
	{
		DB.get(query, options?.params ?? [], (error, row) =>
		{
			if(error)
			{
				console.error(error.message);
				reject(error);
			}

			resolve(row);
		});
	});
}

/**
* Runs an SQL command and commits changes.
* @param {string} input - Can either be a SQL command or a path to a file.
* @param {object} options - Extra configurations for the query.
* @param {Array<string | number>} options.params - The parameters to be appended for the query.
* @param {boolean} options.isFile - If the input parameter is a path to a file, this options must be set true.
* @async
* @returns {boolean}
*/
async function execute (input, options = { params: [], isFile: false })
{
	let command = input;

	if(options?.isFile ?? false)
	{
		command = await readLocalFile(input);
	}

	return new Promise((resolve, reject) =>
	{
		DB.run(command, options?.params ?? [], (error) =>
		{
			if(error)
			{
				console.log('Error during script execution:', error.message);
				reject(false);
			}

			resolve(true);
		});
	});
}

/**
* Closes the global database.
* @returns {void}
*/
function closeDatabase ()
{
	console.log("Closing database connection...");

	DB.close();
}

/**
* Defines what a newly created database requires.
* @async
* @returns {void}
*/
async function manageNewDatabase ()
{
	console.log("Creating new database");

	let databaseInitSql = await readLocalFile('./sql/createTables.sql');

	DB.exec(databaseInitSql);
}

/**
* Returns the absolute path for the database file.
* @returns {string}
*/
function databasePath ()
{
	return applicationFolder() + 'notes-database.db';
}

module.exports = {
	instantiateDatabase,
	queryFirst,
	execute,
	databasePath,
	closeDatabase
};
