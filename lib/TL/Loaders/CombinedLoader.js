import { ItemLoader } from "./ItemLoader.js";
import { PlayerLoader } from "./PlayerLoader.js";

export class CombinedLoader {
    static ModifyMana = {};
    static HealValue = { value: 0 };

    static CanShoot(player, item) {
        return PlayerLoader.CanShoot(player, item) && ItemLoader.CanShoot(item, player);
    }

    static TotalUseSpeedMultiplier(player, item) {
        return PlayerLoader.UseSpeedMultiplier(player, item) * ItemLoader.UseSpeedMultiplier(item, player);
    }

    static TotalUseTimeMultiplier(player, item) {
        return PlayerLoader.UseTimeMultiplier(player, item) * ItemLoader.UseTimeMultiplier(item, player) / this.TotalUseSpeedMultiplier(player, item);
    }

    static TotalUseTime(useTime, player, item) {
        const result = Math.max(1, useTime * this.TotalUseTimeMultiplier(player, item));
        return result;
    }

    static TotalUseAnimationMultiplier(player, item) {
        let result = PlayerLoader.UseAnimationMultiplier(player, item) * ItemLoader.UseAnimationMultiplier(item, player);

        const timeAnimationFactor = item.useAnimation / item.useTime;
        const multipliedUseTime = Math.max(1, item.useTime / this.TotalUseSpeedMultiplier(player, item));
        const relativeUseAnimation = Math.max(1, multipliedUseTime * timeAnimationFactor);

        result *= relativeUseAnimation / item.useAnimation;

        return result;
    }

    static TotalAnimationTime(useAnimation, player, item) {
        const result = Math.max(1, useAnimation * this.TotalUseAnimationMultiplier(player, item));
		return result;
    }

    static CanUseItem(player, item) {
        return PlayerLoader.CanUseItem(player, item) & ItemLoader.CanUseItem(item, player);
    }

    static ModifyManaCost(player, item, modifyMana) {
        ItemLoader.ModifyManaCost(item, player, modifyMana);
        PlayerLoader.ModifyManaCost(player, item, modifyMana);
    }

    static OnConsumeMana(player, item, manaConsumed) {
        ItemLoader.OnConsumeMana(item, player, manaConsumed);
        PlayerLoader.OnConsumeMana(player, item, manaConsumed);
    }

    static OnMissingMana(player, item, neededMana) {
        ItemLoader.OnMissingMana(item, player, neededMana);
        PlayerLoader.OnMissingMana(player, item, neededMana);
    }

    static GetManaCost(item, player) {
        let modifyMana = this.ModifyMana;
        modifyMana.reduce = player.manaCost;
        modifyMana.mult = 1;

        if (player.spaceGun && (item.type === 127 || item.type === 4347 || item.type === 4348)) {
            modifyMana.mult = 0;
        }
    
        if (item.type === 3852 && player.altFunctionUse === 2) {
            modifyMana.mult = 2;
        }

        this.ModifyManaCost(player, item, modifyMana);
        let mana = Math.floor(item.mana * modifyMana.reduce * modifyMana.mult);
        return mana >= 0 ? mana : 0;
    }
    
    static CheckMana(item, player, amount = -1, pay = false, blockQuickMana = false) {
        if (amount <= -1) {
            amount = this.GetManaCost(item, player);
        }

        if (player.statMana >= amount) {
            if (pay) {
                this.OnConsumeMana(player, item, amount);
                player.statMana -= amount;
            }
            return true;
        }

        if (blockQuickMana) {
            return false;
        }

        this.OnMissingMana(player, item, amount);
        if (player.statMana < amount && player.manaFlower) {
            player.QuickMana();
        }

        if (player.statMana >= amount) {
            if (pay) {
                this.OnConsumeMana(player, item, amount);
                player.statMana -= amount;
            }
            return true;
        }

        return false;
    }

    static GetHealLife(item, player, quickHeal = false) {
        const healLife = this.HealValue;
        healLife.value = item.healLife;
        ItemLoader.GetHealLife(item, player, quickHeal, healLife);
        PlayerLoader.GetHealLife(player, item, quickHeal, healLife);
        return healLife.value > 0 ? healLife.value : 0;
    }

    static GetHealMana(item, player, quickHeal = false) {
        const healMana = this.HealValue;
        healMana.value = item.healMana;
        ItemLoader.GetHealMana(item, player, quickHeal, healMana);
        PlayerLoader.GetHealMana(player, item, quickHeal, healMana);
        return healMana.value > 0 ? healMana.value : 0;
    }

    static Shoot(player, item, position, velocity, type, damage, knockback) {
        const defaultResult = PlayerLoader.Shoot(player, item, position, velocity, type, damage, knockback);
		return ItemLoader.Shoot(item, player, position, velocity, type, damage, knockback, defaultResult);
    }
}