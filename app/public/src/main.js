
/* Main file for sticky notes */

window.addEventListener('load', function ()
{
	defineControls();
});

function defineControls ()
{
	let header = document.querySelector('header');

	//let icons = Array.from(header.querySelectorAll('img'));

	header.children[0].onclick = () => window.electronAPI.closeApp();
}
