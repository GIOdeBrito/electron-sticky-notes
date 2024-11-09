
const { app, BrowserWindow } = require('electron');
const path = require('path');
const setEvents = require('./src/events.cjs');

function createWindow ()
{
	const winSettings = {
		width: 400,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'src/preload.cjs')
		},
		icon: path.join(__dirname, 'icon.png')
	};

	const mainWindow = new BrowserWindow(winSettings);

	setEvents(mainWindow);

	mainWindow.setMenu(null);
	mainWindow.loadFile('index.html');

	mainWindow.webContents.openDevTools();
}

// When on ready, calls the create window function
app.on('ready', createWindow);
