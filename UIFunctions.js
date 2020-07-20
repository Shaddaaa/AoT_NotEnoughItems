let activeRecipeNode;

//function called by form submit
function getRecipeForInput() {
    event.preventDefault();
    getRecipeFor(document.getElementById("itemSearchBar").value.toLowerCase());
}

//function called by menu buttons
function switchTab(name) {
    let theTab = document.getElementById(name+"Tab");
    let allTabs = document.getElementById("tabContainer").children;

    for (let tab of allTabs) {
        tab.style.display = "none";
    }

    theTab.style.display = "flex";
}

//creates the cheapest recipeNode for the item and displays it
function getRecipeFor(itemName) {
    let display = document.getElementById("recipeDisplay");
    let resourceBreakDown = document.getElementById("resourceBreakDown");

    if (items[itemName]!=null) {
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

//returns a html table containing the resource breakdown
function createResourceBreakdown(recipeNode) {
    let table = document.createElement("table");
    table.classList.toggle("resourceBreakdownTable");
    
    let resources = recipeNode.getAllBaseResourceNames();
    for (let resource of resources) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = upEveryFirstLetter(resource) + ":";
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = recipeNode.getTotalRequiredItemAmount(resource);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    return table;
}

