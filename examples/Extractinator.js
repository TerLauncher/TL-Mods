// Author: Yum (Razz#3533)

const Item = new NativeClass('Terraria', 'Item');
const ItemID = new NativeClass('Terraria.ID', 'ItemID');
const SetDefaults = Item["void SetDefaults(int Type, bool noMatCheck)"];

SetDefaults.hook((original, self, type, noMatCheck) => {

	original(self, type, noMatCheck);

	switch (type) {
		case ItemID.SlushBlock:
		case ItemID.SiltBlock:
		case ItemID.DesertFossil:
			self.useTime = 2;
			break;
	}
});