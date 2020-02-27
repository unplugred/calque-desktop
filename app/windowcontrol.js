const remote = require('electron').remote;
document.getElementById("min").addEventListener("click", function (e) {
    remote.getCurrentWindow().minimize();
});
document.getElementById("close").addEventListener("click", function (e) {
    remote.getCurrentWindow().close();
});

const contextMenu = require('electron-context-menu');
contextMenu({
    menu: actions => [
        actions.copy(),
        actions.cut(),
        actions.paste(),
        actions.separator(),
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom', label: 'Reset Zoom' },
        actions.separator(),
        {
            label: 'Theme',
            'submenu': [
                {
                    label: 'Dark',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Dark");
                    }
                },
                {
                    label: 'Light',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Light");
                    }
                },
                {
                    label: 'Contrast',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Contrast");
                    }
                },
                {
                    label: 'Pink',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Pink");
                    }
                },
                {
                    label: 'Desert',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Desert");
                    }
                },
                {
                    label: 'Rose',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Rose");
                    }
                },
                {
                    label: 'Hotdog Stand',
                    click: (menuItem, BrowserWindow, event) => {
                        changetheme("Hotdog Stand");
                    }
                }
            ]
        },
        { role: 'quit' }
    ]
});
function changetheme(thm){
    document.getElementById('thm').href = "themes/" + thm + ".css";
    localStorage.setItem("theme", thm);
}

window.onload = function () {
    if (localStorage.getItem("theme"))
        changetheme(localStorage.getItem("theme"));
    else
        changetheme("Dark");

    var input = document.getElementById('input');
    if (localStorage.getItem("input"))
        input.value = localStorage.getItem("input");

    var output = document.getElementById('output');
    window.calque = new Calque(input, output);
    input.focus();
}