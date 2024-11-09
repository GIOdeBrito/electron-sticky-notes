
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',
{
	closeApp: () => closeApplication(),
	readConfig: () => readConfigFile(),
	getLatestNote: () => getLatestNote()
});

/**
* Closes the application.
* @returns {void}
*/
function closeApplication ()
{
	ipcRenderer.send('close-app');
}

async function readConfigFile ()
{
	const filepath = 'notes-config.txt';

	let data = await ipcRenderer.invoke('open-config');

	return data;
}

async function getLatestNote ()
{
	let data = await ipcRenderer.invoke('get-latest-note-entry');

	return data;
}
