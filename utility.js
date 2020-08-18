function upEveryFirstLetter(text) {
    let arr = text.split(" ");
    let ret = "";
    for (let part of arr) {
        if (part[0]!=null) {
            ret += part[0].toUpperCase() + part.slice(1) + " ";
        } else {
            ret += " ";
        }

    }
    return ret.slice(0, ret.length-1);
}

function copyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.position="fixed";  //avoid scrolling to bottom
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
	} catch (err) {

	}

	document.body.removeChild(textArea);
}