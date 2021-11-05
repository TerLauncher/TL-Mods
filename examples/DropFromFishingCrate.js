// Author: Yum (Razz#3533)

const Player = new NativeClass('Terraria', 'Player');
const Item = new NativeClass('Terraria', 'Item');

const NewItem = Item['int NewItem(Vector2 pos, int Width, int Height, int Type, int Stack, bool noBroadcast, int prefixGiven, bool noGrabDelay, bool reverseLookup)'];

function DropChance(chance) {
	if (Number.isInteger(chance)) {
		return Math.round(Math.random() * 100) < chance;
	} else {
		return (Math.random() * 100).toFixed(1) < chance;
	}
}

Player.OpenFishingCrate.hook((original, self, crateItemID) => {
	original(self, crateItemID);
	if (crateItemID === 3206) {
		if (DropChance(100)) {
			NewItem(self.position, self.width, self.height, 4978, 1, false, 0, false, false);
		}
	}
});