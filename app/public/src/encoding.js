
/**
* Encodes a base64 string.
* @param {string} content
* @returns {string}
*/
function base64Encode (content)
{
	return btoa(content);
}

/**
* Decodes a base64 string with it's special chars.
* @param {string} content
* @returns {string}
*/
function base64Decode (content)
{
	// I know escape is depreciated, but it still works
	//return decodeURIComponent(escape(atob(content)));

	return atob(content);
}
