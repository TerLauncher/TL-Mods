// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');

const Update = Player['void Update(int i)'];

Update.hook((original, self, i) => {
	original(self, i);

	if (Main.anglerQuestFinished) {
	Main.AnglerQuestSwap();
	}
});