import { Terraria } from "./ModImports.js";

export class TileData {
    constructor(x, y) {
        this.offset = Terraria.Main.tile.get_Item(x, y)._tileOffset;
    }

    get type() {
        return Terraria.TileData["ushort GetType(int tileIndex)"](this.offset);
    }
}