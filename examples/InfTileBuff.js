// Author: Yum (Razz#3533)

const Player = new NativeClass('Terraria', 'Player');

const UpdateEquips = Player['void UpdateEquips(int i)'];

UpdateEquips.hook((original, self, i) => {
	original(self, i);

	let BewitchingTableTileBuff = false;
	let SharpeningStationTileBuff = false;
	let CrystalBallTileBuff = false;
	let AmmoBoxTileBuff = false;
	let SliceOfCake = false;

	for (i = 0; i < 58; i++) {
		let item = self.inventory[i];

		switch (item.type) {
			case 2999:
				if (item.favorited)
					BewitchingTableTileBuff = true;
				break;

			case 3198:
				if (item.favorited)
					SharpeningStationTileBuff = true;
				break;

			case 487:
				if (item.favorited)
					CrystalBallTileBuff = true;
				break;

			case 2177:
				if (item.favorited)
					AmmoBoxTileBuff = true;
				break;

			case 3750:
				if (item.favorited)
					SliceOfCake = true;
				break;
		}
	}

	if (BewitchingTableTileBuff) {
		self.AddBuff(150, 2, false, false);
	}

	if (SharpeningStationTileBuff) {
		self.AddBuff(159, 2, false, false);
	}

	if (CrystalBallTileBuff) {
		self.AddBuff(29, 2, false, false);
	}

	if (AmmoBoxTileBuff) {
		self.AddBuff(93, 2, false, false);
	}

	if (SliceOfCake) {
		self.AddBuff(192, 2, false, false);
	}
});
