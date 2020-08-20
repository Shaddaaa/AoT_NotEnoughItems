function getRawPriceData() {
    let data = {};
    for (let [key, item] of Object.entries(items)) {
        data[item.name] = item.price;
    }
    return JSON.stringify(data);
}

function setRawPriceData(data) {
    try {
        if (data==null) {
            throw "Data is null";
        }
        data = JSON.parse(data);
    } catch (e) {
        data = {};
    }

    for (let [name, price] of Object.entries(data)) {
        let p = Number.parseInt(price);
        if (!isNaN(p)) {
            priceData[name] = p;
        }
    }
}

function exportPriceList() {
    copyTextToClipboard(getRawPriceData());
}

function importPriceList() {
    let input = window.prompt("Input a price list!");
    setRawPriceData(input);
    reloadData();
}

function savePriceList() {
    localStorage.setItem("priceData", getRawPriceData());
}

function loadPriceData() {
	setRawPriceData(localStorage.getItem("priceData"));
}

function resetPriceList() {
    localStorage.removeItem("priceData");
    location.reload();
}