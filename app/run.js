var {app, BrowserWindow, screen} = require('electron');

app.on('ready', function(){
    if(process.platform === "win32" || process.platform === "darwin")
        openwin();
    else
        setTimeout(openwin, 500);
});

function openwin(){
    win = new BrowserWindow({
        title: "Calque",
        icon: "favicon.png",
        frame: false,
        transparent: true,
        darkTheme: true,
        webPreferences: { nodeIntegration: true }
    });
    win.loadURL("file://" + __dirname + "/index.html");
    cs = new BrowserWindow({
        title: "Cheat Sheet",
        icon: "favicon.png",
        frame: false,
        transparent: true,
        darkTheme: true,
        webPreferences: { nodeIntegration: true },
        width: 388,
        minWidth: 388,
        maxWidth: 388,
        show: false
    });
    cs.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
    cs.loadURL("file://" + __dirname + "/cheatsheet.html");
};

openedcheatsheet = false;
global.cheatsheet = function(){
    if(!openedcheatsheet) {
        let bounds = win.getBounds();
        let workarea = screen.getDisplayNearestPoint(bounds).workArea;
        cs.setBounds({
            height: bounds.height,
            y: bounds.y,
            x: Math.min(bounds.x + bounds.width, workarea.x + workarea.width - 388)
        });
        openedcheatsheet = true;
    }
    cs.show();
}
global.closee = function(){
    win.close();
    cs.close();
}