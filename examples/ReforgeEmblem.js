// Author: Yum (Razz#3533)

const Item = new NativeClass('Terraria', 'Item');
const Recipe = new NativeClass('Terraria', 'Recipe');

const SetDefaults = Item['void SetDefaults(int Type)'];
const SetupRecipes = Recipe['void SetupRecipes()'];
const AddRecipe = Recipe['void AddRecipe()'];

SetupRecipes.hook(original => {
	original();

	SetDefaults(Recipe.currentRecipe.createItem, 489);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 490);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 489);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 491);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 489);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 2998);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 490);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 489);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 490);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 491);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 490);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 2998);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 491);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 489);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 491);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 490);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 491);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 2998);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 2998);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 490);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 2998);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 489);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

    SetDefaults(Recipe.currentRecipe.createItem, 2998);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 491);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();
});