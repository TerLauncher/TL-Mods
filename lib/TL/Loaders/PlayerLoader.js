import { ModPlayer } from "TL/ModPlayer.js";
import { Terraria } from "TL/ModImports.js";

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

    static GetHealLife(self, item, quickHeal, healValue) {
        if (item.IsAir) {
            return;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.GetHealLife(item, quickHeal, healValue);
        }
    }

    static GetHealMana(self, item, quickHeal, healValue) {
        if (item.IsAir) {
            return;
        }

        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnConsumeMana(item, quickHeal, healValue);
        }
    }

    static PreUpdate(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.PreUpdate();
        }
    }

    static PostUpdate(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.PostUpdate();
        }
    }

    static OnRespawn(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnRespawn();
        }
    }

    static OnHitAnything(self, x, y, victim) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnHitAnything(x, y, victim);
        }
    }

    static UpdateBadLifeRegen(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.UpdateBadLifeRegen();
        }
    }

    static UpdateLifeRegen(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.UpdateLifeRegen();
        }
    }

    static UpdateDead(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.UpdateDead();
        }
    }

    static ResetEffects(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.ResetEffects();
        }
    }

    static OnEnterWorld(playerIndex) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = Terraria.Main.player[playerIndex];
            player.OnEnterWorld(player.player);
        }
    }

    static PostItemCheck(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.PostItemCheck();
        }
    }

    static UpdateDyes(self) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.UpdateDyes();
        }
    }

    static Shoot(self, item, position, velocity, type, damage, knockback) {
        let defaultResult = true;
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            defaultResult &= player.Shoot(item, position, velocity, type, damage, knockback);
        }

        return defaultResult;
    }

    static OnHitNPC(self, item, target, damage, knockBack, crit) {
        for (let player of ModPlayer.RegisteredPlayers) {
            player.player = self;
            player.OnHitNPC(item, target, damage, knockBack, crit);
        }
    }
}