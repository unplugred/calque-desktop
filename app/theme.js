var themes = ["Dark","Light","Contrast","Pink","Desert","Rose","Hotdog Stand"];

var themenum = remote.getGlobal("data").theme;
document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";

function changetheme(theme){
	themenum = theme;
	document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";
	remote.getGlobal("data").theme = themenum;
	remote.getGlobal("savedata")();
}

function updatetheme() {
	let currenttheme = remote.getGlobal("data").theme;
	if(themenum == currenttheme) return;
	themenum = currenttheme;
	document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";
}