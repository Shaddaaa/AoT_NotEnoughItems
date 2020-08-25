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
    handleRecipeSearchInput();
    displayRecipe(activeRecipeID);
}

function displayRecipe(recipeID) {
    let display = document.getElementById("recipeDisplay");
    let recipe = recipes[recipeID];
    if (recipe!=null) {
        display.innerHTML = "";
        activeRecipeID = recipeID;


        let table = document.createElement("table");
        display.appendChild(table);

        let headerRow = document.createElement("tr");
        let headers = ["Ingredients:", "Tools:", "", "Results:"];
        for (let headerText of headers) {
            let header = document.createElement("th");
            header.innerHTML = headerText;
            headerRow.appendChild(header);
        }
        table.appendChild(headerRow);
        
        let max = Math.max(recipe.ingredientStacks.length-1, recipe.resultStacks.length, recipe.toolStacks.length, 2);
        for (let i = 0; i < max; i++) {
            let ingredientStack = recipe.ingredientStacks[i];
            let toolStack = recipe.toolStacks[i];
            let resultStack = recipe.resultStacks[i];
            console.log(i);
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");

            //td1
            if (ingredientStack!=null && ingredientStack.item.name != "time") {
                td1.innerHTML += ingredientStack.size.toFixed(2) + " " + upEveryFirstLetter(ingredientStack.item.name);
            }
            //td2
            if (toolStack!=null) {
                td2.innerHTML += toolStack.size.toFixed(2) + " " + upEveryFirstLetter(toolStack.item.name);
            }
            //td3
            if (i == Math.floor(max/2)-1) {
                let arrow = document.createElement("div");
                arrow.classList.toggle("arrowRight");
                td3.appendChild(arrow);
            }
            if (i == Math.floor(max/2)) {
                let timeIndex = recipe.getIngredientIndexOf("time");
                let time;
                if (timeIndex!=-1) {
                    time = recipe.ingredientStacks[timeIndex].size;
                } else {
                    time = 0;
                }
                td3.innerHTML = time + "🕑";
            }
            //td4
            if (resultStack!=null) {
                td4.innerHTML += resultStack.size.toFixed(2) + " " + upEveryFirstLetter(resultStack.item.name);
            }
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr);
        }

        /*let ingredients = document.createElement("div");
        ingredients.id = "recipeIngredientColumn";
        ingredients.classList.toggle("recipeDisplayColumn");
        ingredients.appendChild(iHeader);
        for (let ingredientStack of recipe.ingredientStacks) {
            let ingredient = document.createElement("div");
            ingredient.classList.toggle("recipeTableElement");
            ingredient.innerHTML += ingredientStack.size.toFixed(2) + "x " + ingredientStack.item.name;
            ingredients.appendChild(ingredient);
        }
        table.appendChild(ingredients);



        let tools = document.createElement("div");
        tools.id = "recipeToolColumn";
        tools.classList.toggle("recipeDisplayColumn");
        tools.appendChild(tHeader);
        for (let toolStack of recipe.toolStacks) {
            let tool = document.createElement("div");
            tool.classList.toggle("recipeTableElement");
            tool.innerHTML += toolStack.size.toFixed(2) + "x " + toolStack.item.name;
            tools.appendChild(tool);
        }
        table.appendChild(tools);

        let arrowContainer = document.createElement("div");
        arrowContainer.id = "recipeArrowColumn";
        arrowContainer.classList.toggle("recipeDisplayColumn");
        let arrowDiv = document.createElement("div");
        let arrow = document.createElement("div");
        arrow.classList.toggle("arrowRight");
        arrowDiv.append(arrow);
        arrowContainer.appendChild(arrowDiv);
        table.appendChild(arrowContainer);


        let results = document.createElement("div");
        results.id = "recipeResultColumn";
        results.classList.toggle("recipeDisplayColumn");
        results.appendChild(rHeader);
        for (let resultStack of recipe.resultStacks) {
            let result = document.createElement("div");
            result.classList.toggle("recipeTableElement");
            result.innerHTML += resultStack.size.toFixed(2) + "x " + resultStack.item.name;
            results.appendChild(result);
        }
        table.appendChild(results);

        */
        //display recipe options
        let successInput = document.getElementById("recipeSuccessChance").children[1];
        successInput.placeholder = recipe.successChance;
        successInput.value = null;

        let enabledInput = document.getElementById("enableRecipe").children[1];
        enabledInput.checked = recipes[recipeID].enabled;

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

function handleEnableRecipeInput(event) {
    let input = document.getElementById("enableRecipe").children[1].checked;
    enabledRecipes[activeRecipeID] = input;
    reloadData();
}

function setEnabledForSearchedRecipes(enabled) {
    let recipeList = document.getElementById("recipeList").children;
    for (let recipeLI of recipeList) {
        if (recipeLI.style.display != "none") {
            enabledRecipes[recipeLI.getAttribute("data-recipeid")] = enabled;
        }
    }
    reloadData();
}

