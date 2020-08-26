function getEnabledRecipes(indentation=0) {
    let enabledRecipeData = {};
    for (let [id, recipe] of Object.entries(recipes)) {
        enabledRecipeData[recipe.id] = recipe.enabled;
    }
    return JSON.stringify(enabledRecipeData, null, indentation);
}

function getSavedEnabledRecipes(indentation=0) {
    let data = localStorage.getItem("enabledRecipes");
    if (data==null) {
        data = {};
    }
    return data;
}

function setEnabledRecipes(data) {
    try {
        if (data==null) {
            throw "Data is null";
        }
        data = JSON.parse(data);
    } catch (e) {
        return;
    }

    for (let [id, enabledRecipe] of Object.entries(data)) {
        enabledRecipes[id] = enabledRecipe;
    }
}

function exportEnabledRecipes() {
    copyTextToClipboard(getEnabledRecipes());
}

function importEnabledRecipes() {
    let input = window.prompt("Input a list of recipe chances!");
    setEnabledRecipes(input);
    reloadData();
}

function saveEnabledRecipes() {
    localStorage.setItem("enabledRecipes", getEnabledRecipes());
}

function loadEnabledRecipes() {
	setEnabledRecipes(localStorage.getItem("enabledRecipes"));
}

function resetEnabledRecipes() {
    localStorage.removeItem("enabledRecipes");
    location.reload();
}