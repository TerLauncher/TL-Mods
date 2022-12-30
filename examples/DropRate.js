// Author: Yum (Razz#3533)
const NPC = new NativeClass('Terraria', 'NPC');
const Item = new NativeClass('Terraria', 'Item');
const Main = new NativeClass('Terraria', 'Main');
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');

const NewItem = Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)'];

function RandomQuantity(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DropChance(chance) {
    if (Number.isInteger(chance)) {
        return Math.round(Math.random() * 100) < chance;
    } else {
        return (Math.random() * 100)
            .toFixed(1) < chance;
    }
}

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
    original(self, message, client_id);
    const command = message.Text;
    if (command === '/DropRate') {
        Main.NewText('[i:4714] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1537] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1536] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1535] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1534] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1533] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:520] - 33% - 1-3', 255, 255, 255);
        Main.NewText('[i:521] - 33% - 1-3', 255, 255, 255);
        Main.NewText('[i:557] - 0.3% - 1', 255, 255, 255);
        Main.NewText('[i:544] - 0.3% - 1', 255, 255, 255);
        Main.NewText('[i:556] - 0.3% - 1', 255, 255, 255);
        Main.NewText('[i:1322] - 2% - 1', 255, 255, 255);
        Main.NewText('[i:962] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:961] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:960] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:958] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:957] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:956] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:159] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:934] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:362] - 100% - 3-8', 255, 255, 255);
        Main.NewText('[i:1309] - 0.5% - 1', 255, 255, 255);
        Main.NewText('[i:1183] - 3% - 1', 255, 255, 255);
        Main.NewText('[i:3213] - 5% - 1', 255, 255, 255);
        Main.NewText('[i:1236] - 3% - 1', 255, 255, 255);
        Main.NewText('[i:855] - 5% - 1', 255, 255, 255);
        Main.NewText('[i:954] - 1% - 1', 255, 255, 255);
        Main.NewText('[i:955] - 0.05% - 1', 255, 255, 255);
        Main.NewText('[i:9] - 30% - 1-3', 255, 255, 255);
        Main.NewText('Item Chance Quantity', 255, 100, 0);
    }
});

NPC.NPCLoot_DropItems.hook((original, self, closestPlayer) => {
    original(self, closestPlayer);
    const player = Main.LocalPlayer;
    switch (self.type) {
        case 3:
        case 132:
        case 186:
        case 187:
        case 188:
        case 189:
        case 200:
        case 590:
        case -3:
        case 1:
        case -8:
        case -7:
        case -9:
            if (DropChance(30)) {

                NewItem(self.position.X, self.position.Y, self.width, self.height, 9, RandomQuantity(1, 3), false, 0, false, false);
            }
            if (DropChance(0.5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 955, 1, false, 0, false, false);
            }
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 954, 1, false, 0, false, false);
            }
            break;
        case 491:
        case 216:
        case 214:
        case 213:
        case 212:
        case 215:
            if (DropChance(5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 855, 1, false, 0, false, false);
            }
            break;
        case 120:
            if (DropChance(3)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 1236, 1, false, 0, false, false);
            }
            break;
        case 489:
        case 490:
        case 587:
        case 586:
            if (DropChance(5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 3213, 1, false, 0, false, false);
            }
            break;
        case 269:
        case 270:
        case 271:
        case 272:
        case 273:
        case 274:
        case 275:
        case 276:
        case 277:
        case 278:
        case 279:
        case 280:
            if (DropChance(3)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 1183, 1, false, 0, false, false);
            }
            break;
        case -5:
        case -6:
        case 1:
        case 659:
        case 658:
        case -3:
        case 660:
        case 147:
        case 138:
        case -10:
        case 16:
        case -4:
        case -7:
        case -8:
        case 537:
        case -1:
        case -2:
        case 184:
        case 204:
        case 141:
        case -9:
        case 187:
        case 433:
            if (DropChance(0.5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 1309, 1, false, 0, false, false);
            }
            break;
        case 73:
            if (DropChance(100)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 362, RandomQuantity(2, 6), false, 0, false, false);
            }
            break;
        case 537:
        case 61:
        case 69:
        case 580:
        case 508:
        case 582:
        case 581:
        case 509:
        case 513:
            if (DropChance(0.5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 934, 1, false, 0, false, false);
            }
            break;
        case 223:
            if (DropChance(0.5)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 159, 1, false, 0, false, false);
            }
            break;
        case 6:
        case -11:
        case -12:
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 956, 1, false, 0, false, false);
            }
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 957, 1, false, 0, false, false);
            }
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 958, 1, false, 0, false, false);
            }
            break;
        case 42:
        case 43:
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 960, 1, false, 0, false, false);
            }
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 961, 1, false, 0, false, false);
            }
            if (DropChance(1)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 962, 1, false, 0, false, false);
            }
            break;
        case 60:
            if (DropChance(2)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 1322, 1, false, 0, false, false);
            }
            break;
    }

    if (Main.hardMode) {
        if (!NPC.downedMechBoss1 && DropChance(0.3)) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 556, 1, false, 0, false, false);
        } else if (!NPC.downedMechBoss2 && DropChance(0.3)) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 544, 1, false, 0, false, false);
        } else if (!NPC.downedMechBoss3 && DropChance(0.3)) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 557, 1, false, 0, false, false);
        }

        if (self.position.Y > Main.rockLayer * 16.0) {
            if (DropChance(33) && (player.ZoneCorrupt || player.ZoneCrimson)) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 521, RandomQuantity(1, 2), false, 0, false, false);
            }
            if (DropChance(33) && player.ZoneHallow) {
                NewItem(self.position.X, self.position.Y, self.width, self.height, 520, RandomQuantity(1, 2), false, 0, false, false);
            }
        }

        if (DropChance(0.5) && player.ZoneJungle) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 1533, 1, false, 0, false, false);
        }
        if (DropChance(0.5) && player.ZoneCorrupt) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 1534, 1, false, 0, false, false);
        }
        if (DropChance(0.5) && player.ZoneCrimson) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 1535, 1, false, 0, false, false);
        }
        if (DropChance(0.5) && player.ZoneHallow) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 1536, 1, false, 0, false, false);
        }
        if (DropChance(0.5) && player.ZoneSnow) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 1537, 1, false, 0, false, false);
        }
        if (DropChance(0.5) && (player.ZoneDesert || player.ZoneUndergroundDesert)) {
            NewItem(self.position.X, self.position.Y, self.width, self.height, 4714, 1, false, 0, false, false);
        }
    }
});