function getRecipeFor(name) {
    let display = document.getElementById("recipeDisplay");
    if (items[name]!=null) {
        display.innerHTML = "";
        let cheapestRecipeNode = items[name].getCheapestRecipeTree();
        cheapestRecipeNode.display(display, 1);
    } else {
        display.innerHTML = "Not a valid item name!";
    }
}

function getRecipeForInput() {
    event.preventDefault();
    getRecipeFor(document.getElementById("itemname").value.toLowerCase());
}