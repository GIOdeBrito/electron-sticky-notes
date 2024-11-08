
const fs = require('node:fs/promises');
const os = require('node:os');

/**
* Open a file from the user .config folder.
* @param {string} filepath - The path to the file.
* @async
* @returns {string}
*/
async function openFile (filepath)
{
	const data = await fs.readFile(applicationFolder() + filepath, { encoding: 'utf8' });

	return data;
}

/**
* Returns the absolute path to the application's configuration folder.
* @returns {string}
*/
function applicationFolder ()
{
	return os.homedir() + "/.config/StickyNotes/";
}

module.exports = {
	openFile,
	applicationFolder
};
