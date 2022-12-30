// Author: Yum (Razz#3533)

const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const NPC = new NativeClass('Terraria', 'NPC');
const SoundEngine = new NativeClass('Terraria.Audio', 'SoundEngine');
const MathCS = new NativeClass('System', 'Math');
const PlayerSpawnContext = new NativeClass('Terraria', 'PlayerSpawnContext');
const CombatText = new NativeClass('Terraria', 'CombatText');
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const Dust = new NativeClass('Terraria', 'Dust');
const Item = new NativeClass('Terraria', 'Item');
const WorldFile = new NativeClass('Terraria.IO', 'WorldFile');
const UnifiedRandom = new NativeClass('Terraria.Utilities', 'UnifiedRandom');
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');
const Projectile = new NativeClass('Terraria', 'Projectile');
const MathHelper = new NativeClass('Microsoft.Xna.Framework', 'MathHelper');
const Utils = new NativeClass('Terraria', 'Utils');

const NextVector2Square = Utils['Vector2 NextVector2Square(UnifiedRandom r, float min, float max)'];
const RotatedByRandom = Utils['Vector2 RotatedByRandom(Vector2 spinninpoint, double maxRadians)'];
const Normalize = Vector2['void Normalize()'];
const CombatNewText = CombatText['int NewText(Rectangle location, Color color, string text, bool dramatic, bool dot)'];
const Sign = MathCS['int Sign(float value)'];
const Op_Multiply = Vector2['Vector2 op_Multiply(Vector2 value, float scaleFactor)'];
const Op_Subtraction = Vector2['Vector2 op_Subtraction(Vector2 value1, Vector2 value2)'];
const Op_Addition = Vector2['Vector2 op_Addition(Vector2 value1, Vector2 value2)'];
const PlaySound = SoundEngine['void PlaySound(int type, Vector2 position, int style)'];
const Next = UnifiedRandom['int Next(int minValue, int maxValue)'];
const NewProjectile = Projectile['int NewProjectile(IEntitySource spawnSource, float X, float Y, float SpeedX, float SpeedY, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];
const NewProjectile2 = Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2)'];

class Boss {
    constructor(id, changeTimeTo, spawnContext, specialSpawnCountdown, permittedNPCs) {
        this.id = id;
        this.changeTimeTo = changeTimeTo;
        this.spawnContext = spawnContext;
        this.specialSpawnCountdown = specialSpawnCountdown;
        this.permittedNPCs = permittedNPCs;

        if (spawnContext === null) {
            this.spawnContext = (type) => {
                NPC.SpawnOnPlayer(closestPlayerToWorldCenter(), type);
            };
        }

        if (!this.permittedNPCs.includes(id)) {
            this.permittedNPCs.push(id);
        }
    }
}

const bossRushEvent = {
    active: false,
    startCountdown: false,
    stage: 0,
    spawnCountdown: 300,
    timeChangeContext: {
        none: 0,
        day: 1,
        night: 2,
    },
};

const closestPlayerToWorldCenter = () => Player.FindClosest(Op_Multiply(Op_Multiply(vector(Main.maxTilesX, Main.maxTilesY), 16.0), 0.5), 1, 1);

const currentlyFoughtBoss = () => bosses[bossRushEvent.stage].id;

const endEffects = () => {
    for (let i = 0; i < 200; i++) {
        const npc = Main.npc[i];

        if (npc.active && (npc.boss || npc.type === 13 || npc.type === 14 || npc.type === 15)) {
            npc.life = 0;
            npc.HitEffect(0, 10.0);
            npc.checkDead();
            npc.active = false;
        }
    }

    bossRushEvent.active = false;
    bossRushEvent.startCountdown = false;
    bossRushEvent.stage = 0;
    killAllHostileProjectiles();
}

const bosses = [
    new Boss(50, 0, null, -1, [1, -9, -7, -8, -3, 147, 225, -4, 535, 244]), // King Slime
    new Boss(4, 2, null, -1, [5]), // Eye of Cthulhu
    new Boss(266, 0, null, -1, [267]), // Brain of Cthulhu
    new Boss(13, 0, null, -1, [14, 15, 112]), // Eater of Worlds
    new Boss(222, 0, null, -1, []), // Queen Bee
    new Boss(35, 2, (type) => { // Skeletron 
		let index = closestPlayerToWorldCenter();
        const player = Main.player[index];
        const num = NPC.NewNPC(NPC.GetBossSpawnSource(index), player.position.X + Next(Main.rand, -200, 201), player.position.Y - 400.0, type, 1, 0.0, 0.0, 0.0, 0.0, 255);
        Main.npc[num].timeLeft *= 20;
        bossAwakenMessage(num);
    }, -1, [36]),
    new Boss(113, 0, () => { // Wall of Flesh
        NPC.SpawnWOF(Main.player[closestPlayerToWorldCenter()].position);
    }, -1, [114, 117, 118, 119, 115, 116]),
    new Boss(657, 0, () => {
        if (Main.player[closestPlayerToWorldCenter()].active) {
            Main.player[closestPlayerToWorldCenter()].Spawn(PlayerSpawnContext.ReviveFromDeath);
        }
        NPC.SpawnOnPlayer(closestPlayerToWorldCenter(), 657);
    }, -1, [658, 659, 660]),
    new Boss(126, 2, () => {
        NPC.SpawnOnPlayer(closestPlayerToWorldCenter(), 126);
        NPC.SpawnOnPlayer(closestPlayerToWorldCenter(), 125);
    }, -1, [125]),
    new Boss(134, 2, null, -1, [135, 136, 139]),
    new Boss(127, 2, null, -1, [128, 129, 130, 131, 139]),
    new Boss(370, 0, (type) => {
		let index = closestPlayerToWorldCenter();
        const player = Main.player[index];
        const num = NPC.NewNPC(NPC.GetBossSpawnSource(index), player.position.X + Next(Main.rand, -200, 201), player.position.Y - 400.0, type, 1, 0.0, 0.0, 0.0, 0.0, 255);
        Main.npc[num].timeLeft *= 20;
        bossAwakenMessage(num);
    }, -1, [371, 372, 373]),
    new Boss(262, 0, null, -1, [264, 263, 265]),
    new Boss(636, 2, null, -1, []),
    new Boss(245, 1, (type) => {
		let index = closestPlayerToWorldCenter();
        const player = Main.player[index];
        const num = NPC.NewNPC(NPC.GetBossSpawnSource(index), player.position.X + Next(Main.rand, -200, 201), player.position.Y - 400.0, type, 1, 0.0, 0.0, 0.0, 0.0, 255);
        Main.npc[num].timeLeft *= 20;
        bossAwakenMessage(num);
    }, -1, [247, 248, 246, 249]),
    new Boss(439, 0, (type) => {
		let index = closestPlayerToWorldCenter();
        const player = Main.player[index];
        const num = NPC.NewNPC(NPC.GetBossSpawnSource(index), player.Center.X, player.Center.Y - 400.0, type, 1, 0.0, 0.0, 0.0, 0.0, 255);
        Main.npc[num].direction = (Main.npc[num].spriteDirection = Sign(player.Center.X - player.Center.X - 90.0));
        Main.npc[num].timeLeft *= 20;
        bossAwakenMessage(num);
    }, -1, [440, 454, 455, 456, 457, 458, 459, 521, 522, 523]),
    new Boss(398, 0, null, -1, [401, 397, 396, 400]),
];

const bossRushUpdate = () => {
    if (NPC.MoonLordCountdown > 0) {
        NPC.MoonLordCountdown = 0;
    }

    if (bossRushEvent.startCountdown) {
        if (bossRushEvent.spawnCountdown === 180) {
            CombatNewText(Main.player[Main.myPlayer].getRect(), Color.Orange, '3', true, false);
        } else if (bossRushEvent.spawnCountdown === 120) {
            CombatNewText(Main.player[Main.myPlayer].getRect(), Color.Orange, '2', true, false);
        } else if (bossRushEvent.spawnCountdown === 60) {
            CombatNewText(Main.player[Main.myPlayer].getRect(), Color.Orange, '1', true, false);
        }
    }

    if (!anyBossNPCs()) {
        if (bossRushEvent.spawnCountdown > 0) {
            bossRushEvent.spawnCountdown -= 1;
        }

        if (bossRushEvent.spawnCountdown <= 0) {
            bossRushEvent.startCountdown = false;
            bossRushEvent.spawnCountdown = 120;

            if (bossRushEvent.stage < bosses.length - 1 && bosses[bossRushEvent.stage + 1].specialSpawnCountdown !== -1) {
                bossRushEvent.spawnCountdown = bosses[bossRushEvent.stage + 1].specialSpawnCountdown;
            }

            if (bosses[bossRushEvent.stage].changeTimeTo !== bossRushEvent.timeChangeContext.none) {
                changeTime(bosses[bossRushEvent.stage].changeTimeTo === bossRushEvent.timeChangeContext.day);
            }

            // if (!bosses[bossRushEvent.stage].specialSound) {
            //     PlaySound(15, Main.player[closestPlayerToWorldCenter()].position, 0);
            // }

            bosses[bossRushEvent.stage].spawnContext(currentlyFoughtBoss());
        }
    }
}

const bossDeathEffects = (npc) => {
    bosses.forEach((boss) => {
        if (boss.id === npc.type && boss.id !== 13) {
            bossRushEvent.stage += 1;
            killAllHostileProjectiles();

            if (boss.id === 266) {
                Main.player[closestPlayerToWorldCenter()].ZoneCrimson = false;
            }

            if (boss.id === 13) {
                Main.player[closestPlayerToWorldCenter()].ZoneCorrupt = false;
            }

            if (boss.id === 35) {
                underworldTeleport();
            }

            if (boss.id === 439) {
                for (let i = 0; i < 200; i++) {
                    const isPillars = Main.npc[i].type === 493 || Main.npc[i].type === 422 || Main.npc[i].type === 507 || Main.npc[i].type === 517;

                    if (Main.npc[i].active && isPillars) {
                        Main.npc[i].active = false;
                    }
                }
            }

            if (boss.id === 398) {
                bossRushEvent.stage = 0;
                bossRushEvent.active = false;

                const player = Main.player[closestPlayerToWorldCenter()];
                const proj = NewProjectile(Projectile.GetNoneSource(), player.Center.X, player.Center.Y, 0.0, -5.0, 167, 0, 0.0, Main.myPlayer, 0.0, 0.0, 0.0);
                Main.projectile[proj].ranged = false;
                Main.player[Main.myPlayer].QuickSpawnItem(4722, 1);
            }
        }
    });

    if (npc.type === 13 || npc.type === 14 || npc.type === 15) {
        if (npc.boss) {
            bossRushEvent.stage += 1;
            killAllHostileProjectiles();
        }
    }
}

const underworldTeleport = () => {
    const player = Main.player[closestPlayerToWorldCenter()];
    const postImmune = player.immune;
    const postImmuneTime = player.immuneTime;

    player.grappling[0] = -1;
    player.grapCount = 0;
	
    for (let i = 0; i < 1000; i++) {
        if (Main.projectile[i].active && Main.projectile[i].owner === player.whoAmI && Main.projectile[i].aiStyle === 7) {
            Main.projectile[i].Kill();
        }
    }

    player.velocity = Vector2.Zero;
    player.immune = postImmune;
    player.immuneTime = postImmuneTime;
    player.DemonConch();

    for (let i = 0; i < 70; i++) {
        const num = Dust.NewDust(player.position, player.width, player.height, 15, player.velocity.X * 0.2, player.velocity.Y * 0.2, 150, Color.Cyan, 1.2);
        const dust = Main.dust[num];
        dust.velocity = Op_Multiply(dust.velocity, 0.5);
    }

	// TODO: FIX PlaySound crash, null pointer exception!
    //PlaySound(2, player.position, 0);
}

const forceDespawnOtherNPCs = (npc) => {
    if (bossRushEvent.stage < bosses.length && !bosses[bossRushEvent.stage].permittedNPCs.includes(npc.type)) {
        npc.active = false;
        npc.netUpdate = true;
    }
}

const anyBossNPCs = () => {
    for (let i = 0; i < 200; i++) {
        const npc = Main.npc[i];

        if (npc.active && npc.type !== 395 && (npc.boss || npc.type === 13 || npc.type === 15)) {
            return true;
        }
    }
}

const killAllHostileProjectiles = () => {
    for (let i = 0; i < Main.maxProjectiles; i++) {
        const projectile = Main.projectile[i];

        if (projectile.active && projectile.hostile && !projectile.friendly && projectile.damage > 0) {
            projectile.Kill();
        }
    }
}

function vector(x, y) {
    const vector = Vector2.new();
    vector.X = x;
    vector.Y = y;

    return vector;
}

const changeTime = (day) => {
    Main.time = 0.0;
    Main.dayTime = day;
}

const bossAwakenMessage = (npcIndex) => {
    const typeName = Main.npc[npcIndex].TypeName;
    const isRussian = GameCulture.FromCultureName(GameCulture.CultureName.Russian).IsActive;

    if (Main.netMode === 0) {
        // Временный костыль
        Main.NewText(isRussian ? `Пробудился босс ${typeName}!` : `${typeName} has awoken!`, 175, 75, 255);
    }
}

const bossAttacks = {
    kingSlime: {
        explosive: 400,
        landingAttack: false,
        currentlyJumping: false,
        enraged: false,
        didP2SpecialTeleport: false,
    },
}

const bossRushKingSlimeAI = (npc) => {
    if (bossAttacks.kingSlime.explosive > 0) {
        bossAttacks.kingSlime.explosive--;
    }

    if (npc.life < npc.lifeMax * 0.3) {
        bossAttacks.kingSlime.enraged = true;
        //PlaySound(15, Main.player[npc.target].Center, 0);
    }

    if (bossAttacks.kingSlime.landingAttack) {
        if (npc.velocity.Y === 0.0) {
            bossAttacks.kingSlime.landingAttack = false;

            if (npc.HasValidTarget) {
                PlaySound(2, Main.player[npc.target].Center, 21);
                for (let i = 0; i < 8; i++) {
                    const spawn = Main.player[npc.target].Center;
                    spawn.X += Next(Main.rand, -30, 30);
                    spawn.Y -= Next(Main.rand, 500, 600);
                    let speed = Op_Subtraction(Main.player[npc.target].Center, spawn);
                    Normalize(speed);
                    speed = Op_Multiply(speed, bossAttacks.kingSlime.enraged ? 0.25 : 0.15);
                    speed = RotatedByRandom(speed, MathHelper.ToRadians(4));
                    const proj = NewProjectile2(Projectile.GetNoneSource(), spawn, speed, 27, npc.damage, 0.0, Main.myPlayer, 0.0, 0.0, 0.0);
                    Main.projectile[proj].friendly = false;
                    Main.projectile[proj].hostile = true;
                }
            }
        }
    } else if (npc.velocity.Y > 0) {
        bossAttacks.kingSlime.landingAttack = true;
    }

    if (bossAttacks.kingSlime.explosive === 0 && npc.life < npc.lifeMax * 0.5) {
        bossAttacks.kingSlime.explosive = bossAttacks.kingSlime.enraged ? 240 : 460;
        if (npc.HasPlayerTarget) {
            for (let i = -12; i <= 12; i++) {
                const spawnPos = Main.player[npc.target].Center;
                spawnPos.X += 130 * i;
                spawnPos.Y -= 350;
                const proj = NewProjectile2(Projectile.GetNoneSource(), spawnPos, vector(0.0, 5.0), 188, npc.damage, 0.0, Main.myPlayer, 0.0, 0.0, 0.0);
                Main.projectile[proj].friendly = false;
                Main.projectile[proj].hostile = true;
            }
        }
    }

    if (npc.velocity.Y < 0) {
        if (!bossAttacks.kingSlime.currentlyJumping) {
            bossAttacks.kingSlime.currentlyJumping = true;

            if (npc.HasValidTarget && Main.player[npc.target].Center.Y < npc.position.Y + npc.height - 240) {
                npc.velocity.Y *= 2.0;
                const gravity = 0.15;
                const time = 90.0;
                const distance = Op_Addition(Op_Subtraction(Main.player[npc.target].Center, npc.Center), Op_Multiply(Main.player[npc.target].velocity, 30.0));
                distance.X /= time;
                distance.Y = distance.Y / time - 0.5 * gravity * time;
                for (let i = 0; i < 15; i++) {
                    const proj = NewProjectile2(Projectile.GetNoneSource(), npc.Center, Op_Addition(distance, NextVector2Square(Main.rand, -1.0, 1.0)), 174, npc.damage, 0.0, Main.myPlayer, 0.0, 0.0, 0.0);
                    Main.projectile[proj].friendly = false;
                    Main.projectile[proj].hostile = true;
                    PlaySound(2, Main.projectile[proj].position, 17);
                }
            }
        }
    } else {
        bossAttacks.kingSlime.currentlyJumping = false;
    }
}

NPC.AI.hook((original, self) => {
    original(self);

    if (bossRushEvent.active) {
        if (self.type === 50) {
            bossRushKingSlimeAI(self);
        }
    }

    if (bossRushEvent.active && !self.friendly && !self.townNPC) {
        forceDespawnOtherNPCs(self);
    }
});

NPC.NPCLoot.hook((original, self) => {
    if (!bossRushEvent.active) {
        original(self);
        return;
    }

    bossDeathEffects(self);
});

Player.UpdateBiomes.hook((original, self) => {
    original(self);

    if (bossRushEvent.active) {
        const player = Main.player[closestPlayerToWorldCenter()];

        if (bossRushEvent.stage === bosses.findIndex((boss) => boss.id === 266) && !player.ZoneCrimson) {
            player.ZoneCrimson = true;
        } else if (bossRushEvent.stage === bosses.findIndex((boss) => boss.id === 13) && !player.ZoneCorrupt) {
            player.ZoneCorrupt = true;
        }
    }
});

Player.Update.hook((original, self, i) => {
    original(self, i);

    if (bossRushEvent.active) {
        bossRushUpdate();
    }
});

Player.UpdateDead.hook((original, self) => {
    original(self);

    if (bossRushEvent.active) {
        endEffects();
    }
});

// NPC.ScaleStats_UseStrengthMultiplier.hook((original, self, strength) => {
//     original(self, strength);
// })

WorldFile.InternalSaveWorld.hook((original, useCloudSaving, resetTime) => {
    original(useCloudSaving, resetTime);

    bossRushEvent.startCountdown = false;
    bossRushEvent.active = false;
    bossRushEvent.stage = 0;
});

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
    original(self, message, client_id);

    const command = message.Text;

    if (command === '/BossRush') {
        bossRushEvent.active = !bossRushEvent.active;
        bossRushEvent.stage = 0;
        if (bossRushEvent.active) {
            bossRushEvent.startCountdown = true;
            CombatNewText(Main.player[closestPlayerToWorldCenter()].getRect(), Color.Cyan, 'Hmm? Ah, another challenger. Well, good luck!', true, false);
        }
    }
});
