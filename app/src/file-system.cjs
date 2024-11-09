
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

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
* Reads a file from within the project.
* @param {string} filepath - The relative path to the file.
* @async
* @returns {string}
*/
async function readLocalFile (filepath)
{
	const data = await fs.readFile(path.join(__dirname, filepath), { encoding: 'utf8' });

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
	applicationFolder,
	readLocalFile
};
