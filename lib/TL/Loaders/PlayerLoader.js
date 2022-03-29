import { ModPlayer } from "TL/ModPlayer.js";

export class PlayerLoader {
    static CanShoot(self, item) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            if (!player.CanShoot(item)) {
                return false;
            }
        }

        return true;
    }

    static UseSpeedMultiplier(self, item) {
        let multiplier = 1.0;

        if (item.IsAir) {
            return multiplier;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            multiplier *= player.UseSpeedMultiplier(item);
        }

        return multiplier;
    }

    static UseAnimationMultiplier(self, item) {
        let multiplier = 1.0;

        if (item.IsAir) {
            return multiplier;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            multiplier *= player.UseAnimationMultiplier(item);
        }

        return multiplier;
    }

    static UseTimeMultiplier(self, item) {
        let multiplier = 1.0;

        if (item.IsAir) {
            return multiplier;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            multiplier *= player.UseTimeMultiplier(item);
        }

        return multiplier;
    }

    static CanUseItem(self, item) {
        let result = true;

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            result &= player.CanUseItem(item);
        }

        return result;
    }
}