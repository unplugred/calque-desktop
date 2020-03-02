function changetheme(thm){
    document.getElementById('thm').href = "themes/" + thm + ".css";
    localStorage.setItem("theme", thm);
}

function loadtheme() {
    if (localStorage.getItem("theme"))
        changetheme(localStorage.getItem("theme"));
    else
        changetheme("Dark");
}

var thme;
function updatetheme() {
    if(thme === localStorage.getItem("theme")) return;
    thme = localStorage.getItem("theme");
    document.getElementById('thm').href = "themes/" + thme + ".css";
}