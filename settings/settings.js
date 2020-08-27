//default settings values:
let settings = {};

function getSettings(indentation=0) {
    return JSON.stringify(settings, null, indentation);
}

function getSavedSettings() {
    let data = localStorage.getItem("settings");
    if (data==null) {
        data = {};
    }
    return data;
}

function setSettings(data) {
    try {
        if (data==null) {
            throw "Data is null";
        }
        data = JSON.parse(data);
    } catch (e) {
        return;
    }

    //default values:
    if (data["settingsExpandTree"]==null) {
        data["settingsExpandTree"] = true;
    }

    if (data["settingsColorScheme"]==null) {
        data["settingsColorScheme"] = "styles/darkColorScheme.css";
    }

    for (let [key,value] of Object.entries(data)) {
        let element = document.getElementById(key);
        switch (key) {
            case "settingsExpandTree":
                element.checked = value;
                break;
            case "settingsColorScheme":
                for (let child of element.children) {
                    if (child.getAttribute("value") == value) {
                        child.setAttribute("selected", "selected");
                    } else {
                        child.removeAttribute("selected");
                    }
                }
                break;
        }
    }

    settings = data;
}

function exportSettings() {
    copyTextToClipboard(getSettings());
}

function importSettings() {
    let input = window.prompt("Input the settings data!");
    setSettings(input);
    reloadData();
}

function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

function loadSettings() {
    setSettings(localStorage.getItem("settings"));
}

function resetSettings() {
    localStorage.removeItem("settings");
    location.reload();
}

function updateSetting(id) {
    let element = document.getElementById(id);
    let newValue;
    let bReloadData = false;
    //TODO: some sort of indication for wrong inputs
    switch (id) {
        case "settingsExpandTree":
            newValue = element.checked;
            break;
        case "settingsColorScheme":
            newValue = element.value;
            bReloadData = true;
            break;
    }
    settings[id] = newValue;
    saveSettings();

    if (bReloadData) {
        reloadData();
        recreateActiveRecipeTree();
    }
}

