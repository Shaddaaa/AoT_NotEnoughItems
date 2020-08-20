function getRawRecipeData() {
    let recipesData = [];
    for (let recipe of recipes) {
        recipeData = {};
        recipeData.ingredients = {};
        recipeData.results = {};
        recipeData.successChance = recipe.successChance;

        for (let ingredientStack of recipe.ingredientStacks) {
            recipeData.ingredients[ingredientStack.item.name] = ingredientStack.size;
        }

        for (let resultStack of recipe.resultStacks) {
            recipeData.results[resultStack.item.name] = resultStack.size;
        }
        recipesData.push(recipeData);
    }
    return JSON.stringify(recipesData);
}

function setRawRecipeData(data) {
    try {
        if (data==null) {
            throw "Data is null";
        }
        data = JSON.parse(data);
    } catch (e) {
        console.log(e);
        return;
    }

    craftingRecipeData = data;
    reloadData();
}

function exportRecipeList() {
    copyTextToClipboard(getRawRecipeData());
}

function importRecipeList() {
    let input = window.prompt("Input a recipe list!");
    setRawRecipeData(input);
    reloadData();
}

function saveRecipeList() {
    localStorage.setItem("recipeData", getRawRecipeData());
}

function loadRecipeData() {
	setRawRecipeData(localStorage.getItem("recipeData"));
}

function resetRecipeList() {
    localStorage.removeItem("recipeData");
    location.reload();
}