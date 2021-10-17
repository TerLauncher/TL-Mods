// Author: Yum (Razz#3533)

const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const Main = new NativeClass('Terraria', 'Main');
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');

function ClassSetupHelper(arg) {
	const isRussian = GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive;

	Main.NewText((isRussian ? 'Баффы: ' : 'Buffs: ') + arg.buff, 255, 255, 255);
	Main.NewText((isRussian ? 'Аксессуары: ' : 'Accessories: ') + arg.accs, 255, 255, 255);
	Main.NewText((isRussian ? 'Броня: ' : 'Armor: ') + arg.armor, 255, 255, 255);
	Main.NewText((isRussian ? 'Оружие: ' : 'Weapon: ') + arg.weapon, 255, 255, 255);
	Main.NewText((isRussian ? 'Класс: ' : 'Class: ') + arg.class, 255, 255, 255);
}

function GetBuildItem() {
	let text = '';
	for (let i = 0; i < arguments.length; i++) {
		text += `[i:${arguments[i]}]`;
	}
	return text;
}

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);
	const command = message.Text;
	const player = Main.LocalPlayer;
	const isRussian = GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive;
	const bossCommands = [
		['/ПреБоссы', '/PreBosses'],
		['/ПреХардмод', '/PreHardmode'],
		['/ПреМехи', '/PreMech'],
		['/ПреПлантера', '/PrePlantera'],
		['/ПреГолем', '/PreGolem'],
		['/ПреКультист', '/PreCultist'],
		['/ПреЛунныйЛорд', '/PreMoonLord'],
		['/Ендгейм', '/Endgame']
	];
	const preBosses = isRussian ? bossCommands[0][0] : bossCommands[0][1];
	const preHardmode = isRussian ? bossCommands[1][0] : bossCommands[1][1];
	const preMech = isRussian ? bossCommands[2][0] : bossCommands[2][1];
	const prePlantera = isRussian ? bossCommands[3][0] : bossCommands[3][1];
	const preGolem = isRussian ? bossCommands[4][0] : bossCommands[4][1];
	const preCultist = isRussian ? bossCommands[5][0] : bossCommands[5][1];
	const preMoonLord = isRussian ? bossCommands[6][0] : bossCommands[6][1];
	const endgame = isRussian ? bossCommands[7][0] : bossCommands[7][1];
	const helpCommand = isRussian ? '/Босс помощь' : '/Boss help';
	const meleeClass = isRussian ? '[c/ff5555:Воин]' : '[c/ff5555:Melee]';
	const rangedClass = isRussian ? '[c/50fa7b:Стрелок]' : '[c/50fa7b:Ranged]';
	const magicClass = isRussian ? '[c/bd93f9:Маг]' : '[c/bd93f9:Magic]';
	const summonerClass = isRussian ? '[c/f1fa8c:Призыватель]' : '[c/f1fa8c:Summoning]';
	const unknownClass = isRussian ? 'Класс неизвестный' : 'Unknown class';
	const unknownWeaponType = isRussian ? 'Тип оружия не опознан' : 'Unknown weapon type';

	if (command === helpCommand) {
		for (let i = 0; i < bossCommands.length; i++) {
			Main.NewText(isRussian ? bossCommands[i][0] : bossCommands[i][1], 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Список доступных команд:' : 'List of available commands:', 255, 100, 0);
	}

	if (command === preBosses) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3281, 4144, 989, 65),
				armor: GetBuildItem(92, 83, 79, 696, 697, 698),
				accs: GetBuildItem(54, 3212, 53, 211, 49, 934),
				buff: GetBuildItem(353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(964, 98, 168, 1319),
				armor: GetBuildItem(3374, 3375, 3376),
				accs: GetBuildItem(54, 3212, 53, 159, 49, 934),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(272, 744, 64, 1256),
				armor: GetBuildItem(228, 229, 230),
				accs: GetBuildItem(54, 3212, 53, 159, 49, 934),
				buff: GetBuildItem(294, 293)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(4273, 491),
				armor: GetBuildItem(92, 83, 79, 696, 697, 698),
				accs: GetBuildItem(54, 3212, 53, 211, 49, 934),
				buff: GetBuildItem(2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Боссы' : 'Stage: Pre-Bosses', 255, 255, 255);
	}

	if (command === preHardmode) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3282, 220, 274, 273),
				armor: GetBuildItem(231, 232, 233),
				accs: GetBuildItem(5000, 3097, 3223, 1164, 4007, 211),
				buff: GetBuildItem(353, 1354, 1359, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(120, 1130, 3019, 219),
				armor: GetBuildItem(151, 152, 153),
				accs: GetBuildItem(5000, 3097, 3223, 1164, 4007, 397),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(272, 1121, 165, 127),
				armor: GetBuildItem(228, 229, 230),
				accs: GetBuildItem(5000, 3097, 3223, 1164, 555, 2221),
				buff: GetBuildItem(294, 293)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(2365, 2364, 4913, 3824),
				armor: GetBuildItem(2361, 2362, 2363),
				accs: GetBuildItem(5000, 3097, 3223, 1164, 1158, 211),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Хардмод' : 'Stage: Pre-Hardmode', 255, 255, 255);
	}

	if (command === preMech) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3316, 3054, 4272, 1306),
				armor: GetBuildItem(684, 685, 686),
				accs: GetBuildItem(761, 5000, 3097, 490, 3992, 3223, 860),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(3029, 1265, 3788, 3052),
				armor: GetBuildItem(684, 685, 686),
				accs: GetBuildItem(761, 5000, 3097, 491, 4002, 4006, 1321),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(1336, 3787, 3209, 2750),
				armor: GetBuildItem(1217, 1218, 1219, 400, 403, 404),
				accs: GetBuildItem(761, 5000, 3097, 489, 4001, 2221, 860),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(4269, 4758, 4912, 2366),
				armor: GetBuildItem(2370, 2731, 2372),
				accs: GetBuildItem(761, 5000, 3097, 2998, 1158, 3992, 3223),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Механики' : 'Stage: Pre-Mech bosses', 255, 255, 255);
	}

	if (command === prePlantera) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3286, 675, 1327, 3054),
				armor: GetBuildItem(1316, 1317, 1318),
				accs: GetBuildItem(749, 5000, 3097, 490, 1343, 936, 3223),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(533, 3029, 1229, 3854),
				armor: GetBuildItem(533, 551, 552),
				accs: GetBuildItem(749, 5000, 3097, 491, 4002, 4006, 1321),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(1336, 3787, 3209, 495),
				armor: GetBuildItem(558, 551, 552),
				accs: GetBuildItem(749, 5000, 3097, 489, 4001, 2220, 935),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(4269, 4758, 4912, 2366),
				armor: GetBuildItem(4899, 4900, 4901),
				accs: GetBuildItem(749, 5000, 3097, 2998, 1158, 3992, 3223),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Плантера' : 'Stage: Pre-Plantera', 255, 255, 255);
	}

	if (command === preGolem) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3292, 757, 1569, 1513),
				armor: GetBuildItem(1316, 1317, 1318),
				accs: GetBuildItem(749, 5000, 984, 490, 1343, 936, 3997),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(533, 2223, 3029, 679),
				armor: GetBuildItem(1546, 1547, 1548, 1549, 1550),
				accs: GetBuildItem(749, 5000, 984, 491, 4002, 4006, 1321),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(1801, 1446, 1261, 1445),
				armor: GetBuildItem(2189, 1504, 1505),
				accs: GetBuildItem(749, 5000, 984, 489, 4001, 2220, 935),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(5005, 4607, 4914, 1572),
				armor: GetBuildItem(1832, 1833, 1834),
				accs: GetBuildItem(749, 5000, 3097, 2998, 1845, 1864, 1158),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Голем' : 'Stage: Pre-Golem', 255, 255, 255);
	}

	if (command === preCultist) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3292, 757, 1569, 4923),
				armor: GetBuildItem(231, 232, 233),
				accs: GetBuildItem(2609, 5000, 984, 490, 1343, 4989, 3110),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(2624, 1929, 2797, 1946),
				armor: GetBuildItem(1546, 1547, 1548, 1549, 1550),
				accs: GetBuildItem(2609, 5000, 984, 491, 4002, 4005, 4989),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(1930, 2622, 1931, 3870),
				armor: GetBuildItem(2189, 1504, 1505),
				accs: GetBuildItem(2609, 5000, 984, 489, 4001, 2220, 4989),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(5005, 2749, 4914, 3826),
				armor: GetBuildItem(1832, 1833, 1834),
				accs: GetBuildItem(2609, 5000, 984, 2998, 1845, 1864, 1158),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Культист' : 'Stage: Pre-Cultist', 255, 255, 255);
	}

	if (command === preMoonLord) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(3282, 220, 274, 273),
				armor: GetBuildItem(231, 232, 233),
				accs: GetBuildItem(2609, 5000, 984, 490, 1343, 4989, 3110),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(3540, 3475, 2797, 1946),
				armor: GetBuildItem(151, 152, 153),
				accs: GetBuildItem(2609, 5000, 984, 491, 4002, 4005, 4989),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(3476, 3542, 1930, 2622),
				armor: GetBuildItem(2189, 1504, 1505),
				accs: GetBuildItem(2609, 5000, 984, 489, 4001, 2220, 4989),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(5005, 3531, 4914, 3826),
				armor: GetBuildItem(1832, 1833, 1834),
				accs: GetBuildItem(2609, 5000, 984, 2998, 1845, 1864, 1158),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Пре-Лунный Лорд' : 'Stage: Pre-Moon Lord', 255, 255, 255);
	}

	if (command === endgame) {
		if (player.HeldItem.melee) {
			ClassSetupHelper({
				class: meleeClass,
				weapon: GetBuildItem(4956, 3389, 3063, 3065),
				armor: GetBuildItem(2763, 2764, 2765),
				accs: GetBuildItem(4954, 5000, 984, 490, 1343, 4989, 3110),
				buff: GetBuildItem(353, 1356, 1353, 3198)
			});
		} else if (player.HeldItem.ranged) {
			ClassSetupHelper({
				class: rangedClass,
				weapon: GetBuildItem(1553, 3540, 3930, 3475),
				armor: GetBuildItem(2757, 2758, 2759),
				accs: GetBuildItem(4954, 5000, 984, 491, 4002, 4005, 4989),
				buff: GetBuildItem(2177, 303)
			});
		} else if (player.HeldItem.magic) {
			ClassSetupHelper({
				class: magicClass,
				weapon: GetBuildItem(3541, 3570, 3476, 3542),
				armor: GetBuildItem(2760, 2761, 2762),
				accs: GetBuildItem(4954, 5000, 984, 489, 4001, 2220, 4989),
				buff: GetBuildItem(294, 293, 487)
			});
		} else if (player.HeldItem.summon) {
			ClassSetupHelper({
				class: summonerClass,
				weapon: GetBuildItem(5005, 3531, 4914, 3571),
				armor: GetBuildItem(3381, 3382, 3383),
				accs: GetBuildItem(4954, 5000, 984, 2998, 1845, 1864, 1158),
				buff: GetBuildItem(2999, 2328)
			});
		} else {
			Main.NewText(unknownClass, 255, 255, 255);
			Main.NewText(unknownWeaponType, 255, 255, 255);
		}
		Main.NewText(isRussian ? 'Стадия: Ендгейм' : 'Stage: Endgame', 255, 255, 255);
	}
});
