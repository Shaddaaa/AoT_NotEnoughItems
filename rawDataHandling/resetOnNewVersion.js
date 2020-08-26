//whenever this is larger than the locally stored resetCounter, settings will be reset.
const resetCounter = {
    "enabledRecipes": 1,
    "priceData": 1,
    "recipeSuccessChances": 1,
    "settings": 1,
};

function checkForReset() {
    let localResetCounter = localStorage.getItem("resetCounter");
    try {
        if (localResetCounter==null) {
            throw "localResetCounter is null";
        }
        localResetCounter = JSON.parse(localResetCounter);
    } catch (e) {
        localResetCounter = resetCounter;
    }

    for (let [key, value] of Object.entries(resetCounter)) {
        if (Number.parseInt(localResetCounter[key])<Number.parseInt(value)) {
            resetDataSetByUser(key);
            localResetCounter[key] = resetCounter[key];
            break;
        }
    }

    localStorage.setItem("resetCounter", JSON.stringify(localResetCounter));
}

function resetDataSetByUser(which) {
    console.log(which);
    switch (which) {
        case "enabledRecipes":
            window.alert("Your enabled/disabled recipes need to be reset because of an update, here is your old data (back it up somewhere, maybe you can import it again!)\n" + getSavedEnabledRecipes());
            resetEnabledRecipes();
            break;
        case "priceData":
            window.alert("Your custom prices per item need to be reset because of an update, here is your old data (back it up somewhere, maybe you can import it again!)\n" + getSavedRawPriceData());
            resetEnabledRecipes();
            break;
        case "recipeSuccessChances":
            window.alert("Your custom success chances per recipe need to be reset because of an update, here is your old data (back it up somewhere, maybe you can import it again!)\n" + getSavedRecipeSuccessChances());
            resetRecipeSuccessChances();
            break;
        case "settings":
            window.alert("Your settings (not the custom prices, chances etc!) need to be reset because of an update, here is your old data (back it up somewhere, maybe you can import it again!)\n" + getSavedSettings());
            resetSettings();
            break;
    }

}