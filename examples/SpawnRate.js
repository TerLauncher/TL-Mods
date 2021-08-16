// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');
const NPC = new NativeClass('Terraria', 'NPC');

const isNearNPC = Player['bool isNearNPC(int type, float range)'];
const SpawnNPC = NPC['void SpawnNPC()'];

SpawnNPC.hook(original => {

	original();

	let player = Main.player;

	for (i = 0; i < 255; i++) {
		if (player[i].active && !player[i].dead) {
			if ((!player[i].isNearNPC(398, NPC.MoonLordFightingDistance))) {
				if (player[i].ZoneWaterCandle || player[i].inventory[player[i].selectedItem].type == 148) {
					if (!player[i].ZonePeaceCandle && player[i].inventory[player[i].selectedItem].type != 3117) {
						NPC.spawnRate *= 0.6;
						NPC.maxSpawns *= 1.5;
					}
				}
				else if (player[i].ZonePeaceCandle || player[i].inventory[player[i].selectedItem].type == 3117) {
					NPC.spawnRate *= 2.0;
					NPC.maxSpawns *= 0.4;
				}

				if (player[i].ZoneWaterCandle && player[i].position.Y / 16.0 < Main.worldSurface * 0.349999994039536) {
					NPC.spawnRate *= 0.6;
				}

				if (player[i].enemySpawns) {
					NPC.spawnRate *= 0.2;
					NPC.maxSpawns *= 5.0;
				}
				if (player[i].calmed) {
					NPC.spawnRate *= 5.0;
					NPC.maxSpawns *= 0.2;
				}
			}
		}
	}
});