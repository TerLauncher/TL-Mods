// Author: Yum (Razz#3533)

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');
const NPC = new NativeClass('Terraria', 'NPC');

const SpawnNPC = NPC['void SpawnNPC()'];

let AnyBossNPCS = () => {
	let npc = Main.npc;

	for (let i = 0; i < 200; i++) {
		if (npc[i].active && npc[i].type != 395 && (npc[i].boss || npc[i].type == 13 || npc[i].type == 15)) {
			return true;
		}
	}
	return false;
}

SpawnNPC.hook(original => {

	original();

	let player = Main.player;

	for (i = 0; i < 255; i++) {
		if (player[i].active && !player[i].dead) {
			if (!player[i].isNearNPC(398, NPC.MoonLordFightingDistance)) {
				if (AnyBossNPCS()) {
					NPC.spawnRate *= 10;
					NPC.maxSpawns *= 0.001;
				}
			}
		}
	}
});