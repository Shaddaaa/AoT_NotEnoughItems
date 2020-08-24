class Recipe {
	constructor(ingredientStacks, toolStacks, resultStacks, successChance, enabled, id) {
        this.ingredientStacks = ingredientStacks;
        this.toolStacks = toolStacks;
        this.resultStacks = resultStacks;
        this.successChance = successChance;
        this.enabled = enabled;
        this.id = id;
    }
    getIngredientIndexOf(itemName) {
        for (let i = 0; i < this.ingredientStacks.length; i++) {
            if (this.ingredientStacks[i].item.name==itemName) {
                return i;
            }
        }
        return -1;
    }
    getToolIndexOf(itemName) {
        for (let i = 0; i < this.toolStacks.length; i++) {
            if (this.toolStacks[i].item.name==itemName) {
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