let activeRecipeID;

function handleRecipeSearchInput(event) {
    console.log("hi");
    let input = document.getElementById("recipeSearchBar").value.toLowerCase();
    let recipeList = document.getElementById("recipeList").children;
    for (let recipeLI of recipeList) {
        let productName = recipeLI.children[0].innerHTML.toLowerCase();
        if (productName.indexOf(input)!=-1) {
            recipeLI.style.display = null;
            if (event!=null && event.key=="Enter") {
                displayRecipe(recipeLI.getAttribute("data-recipeid"));
                return;
            }
        } else {
            recipeLI.style.display = "none";
        }
    }
    if (event!=null && event.key=="Enter") {
        displayRecipe();
    }
}

function displayRecipe(recipeID) {
    let display = document.getElementById("recipeDisplay");
    let recipe = recipes[recipeID];
    if (recipe!=null) {
        display.innerHTML = "";
        activeRecipeID = recipeID;

        display.innerHTML += "Ingredients: ";
        for (let ingredientStack of recipe.ingredientStacks) {
            display.innerHTML += ingredientStack.size.toFixed(2) + "x " + ingredientStack.item.name + ", ";
        }

        display.innerHTML += "<br>Results: ";
        for (let resultStack of recipe.resultStacks) {
            display.innerHTML += (resultStack.size*recipe.successChance).toFixed(2) + "x " + resultStack.item.name + ", ";
        }

    } else {
        display.innerHTML = "Not a valid recipe!";
    }
}