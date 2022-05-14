import { Terraria } from "../ModImports.js";
import { GlobalNPC } from "../GlobalNPC.js";

export class NPCLoader {
    static ShopToNPC = [
        Terraria.ID.NPCID.None,
        Terraria.ID.NPCID.Merchant,
        Terraria.ID.NPCID.ArmsDealer,
        Terraria.ID.NPCID.Dryad,
        Terraria.ID.NPCID.Demolitionist,
        Terraria.ID.NPCID.Clothier,
        Terraria.ID.NPCID.GoblinTinkerer,
        Terraria.ID.NPCID.Wizard,
        Terraria.ID.NPCID.Mechanic,
        Terraria.ID.NPCID.SantaClaus,
        Terraria.ID.NPCID.Truffle,
        Terraria.ID.NPCID.Steampunker,
        Terraria.ID.NPCID.DyeTrader,
        Terraria.ID.NPCID.PartyGirl,
        Terraria.ID.NPCID.Cyborg,
        Terraria.ID.NPCID.Painter,
        Terraria.ID.NPCID.WitchDoctor,
        Terraria.ID.NPCID.Pirate,
        Terraria.ID.NPCID.Stylist,
        Terraria.ID.NPCID.TravellingMerchant,
        Terraria.ID.NPCID.SkeletonMerchant,
        Terraria.ID.NPCID.DD2Bartender,
        Terraria.ID.NPCID.Golfer,
        Terraria.ID.NPCID.BestiaryGirl,
        Terraria.ID.NPCID.Princess,
    ];

    constructor() {
    }

    static SetupShop(type, shop, nextSlot) {
        if (type < Terraria.Main.MaxShopIDs - 1) {
            type = this.ShopToNPC[type];
        }

        for (let npc of GlobalNPC.RegisteredNPC) {
            npc.SetupShop(type, shop, nextSlot);
        }
    }

    static ScaleExpertStats(self, numPlayers, bossLifeScale) {
        for (let npc of GlobalNPC.RegisteredNPC) {
            npc.ScaleExpertStats(self, numPlayers, bossLifeScale);
        }
    }

    static HitEffect(self, hitDirection, damage) {
        for (let npc of GlobalNPC.RegisteredNPC) {
            npc.HitEffect(self, hitDirection, damage);
        }
    }

    static SetupTravelShop(shop, nextSlot) {
        for (let npc of GlobalNPC.RegisteredNPC) {
            npc.SetupTravelShop(shop, nextSlot);
        }
    }

    static CheckDead(self) {
        let result = true;

        for (let npc of GlobalNPC.RegisteredNPC) {
            result &= npc.CheckDead(self);
        }

        return result;
    }

    static PreKill(self) {
        let result = true;

        for (let npc of GlobalNPC.RegisteredNPC) {
            result &= npc.PreKill(self);
        }

        if (!result) {
            return false;
        }

        return true;
    }

    static OnKill(self) {
        for (let npc of GlobalNPC.RegisteredNPC) {
            npc.OnKill(self);
        }
    }

    static CheckActive(self) {
        for (let npc of GlobalNPC.RegisteredNPC) {
            if (npc.CheckActive(self)) {
                return false;
            }
        }

        return true;
    }
}