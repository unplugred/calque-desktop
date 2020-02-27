var {app, BrowserWindow} = require('electron');

app.on('ready', function(){
    win = new BrowserWindow({
        title: "Calque",
        icon: "favicon.png",
        frame: false,
        transparent: true,
        darkTheme: true,
        webPreferences: { nodeIntegration: true }
    });
    win.loadURL("file://" + __dirname + "/index.html");
});