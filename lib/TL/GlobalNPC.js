import { ModHooks } from "./ModHooks.js";

export class GlobalNPC {
    static RegisteredNPC = [];

    constructor() {
        
    }

    static register(npc) {
        this.RegisteredNPC.push(new npc());
        ModHooks.initialize();
    }

    NPCLoot(npc) {

    }

    PostDraw(npc, spriteBatch, screenPos) {

    }

    SetupShop(type, shop, nextSlot) {

    }

    ScaleExpertStats(npc, numPlayers, bossLifeScale) {

    }

    HitEffect(npc, hitDirection, damage) {

    }
}