
/* Handles configuration of the application */

async function configureApplication ()
{
	let response = await window.electronAPI.readConfig();
}

export default configureApplication;
