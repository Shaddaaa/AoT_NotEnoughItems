//contains every item once
let items;

//contains every recipe once
let recipes;

//parses the raw data into item and recipe objects
function reloadData() {
	items = {};
	recipes = [];

	
	//add time as a resource
	priceData["time"] = settings["settingsTimePrice"];

	//create item objects
	for (let [name, price] of Object.entries(priceData)) {
		name = name.toLowerCase();
		items[name] = new Item(name, Number.parseFloat(price));
	}

	//merge all recipeDatas into one object and add appropriate time requirements
	let recipeData = [];
	for (let craftingRecipeInput of craftingRecipeData) {
		craftingRecipeInput.ingredients["time"] = settings["settingsTimePerCraft"];
		recipeData.push(craftingRecipeInput);
	}

	//create recipe objects
	for (let recipeInput of recipeData) {
		let ingredientStacks = [];
		let resultStacks = [];
		for (let [ingredientName, amount] of Object.entries(recipeInput.ingredients)) {
			ingredientName = ingredientName.toLowerCase();
			ingredientStacks.push(new ItemStack(items[ingredientName], amount));
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
		recipes.push(new Recipe(ingredientStacks, resultStacks));
	}

	//add recipes to item objects
	for (let [name, item] of Object.entries(items)) {
		for (let recipe of recipes) {
			if (recipe.getResultIndexOf(name)!=-1) {
				item.addRecipe(recipe);
			}
		}
	}

	savePriceList();
	setUpItemSearchList();
	getRecipeForInput();
	recreateActiveRecipeTree();
}

function loadPriceData() {
	let savedData = localStorage.getItem("priceData");

	try {
		if (savedData==null) {
			throw "Data is null";
		}
		savedData = JSON.parse(savedData);
	} catch (e) {
		savedData = {};
	}
	for (let [name, price] of Object.entries(savedData)) {
		priceData[name] = price;
	}
}

function onload() {
	loadSettings();
	loadPriceData();
	reloadData();
}