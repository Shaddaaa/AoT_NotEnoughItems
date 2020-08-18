function exportPriceList() {
    let data = {};
    for (let [key, item] of Object.entries(items)) {
        data[item.name] = item.price;
    }
    data = JSON.stringify(data);
    copyTextToClipboard(data);
}

function savePriceList() {
    let data = {};
    for (let [key, item] of Object.entries(items)) {
        data[item.name] = item.price;
    }
    data = JSON.stringify(data);
    localStorage.setItem("priceData", data);
}

function importPriceList() {
    let input = window.prompt("Input a price list!");
    try {
        if (input==null) {
            throw "Input is null";
        }
        input = JSON.parse(input);
    } catch (e) {
        input = {};
    }

    for (let [name, price] of Object.entries(input)) {
        let p = Number.parseInt(price);
        if (!isNaN(p)) {
            priceData[name] = p;
        }
    }
    reloadData();
}

function resetPriceList() {
    localStorage.removeItem("priceData");
    location.reload();
}