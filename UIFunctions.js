let activeRecipeNode;

//creates the cheapest recipeNode for the item
function getRecipeFor(itemName) {
    let display = document.getElementById("recipeDisplay");
    if (items[itemName]!=null) {
        display.innerHTML = "";
        activeRecipeNode = items[itemName].getCheapestRecipeTree();
        activeRecipeNode.updateWantedAmount(1);
        activeRecipeNode.display(display);


        let resourceBreakdownHeader = document.createElement("h3");
        resourceBreakdownHeader.innerHTML = "<BR>Resource Breakdown:";
        display.parentElement.appendChild(resourceBreakdownHeader);

        let resourceBreakdown = createResourceBreakdown(activeRecipeNode);
        display.parentElement.appendChild(resourceBreakdown);
    } else {
        display.innerHTML = "Not a valid item name!";
    }
}

//function called by form submit
function getRecipeForInput() {
    event.preventDefault();
    getRecipeFor(document.getElementById("itemname").value.toLowerCase());
}

function createResourceBreakdown(recipeNode) {
    let table = document.createElement("table");
    table.classList.toggle("resourceBreakdown");
    
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