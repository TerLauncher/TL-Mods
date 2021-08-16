// Author: Yum (Razz#3533)

const Chest = new NativeClass('Terraria', 'Chest');
const Item = new NativeClass('Terraria', 'Item');
const NPC = new NativeClass('Terraria', 'NPC');
const Main = new NativeClass('Terraria', 'Main');
const WorldGen = new NativeClass('Terraria', 'WorldGen');
const DD2Event = new NativeClass('Terraria.GameContent.Events', 'DD2Event');
const Recipe = new NativeClass('Terraria', 'Recipe');

const SetDefaults = Item['void SetDefaults(int Type)'];
const SetDefaults2 = Item["void SetDefaults(int Type, bool noMatCheck)"];
const SetupShop = Chest['void SetupShop(int type)'];
const SetupRecipes = Recipe['void SetupRecipes()'];
const AddRecipe = Recipe['void AddRecipe()'];

let CreateNewRecipe = function(createItemIdType, requiredItem) {
	SetDefaults(Recipe.currentRecipe.createItem, createItemIdType);
	Recipe.currentRecipe.createItem.stack = 1;
	SetDefaults(Recipe.currentRecipe.requiredItem[0], requiredItem);
	Recipe.currentRecipe.requiredItem[0].stack = 1;
	Recipe.currentRecipe.requiredTile[0] = 18;
	AddRecipe();
};

SetupRecipes.hook(original => {

	original();

	CreateNewRecipe(3063, 3332);
	CreateNewRecipe(3389, 3332);
	CreateNewRecipe(3065, 3332);
	CreateNewRecipe(1553, 3332);
	CreateNewRecipe(3930, 3332);
	CreateNewRecipe(3541, 3332);
	CreateNewRecipe(3570, 3332);
	CreateNewRecipe(3571, 3332);
	CreateNewRecipe(3569, 3332);

	CreateNewRecipe(1121, 3322);
	CreateNewRecipe(1123, 3322);
	CreateNewRecipe(2888, 3322);

	CreateNewRecipe(426, 3324);
	CreateNewRecipe(434, 3324);
	CreateNewRecipe(514, 3324);

	CreateNewRecipe(1313, 3323);

	CreateNewRecipe(1305, 3328);
	CreateNewRecipe(1157, 3328);
	CreateNewRecipe(758, 3328);
	CreateNewRecipe(1255, 3328);
	CreateNewRecipe(788, 3328);
	CreateNewRecipe(1178, 3328);
	CreateNewRecipe(1259, 3328);
	CreateNewRecipe(1155, 3328);
	CreateNewRecipe(3018, 3328);

	CreateNewRecipe(1258, 3329);
	CreateNewRecipe(1122, 3329);
	CreateNewRecipe(1295, 3329);
	CreateNewRecipe(1296, 3329);
	CreateNewRecipe(1297, 3329);

	CreateNewRecipe(2624, 3330);
	CreateNewRecipe(2611, 3330);
	CreateNewRecipe(2622, 3330);
	CreateNewRecipe(2621, 3330);
	CreateNewRecipe(2623, 3330);

	CreateNewRecipe(3827, 3860);
	CreateNewRecipe(3858, 3860);
	CreateNewRecipe(3859, 3860);
	CreateNewRecipe(3870, 3860);

	CreateNewRecipe(4758, 4957);

	CreateNewRecipe(4914, 4782);
	CreateNewRecipe(4953, 4782);
	CreateNewRecipe(4952, 4782);
	CreateNewRecipe(4923, 4782);
});

SetupShop.hook((original, self, type) => {

	original(self, type);

	let num = 20;
	let num2 = 15;

	let expertMode = Main.expertMode;
	let hardMode = Main.hardMode;
	let crimson = WorldGen.crimson;
	let downedSlimeKing = NPC.downedSlimeKing;
	let downedBoss1 = NPC.downedBoss1;
	let downedBoss2 = NPC.downedBoss2;
	let downedQueenBee = NPC.downedQueenBee;
	let downedBoss3 = NPC.downedBoss3;
	let downedMechBoss1 = NPC.downedMechBoss1;
	let downedMechBoss2 = NPC.downedMechBoss2;
	let downedMechBoss3 = NPC.downedMechBoss3;
	let downedQueenSlime = NPC.downedQueenSlime;
	let downedPlantBoss = NPC.downedPlantBoss;
	let downedEmpressOfLight = NPC.downedEmpressOfLight;
	let downedGolemBoss = NPC.downedGolemBoss;
	let downedFishron = NPC.downedFishron;
	let downedAncientCultist = NPC.downedAncientCultist;
	let downedMoonlord = NPC.downedMoonlord;
	let downedMechBossAny = NPC.downedMechBossAny;
	let downedTowerSolar = NPC.downedTowerSolar;
	let downedTowerVortex = NPC.downedTowerVortex;
	let downedTowerNebula = NPC.downedTowerNebula;
	let downedTowerStardust = NPC.downedTowerStardust;
	let downedInvasionT3 = DD2Event.DownedInvasionT3;

	// Торговец
	if (type == 1) {
		if (!expertMode)
			return;

		if (downedSlimeKing) {
			SetDefaults(self.item[num], 3318);
			num++;
		}

		if (downedBoss1) {
			SetDefaults(self.item[num], 3319);
			num++;
		}

		if (downedBoss2) {
			SetDefaults(self.item[num], crimson ? 3321 : 3320);
			num++;
		}

		if (downedQueenBee) {
			SetDefaults(self.item[num], 3322);
			num++;
		}

		if (downedBoss3) {
			SetDefaults(self.item[num], 3323);
			num++;
		}

		if (hardMode) {
			SetDefaults(self.item[num], 3324);
			num++;
		}

		if (downedMechBoss1) {
			SetDefaults(self.item[num], 3325);
			num++;
		}

		if (downedMechBoss2) {
			SetDefaults(self.item[num], 3326);
			num++;
		}

		if (downedMechBoss3) {
			SetDefaults(self.item[num], 3327);
			num++;
		}

		if (downedQueenSlime) {
			SetDefaults(self.item[num], 4957);
			num++;
		}

		if (downedPlantBoss) {
			SetDefaults(self.item[num], 3328);
			num++;
		}

		if (downedEmpressOfLight) {
			SetDefaults(self.item[num], 4782);
			num++;
		}

		if (downedGolemBoss) {
			SetDefaults(self.item[num], 3329);
			num++;
		}

		if (downedFishron) {
			SetDefaults(self.item[num], 3330);
			num++;
		}

		if (downedAncientCultist) {
			SetDefaults(self.item[num], 3331);
			num++;
		}

		if (downedMoonlord) {
			SetDefaults(self.item[num], 3332);
			num++;
		}

		if (downedInvasionT3 && downedGolemBoss) {
			SetDefaults(self.item[num], 3860);
			num++;
		}
	}

	// Дриада
	if (type == 3) {
		if (downedSlimeKing) {
			SetDefaults(self.item[num], 560);
			num++;
		}

		if (downedBoss1) {
			SetDefaults(self.item[num], 43);
			num++;
		}

		if (downedBoss2) {
			SetDefaults(self.item[num], crimson ? 1331 : 70);
			num++;
		}

		if (downedQueenBee) {
			SetDefaults(self.item[num], 1133);
			num++;
		}

		if (downedBoss3) {
			SetDefaults(self.item[num], 1307);
			num++;
		}

		if (hardMode) {
			SetDefaults(self.item[num], 267);
			num++;
		}

		if (downedMechBoss1) {
			SetDefaults(self.item[num], 556);
			num++;
		}

		if (downedMechBoss2) {
			SetDefaults(self.item[num], 544);
			num++;
		}

		if (downedMechBoss3) {
			SetDefaults(self.item[num], 557);
			num++;
		}

		if (downedQueenSlime) {
			SetDefaults(self.item[num], 4988);
			num++;
		}

		if (downedGolemBoss) {
			SetDefaults(self.item[num], 1293);
			num++;
		}

		if (downedFishron) {
			SetDefaults(self.item[num], 2673);
			num++;
		}

		if (downedMoonlord) {
			SetDefaults(self.item[num], 3601);
			num++;
		}
	}

	// Подрывник
	if (type == 4) {
		if (downedSlimeKing) {
			SetDefaults(self.item[num2], 23);
			num2++;
		}

		if (downedBoss2) {
			SetDefaults(self.item[num], crimson ? 880 : 56);
			num++;
			SetDefaults(self.item[num], crimson ? 1329 : 86);
			num++;
		}

		if (downedQueenBee) {
			SetDefaults(self.item[num], 2431);
			num++;
		}

		if (downedMechBoss1) {
			SetDefaults(self.item[num], 548);
			num++;
		}

		if (downedMechBoss2) {
			SetDefaults(self.item[num], 547);
			num++;
		}

		if (downedMechBoss3) {
			SetDefaults(self.item[num], 3327);
			num++;
		}

		if (downedMechBossAny) {
			SetDefaults(self.item[num], 1225);
			num++;
		}

		if (downedGolemBoss) {
			SetDefaults(self.item[num], 2218);
			num++;
		}

		if (downedMoonlord) {
			SetDefaults(self.item[num], 3460);
			num++;
		}

		if (downedTowerSolar) {
			SetDefaults(self.item[num], 3458);
			num++;
		}

		if (downedTowerVortex) {
			SetDefaults(self.item[num], 3456);
			num++;
		}

		if (downedTowerNebula) {
			SetDefaults(self.item[num], 3457);
			num++;
		}

		if (downedTowerStardust) {
			SetDefaults(self.item[num], 3459);
			num++;
		}
	}
});

SetDefaults2.hook((original, self, type, noMatCheck) => {

	original(self, type, noMatCheck);

	switch (type) {
		case 3458:
		case 3456:
		case 3457:
		case 3459:
			self.value = Item.buyPrice(0, 5, 50, 0);
			break;

		case 3460:
			self.value = Item.buyPrice(0, 10, 0, 0);
			break;

		case 3318:
		case 560:
			self.value = Item.buyPrice(0, 10, 0, 0);
			break;

		case 3319:
		case 43:
			self.value = Item.buyPrice(0, 15, 0, 0);
			break;

		case 3321:
		case 1331:
			self.value = Item.buyPrice(0, 20, 0, 0);
			break;

		case 3320:
		case 70:
			self.value = Item.buyPrice(0, 20, 0, 0);
			break;

		case 3322:
		case 1133:
			self.value = Item.buyPrice(0, 15, 0, 0);
			break;

		case 3323:
		case 1307:
			self.value = Item.buyPrice(0, 25, 0, 0);
			break;

		case 3324:
		case 267:
			self.value = Item.buyPrice(0, 30, 0, 0);
			break;

		case 3325:
		case 556:
			self.value = Item.buyPrice(0, 40, 0, 0);
			break;

		case 3326:
		case 544:
			self.value = Item.buyPrice(0, 40, 0, 0);
			break;

		case 3327:
		case 557:
			self.value = Item.buyPrice(0, 40, 0, 0);
			break;

		case 4957:
		case 4988:
			self.value = Item.buyPrice(0, 40, 0, 0);
			break;

		case 3328:
			self.value = Item.buyPrice(0, 50, 0, 0);
			break;
		case 4782:
			self.value = Item.buyPrice(1, 0, 0, 0);
			break;

		case 3329:
		case 1293:
			self.value = Item.buyPrice(0, 70, 0, 0);
			break;

		case 3330:
		case 2673:
			self.value = Item.buyPrice(0, 60, 0, 0);
			break;

		case 3331:
			self.value = Item.buyPrice(0, 80, 0, 0);
			break;

		case 3332:
		case 3601:
			self.value = Item.buyPrice(1, 50, 0, 0);
			break;
			
		case 3860:
			self.value = Item.buyPrice(0, 70, 0, 0);
			break;
	}
});