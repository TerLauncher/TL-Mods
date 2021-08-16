// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');

const UpdateBiomes = Player['void UpdateBiomes()'];

UpdateBiomes.hook((original, self) => {

	original(self);

	// -1 лес
	// 0 чистых вод (beach)
	// 2 искажение
	// 3 джунгли
	// 4 святые земли
	// 5 снега
	// 6 оазис
	// 8 пещеры
	// 9 кровавая луна
	// 10 кримзон
	// 12 пустыня ???

	switch(Main.SceneMetrics.ActiveFountainColor)
	{
		case 0:
			Main.player[Main.myPlayer].ZoneBeach = true;
			break;

		case 6:
			Main.player[Main.myPlayer].ZoneDesert = true;
			break;

		case 3:
			Main.player[Main.myPlayer].ZoneJungle = true;
			break;

		case 5:
			Main.player[Main.myPlayer].ZoneSnow = true;
			break;

		case 2:
			Main.player[Main.myPlayer].ZoneCorrupt = true;
			break;

		case 10:
			Main.player[Main.myPlayer].ZoneCrimson = true;
			break;

		case 4:
			if (Main.hardMode)
				Main.player[Main.myPlayer].ZoneHallow = true;
			break;

		case 9:
			if(!Main.bloodMoon)
				Main.bloodMoon = true;
			break;
	}

	if (Main.SceneMetrics.ActiveFountainColor != 9 && Main.bloodMoon) {
		Main.bloodMoon = false;
	}
});