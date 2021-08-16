// Author: Yum (Razz#3533)

const Chest = new NativeClass('Terraria', 'Chest');
const Item = new NativeClass('Terraria', 'Item');
const NPC = new NativeClass('Terraria', 'NPC');
const Main = new NativeClass('Terraria', 'Main');

const SetDefaults = Item['void SetDefaults(int Type)'];
const SetDefaults2 = Item["void SetDefaults(int Type, bool noMatCheck)"];
const SetupShop = Chest['void SetupShop(int type)'];

SetupShop.hook((original, self, type) => {

	original(self, type);

	let num = 20;
	let num2 = 15;
	let item = self.item;
	// Торговец оружием
	if (type == 2) {
		SetDefaults(item[num], 289);
		num++;
		SetDefaults(item[num], 290);
		num++;
		SetDefaults(item[num], 292);
		num++;
		SetDefaults(item[num], 293);
		num++;
		SetDefaults(item[num], 301);
		num++;
		SetDefaults(item[num], 2359);
		num++;
		SetDefaults(item[num], 2344);
		num++;
		SetDefaults(item[num], 2326);
		num++;
		
		if (NPC.downedBoss1) {
			SetDefaults(item[num], 2328);
			num++;
			SetDefaults(item[num], 2346);
			num++;
			SetDefaults(item[num], 294);
			num++;
			SetDefaults(item[num], 303);
			num++;
			SetDefaults(item[num], 288);
			num++;
		}

		if (Main.hardMode) {
			SetDefaults(item[num], 2345);
			num++;
			SetDefaults(item[num], 2348);
			num++;
		}

		if (NPC.downedBoss3) {
			SetDefaults(item[num], 2347);
			num++;
			SetDefaults(item[num], 2349);
			num++;
		}
	}
	// Продавец красителей
	if (type == 12) {
		SetDefaults(item[num2], 291);
		num2++;
		SetDefaults(item[num2], 295);
		num2++;
		SetDefaults(item[num2], 296);
		num2++;
		SetDefaults(item[num2], 297);
		num2++;
		SetDefaults(item[num2], 298);
		num2++;
		SetDefaults(item[num2], 299);
		num2++;
		SetDefaults(item[num2], 302);
		num2++;
		SetDefaults(item[num2], 2323);
		num2++;
		SetDefaults(item[num2], 2322);
		num2++;
		SetDefaults(item[num2], 2325);
		num2++;
		SetDefaults(item[num2], 2351);
		num2++;
		SetDefaults(item[num2], 2327);
		num2++;

		if (NPC.downedBoss1) {
			SetDefaults(item[num2], 305);
			num2++;
			SetDefaults(item[num2], 2997);
			num2++;
			SetDefaults(item[num2], 4477);
			num2++;
			SetDefaults(item[num2], 2350);
			num2++;
		}

		if (NPC.downedBoss3) {
			SetDefaults(item[num2], 300);
			num2++;
			SetDefaults(item[num2], 2324);
			num2++;
			SetDefaults(item[num2], 304);
			num2++;
			SetDefaults(item[num2], 2329);
			num2++;
			SetDefaults(item[num2], 4478);
			num2++;
		}

		if (Main.player[Main.myPlayer].anglerQuestsFinished >= 5) {
			SetDefaults(item[num2], 2354);
			num2++;
			SetDefaults(item[num2], 2356);
			num2++;
			SetDefaults(item[num2], 2355);
			num2++;
		}

		if (Main.hardMode) {
			SetDefaults(item[num2], 4479);
			num2++;
		}
	}
	// Знахарь
	if (type == 16) {
		if (NPC.downedQueenBee) {
		SetDefaults(item[num], 1354);
		num++;

		if (Main.hardMode) {
		SetDefaults(item[num], 1353);
		num++;
		SetDefaults(item[num], 1356);
		num++;

		if (NPC.downedPlantBoss) {
			SetDefaults(item[num], 1340);
		num++;
			}
		}
		SetDefaults(item[num], 1355);
		num++;
		SetDefaults(item[num], 1357);
		num++;
		SetDefaults(item[num], 1358);
		num++;
		SetDefaults(item[num], 1359);
		num++;
		}

		if (NPC.downedBoss2) {
			SetDefaults(item[num], 188);
			num++;
		}

		if (Main.hardMode) {
			SetDefaults(item[num], 499);
			num++;
		}

		if (NPC.downedMoonlord) {
			SetDefaults(item[num], 3544);
			num++;
		}
	}
});

SetDefaults2.hook((original, self, type, noMatCheck) => {

	original(self, type, noMatCheck);
	
	switch(type) {
		case 291:
		case 295:
		case 296:
		case 297:
		case 298:
		case 299:
		case 302:
		case 2323:
		case 2322:
		case 2325:
		case 2351:
		case 2327:
			self.value = Item.buyPrice(0, 5, 0, 0);
			break;

		case 305:
		case 2997:
		case 4477:
		case 2350:
			self.value = Item.buyPrice(0, 10, 0, 0);
			break;

		case 300:
		case 2324:
		case 304:
		case 2329:
		case 4478:
			self.value = Item.buyPrice(0, 20, 0, 0);
			break;

		case 2354:
		case 2356:
		case 2355:
			self.value = Item.buyPrice(0, 8, 50, 0);
			break;

		case 4479:
			self.value = Item.buyPrice(1, 0, 0, 0);
			break;

		case 289:
		case 290:
		case 292:
		case 293:
			self.value = Item.buyPrice(0, 3, 0, 0);
			break;

		case 301:
		case 2359:
		case 2344:
		case 2326:
			self.value = Item.buyPrice(0, 5, 0, 0);
			break;

		case 2328:
		case 2346:
		case 294:
		case 303:
		case 288:
			self.value = Item.buyPrice(0, 15, 0, 0);
			break;

		case 2347:
		case 2349:
			self.value = Item.buyPrice(0, 25, 0, 0);
			break;

		case 188:
			self.value = Item.buyPrice(0, 1, 0, 0);
			break;

		case 499:
			self.value = Item.buyPrice(0, 5, 0, 0);
			break;

		case 3544:
			self.value = Item.buyPrice(0, 10, 0, 0);
			break;

		case 1354:
		case 1340:
		case 1355:
		case 1357:
		case 1358:
		case 1359:
			self.value = Item.buyPrice(0, 20, 0, 0);
			break;

		case 1353:
		case 1356:
			self.value = Item.buyPrice(0, 30, 0, 0);
			break;
	}
});
