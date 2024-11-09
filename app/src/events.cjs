
const { app, ipcMain } = require('electron');
const { openFile, readLocalFile } = require('./file-system.cjs');
const { instantiateDatabase, queryFirst, execute, closeDatabase } = require('./database.cjs');

/**
* Set the many events for the application.
* @returns {void}
*/
function setEvents ()
{
	// Quit when all windows are closed
	app.on('window-all-closed', () =>
	{
		shutdownApplication();
	});

	instantiateDatabase();

	setWorldEvents();
}

/**
* Set the world events, that is, the events that are callable by the browser.
* @returns {void}
*/
function setWorldEvents ()
{
	ipcMain.on('close-app', () =>
	{
		shutdownApplication();
	});

	ipcMain.handle('open-config', async (event, path) =>
	{
		return await openFile('notes.txt');
	});

	ipcMain.handle('get-latest-note-entry', async (event) =>
	{
		let data = await queryFirst('./sql/getLatestEntry.sql', { isFile: true });

		return data;
	});

	ipcMain.handle('set-text-content-annotation', async (event, content, id) =>
	{
		let response = await execute('./sql/updateNote.sql', { params: [content, id], isFile: true });

		return response;
	});
}

/**
* Run this function to quit the application. It is necessary this way so the database is also closed.
* @returns {void}
*/
function shutdownApplication ()
{
	console.log("Shutting down...");

	closeDatabase();

	// For macOS
	if(process.platform !== 'darwin')
	{
		app.quit();
	}
}

module.exports = setEvents;
