var themes = ["Dark","Light","Contrast","Pink","Desert","Rose","Hotdog Stand"];
var linecolor = "white";

var themenum = remote.getGlobal("data").theme;
document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";

function changetheme(theme){
	themenum = theme;
	document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";
	remote.getGlobal("data").theme = themenum;
	remote.getGlobal("savedata")();
	setTimeout(updatelinecolor,200);
}

function updatetheme() {
	let currenttheme = remote.getGlobal("data").theme;
	if(themenum == currenttheme) return;
	themenum = currenttheme;
	document.getElementById('thm').href = "themes/" + themes[themenum] + ".css";
	setTimeout(updatelinecolor,200);
}

function updatelinecolor() {
	linecolor = getComputedStyle(document.body).getPropertyValue('--foreground');
	drawplot();
}
setTimeout(updatelinecolor,200);