function createDefaultSuccessChances() {
    createDefaultCraftingSuccessChances();
    createDefaultCookingSuccessChances();
    createDefaultMiningSuccessChances();
}

function createDefaultCraftingSuccessChances() {
    for (let [id, craftingRecipe] of Object.entries(craftingRecipeData)) {
        recipeSuccessChances[id] = 0.85;
    }
}

function createDefaultCookingSuccessChances() {
    for (let [id, cookingRecipe] of Object.entries(cookingRecipeData)) {
        recipeSuccessChances[id] = 0.40;
        if (id.indexOf("-")!=-1) {
            recipeSuccessChances[id] = 1;
        }
    }
}

function createDefaultMiningSuccessChances() {
    for (let [id, miningRecipe] of Object.entries(miningRecipeData)) {
        recipeSuccessChances[id] = 1;
    }
}