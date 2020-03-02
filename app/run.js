var {app, BrowserWindow} = require('electron');

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
        maxWidth: 388
    });
    cs.hide();
    cs.loadURL("file://" + __dirname + "/cheatsheet.html");
};

global.cheatsheet = function(){
    cs.show();
}
global.closee = function(){
    win.close();
    cs.close();
}