//default settings values:
let settings = {};

function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

function loadSettings() {
    let tmp = localStorage.getItem("settings");
    if (tmp!=null) {
        settings = JSON.parse(tmp);
    }

    //default values:
    if (settings["settingsExpandTree"]==null) {
        settings["settingsExpandTree"] = true;
    }
    if (settings["settingsTimePerCraft"]==null) {
        settings["settingsTimePerCraft"] = 1;
    }

    for (let [key,value] of Object.entries(settings)) {
        let element = document.getElementById(key);
        switch (key) {
            case "settingsExpandTree":
                element.checked = value;
                break;
            case "settingsTimePerCraft":
                element.value = value;
                break;
        }
    }
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
        case "settingsTimePerCraft":
            newValue = Number.parseFloat(element.value);
            if (isNaN(newValue) || newValue < 0) {
                return;
            }
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