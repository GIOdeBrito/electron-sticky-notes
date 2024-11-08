
const { app, ipcMain } = require('electron');
const { openFile } = require('./exploring.cjs');
const { instantiateDatabase } = require('./database.cjs');

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
		console.log("Shutting down...");
	});

	ipcMain.on('close-app', () =>
	{
		app.quit();
	});

	ipcMain.handle('open-config', async (event, path) =>
	{
		return await openFile('notes.txt');
	});

	instantiateDatabase();
}

module.exports = setEvents;
