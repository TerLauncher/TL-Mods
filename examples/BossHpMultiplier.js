// Author: Yum (Razz#3533)

const NPC = new NativeClass('Terraria', 'NPC');
const NPCID = new NativeClass('Terraria.ID', 'NPCID');
const Main = new NativeClass('Terraria', 'Main');
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');

const ScaleStats_ApplyGameMode = NPC['void ScaleStats_ApplyGameMode(GameModeData gameModeData)'];
const ScaleStats_UseStrengthMultiplier = NPC['void ScaleStats_UseStrengthMultiplier(float strength)'];

const bossType = [
    [NPCID.KingSlime],
    [NPCID.EyeofCthulhu],
    [NPCID.EaterofWorldsHead],
    [NPCID.EaterofWorldsBody],
    [NPCID.EaterofWorldsTail],
    [NPCID.BrainofCthulhu],
    [NPCID.QueenBee],
    [NPCID.SkeletronHead],
    [NPCID.SkeletronHand],
    [NPCID.WallofFlesh],
    [NPCID.QueenSlimeBoss],
    [NPCID.Retinazer],
    [NPCID.Spazmatism],
    [NPCID.TheDestroyer],
    [NPCID.SkeletronPrime],
    [NPCID.PrimeCannon],
    [NPCID.PrimeSaw],
    [NPCID.PrimeVice],
    [NPCID.PrimeLaser],
    [NPCID.Plantera],
    [NPCID.PlanterasHook],
    [NPCID.PlanterasTentacle],
    [NPCID.GolemHead],
    [NPCID.GolemFistLeft],
    [NPCID.GolemFistRight],
    [NPCID.Golem],
    [NPCID.GolemHeadFree],
    [NPCID.HallowBoss],
    [NPCID.DukeFishron],
    [NPCID.CultistBoss],
    [NPCID.MoonLordHead],
    [NPCID.MoonLordHand],
    [NPCID.MoonLordCore],
    [NPCID.DD2Betsy]
];

let bossLifeMultiplier = {
    multiplier: 2
};

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
    original(self, message, client_id);
    const command = message.Text;

    if (command.startsWith('/hp ')) {
        let value = command.substring(4);
        Main.NewText(`Boss HP multiplier set to [c/69FFA1:${value}]`, 255, 255, 255);
        bossLifeMultiplier.multiplier = parseInt(value);
    }
});

ScaleStats_ApplyGameMode.hook((original, self, gameModeData) => {
    original(self, gameModeData);
    const type = self.type;
    const isJourneyMode = Main.GameModeInfo.IsJourneyMode;
    const isGoodWorld = Main.getGoodWorld; // for the worthy

    if (!isJourneyMode) {
        return;
    }

    if (!isGoodWorld) {
        for (let i = 0; i < bossType.length; i++) {
            if (type == bossType[i][0]) {
                self.life *= bossLifeMultiplier.multiplier;
                self.lifeMax = self.life;
            }
        }
    } else {
        for (let i = 0; i < bossType.length; i++) {
            if (type == bossType[i][0]) {
                self.life *= bossLifeMultiplier.multiplier * 2;
                self.lifeMax = self.life;
            }
        }
    }
});

ScaleStats_UseStrengthMultiplier.hook((original, self, strength) => {
    original(self, strength);
    const type = self.type;
    const isJourneyMode = Main.GameModeInfo.IsJourneyMode;

    if (isJourneyMode) {
        return;
    }

    for (let i = 0; i < bossType.length; i++) {
        if (type == bossType[i][0]) {
            self.life *= bossLifeMultiplier.multiplier;
            self.lifeMax = self.life;
        }
    }
});