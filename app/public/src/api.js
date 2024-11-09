
var NOTE_ID = -1;

window.addEventListener('load', function ()
{
	getSetNoteData();
});

/**
* Calls the API to retrieve the data of the most recent note. Also sets its global ID and the text area content.
* @async
* @returns {void}
*/
async function getSetNoteData ()
{
	let response = await aCallBeyond('getLatestNote');

	NOTE_ID = response?.ID;

	let textarea = document.querySelector('textarea[name="main-text"]');

	textarea.value = base64Decode(response?.CONTENT);
}

/**
* Calls a propriety of the electron API.
* @param {string} funcname - More precisely the name of the propriety to be called.
* @param {...(string | number)} params - REST; Function parameters.
* @async
* @returns {object | boolean}
*/
async function aCallBeyond (funcname, ...params)
{
	let response = await window.electronAPI?.[funcname](...params);

	return response;
}
