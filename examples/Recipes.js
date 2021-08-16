// Author: Yum (Razz#3533)

const Recipe = new NativeClass('Terraria', 'Recipe');
const Item = new NativeClass('Terraria', 'Item');
const NPC = new NativeClass('Terraria', 'NPC');

const SetDefaults = Item['void SetDefaults(int Type)'];
const SetupRecipes = Recipe['void SetupRecipes()'];
const AddRecipe = Recipe['void AddRecipe()'];

SetupRecipes.hook(original => {

	original();

	// Accessories
	SetDefaults(Recipe.currentRecipe.createItem, 1321);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 3103);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 501);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 38);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 520);
	Recipe.currentRecipe.requiredItem[3].stack = 8;
	Recipe.currentRecipe.requiredTile[0] = 125;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 267);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 259);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 67);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 77;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 267);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 259);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 2886);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 77;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 950);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 664);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 259);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 22);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 306;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 285);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 212);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 331);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 751);
	Recipe.currentRecipe.requiredItem[1].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 3111);
	Recipe.currentRecipe.requiredItem[2].stack = 15;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 887);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 209);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 331);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 987);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 320);
	Recipe.currentRecipe.requiredItem[0].stack = 4;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 31);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 593);
	Recipe.currentRecipe.requiredItem[2].stack = 50;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 53);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 320);
	Recipe.currentRecipe.requiredItem[0].stack = 2;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 31);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 751);
	Recipe.currentRecipe.requiredItem[2].stack = 25;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 211);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 259);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 2423);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 2121);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 906);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 207);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 173);
	Recipe.currentRecipe.requiredItem[1].stack = 25;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 22);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 158);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 824);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 751);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 19);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 158);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 824);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 751);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 706);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1323);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 208);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 173);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 174);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 3084);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 857);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 320);
	Recipe.currentRecipe.requiredItem[0].stack = 6;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 31);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 169);
	Recipe.currentRecipe.requiredItem[2].stack = 70;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 323);
	Recipe.currentRecipe.requiredItem[3].stack = 6;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 863);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 302);
	Recipe.currentRecipe.requiredItem[0].stack = 8;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 259);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 3017);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 7;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 208);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 195);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 86;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1921);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 2358);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 593);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 86;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 54);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 290);
	Recipe.currentRecipe.requiredItem[1].stack = 2;
	Recipe.currentRecipe.requiredTile[0] = 86;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 885);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 23);
	Recipe.currentRecipe.requiredItem[1].stack = 50;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 499);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 886);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 154);
	Recipe.currentRecipe.requiredItem[0].stack = 100;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 888);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 30;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 521);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 2219);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 75);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 548);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 520);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 521);
	Recipe.currentRecipe.requiredItem[3].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[4], 1198);
	Recipe.currentRecipe.requiredItem[4].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 2219);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 75);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 548);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 520);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 521);
	Recipe.currentRecipe.requiredItem[3].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[4], 391);
	Recipe.currentRecipe.requiredItem[4].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 156);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 381);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 156);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1184);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 889);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 583);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 501);
	Recipe.currentRecipe.requiredItem[1].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 520);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 934);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 3794);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 521);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 520);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1253);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1328);
	Recipe.currentRecipe.requiredItem[0].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 2161);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 890);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 530);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 1225);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 178);
	Recipe.currentRecipe.requiredItem[2].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 3102);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 530);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 1348);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 3002);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 22);
	Recipe.currentRecipe.requiredItem[3].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 891);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 521);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 38);
	Recipe.currentRecipe.requiredItem[1].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 893);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 225);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 520);
	Recipe.currentRecipe.requiredItem[1].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 521);
	Recipe.currentRecipe.requiredItem[2].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 892);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 126);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 317);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 315);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 313);
	Recipe.currentRecipe.requiredItem[3].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[4], 2431);
	Recipe.currentRecipe.requiredItem[4].stack = 3;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 159);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 23);
	Recipe.currentRecipe.requiredItem[0].stack = 80;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 751);
	Recipe.currentRecipe.requiredItem[1].stack = 40;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 3306);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 220;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 771);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1432);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 1347);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	// Consumables
	SetDefaults(Recipe.currentRecipe.createItem, 2673);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 2002);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 183);
	Recipe.currentRecipe.requiredItem[1].stack = 15;
	Recipe.currentRecipe.requiredTile[0] = 247;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 29);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 154);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 3111);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 188);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 178);
	Recipe.currentRecipe.requiredItem[3].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1291);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 29);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 3111);
	Recipe.currentRecipe.requiredItem[1].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 188);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 178);
	Recipe.currentRecipe.requiredItem[3].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();


	SetDefaults(Recipe.currentRecipe.createItem, 1141);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 331);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 620);
	Recipe.currentRecipe.requiredItem[1].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 521);
	Recipe.currentRecipe.requiredItem[2].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 520);
	Recipe.currentRecipe.requiredItem[3].stack = 15;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	// Crafting Materials
	SetDefaults(Recipe.currentRecipe.createItem, 236);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 38);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1050);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 228;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 259);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1330);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 18;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 259);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 68);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 18;
	AddRecipe();

	// Tools
	SetDefaults(Recipe.currentRecipe.createItem, 1991);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 150);
	Recipe.currentRecipe.requiredItem[1].stack = 30;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 3199);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 664);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 170);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 75);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 22);
	Recipe.currentRecipe.requiredItem[3].stack = 5;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 50);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 170);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 75);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 329);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 327);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 173);
	Recipe.currentRecipe.requiredItem[1].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 154);
	Recipe.currentRecipe.requiredItem[2].stack = 5;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1326);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 520);
	Recipe.currentRecipe.requiredItem[0].stack = 30;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 2317);
	Recipe.currentRecipe.requiredItem[1].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 501);
	Recipe.currentRecipe.requiredItem[2].stack = 50;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	// Weapons
	SetDefaults(Recipe.currentRecipe.createItem, 165);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 531);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 317);
	Recipe.currentRecipe.requiredItem[1].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 148);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 101;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 670);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 664);
	Recipe.currentRecipe.requiredItem[0].stack = 20;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 593);
	Recipe.currentRecipe.requiredItem[1].stack = 10;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 2358);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 306;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 42);
	Recipe.currentRecipe.createItem.stack = 50;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 1309);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 9);
	Recipe.currentRecipe.requiredItem[0].stack = 6;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 23);
	Recipe.currentRecipe.requiredItem[1].stack = 40;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 3111);
	Recipe.currentRecipe.requiredItem[2].stack = 10;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 65);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 3520);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 75);
	Recipe.currentRecipe.requiredItem[1].stack = 30;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 65);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 3484);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 75);
	Recipe.currentRecipe.requiredItem[1].stack = 30;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 279);
	Recipe.currentRecipe.createItem.stack = 50;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 22);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.anyIronBar = true;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 3069);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 9);
	Recipe.currentRecipe.requiredItem[0].stack = 5;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 8);
	Recipe.currentRecipe.requiredItem[1].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 75);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 16;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 989);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 520);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	SetDefaults(Recipe.currentRecipe.requiredItem[1], 526);
	Recipe.currentRecipe.requiredItem[1].stack = 3;
	SetDefaults(Recipe.currentRecipe.requiredItem[2], 527);
	Recipe.currentRecipe.requiredItem[2].stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[3], 528);
	Recipe.currentRecipe.requiredItem[3].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 155);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 381);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();

	SetDefaults(Recipe.currentRecipe.createItem, 155);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], 1184);
	Recipe.currentRecipe.requiredItem[0].stack = 15;
	Recipe.currentRecipe.requiredTile[0] = 134;
	AddRecipe();
});