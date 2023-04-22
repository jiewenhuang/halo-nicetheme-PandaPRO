var currentColorScheme = "system";

function initColorScheme(defaultColorScheme, enableChangeColorScheme) {
    let colorScheme = defaultColorScheme;

    if (enableChangeColorScheme) {
        colorScheme =
            localStorage.getItem("color-scheme") || defaultColorScheme;
    }

    currentColorScheme = colorScheme;

    $(document).ready(function () {
        setColorScheme(colorScheme, false);
    });
}

function setBodyColorScheme(colorScheme) {
    if (colorScheme === "dark") {
        $("body").addClass("nice-dark-mode");
    } else {
        $("body").removeClass("nice-dark-mode");
    }
}

function setColorScheme(colorScheme) {
    if (colorScheme === "system") {
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.classList.add(prefersDark ? "dark" : "light");
        document.documentElement.classList.remove(
            prefersDark ? "light" : "dark"
        );
        setBodyColorScheme(prefersDark);
    } else {
        document.documentElement.classList.add(colorScheme);
        document.documentElement.classList.remove(
            colorScheme === "dark" ? "light" : "dark"
        );
        setBodyColorScheme(colorScheme);
    }
    currentColorScheme = colorScheme;
    localStorage.setItem("color-scheme", colorScheme);
}

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
        if (currentColorScheme === "system") {
            setColorScheme("system", false);
        }
    });
