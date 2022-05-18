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

    OnEnterWorld(player) {

    }

    ResetEffects() {

    }

    UpdateDead() {

    }

    UpdateBadLifeRegen() {

    }

    UpdateLifeRegen() {

    }

    OnHitAnything(x, y, victim) {

    }

    OnRespawn() {

    }

    CanShoot(item) {
        return true;
    }

    UseSpeedMultiplier(item) {
        return 1.0;
    }

    UseAnimationMultiplier(item) {
        return 1.0;
    }

    UseTimeMultiplier(item) {
        return 1.0;
    }

    CanUseItem(item) {
        return true;
    }

    ModifyManaCost(item, mana) {

    }

    OnMissingMana(item, neededMana) {

    }

    OnConsumeMana(item, manaConsumed) {

    }

    PreModifyLuck(luck) {
        return true;
    }

    ModifyLuck(luck) {

    }

    GetDyeTraderReward(rewardPool) {

    }

    AnglerQuestReward(rewardItems) {

    }

    GetHealLife(item, quickHeal, healValue) {

    }

    GetHealMana(item, quickHeal, healValue) {

    }

    PostItemCheck() {

    }

    UpdateDyes() {

    }

    Shoot(item, position, velocity, type, damage, knockback) {
        return true;
    }

    OnHitNPC(item, target, damage, knockback, crit) {
    }

    OnHitNPCWithProj(proj, target) {
    }

    PreKill(damage, hitDirection, pvp) {
        return true;
    }

    Kill(damage, hitDirection, pvp, damageSource) {
    }
}