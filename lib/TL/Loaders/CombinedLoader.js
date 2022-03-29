import { ItemLoader } from "./ItemLoader.js";
import { PlayerLoader } from "./PlayerLoader.js";

export class CombinedLoader {
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
}