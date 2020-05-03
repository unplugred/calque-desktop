var themes = ["Dark","Light","Contrast","Pink","Desert","Rose","Hotdog Stand"];

function changetheme(thm){
    document.getElementById('thm').href = "themes/" + themes[thm] + ".css";
    localStorage.setItem("theme", thm);
}

function loadtheme() {
    let num = parseInt(localStorage.getItem("theme"));
    if(isNaN(num)) num = 0;
    changetheme(num);
    return num;
}

var thme;
function updatetheme() {
    if(thme === localStorage.getItem("theme")) return;
    thme = localStorage.getItem("theme");
    document.getElementById('thm').href = "themes/" + themes[thme] + ".css";
}