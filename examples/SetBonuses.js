// Author: Yum (Razz#3533)

const Player = new NativeClass('Terraria', 'Player');
const Main = new NativeClass('Terraria', 'Main');
const Language = new NativeClass('Terraria.Localization', 'Language');
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');

const GetTextValue = Language['string GetTextValue(string key)'];
const UpdateArmorSets = Player['void UpdateArmorSets(int i)'];

UpdateArmorSets.hook((original, self, i) => {

	original(self, i);
	// Obsidian
	if (self.head == 185 && self.body == 187 && self.legs == 127) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = "Увеличивает урон питомца на 15%\nУвеличивает количество питомцев";
		}
		else {
			self.setBonus = "15% increased minion damage\nIncreased max minion";
		}
		self.minionDamage += 0.15;
		self.statDefense += 2;
		self.maxMinions++;
	}
	// Cooper
	if (self.head == 1 && self.body == 1 && self.legs == 1) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\nУвеличивает скорость добычи на 15%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\n15% increased mining speed";
		}
		self.statDefense += 2;
		self.pickSpeed -= 0.15;
	}
	// Tin
	if (self.head == 47 && self.body == 28 && self.legs == 27) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\nУвеличивает скорость добычи на 10%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\n10% increased mining speed";
		}
		self.statDefense += 2;
		self.pickSpeed -= 0.1;
	}
	// Iron
	if ((self.head == 2 || self.head == 72) && self.body == 2 && self.legs == 2) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\nУвеличивает скорость добычи на 25%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier1") + "\n25% increased mining speed";
		}
		self.statDefense += 2;
		self.pickSpeed -= 0.25;
	}
	// Lead
	if (self.head == 48 && self.body == 29 && self.legs == 28) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\nУвеличивает скорость добычи на 20%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\n20% increased mining speed";
		}
		self.statDefense += 3;
		self.pickSpeed -= 0.2;
	}
	// Silver
	if (self.head == 3 && self.body == 3 && self.legs == 3) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\nУвеличивает скорость добычи на 35%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\n35% increased mining speed";
		}
		self.statDefense += 3;
		self.pickSpeed -= 0.35;
	}
	// Tungsten
	if (self.head == 49 && self.body == 30 && self.legs == 29) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\nУвеличивает скорость добычи на 30%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\n30% increased mining speed";
		}
		self.statDefense += 3;
		self.pickSpeed -= 0.3;
	}
	// Gold
	if ((self.head == 73 || self.head == 4) && self.body == 4 && self.legs == 4) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\nУвеличивает скорость добычи на 45%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\n45% increased mining speed";
		}
		self.statDefense += 3;
		self.pickSpeed -= 0.45;
	}
	// Platinum
	if (self.head == 50 && self.body == 31 && self.legs == 30) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.Platinum") + "\nУвеличивает скорость добычи на 40%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.Platinum") + "\n40% increased mining speed";
		}
		self.statDefense += 4;
		self.pickSpeed -= 0.4;
	}
	// Molten
	if (self.head == 9 && self.body == 9 && self.legs == 9) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.Molten") + "\nДарует невосприимчивость к огненным блокам и временную невосприимчивость к лаве";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.Molten") + "\nGrants immunity to fire blocks, and temporary immunity to lava";
		}
		self.meleeDamage += 0.17;
		self.fireWalk = true;
		self.lavaMax += 300;
	}
	// Gladiator
	if (self.head == 180 && self.body == 182 && self.legs == 122) {
		if (GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive) {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\nУвеличивает стрелковый урон на 7%\nУвеличивает шанс стрелкового критического удара на 3%";
		}
		else {
			self.setBonus = GetTextValue("ArmorSetBonus.MetalTier2") + "\n7% increased ranged damage\n3% increased ranged crit chance";
		}
		self.statDefense += 3;
		self.rangedDamage += 0.07;
		self.rangedCrit += 3;
	}
});