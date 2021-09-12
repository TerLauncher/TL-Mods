// Author: Yum (Razz#3533)

const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const Main = new NativeClass('Terraria', 'Main');
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');
const NPC = new NativeClass('Terraria', 'NPC');

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);
	const command = message.Text;
	const isRussian = GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive;
	const initializeVanillaBosses = [
		['[c/ef4422:Лунный Лорд]', '[c/ef4422:Moon Lord]', NPC.downedMoonlord],
		['[c/ec5523:Культист Лунатик]', '[c/ec5523:Lunatic Cultist]', NPC.downedAncientCultist],
		['[c/f06d21:Герцог Рыброн]', '[c/f06d21:Duke Fishron]', NPC.downedFishron],
		['[c/f78117:Императрица Света]', '[c/f78117:Empress of Light]', NPC.downedEmpressOfLight],
		['[c/f28f29:Голем]', '[c/f28f29:Golem]', NPC.downedGolemBoss],
		['[c/f7d411:Плантера]', '[c/f7d411:Plantera]', NPC.downedPlantBoss],
		['[c/eee109:Скелетрон Прайм]', '[c/eee109:Skeletron Prime]', NPC.downedMechBoss3],
		['[c/eee109:Уничтожитель]', '[c/eee109:The Destroyer]', NPC.downedMechBoss1],
		['[c/eee109:Близнецы]', '[c/eee109:The Twins]', NPC.downedMechBoss2],
		['[c/dee20f:Королева Слизней]', '[c/dee20f:Queen Slime]', NPC.downedQueenSlime],
		['[c/d5da21:Стена Плоти]', '[c/d5da21:Wall of Flesh]', Main.hardMode],
		['[c/cdd920:Скелетрон]', '[c/cdd920:Skeletron]', NPC.downedBoss3],
		['[c/a2ca34:Королева Пчел]', '[c/a2ca34:Queen Bee]', NPC.downedQueenBee],
		['[c/8fc33f:Мозг Ктулху]', '[c/8fc33f:Brain of Cthulhu]', NPC.downedBoss2],
		['[c/8fc33f:Пожиратель Миров]', '[c/8fc33f:Eater of Worlds]', NPC.downedBoss2],
		['[c/76bb49:Глаз Ктулху]', '[c/76bb49:Eye of Cthulhu]', NPC.downedBoss1],
		['[c/5bb63c:Король Слизней]', '[c/5bb63c:King Slime]', NPC.downedSlimeKing],
	];

	const helpCommand = isRussian ? '/Босс журнал' : '/Boss log';

	if (command === helpCommand) {
		for (let i = 0; i < initializeVanillaBosses.length; i++) {
			const bossName = isRussian ? initializeVanillaBosses[i][0] : initializeVanillaBosses[i][1];
			const isBossKilledRus = initializeVanillaBosses[i][2] ? '[c/24FF7C:Да]' : '[c/FF4040:Нет]';
			const isBossKilledEng = initializeVanillaBosses[i][2] ? '[c/24FF7C:Yes]' : '[c/FF4040:No]';
			Main.NewText(`${isRussian ? 'Босс:' : 'Boss:'} ${bossName} - ${isRussian ? 'Убит:' : 'Killed:'} ${isRussian ? isBossKilledRus : isBossKilledEng}`, 255, 255, 255);
		}
	}
});
