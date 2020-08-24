function saveAll() {
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