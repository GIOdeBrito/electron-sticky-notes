
/* Main file for sticky notes */

import configureApplication from "./config.js";

window.addEventListener('load', function ()
{
	defineControls();
	configureApplication();
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
}

/**
* Closes the current application instance.
* @returns {void}
*/
function quit ()
{
	window.electronAPI.closeApp();
}
