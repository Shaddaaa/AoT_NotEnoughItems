//contains a recipe and children nodes to trace back a recipe chain
class RecipeNode {
    constructor(recipe, wantedItem, prodCost) {
        this.recipe = recipe;
        this.wantedItem = wantedItem;
        this.prodCost = prodCost;
        this.childNodes = [];
    }
    display(parentElement, wantedAmount, firstLayer = true) {
        let li = document.createElement("li");
        if (this.childNodes.length>0) {
            let span = document.createElement("span");
            span.classList.toggle("caret");
            span.addEventListener("click", function() {
                span.parentElement.querySelector(".nested").classList.toggle("active");
                span.classList.toggle("caret-down");
            });
            this.fillInInformation(span, wantedAmount);
            li.appendChild(span);
            
            let ul = document.createElement("ul");
            ul.classList.toggle("nested");
            for (let i = 0; i < this.childNodes.length; i++) {
                let wantedIndex = this.recipe.getResultIndexOf(this.wantedItem.name);
                let made = this.recipe.resultStacks[wantedIndex].size;
                let neededIndex = this.recipe.getIngredientIndexOf(this.childNodes[i].wantedItem.name);
                let needed = this.recipe.ingredientStacks[neededIndex].size;
                this.childNodes[i].display(ul, needed/made*wantedAmount, false);
            }
            li.appendChild(ul);
        } else {
            this.fillInInformation(li, wantedAmount);
        }
        parentElement.appendChild(li);
    }
    fillInInformation(element, wantedAmount) {
        let nameSpan = document.createElement("span");
        nameSpan.innerHTML = upEveryFirstLetter(this.wantedItem.name) + " x" + wantedAmount;
        element.appendChild(nameSpan);

        let priceDiv = document.createElement("div");
        priceDiv.innerHTML = "&emsp;production cost per: " + this.prodCost;
        priceDiv.classList.toggle("small");
        element.appendChild(priceDiv);

        let profitDiv = document.createElement("div");
        profitDiv.innerHTML = "&emsp;merchant prize: " + this.wantedItem.price;
        profitDiv.classList.toggle("small");
        element.appendChild(profitDiv);

        let merchantPrizeDiv = document.createElement("div");
        merchantPrizeDiv.innerHTML = "&emsp;profit: " + Math.round(this.wantedItem.price/this.prodCost*1000)/10 + "%";
        merchantPrizeDiv.classList.toggle("small");
        element.appendChild(merchantPrizeDiv);
    }
}