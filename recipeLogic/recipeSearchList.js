let activeRecipeID;

function handleRecipeSearchInput(event) {
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

function updateDisplayRecipe() {
    displayRecipe(activeRecipeID);
}

function displayRecipe(recipeID) {
    let display = document.getElementById("recipeDisplay");
    let recipe = recipes[recipeID];
    if (recipe!=null) {
        display.innerHTML = "";
        activeRecipeID = recipeID;

        //display recipe
        display.innerHTML += "Ingredients: ";
        for (let ingredientStack of recipe.ingredientStacks) {
            display.innerHTML += ingredientStack.size.toFixed(2) + "x " + ingredientStack.item.name + ", ";
        }

        display.innerHTML += "<br>Tools: ";
        for (let toolStack of recipe.toolStacks) {
            display.innerHTML += toolStack.size.toFixed(2) + "x " + toolStack.item.name + ", ";
        }

        display.innerHTML += "<br>Results: ";
        for (let resultStack of recipe.resultStacks) {
            display.innerHTML += resultStack.size.toFixed(2) + "x " + resultStack.item.name + ", ";
        }

        //display recipe options
        let successInput = document.getElementById("recipeSuccessChance").children[1];
        successInput.placeholder = recipe.successChance;
        successInput.value = null;

    } else {
        display.innerHTML = "Not a valid recipe!";
    }
}

function handleRecipeSuccessChanceInput(event) {
    let input = Number.parseFloat(document.getElementById("recipeSuccessChance").children[1].value);
    if (isNaN(input)) {
        return;
    }

    if (event!=null && event.key=="Enter") {
        recipeSuccessChances[activeRecipeID] = input;
        reloadData();
    }
}