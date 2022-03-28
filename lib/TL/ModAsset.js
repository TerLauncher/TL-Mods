import { ReLogic } from "./ModImports.js";

export class ModAsset {
    constructor(type, name, value) {
        this.asset = ReLogic.Content.Asset.makeGeneric(type).new();
        this.asset["void .ctor(string name)"](name);
        this.asset.Value = value;
    }
}