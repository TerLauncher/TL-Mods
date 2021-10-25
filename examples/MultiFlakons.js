// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Projectile = new NativeClass('Terraria', 'Projectile');

const NewProjectile = Projectile['int NewProjectile(float X, float Y, float SpeedX, float SpeedY, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1)'];

function Random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Projectile.StatusNPC.hook((original, self, i) => {
	original(self, i);

	const npc = Main.npc[i];
	const meleeEnchant = Main.player[self.owner].meleeEnchant;

	if (meleeEnchant > 0 && (self.magic || self.ranged)) {
		if (meleeEnchant === 1) {
			npc.AddBuff(70, 60 * Random(5, 10), false);
		}
		if (meleeEnchant === 2) {
			npc.AddBuff(39, 60 * Random(3, 7), false);
		}
		if (meleeEnchant === 3) {
			npc.AddBuff(24, 60 * Random(3, 7), false);
		}
		if (meleeEnchant === 4) {
			npc.AddBuff(72, 120, false);
		}
		if (meleeEnchant === 5) {
			npc.AddBuff(69, 60 * Random(10, 20), false);
		}
		if (meleeEnchant === 6) {
			npc.AddBuff(31, 60 * Random(1, 4), false);
		}
		if (meleeEnchant === 7) {
			NewProjectile(npc.Center.X, npc.Center.Y, npc.velocity.X, npc.velocity.Y, 289, 0, 0.0, self.owner, 0.0, 0.0);
		}
		if (meleeEnchant === 8) {
			npc.AddBuff(20, 60 * Random(5, 10), false);
		}
	}
});