// Author: Yum (Razz#3533)

const Player = new NativeClass('Terraria', 'Player');

const UpdateEquips = Player['void UpdateEquips(int i)'];

UpdateEquips.hook((original, self, i) => {
	original(self, i);

	for (i = 0; i < 58; i++) {
		let item = self.inventory[i];

		if (item.stack >= 30 && item.buffType != 0)
			self.AddBuff(item.buffType, 2, false, false);
	}
});
