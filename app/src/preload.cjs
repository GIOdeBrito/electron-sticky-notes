
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',
{
	closeApp: () => closeApplication(),
	readConfig: () => readConfigFile(),
	getLatestNote: () => getLatestNote(),
	setTextNote: (content, id) => setTextContentNote(content, id)
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

/**
* Returns the most recent, based on creation date, row in the Note List table.
* @returns {{ID: number, CONTENT: string}}
*/
async function getLatestNote ()
{
	let data = await ipcRenderer.invoke('get-latest-note-entry');

	return data;
}

/**
* Saves the text content of the current open annotation.
* @param {string} content - The text content.
* @param {number} id - The ID of the entry in the database.
* @returns {boolean}
*/
async function setTextContentNote (content, id)
{
	let data = await ipcRenderer.invoke('set-text-content-annotation', content, id);

	return data;
}
