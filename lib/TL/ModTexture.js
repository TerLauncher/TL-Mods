import { ModAsset } from "./ModAsset.js"
import { Microsoft } from "./ModImports.js";

export class ModTexture {
    static overrideFrames = {};
    constructor(name, verticalFrames = -1) {
        this.name = name;
        this.path = `Textures/${name}.png`
        this.exists = tl.file.exists(this.path);
        if (this.exists) {
            this.texture = tl.texture.load(this.path);
            this.texture_path = `${tl.mod.uuid}/${name}`;
            this.asset = new ModAsset(Microsoft.Xna.Framework.Graphics.Texture2D, this.texture_path, this.texture);
            this.texture._sourceLoadAsset = this.texture_path;
            if (verticalFrames != -1) {
                ModTexture.overrideFrames[this.texture_path] = verticalFrames;
            }
        }
    }
}