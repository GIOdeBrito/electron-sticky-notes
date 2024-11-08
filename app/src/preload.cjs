
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',
{
	closeApp: () => closeApplication(),
	readConfig: () => readConfigFile()
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
	let filepath = 'notes-config.txt';

	let data = await ipcRenderer.invoke('open-config');

	return data;
}
