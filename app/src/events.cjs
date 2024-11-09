
const { app, ipcMain } = require('electron');
const { openFile, readLocalFile } = require('./file-system.cjs');
const { instantiateDatabase, queryFirst, closeDatabase } = require('./database.cjs');

/**
* Set the many events for the application.
* @param {BrowserWindow} window - The main browser window.
* @returns {void}
*/
function setEvents (window)
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
}

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
