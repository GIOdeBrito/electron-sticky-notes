
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow ()
{
	const winSettings = {
		width: 400,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.cjs')
		},
		icon: path.join(__dirname, 'icon.png')
	};

	const mainWindow = new BrowserWindow(winSettings);

	mainWindow.setMenu(null);
	mainWindow.loadFile('index.html');

	mainWindow.webContents.openDevTools();
}

// When on ready, calls the create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () =>
{
	console.log("Shutting down...");
});

ipcMain.on('close-app', () =>
{
	app.quit();
});

