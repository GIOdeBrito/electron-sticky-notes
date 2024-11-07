
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
