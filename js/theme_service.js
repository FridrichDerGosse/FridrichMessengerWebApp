var link = document.createElement( "link" );
link.href = localStorage.getItem("theme");
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";

document.getElementsByTagName( "head" )[0].appendChild( link );

function setTheme(theme) {
    if (theme === "LightTheme") {
        localStorage.setItem("theme", "css/themes/light_theme.css");
        link.href = "css/themes/light_theme.css"
    }
    else {
        localStorage.setItem("theme", "css/themes/dark_theme.css");
        link.href = "css/themes/dark_theme.css";
    }
}

function toggleTheme() {
    if (localStorage.getItem("theme") === "css/themes/light_theme.css") {
        setTheme("DarkTheme");
    }
    else {
        setTheme("LightTheme");
    }
}