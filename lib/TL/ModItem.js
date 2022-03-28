import { ModRecipe } from "./ModRecipe.js";

import { ModTexturedType } from "./ModTexturedType.js"

import { Terraria } from "./ModImports.js";

import { ItemLoader } from "./Loaders/ItemLoader.js";

export class ModItem extends ModTexturedType {

    Item = undefined;
    Type = undefined;

    constructor() {
        super();
    }

    SetStaticDefaults() {
        this.Item.ToolTip = Terraria.Lang._itemTooltipCache[this.Type];
    }

    SetDefaults() {}

    IsArmorSet(head, body, legs) {
        return false;
    }

    UpdateArmorSet(player) {

    }

    AddRecipes() {

    }

    UpdateAccessory(player) {

    }

    HoldoutOffset() {
        return {
            X: 0,
            Y: 0
        };
    }

    static register(item) {
        ItemLoader.register(item);
    }

    static isModType(type) {
        return ItemLoader.isModType(type);
    }

    static isModItem(item) {
        return ItemLoader.isModItem(item);
    }

    static getByName(name) {
        return ItemLoader.getByName(name);
    }

    static getTypeByName(name) {
        return ItemLoader.getTypeByName(name);
    }

    static getModItem(type) {
        return ItemLoader.getModItem(type);
    }

    CreateRecipe(count = 1) {
        const recipe = new ModRecipe();
        return recipe.SetResult(this.Type, count);
    }

    static sellPrice(platinum = 0, gold = 0, silver = 0, copper = 0) {
        return (copper + silver * 100 + gold * 100 * 100 + platinum * 100 * 100 * 100) * 5;
    }

}