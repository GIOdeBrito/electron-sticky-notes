
/* Main file for sticky notes */

//import configureApplication from "./config.js";

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

	//let icons = Array.from(header.querySelectorAll('img'));

	header.children[1].onclick = () => quit();

	let textarea = document.querySelector('textarea[name="main-text"]');

	let inputUpdate = function () {};

	textarea.oninput = (ev) =>
	{
		clearTimeout(inputUpdate);

		let content = ev.target.value;

		inputUpdate = setTimeout(() => saveInputToDisk(content), 500);
	};
}

/**
* This function's purpose is to write to disk what was written on the main text area.
* @returns {void}
*/
function saveInputToDisk (content)
{
	console.log(content);
}

/**
* Closes the current application instance.
* @returns {void}
*/
function quit ()
{
	window.electronAPI.closeApp();
}
