function createDefaultSuccessChances() {
    createDefaultCraftingSuccessChances();
}

function createDefaultCraftingSuccessChances() {
    recipeSuccessChances = {};
    for (let [id, craftingRecipe] of Object.entries(craftingRecipeData)) {
        recipeSuccessChances[id] = 0.85;
    }
}