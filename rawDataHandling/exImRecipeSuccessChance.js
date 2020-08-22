function getRecipeSuccessChances(indentation=0) {
    let recipeSuccessChancesData = {};
    for (let [id, recipe] of Object.entries(recipes)) {
        recipeSuccessChancesData[recipe.id] = recipe.successChance;
    }
    return JSON.stringify(recipeSuccessChancesData, null, indentation);
}

function setRecipeSuccessChances(data) {
    try {
        if (data==null) {
            throw "Data is null";
        }
        data = JSON.parse(data);
    } catch (e) {
        return;
    }

    for (let [id, recipeSuccessChance] of Object.entries(data)) {
        recipeSuccessChances[id] = recipeSuccessChance;
    }
}

function exportRecipeSuccessChances() {
    copyTextToClipboard(getRecipeSuccessChances());
}

function importRecipeSuccessChances() {
    let input = window.prompt("Input a list of recipe chances!");
    setRecipeSuccessChances(input);
    reloadData();
}

function saveRecipeSuccessChances() {
    localStorage.setItem("recipeSuccessChances", getRecipeSuccessChances());
}

function loadRecipeSuccessChances() {
	setRecipeSuccessChances(localStorage.getItem("recipeSuccessChances"));
}

function resetRecipeSuccessChances() {
    localStorage.removeItem("recipeSuccessChances");
    location.reload();
}