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
    static ItemSlotIndex = undefined;

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
}