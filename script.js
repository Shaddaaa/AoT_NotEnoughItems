//contains every item once
let items;

//contains every recipe once
let recipes;

//parses the raw data into item and recipe objects
function reloadData() {
	items = {};
	recipes = {};

	//add time as a resource
	priceData["time"] = 0;
	//add cooking heat as a resource
	priceData["cooking heat"] = 0;
	//add food mining value as a resource
	priceData["food mining value"] = 0;

	//create item objects
	for (let [name, price] of Object.entries(priceData)) {
		name = name.toLowerCase();
		items[name] = new Item(name, Number.parseFloat(price));
	}

	//merge all recipeDatas into one object
	let recipeData = {};
	for (let [id, craftingRecipeInput] of Object.entries(craftingRecipeData)) {
		recipeData[id] = craftingRecipeInput;
	}
	for (let [id, cookingRecipeInput] of Object.entries(cookingRecipeData)) {
		recipeData[id] = cookingRecipeInput;
	}
	for (let [id, miningRecipeInput] of Object.entries(miningRecipeData)) {
		recipeData[id] = miningRecipeInput;
	}

	//create recipe objects
	for (let [id, recipeInput] of Object.entries(recipeData)) {
		let ingredientStacks = [];
		let toolStacks = [];
		let resultStacks = [];
		for (let [ingredientName, amount] of Object.entries(recipeInput.ingredients)) {
			ingredientName = ingredientName.toLowerCase();
			ingredientStacks.push(new ItemStack(items[ingredientName], amount));
		}
		for (let [toolName, amount] of Object.entries(recipeInput.tools)) {
			toolName = toolName.toLowerCase();
			toolStacks.push(new ItemStack(items[toolName], amount));
		}
		for (let [resultName, amount] of Object.entries(recipeInput.results)) {
			resultName = resultName.toLowerCase();
			//check for items that are both ingredients AND results
			let found = false;
			for (let i = 0; i < ingredientStacks.length; i++) {
				if (resultName==ingredientStacks[i].item.name) {
					found = true;
					if (amount < ingredientStacks[i].size) {
						ingredientStacks[i].size -= amount;
					} else if (amount > ingredientStacks[i].size) {
						resultStacks.push(new ItemStack(items[resultName], amount - ingredientStacks[i].size));
						ingredientStacks.splice(i,1);
					} else {
						ingredientStacks[i].size = 0;
					}
					break;
				}
			}
			if (!found) {
				resultStacks.push(new ItemStack(items[resultName], amount));
			}
		}
		recipes[id] = new Recipe(ingredientStacks, toolStacks, resultStacks, recipeSuccessChances[id], id);
		if (recipeSuccessChances[id]==null) {
			console.log("You forgot to add the recipeSuccessChances again, come on...");
		}
	}

	//add recipes to item objects
	for (let [name, item] of Object.entries(items)) {
		for (let [id, recipe] of Object.entries(recipes)) {
			if (recipe.getResultIndexOf(name)!=-1) {
				item.addRecipe(recipe);
			}
		}
	}

	savePriceList();
	saveRecipeSuccessChances();
	setUpItemSearchList();
	setUpRecipeSearchList();
	handleItemSearchInput();
	recreateActiveRecipeTree();
	updateDisplayRecipe();
}

function onload() {
	createDefaultSuccessChances();

	loadSettings();
	loadPriceData();
	loadRecipeSuccessChances();
	reloadData();
}