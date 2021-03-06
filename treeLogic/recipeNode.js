//legend
//base resource: a resource that can't be made by any enabled crafting recipe

//contains a recipe and children nodes to trace back a recipe chain
class RecipeNode {
    constructor(recipe, wantedItem, prodCost) {
        this.recipe = recipe;
        this.wantedItem = wantedItem;
        this.prodCost = prodCost;
        this.ingredientChildNodes = [];
        this.toolChildNodes = [];
        this.wantedAmount = 0;
    }
    //returns a list of all base resources, recursively
    getAllBaseResourceNames() {
        if (this.recipe==null) {
            return [this.wantedItem.name];
        }
        let itemNames = [];
        for (let childNode of this.ingredientChildNodes) {
            for (let itemName of childNode.getAllBaseResourceNames()) {
                if (!itemNames.includes(itemName)) {
                    itemNames.push(itemName);
                }
            }
        }
        for (let childNode of this.toolChildNodes) {
            for (let itemName of childNode.getAllBaseResourceNames()) {
                if (!itemNames.includes(itemName)) {
                    itemNames.push(itemName);
                }
            }
        }
        return itemNames;
    }
    //returns recursively how many of itemname are required, only works for base resources
    getTotalRequiredItemAmount(itemname) {
        if (this.recipe==null) {
            return this.wantedItem.name == itemname ? this.wantedAmount : 0;
        }
        let total = 0;
        for (let childNode of this.ingredientChildNodes) {
            total += childNode.getTotalRequiredItemAmount(itemname);
        }
        for (let childNode of this.toolChildNodes) {
            total += childNode.getTotalRequiredItemAmount(itemname);
        }
        return total;
    }

    getTotalRemains() {
        let remains = [];
        if(this.recipe==null) {
            return remains;
        }
        for (let resultStack of this.recipe.resultStacks) {
            if (resultStack.item.name!=this.wantedItem.name) {
                let wantedIndex = this.recipe.getResultIndexOf(this.wantedItem.name);
                let made = this.recipe.resultStacks[wantedIndex].size*this.recipe.successChance;
                remains.push(cloneItemStack(resultStack, this.wantedAmount/made));
            }
        }
        for (let i = 0; i < this.ingredientChildNodes.length; i++) {
            remains = remains.concat(this.ingredientChildNodes[i].getTotalRemains());
        }
        for (let i = 0; i < this.toolChildNodes.length; i++) {
            remains = remains.concat(this.toolChildNodes[i].getTotalRemains());
        }
        return remains;
    }

    //sets this.wantedAmount and recursively updates childNodes
    updateWantedAmount(newWantedAmount) {
        this.wantedAmount = newWantedAmount;
        for (let i = 0; i < this.ingredientChildNodes.length; i++) {
            this.ingredientChildNodes[i].updateWantedAmount(this.getWantedAmountForIngredientChildNode(i));
        }
        for (let i = 0; i < this.toolChildNodes.length; i++) {
            this.toolChildNodes[i].updateWantedAmount(this.getWantedAmountForToolChildNode(i));
        }
    }
    //returns the new wantedAmount for this.childNodes[index] based on this.wantedAmount
    getWantedAmountForIngredientChildNode(index) {
        let wantedIndex = this.recipe.getResultIndexOf(this.wantedItem.name);
        let made = this.recipe.resultStacks[wantedIndex].size*this.recipe.successChance;
        let neededIndex = this.recipe.getIngredientIndexOf(this.ingredientChildNodes[index].wantedItem.name);
        let needed = this.recipe.ingredientStacks[neededIndex].size;
        return needed/made*this.wantedAmount;
    }

    getWantedAmountForToolChildNode(index) {
        let wantedIndex = this.recipe.getResultIndexOf(this.wantedItem.name);
        let made = this.recipe.resultStacks[wantedIndex].size*this.recipe.successChance;
        let neededIndex = this.recipe.getToolIndexOf(this.toolChildNodes[index].wantedItem.name);
        let needed = (1-this.recipe.successChance)*this.recipe.toolStacks[neededIndex].size;
        return needed/made*this.wantedAmount;
    }

    //adds itself and through recursion all childNodes to the parentElement as a tree
    display(parentElement, firstLayer = true) {
        let li = document.createElement("li");
        if ((this.ingredientChildNodes.length+this.toolChildNodes.length)>0) {
            let span = document.createElement("span");
            span.classList.toggle("caret");
            span.addEventListener("click", function() {
                span.parentElement.querySelector(".nested").classList.toggle("active");
                span.classList.toggle("caret-down");
            });
            this.fillInInformation(span);
            li.appendChild(span);
            
            let ul = document.createElement("ul");
            ul.classList.toggle("nested");
            for (let i = 0; i < this.ingredientChildNodes.length; i++) {
                this.ingredientChildNodes[i].display(ul, false);
            }
            for (let i = 0; i < this.toolChildNodes.length; i++) {
                this.toolChildNodes[i].display(ul, false);
            }
            li.appendChild(ul);

            if (settings["settingsExpandTree"]) {
                span.classList.toggle("caret-down");
                ul.classList.toggle("active", true);
            }

        } else {
            this.fillInInformation(li);
        }

        
        parentElement.appendChild(li);
    }
    //handles all the neat information given in the displayed recipe tree
    fillInInformation(element) {
        let nameSpan = document.createElement("span");
        nameSpan.innerHTML = upEveryFirstLetter(this.wantedItem.name) + " x" + this.wantedAmount.toFixed(2);
        element.appendChild(nameSpan);

        let priceDiv = document.createElement("div");
        priceDiv.innerHTML = "&emsp;production cost per: " + this.prodCost.toFixed(2);
        priceDiv.classList.toggle("small");
        element.appendChild(priceDiv);

        let profitDiv = document.createElement("div");
        profitDiv.innerHTML = "&emsp;merchant price: " + (this.wantedItem.price).toFixed(2);
        profitDiv.classList.toggle("small");
        element.appendChild(profitDiv);

        let merchantPriceDiv = document.createElement("div");
        let increase = this.prodCost!=0 ? ((this.wantedItem.price/this.prodCost*100)-100).toFixed(2) : 0;
        merchantPriceDiv.innerHTML = "&emsp;profit: " + increase + "%";
        merchantPriceDiv.classList.toggle("small");
        element.appendChild(merchantPriceDiv);
    }
}