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

    CanBurnInLava() {
        return null;
    }

    UpdateEquip(player) {

    }

    UpdateInventory(player) {

    }

    UpdateVanity(player) {

    }

    OnHitNPC(player, target, damage, knockback, crit) {
        
    }

    IsQuestFish() {
        return false;
    }

    AnglerQuestChat() {
        return {
            chat: '',
            catchLocation: ''
        };
    }

    IsAnglerQuestAvailable() {
        return true;
    }

    ExtractinatorUse(result) {

    }

    UseItem(player) {
        return null;
    }

    UseStyle(player, heldItemFrame) {

    }

    CanShoot(player) {
        return true;
    }

    UseAnimation(player) {

    }

    UseTimeMultiplier(player) {
        return 1.0;
    }

    UseAnimationMultiplier(player) {
        return 1.0;
    }

    UseSpeedMultiplier(player) {
        return 1.0;
    }

    HoldItem(player) {

    }

    CanUseItem(player) {
        return true;
    }

    OnConsumeItem(player) {

    }

    ConsumeItem(player) {
        return true;
    }

    ModifyManaCost(player, mana) {

    }

    OnConsumeMana(player, manaConsumed) {

    }

    OnMissingMana(player, neededMana) {

    }

    GetHealLife(player, quickHeal, healValue) {

    }

    GetHealMana(player, quickHeal, healValue) {

    }

    HoldStyle(player, heldItemFrame) {

    }

    ChoosePrefix(rand) {
        return -1;
    }

    Shoot(player, position, velocity, type, damage, knockback) {
        return true;
    }

    AllowPrefix(pre) {
        return true;
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