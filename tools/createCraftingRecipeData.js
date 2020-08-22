//function to create raw craftingRecipeData from bobs sheet
function createCraftingRecipeData(sheetData) {
    sheetData = sheetData.toLowerCase();
    let recipes = sheetData.split("\n");
    for (let i = 0; i<recipes.length; i++) {
        recipes[i] = recipes[i].split("\t");
    }

    let rawData = {};
    for (let recipe of recipes) {
        let rawRecipe = {};
        

        rawRecipe.ingredients = {};
        for (let j = 0; j<3;j++) {
            if (recipe[4+j]=="") {
                continue;
            }
            //handle double items
            if (rawRecipe.ingredients[recipe[4+j]]!=null) {
                rawRecipe.ingredients[recipe[4+j]] += 1;
            }
            rawRecipe.ingredients[recipe[4+j]] = 1;

        }
        rawRecipe.ingredients["time"] = Number.parseFloat(recipe[13]);

        
        rawRecipe.tools = {};
        if (recipe[7]!="") {
            rawRecipe.tools[recipe[7]] = 1;
        }


        rawRecipe.results = {};
        rawRecipe.results[recipe[1]] = Number.parseFloat(recipe[8]);
        
        rawData[recipe[0]] = rawRecipe;
    }
    return rawData;
}