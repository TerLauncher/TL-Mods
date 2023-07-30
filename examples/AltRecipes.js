// Author: Yum (Razz#3533)

const Item = new NativeClass('Terraria', 'Item');
const ItemID = new NativeClass('Terraria.ID', 'ItemID');
const Recipe = new NativeClass('Terraria', 'Recipe');

const SetDefaults = Item['void SetDefaults(int Type)'];
const SetupRecipes = Recipe['void SetupRecipes()'];
const AddRecipe = Recipe['void AddRecipe()'];

SetupRecipes.hook(original => {
	SetDefaults(Recipe.currentRecipe.createItem, ItemID.IronBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.LeadBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.LeadBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.IronBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.SilverBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.TungstenBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.TungstenBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.SilverBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.GoldBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.PlatinumBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.PlatinumBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.GoldBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.TitaniumBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.AdamantiteBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.AdamantiteBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.TitaniumBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.CrimtaneBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.DemoniteBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.DemoniteBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.CrimtaneBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.MythrilBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.OrichalcumBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.OrichalcumBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.MythrilBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.CobaltBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.PalladiumBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, ItemID.PalladiumBar);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], ItemID.CobaltBar);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	original();
});