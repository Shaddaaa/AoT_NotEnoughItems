//contains every item once
let items = {};

//contains every recipe once
let recipes = [];

//create item objects
for (let [name, price] of Object.entries(priceData)) {
	name = name.toLowerCase();
	items[name] = new Item(name, price);
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

