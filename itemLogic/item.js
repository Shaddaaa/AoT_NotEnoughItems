class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.recipes = [];
	}
	addRecipe(recipe) {
		this.recipes.push(recipe);
	}
	getRecipe(recipeIndex) {
		return this.recipes[recipeIndex];
	}
	getPrice() {
		return this.price;
	}
    //returns an object with prodCost, remains and node, where remains is an array of itemStacks and node is a recipeNode
	getRecipeTree(recipeIndex) {
		let prodPrice = 0;
		let recipe = this.recipes[recipeIndex];
		let normalizingFactor;
		let remains = [];
		for (let stack of recipe.resultStacks) {
			if (stack.item==this) {
                normalizingFactor = 1/stack.size;
			} else {
				remains.push(cloneItemStack(stack));
			}
        }

        //loop through all ingredients and tools needed and look for their cheapest recipe tree
        let ingredientChildNodes = [];
		for (let ingredientStack of recipe.ingredientStacks) {
            let ingredientRecipeNode = ingredientStack.item.getCheapestRecipeTree();
            let prodCost = ingredientRecipeNode.prodCost*ingredientStack.size*normalizingFactor/this.recipes[recipeIndex].successChance;
            ingredientChildNodes.push(ingredientRecipeNode);
            prodPrice += prodCost;
        }

        let toolChildNodes = [];
        for (let toolStack of recipe.toolStacks) {
            let toolRecipeNode = toolStack.item.getCheapestRecipeTree();
            let prodCost = toolRecipeNode.prodCost*normalizingFactor*(1-this.recipes[recipeIndex].successChance);
            toolChildNodes.push(toolRecipeNode);
            prodPrice += prodCost;
        }

        let recipeNode = new RecipeNode(recipe, this, prodPrice);
        recipeNode.ingredientChildNodes = ingredientChildNodes;
        recipeNode.toolChildNodes = toolChildNodes;
        return recipeNode;
    }

    //returns an object with prodCost and remains, where remains is an array of itemStacks
    //prodCost and remains are normalized to 1 produced item
	getCheapestRecipeTree() {
        let cheapestRecipeNode;
        for (let i = 0; i < this.recipes.length; i++) {
            if (!this.recipes[i].enabled) {
                continue;
            }
            let recipeNode = this.getRecipeTree(i);
            if (cheapestRecipeNode==null || (recipeNode.prodCost < cheapestRecipeNode.prodCost)) {
                cheapestRecipeNode = recipeNode;
            }
        }
        if (cheapestRecipeNode==null) {
            return new RecipeNode(null, this, this.price);
        } else {
            return cheapestRecipeNode;
        }
	}
}