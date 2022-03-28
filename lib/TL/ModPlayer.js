import { ModHooks } from "./ModHooks.js";

export class ModPlayer {

    static RegisteredPlayers = [];

    constructor() {
        this.player = null;
    }

    static register(player) {
        this.RegisteredPlayers.push(new player());
        ModHooks.initialize();
    }

    PreUpdateEquips() {

    }

    PostUpdateEquips() {
        
    }

    PreUpdate() {
        
    }

    PostUpdate() {
        
    }
}