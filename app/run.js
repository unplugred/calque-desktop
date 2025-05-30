var {app, BrowserWindow, screen} = require('electron');
require('@electron/remote/main').initialize();
var path = require('path');
var fs = require('fs');

datapath = path.join(app.getPath('userData'),'calque');
if(!fs.existsSync(datapath)) fs.mkdirSync(datapath);
global.themepath = path.join(datapath,'theme.css');
datapath = path.join(datapath,'calque.json');
try {
	global.data = JSON.parse(fs.readFileSync(datapath));
} catch(error) {
	global.data = {
		width: 400,
		height: 600,
		theme: 0,
		isontop: false,
		input: null
	};
}
global.savedata = function() {
	fs.writeFileSync(datapath,JSON.stringify(global.data));
}

app.on('ready', function(){
	if(process.platform === "win32" || process.platform === "darwin")
		openwin();
	else
		setTimeout(openwin, 500);
});

function openwin(){
	global.win = new BrowserWindow({
		title: "Calque",
		icon: "icons/icon64.png",
		frame: false,
		transparent: true,
		darkTheme: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false
		},
		width: global.data.width,
		height: global.data.height
	});
	global.win.on('resize',() => {
		let { width, height } = global.win.getBounds();
		global.data.width = width;
		global.data.height = height;
		global.savedata();
	});
	require('@electron/remote/main').enable(global.win.webContents);
	global.win.loadURL("file://" + __dirname + "/index.html");
	global.cs = new BrowserWindow({
		title: "Cheat Sheet",
		icon: "icons/icon64.png",
		frame: false,
		transparent: true,
		darkTheme: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false
		},
		width: 388,
		minWidth: 388,
		maxWidth: 388,
		show: false
	});
	require('@electron/remote/main').enable(global.cs.webContents);
	global.cs.webContents.on('new-window', function(e, url) {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	});
	global.cs.loadURL("file://" + __dirname + "/cheatsheet.html");
};

openedcheatsheet = false;
global.cheatsheet = function(){
	if(!openedcheatsheet) {
		let bounds = global.win.getBounds();
		let workarea = screen.getDisplayNearestPoint(bounds).workArea;
		global.cs.setBounds({
			height: bounds.height,
			y: bounds.y,
			x: Math.min(bounds.x + bounds.width, workarea.x + workarea.width - 388)
		});
		openedcheatsheet = true;
	}
	global.cs.show();
}