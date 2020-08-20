class Recipe {
	constructor(ingredientStacks, resultStacks, chance) {
        this.ingredientStacks = ingredientStacks;
        this.resultStacks = resultStacks;
        this.successChance = chance;
    }
    getIngredientIndexOf(itemName) {
        for (let i = 0; i < this.ingredientStacks.length; i++) {
            if (this.ingredientStacks[i].item.name==itemName) {
                return i;
            }
        }
        return -1;
    }
    getResultIndexOf(itemName) {
        for (let i = 0; i < this.resultStacks.length; i++) {
            if (this.resultStacks[i].item.name==itemName) {
                return i;
            }
        }
        return -1;
    }
}