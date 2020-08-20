let activeRecipeNode;

//function called by form submit
function handleItemSearchInput(event) {
    let input = document.getElementById("itemSearchBar").value.toLowerCase();
    if (event!=null && event.key=="Enter") {
        let itemList = document.getElementById("itemList").children;
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].style.display != "none") {
                getRecipeFor(itemList[i].children[0].innerHTML.toLowerCase());
                return;
            }
        }
        getRecipeFor();
        return;
    }
    let itemList = document.getElementById("itemList").children;
    for (let itemLI of itemList) {
        if (itemLI.children[0].children[0].innerHTML.toLowerCase().indexOf(input)!=-1) {
            itemLI.style.display = null;
        } else {
            itemLI.style.display = "none";
        }
    }
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