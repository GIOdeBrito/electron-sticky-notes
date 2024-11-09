
/* Main file for sticky notes */

window.addEventListener('load', function ()
{
	defineControls();
});

/**
* Define the main controls of the header tools.
* @returns {void}
*/
function defineControls ()
{
	let header = document.querySelector('header');

	header.children[1].onclick = () => quit();

	let textarea = document.querySelector('textarea[name="main-text"]');

	let inputUpdate = function () {};

	textarea.oninput = (ev) =>
	{
		clearTimeout(inputUpdate);

		let content = ev.target.value;

		inputUpdate = setTimeout(() => saveTextToDatabase(content), 500);
	};
}

/**
* This function's purpose is to write to disk what was written on the main text area.
* @returns {void}
*/
async function saveTextToDatabase (content)
{
	let response = await aCallBeyond('setTextNote', base64Encode(content), NOTE_ID);

	console.log('Text was saved:', response);
}

/**
* Closes the current application instance.
* @returns {void}
*/
function quit ()
{
	window.electronAPI.closeApp();
}
