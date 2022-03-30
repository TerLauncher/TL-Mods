import { ModPlayer } from "TL/ModPlayer.js";

export class PlayerLoader {
    static Luck = { value: 0 };

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

    static ModifyManaCost(self, item, modifyMana) {
        if (item.IsAir) {
            return;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.ModifyManaCost(item, modifyMana);
        }
    }

    static OnMissingMana(self, item, manaNeeded) {
        if (item.IsAir) {
            return;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnMissingMana(item, manaNeeded);
        }
    }

    static OnConsumeMana(self, item, manaConsumed) {
        if (item.IsAir) {
            return;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnConsumeMana(item, manaConsumed);
        }
    }

    static PreModifyLuck(self, luck) {
        let flag = true;

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            if (!player.PreModifyLuck(luck)) {
                flag = false;
            }
        }
        self.luck = luck.value;

        return flag;
    }
}