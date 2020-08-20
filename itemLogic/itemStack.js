class ItemStack {
	constructor(item, size) {
		this.item = item;
		this.size = size;
    }
}

function cloneItemStack(itemStack, mult = 1) {
    return new ItemStack(itemStack.item, itemStack.size*mult);
}