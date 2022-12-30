// Author: Yum (Razz#3533)

const Player = new NativeClass('Terraria', 'Player');
const Main = new NativeClass('Terraria', 'Main');
const Collision = new NativeClass('Terraria', 'Collision');

const ApplyEquipFunctional = Player['void ApplyEquipFunctional(int itemSlot, Item currentItem)'];

function AllCritBoost(player, boost) {
	player.meleeCrit += boost;
	player.rangedCrit += boost;
	player.magicCrit += boost;
}

function AllDamageBoost(player, boost) {
	player.meleeDamage += boost;
	player.magicDamage += boost;
	player.rangedDamage += boost;
	player.minionDamage += boost;
}

ApplyEquipFunctional.hook((original, self, itemSlot, currentItem) => {
	original(self, itemSlot, currentItem);

	const type = currentItem.type;

	switch (type) {
		case 749:
			self.statManaMax2 += 50;
			self.magicDamage += 0.1;
			self.manaCost *= 0.95;
			self.magicCrit += 5;
			break;
		case 492:
			AllDamageBoost(self, 0.1);
			AllCritBoost(self, 10);
			break;
		case 493:
			self.statLifeMax2 += 20;
			self.statDefense += 15;
			self.lifeRegen += 3;
			break;
		case 1515:
			self.AddBuff(48, 2, true, false);
			break;
		case 761:
			self.statLifeMax2 += 80;
			break;
		case 785:
			self.moveSpeed += 0.3;
			break;
		case 786:
			if ((self.head == 7 || self.head == 75) && self.body == 7 && self.legs == 7) {
				self.moveSpeed += 0.15;
				self.rangedDamage += 0.12;
				self.rangedCrit += 16;
				self.statDefense += 30;
			}
			break;
		case 821:
			self.meleeDamage += 0.1;
			self.meleeCrit += 5;
			break;
		case 822:
			if (self.head == 46 && self.body == 27 && self.legs == 26) {
				self.meleeDamage += 0.02;
				self.rangedDamage += 0.02;
				self.meleeCrit++;
				self.rangedCrit++;
			}
			break;
		case 823:
			if (self.body == 66 && self.legs == 55) {
				if (self.head == 101) {
					self.statDefense += 10;
					self.endurance += 0.05;
				} else if (self.head == 156) {
					self.statManaMax2 += 20;
					self.magicDamage += 0.05;
					self.manaCost *= 0.95;
					self.magicCrit += 5;
				}
			}
			break;
		case 948:
			self.statDefense += 8;
			AllDamageBoost(self, 0.04);
			AllCritBoost(self, 2);
			self.moveSpeed += 0.1;
			break;
		case 1165:
			if (!Main.dayTime || Main.eclipse) {
				self.jumpSpeedBoost += 1.0;
				self.statDefense += 15;
				AllDamageBoost(self, 0.1);
				AllCritBoost(self, 5);
				self.moveSpeed += 0.1;
			}
			break;
		case 1797:
			AllDamageBoost(self, 0.05);
			AllCritBoost(self, 5);
			break;
		case 1830:
			if (self.head == 134 && self.body == 95 && self.legs == 79) {
				self.minionKB += 2.0;
				self.minionDamage += 0.05;
			}
			break;
		case 1871:
			self.statLifeMax2 += 50;
			self.statDefense += 10;
			break;
		case 2280:
			if (self.head == 157 && self.legs == 98) {
				if (self.body == 106) {
					self.statDefense += 15;
					self.endurance += 0.1;
				} else if (self.body == 105) {
					self.meleeDamage += 0.1;
					self.meleeCrit += 10;
				}
			}
			break;
		case 2494:
			self.moveSpeed += 0.2;
			self.jumpSpeedBoost += 1.8;
			self.gills = true;
			self.ignoreWater = true;
			if (!self.mount.Active && Collision.DrownCollision(self.position, self.width, self.height, self.gravDir, false)) {
				self.maxFallSpeed = 12.0;
			}
			break;
		case 2770:
			self.statDefense += 5;
			AllDamageBoost(self, 0.05);
			self.moveSpeed += 0.1;
			self.jumpSpeedBoost += 1.2;
			break;
		case 3468:
			if (self.head == 171 && self.body == 177 && self.legs == 112) {
				self.meleeDamage += 0.07;
				self.meleeCrit += 3;
			}
			break;
		case 3469:
			if (self.head == 169 && self.body == 175 && self.legs == 110) {
				self.rangedDamage += 0.03;
				self.rangedCrit += 7;
			}
			break;
		case 3471:
			if (self.head == 189 && self.body == 190 && self.legs == 130) {
				self.maxMinions++;
				self.minionDamage += 0.05;
			}
			break;
		case 1162:
			if (self.head == 82 && self.body == 53 && self.legs == 48) {
				self.statDefense += 10;
				self.endurance += 0.1;
				self.AddBuff(165, 5, true, false);
			}	
			break;
		case 3470:
			if (self.head == 170 && self.body == 176 && self.legs == 111) {
				self.magicDamage += 0.05;
				self.magicCrit += 5;
				self.statManaMax2 += 20;
				self.manaCost *= 0.95;
			}
			break;
		case 1866:
			if (self.body == 67 && self.legs == 56) {
				if (self.head == 103) {
					self.arrowDamage += 0.05;
				} else if (self.head == 104) {
					self.bulletDamage += 0.05;
				} else if (self.head == 105) {
					self.rocketDamage += 0.05;
				}
			}
			break;
	}
});
