
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',
{
	closeApp: () => closeApplication()
});

function closeApplication ()
{
	ipcRenderer.send('close-app');
}
