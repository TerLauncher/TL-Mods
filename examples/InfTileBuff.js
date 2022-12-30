const Player = new NativeClass('Terraria', 'Player');

const UpdateEquips = Player['void UpdateEquips(int i)'];

UpdateEquips.hook((original, self, i) => {
    original(self, i);

    let BewitchingTableTileBuff = false;
    let SharpeningStationTileBuff = false;
    let CrystalBallTileBuff = false;
    let AmmoBoxTileBuff = false;
    let SliceOfCake = false;
	
	const inventory = self.inventory;
    for (i = 0; i < 58; i++) {
        const item = inventory[i];
        if (item.favorited) {
            switch (item.type) {
                case 2999:
                    BewitchingTableTileBuff = true;
                    break;
                case 3198:
                    SharpeningStationTileBuff = true;
                    break;
                case 487:
                    CrystalBallTileBuff = true;
                    break;
                case 2177:
                    AmmoBoxTileBuff = true;
                    break;
                case 3750:
                    SliceOfCake = true;
                    break;
            }
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