function saveAll() {
	saveSettings();
	savePriceList();
	saveRecipeSuccessChances();
	saveEnabledRecipes();
}

function loadAll() {
	loadSettings();
	loadPriceData();
	loadRecipeSuccessChances();
	loadEnabledRecipes();
}