import { ModHooks } from "./ModHooks.js";

export class GlobalTile {

    static RegisteredTiles = [];

    constructor() {

    }

    static register(tile) {
        this.RegisteredTiles.push(new tile());
        ModHooks.initialize();
    }


    KillTile(i, j, type, fail, effectOnly, noItem) {

    }
}