let activeRecipeNode;

//function called by form submit
function getRecipeForInput(event) {
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
    for (let [key, item] of Object.entries(items)) {
        if (item.name.indexOf(input)!=-1) {
            document.getElementById("itemLI" + item.name).style.display = null;
        } else {
            document.getElementById("itemLI" + item.name).style.display = "none";
        }
    }
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

//function called when updating certain settings
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

function setUpItemSearchList() {
    let ul = document.getElementById("itemList");
    ul.innerHTML = "";
    for (let [key, item] of Object.entries(items)) {
        let li = document.createElement("li");
        li.id = "itemLI" + item.name;
        li.classList.toggle("fancyListItem");
        li.classList.toggle("flexRow");
        li.classList.toggle("hoverable");

        let allInfoSpan = document.createElement("span");
        allInfoSpan.classList.toggle("itemInfoSpan");
        li.appendChild(allInfoSpan);
        allInfoSpan.addEventListener("click", () => {
            getRecipeFor(item.name);
        });

        let nameSpan = document.createElement("span");
        nameSpan.innerHTML = upEveryFirstLetter(item.name);
        allInfoSpan.appendChild(nameSpan);

        let infoDiv = document.createElement("div");
        let priceDiv = document.createElement("div");
        priceDiv.classList.toggle("itemPrice");
        priceDiv.innerHTML = "Price: " + item.price;
        infoDiv.appendChild(priceDiv);
        allInfoSpan.appendChild(infoDiv);

        let setPriceBox = document.createElement("input");
        setPriceBox.type = "text";
        setPriceBox.placeholder = "Set Price";
        setPriceBox.classList.toggle("fancyInput");
        setPriceBox.classList.toggle("priceInput");
        setPriceBox.onkeyup = function(event) {
            if (event.key!="Enter") {
                return;
            }
            let price = Number.parseInt(this.value);
            if (!isNaN(price)) {
                priceData[item.name] = price;
            }
            reloadData();
        }
        li.appendChild(setPriceBox);

        ul.appendChild(li);
    }

    //sort the item list
    let sort_by_name = function(a, b) {
        return a.innerHTML.toLowerCase().localeCompare(b.innerHTML.toLowerCase());
    }

    let list = Array.from(document.querySelectorAll("#itemList > .fancyListItem"));
    list.sort(sort_by_name);
    for (var i = 0; i < list.length; i++) {
        list[i].parentNode.appendChild(list[i]);
    }
}