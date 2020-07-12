var {app, BrowserWindow, screen} = require('electron');

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
        webPreferences: { nodeIntegration: true }
    });
    global.win.loadURL("file://" + __dirname + "/index.html");
    global.cs = new BrowserWindow({
        title: "Cheat Sheet",
        icon: "icons/icon64.png",
        frame: false,
        transparent: true,
        darkTheme: true,
        webPreferences: { nodeIntegration: true },
        width: 388,
        minWidth: 388,
        maxWidth: 388,
        show: false
    });
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
global.closee = function(){
    global.win.close();
    global.cs.close();
}