let activeRecipeNode;

//function called by form submit
function handleItemSearchInput(event) {
    let input = document.getElementById("itemSearchBar").value.toLowerCase();
    let itemList = document.getElementById("itemList").children;
    for (let itemLI of itemList) {
        let name = itemLI.children[0].children[0].innerHTML.toLowerCase();
        if (name.indexOf(input)!=-1) {
            itemLI.style.display = null;
            if (event!=null && event.key=="Enter") {
                getRecipeFor(name);
                return;
            }
        } else {
            itemLI.style.display = "none";
        }
    }
    getRecipeFor();
}

//function called when reloading/changing data
function recreateActiveRecipeTree() {
    if (activeRecipeNode!=null) {
        getRecipeFor(activeRecipeNode.wantedItem.name);
    }
}

//creates the cheapest recipeNode for the item and displays it
function getRecipeFor(itemName) {
    let display = document.getElementById("recipeDisplay");

    if (items[itemName]!=null) {
        let resourceBreakDown = document.getElementById("resourceBreakDown");
        display.innerHTML = "";
        activeRecipeNode = items[itemName].getCheapestRecipeTree();
        activeRecipeNode.updateWantedAmount(1);
        activeRecipeNode.display(display);

        let resourceBreakdownTable = createResourceBreakdown(activeRecipeNode);
        resourceBreakDown.removeChild(resourceBreakDown.lastChild);
        resourceBreakDown.appendChild(resourceBreakdownTable);
    } else {
        display.innerHTML = "Not a valid item name!";
    }
}