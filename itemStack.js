class ItemStack {
	constructor(item, size) {
		this.item = item;
		this.size = size;
    }
    clone(mult = 1) {
        return new ItemStack(this.item, this.size*mult);
    }
}