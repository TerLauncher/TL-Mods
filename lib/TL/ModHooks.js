import { Terraria, Microsoft } from "./ModImports.js";

import { ModPlayer } from "./ModPlayer.js";

import { GlobalTile } from "./GlobalTile.js";

import { GlobalNPC } from "./GlobalNPC.js";

import { ModTexture } from "./ModTexture.js";

import { TileData } from "./TileData.js";

import { ModProjectile } from "./ModProjectile.js";

import { ItemLoader } from "./Loaders/ItemLoader.js";

import { CombinedLoader } from "./Loaders/CombinedLoader.js";

import { PlayerLoader } from "./Loaders/PlayerLoader.js";
import { NPCLoader } from "./Loaders/NPCLoader.js";

export class ModHooks {
	static OnHitTemp = [];
    static ExtractinatorTemp = {};

    static isInitialized = false;

    static initialize() {
        if (ModHooks.isInitialized) return;

        Terraria.Projectile.SetDefaults.hook((original, self, type) => {
            original(self, type);
            const projectile = ModProjectile.getModProjectile(type);
            projectile?.SetStaticDefaults();
            projectile?.SetDefaults();
            tl.log("Projectile.SetDefaults: " + JSON.stringify(projectile?.Projectile));
            Object.assign(self, projectile?.Projectile);
        });

        Terraria.WorldGen.KillTile.hook((original, i, j, fail, effectOnly, noItem) => {
            original(i, j, fail, effectOnly, noItem);

            const tileData = new TileData(i, j);
            let tileType = tileData.type;

            for (let tile of GlobalTile.RegisteredTiles) {
                tile.KillTile(i, j, tileType, fail, effectOnly, noItem);
            }
        });

        Terraria.Main.DrawNPCDirect.hook((original, self, mySpriteBatch, rCurrentNPC, behindTiles, screenPos) => {
            original(self, mySpriteBatch, rCurrentNPC, behindTiles, screenPos);

            for (let npc of GlobalNPC.RegisteredNPC) {
                npc.PostDraw(self, mySpriteBatch, screenPos);
            }

        });

        Terraria.NPC.NPCLoot.hook((original, self) => {
            original(self);

            for (let npc of GlobalNPC.RegisteredNPC) {
                npc.NPCLoot(self);
            }

        });

        Terraria.Player.Update.hook((original, self, i) => {
            PlayerLoader.PreUpdate(self);
            original(self, i);
            PlayerLoader.PostUpdate(self);
        });

        Terraria.Lang.GetItemName.hook((original, id) => {

            id = Terraria.ID.ItemID.FromNetId(id);

            if (id < ItemLoader.MAX_VANILLA_ID) {
                return original(id);
            }

            const cache = Terraria.Lang._itemNameCache;

            if (id > 0 && cache[id] != null) {
                return cache[id];
            }

            return Terraria.Localization.LocalizedText.Empty;
        });

        Terraria.Item.Prefix.hook((original, self, pre) => {
            let result = original(self, pre);

            let allowPrefix = ItemLoader.AllowPrefix(self, pre);
            if (allowPrefix) {
                result = allowPrefix;
            }

            return result;
        });

        Terraria.Main.Initialize_AlmostEverything.hook((original, self) => {
            original(self);
            ItemLoader.InitializeRegisteredItems();
            ModProjectile.InitializeRegisteredProjectiles();
        });

        Terraria.Item['void SetDefaults(int Type, bool noMatCheck)'].hook((original, self, type, noMatCheck) => {
            original(self, type, noMatCheck);
            const item = ItemLoader.getModItem(type);
            item?.SetStaticDefaults();
            item?.SetDefaults();
            Object.assign(self, item?.Item);
        });

        Terraria.Player.UpdateArmorSets.hook((original, self, i) => {
            original(self, i);
            const armor = self.armor;
            ItemLoader.UpdateArmorSet(self, armor[0], armor[1], armor[2])
        });

        Terraria.Utils['Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)'].hook((original, tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY) => {
            const textureOverrideInfo = ModTexture.overrideFrames[tex._sourceLoadAsset];
            if (textureOverrideInfo != undefined && textureOverrideInfo != -1) {
                verticalFrames = textureOverrideInfo;
            }

            const result = original(tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY);
            return result;
        });


        Terraria.Item.GetDrawHitbox.hook((original, type, user) => {
            let result = original(type, user);
            if (type >= ItemLoader.MAX_VANILLA_ID) {
                const texture = Terraria.GameContent.TextureAssets.Item[type].Value;
                const rectangle = Microsoft.Xna.Framework.Rectangle.new();
                rectangle.X = 0;
                rectangle.Y = 0;
                rectangle.Width = texture.get_Width();
                rectangle.Height = texture.get_Height();
                result = rectangle;
            }

            return result;
        });

        Terraria.Player.UpdateEquips.hook((original, self, i) => {
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PreUpdateEquips();
            }
            original(self, i);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PostUpdateEquips();
            }

            for (let k = 0; k < 10; k++) {
                const armor = self.armor[k];
                if (self.IsAValidEquipmentSlotForIteration(k)) {
                    ItemLoader.UpdateEquip(armor, self);
                }
            }

            for (let j = 0; j < 58; j++) {
                const inventory = self.inventory[j];
                ItemLoader.UpdateInventory(inventory, self);
            }
        });

        Terraria.Player.ApplyEquipFunctional.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateAccessory(currentItem, self)
        });

        Terraria.Main.DrawPlayerItemPos.hook((original, gravityDirection, itemType) => {
            const result = original(gravityDirection, itemType);
            if (itemType >= ItemLoader.MAX_VANILLA_ID) {
                let holdoutOffset = ItemLoader.HoldoutOffset(gravityDirection, itemType);
                if (holdoutOffset) {
                    result.X = holdoutOffset.X;
                    result.Y += holdoutOffset.Y;
                }
            }

            return result;
        });

        Terraria.Item.CheckLavaDeath.hook((original, self, i) => {
            original(self, i);

            const canBurnInLava = ItemLoader.CanBurnInLava(self);
            if (canBurnInLava) {
                self.active = false;
                self.type = 0;
                self.stack = 0;
            }
        });

        Terraria.Player.ApplyEquipVanity.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateVanity(currentItem, self);
        });

        Terraria.Player.Spawn.hook((original, self, context) => {
            original(self, context);

            PlayerLoader.OnRespawn(self);
        });

        Terraria.Player.OnHit.hook((original, self, x, y, victim) => {
            original(self, x, y, victim);

            PlayerLoader.OnHitAnything(self, x, y, victim);
        });

        Terraria.Player.UpdateLifeRegen.hook((original, self) => {
            PlayerLoader.UpdateBadLifeRegen(self);
            PlayerLoader.UpdateLifeRegen(self);

            original(self);
        });

        Terraria.Player.UpdateDead.hook((original, self) => {
            original(self);

            PlayerLoader.UpdateDead(self);
        });

        Terraria.Player.ResetEffects.hook((original, self) => {
            original(self);

            PlayerLoader.ResetEffects(self);
        });

        Terraria.Player.Hooks.EnterWorld.hook((original, playerIndex) => {
            original(playerIndex);

            PlayerLoader.OnEnterWorld(playerIndex);
        });
		
		Terraria.NPC.StrikeNPC.hook((original, self, damage, knockBack, hitDirection, crit, noEffect, fromNet) => {
            const result = original(self, damage, knockBack, hitDirection, crit, noEffect, fromNet);
            ModHooks.OnHitTemp[self.whoAmI] = {hitDirection, crit, noEffect, fromNet};
            return result;
        });

        Terraria.Player.ApplyNPCOnHitEffects.hook((original, self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone) => {
            original(self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone);
            
            ItemLoader.OnHitNPC(sItem, self, Terraria.Main.npc[npcIndex], dmgDone, knockBack, ModHooks.OnHitTemp[npcIndex].crit);

            ModHooks.OnHitTemp = {};
        });

        Terraria.Main.AnglerQuestSwap.hook((original) => {
            Terraria.Main.anglerWhoFinishedToday.Clear();
            Terraria.Main.anglerQuestFinished = false;

            const flag = Terraria.NPC.downedBoss1 || Terraria.NPC.downedBoss2 || Terraria.NPC.downedBoss3 || Terraria.Main.hardMode || Terraria.NPC.downedSlimeKing || Terraria.NPC.downedQueenBee;
            let flag2 = true;
        
            while (flag2) {
                flag2 = false;
                Terraria.Main.anglerQuest = Terraria.Main.rand['int Next(int maxValue)'](Terraria.Main.anglerQuestItemNetIDs.length);
                const num = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest];
                const hardMode = Terraria.Main.hardMode;
                const crimson = Terraria.WorldGen.crimson;

                if (num === 2454 && (!hardMode || crimson)) {
                    flag2 = true;
                }
                if (num === 2457 && crimson) {
                    flag2 = true;
                }
                if (num === 2462 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2463 && (!hardMode || !crimson)) {
                    flag2 = true;
                }
                if (num === 2465 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2468 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2471 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2473 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2477 && !crimson) {
                    flag2 = true;
                }
                if (num === 2480 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2483 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2484 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2485 && crimson) {
                    flag2 = true;
                }
                if ((num === 2476 || num === 2453 || num === 2473) && !flag) {
                    flag2 = true;
                }
                if (num >= ItemLoader.MAX_VANILLA_ID) {
                    flag2 = ItemLoader.IsAnglerQuestAvailable(num);
                }
            }
        });

        Terraria.Lang.AnglerQuestChat.hook((original, turnIn) => {
            const obj = Terraria.Lang.CreateDialogSubstitutionObject(null);
            const turnInText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.TurnIn_', obj), null)['string FormatWith(object obj)'](obj);
            if (turnIn) {
                return turnInText;
            }

            const noQuestText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.NoQuest_', obj), null)['string FormatWith(object obj)'](obj);
            if (Terraria.Main.anglerQuestFinished) {
                return noQuestText;
            }

            const id = (Terraria.Main.npcChatCornerItem = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest]);
            const modQuestText = ItemLoader.AnglerChat(id);
            const vanillaQuestText = Terraria.Localization.Language['string GetTextValueWith(string key, object obj)']('AnglerQuestText.Quest_' + Terraria.ID.ItemID.Search.GetName(id), obj);

            return modQuestText ?? vanillaQuestText;
        });

        Terraria.Player.ExtractinatorUse.hook((original, self, extractType) => {
            const item = self.HeldItem;
            if (item.type < ItemLoader.MAX_VANILLA_ID) {
               return original(self, extractType);
            }
        
            const result = ModHooks.ExtractinatorTemp;
            ItemLoader.ExtractinatorUse(result, extractType);
        
            if (result.type > 0 && result.stack > 0) {
                const position = self.Center;
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)'](position.X, position.Y, 1, 1, result.type, result.stack, false, -1, false, false);
            }
        });

        // Terraria.Player.ItemCheck_ApplyUseStyle.hook((original, self, mountOffset, sItem, heldItemFrame) => {
        //     original(self, mountOffset, sItem, heldItemFrame);

        //     ItemLoader.UseStyle(sItem, self, heldItemFrame);
        // });

        Terraria.Player.ItemCheck_Shoot.hook((original, self, i, sItem, weaponDamage) => {
            if (!CombinedLoader.CanShoot(self, sItem)) {
                return;
            }

            original(self, i, sItem, weaponDamage);
        });

        Terraria.Player['void ApplyItemAnimation(Item sItem, float multiplier, int itemReuseDelay)'].hook((original, self, sItem, multiplier, itemReuseDelay) => {
            ItemLoader.UseAnimation(sItem, self);
            self.SetItemAnimation(CombinedLoader.TotalAnimationTime(sItem.useAnimation * multiplier, self, sItem));
            self.reuseDelay = sItem.reuseDelay / CombinedLoader.TotalUseSpeedMultiplier(self, sItem);
        });

        Terraria.Player['void ApplyItemAnimation(Item sItem)'].hook((original, self, sItem) => {
            if (sItem.type < ItemLoader.MAX_VANILLA_ID) {
                return original(self, sItem);
            }
        
            const ApplyItemAnimation = Terraria.Player['void ApplyItemAnimation(Item sItem, float multiplier, int itemReuseDelay)'];
        
            if (sItem.melee) {
                ApplyItemAnimation(self, sItem, self.meleeSpeed, 0);
                return;
            }

            if (sItem.summon && Terraria.ID.ItemID.Sets.SummonerWeaponThatScalesWithAttackSpeed[sItem.type]) {
                //!TODO в 1.4.3 заменить sItem.useAnimation на self.whipUseTimeMultiplier
                ApplyItemAnimation(self, sItem, self.meleeSpeed * sItem.useAnimation, 0);
                return;
            }
        
            if (sItem.createTile >= 0) {
                ApplyItemAnimation(self, sItem, self.tileSpeed, 0);
                return;
            }
        
            if (sItem.createWall >= 0) {
                ApplyItemAnimation(self, sItem, self.wallSpeed, 0);
                return;
            }
        
            ApplyItemAnimation(self, sItem, 1.0, 0);
        });

        Terraria.Player['void ApplyItemTime(Item sItem)'].hook((original, self, sItem) => {
            original(self, sItem);
        
            if (self.ItemTimeIsZero && !ItemLoader.UseItem(sItem, self)) {
                return;
            }
        
            self.SetItemTime(CombinedLoader.TotalUseTime(sItem.useTime, self, sItem));
        });

        Terraria.Player['void ApplyItemTime(Item sItem, float multiplier)'].hook((original, self, sItem, multiplier) => {
            original(self, sItem, multiplier);

            if (self.ItemTimeIsZero && !ItemLoader.UseItem(sItem, self)) {
                return;
            }

            self.SetItemTime(CombinedLoader.TotalUseTime(sItem.useTime * multiplier, self, sItem));
        });

        Terraria.Player.ItemCheck_CheckCanUse.hook((original, self, sItem) => {	
            const item = self.HeldItem;
            if (item.type < ItemLoader.MAX_VANILLA_ID || CombinedLoader.CanUseItem(self, sItem)) {
                return original(self, sItem);
            }
        });

        Terraria.Player.ItemCheck.hook((original, self, i) => {
            const item = self.HeldItem;
            if (item.type >= ItemLoader.MAX_VANILLA_ID) {
                ItemLoader.HoldItem(item, self);

                if (!self.JustDroppedAnItem) {
                    if (self.ItemTimeIsZero && self.itemAnimation > 0) {
                        if (ItemLoader.UseItem(item, self)) {
                            self['void ApplyItemTime(Item sItem)'](item);
                        }
                    }
                }

                if (i === Terraria.Main.myPlayer) {
                    if (self.itemTimeMax !== 0 && self.itemTime === self.itemTimeMax && item.consumable) {
                        if (ItemLoader.ConsumeItem(item, self)) {
                        }
                    }
                }
            }

            original(self, i);

            PlayerLoader.PostItemCheck(self);
        });

        Terraria.Player.QuickMount_GetItemToUse.hook((original, self) => {
            let item = null;
            const mountEquip = self.miscEquips[3];
            if ((mountEquip.type < ItemLoader.MAX_VANILLA_ID || mountEquip.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, mountEquip)) &&
                mountEquip.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[mountEquip.mountType]) {
                item = mountEquip;
            }

            if (item === null) {
                for (let i = 0; i < 58; i++) {
                    const inventory = self.inventory[i];
                    if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                        inventory.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[inventory.mountType]) {
                        item = inventory;
                        break;
                    }
                }
            }

            return item;
        });

        Terraria.Player.QuickMount.hook((original, self) => {
            if (self.mount.Active) {
                Terraria.Mount.Dismount(self.mount, self);
            } else {
                if (self.frozen || self.tongued || self.webbed || self.stoned || self.gravDir === -1.0 || self.dead || self.noItems) {
                    return;
                }
        
                const item = self.QuickMount_GetItemToUse();
                if (item !== null && item.mountType !== -1 && Terraria.Mount.CanMount(self.mount, item.mountType, self)) {
                    if (!self.QuickMinecartSnap()) {
                        Terraria.Mount.SetMount(self.mount, item.mountType, self, false);
                        ItemLoader.UseItem(item, self);
                        if (item.UseSound !== null) {
                            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](item.UseSound, self.Center);
                        }
                    }
                } else {
                    self.QuickMinecart();
                }
            }
        });

        Terraria.Player.RecalculateLuck.hook((original, self) => {
            let luck = PlayerLoader.Luck;

            if (PlayerLoader.PreModifyLuck(self, luck)) {
                original(self);
                luck.value = self.luck;
                for (let player of ModPlayer.RegisteredPlayers) {
                    player.player = self;
                    player.ModifyLuck(luck);
                }
                self.luck = luck.value;
            }
        });

        Terraria.Player.ItemCheck_ApplyManaRegenDelay.hook((original, self, sItem) => {
            if (CombinedLoader.GetManaCost(sItem, self) > 0) {
                self.manaRegenDelay = self.maxRegenDelay;
            }
        });

        Terraria.Player.ItemCheck_PayMana.hook((original, self, sItem, canUse) => {
            let flag = self.altFunctionUse === 2;
            let flag2 = false;

            if (sItem.type === 2795) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.TurretFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.MinionTargettingFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.type === 3006) {
                flag2 = true;
            }

            if (sItem.type !== 3269 && !CombinedLoader.CheckMana(sItem, self, -1, !flag2)) {
                canUse = false;
            }

            return canUse;
        });

        Terraria.Player.GetDyeTraderReward.hook((original, self) => {
            original(self);

            let rewardPool = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.GetDyeTraderReward(rewardPool);
            }

            const num = rewardPool[Terraria.Main.rand['int Next(int maxValue)'](rewardPool.length)];
            const item = Terraria.Item.new();
            item['void SetDefaults(int Type)'](num);
            item.stack = 3;
            item.position = self.Center;
            const item2 = self.GetItem(self.whoAmI, item, Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
            if (item2.stack > 0) {
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                (self.position.X, self.position.Y, self.width, self.height, item2.type, item2.stack, false, 0, true, false);
            }
        });

        Terraria.Player.GetAnglerReward.hook((original, self) => {
            original(self);

            let rewardItems = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.AnglerQuestReward(rewardItems);
            }
            for (let i = 0; i < rewardItems.length; i++) {
                const getItem = self.GetItem(self.whoAmI, rewardItems[i], Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
                if (getItem.stack > 0) {
                    Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                    (self.position.X, self.position.Y, self.width, self.height, getItem.type, getItem.stack, false, 0, true, false);
                }
            }
        });

        Terraria.Player.QuickMana_GetItemToUse.hook((original, self) => {
            for (let i = 0; i < 58; i++) {
                const inventory = self.inventory[i];
                if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                inventory.stack > 0 && inventory.healMana > 0 && (self.potionDelay === 0 || !inventory.potion)) {
                    return inventory;
                }
            }

            return null;
        });

        Terraria.Player.QuickMana.hook((original, self) => {
            if (self.cursed || self.CCed || self.dead || self.statMana === self.statManaMax2) {
                return;
            }

            let num = 0;
            const inventory = self.inventory;
            while (true) {
                if (num < 58) {
                    if (inventory[num].stack > 0 && inventory[num].healMana > 0 && (self.potionDelay === 0 || !inventory[num].potion)) {
                        break;
                    }

                    num++;
                    continue;
                }
                if (inventory[num].type < ItemLoader.MAX_VANILLA_ID) {
                    return original(self);
                }

                return;
            }

            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](inventory[num].UseSound, self.position);
            if (inventory[num].potion) {
                self.potionDelay = self.potionDelayTime;
                self.AddBuff(21, self.potionDelay, true, false);
            }
            ItemLoader.UseItem(inventory[num], self);

            const healLife = CombinedLoader.GetHealLife(inventory[num], self, true);
            const healMana = CombinedLoader.GetHealMana(inventory[num], self, true);
            self.statLife += healLife;
            self.statMana += healMana;

            if (self.statLife > self.statLifeMax2) {
                self.statLife = self.statLifeMax2;
            }

            if (self.statMana > self.statManaMax2) {
                self.statMana = self.statManaMax2;
            }

            if (healLife > 0 && Terraria.Main.myPlayer === self.whoAmI) {
                self.HealEffect(healLife, true);
            }

            if (healMana > 0) {
                self.AddBuff(94, Terraria.Player.manaSickTime, true, false);
                if (Terraria.Main.myPlayer === self.whoAmI) {
                    self.ManaEffect(healMana);
                }
            }

            if (ItemLoader.ConsumeItem(inventory[num], self)) {
                inventory[num].stack--;
            }

            if (inventory[num].stack <= 0) {
                Terraria.Item.TurnToAir(inventory[num]);
            }
        });

        Terraria.Player.QuickHeal_GetItemToUse.hook((original, self) => {
            const num = self.statLifeMax2 - self.statLife;
            let result = null;
            let num2 = -self.statLifeMax2;
            for (let i = 0; i < 58; i++) {
                const item = self.inventory[i];
                if ((item.type < ItemLoader.MAX_VANILLA_ID || item.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, item)) &&
                item.stack > 0 && item.potion && item.healLife > 0) {
                    let num3 = item.healLife - num;
                    if (item.type >= ItemLoader.MAX_VANILLA_ID) {
                        num3 = CombinedLoader.GetHealLife(item, self, true) - num;
                    }

                    if (item.type === 227 && num3 < 0) {
                        num3 += 30;
                        if (num3 > 0) {
                            num3 = 0;
                        }
                    }

                    if (num2 < 0) {
                        if (num3 > num2) {
                            result = item;
                            num2 = num3;
                        }
                    } else if (num3 < num2 && num3 >= 0) {
                        result = item;
                        num2 = num3;
                    }
                }
            }

            return result;
        });

        Terraria.Player.QuickHeal.hook((original, self) => {
            const item = self.QuickHeal_GetItemToUse();
            const flag = self.cursed || self.CCed || self.dead || self.statLife === self.statLifeMax2 || self.potionDelay > 0 || item === null;
            if (flag) {
                return;
            }

            while (true) {
                if (item.stack > 0 && item.healMana > 0 && (self.potionDelay === 0 || item.potion)) {
                    break;
                }

                if (item.type < ItemLoader.MAX_VANILLA_ID) {
                    return original(self);
                }

                return;
            }

            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](item.UseSound, self.position);
            if (item.potion) {
                self.potionDelay = self.potionDelayTime;
                self.AddBuff(21, self.potionDelay, true, false);
            }

            ItemLoader.UseItem(item, self);

            const healLife = CombinedLoader.GetHealLife(item, self, true);
            const healMana = CombinedLoader.GetHealMana(item, self, true);

            self.statLife += healLife;
            self.statMana += healMana;

            if (self.statLife > self.statLifeMax2) {
                self.statLife = self.statLifeMax2;
            }

            if (self.statMana > self.statManaMax2) {
                self.statMana = self.statManaMax2;
            }

            if (healLife > 0 && Terraria.Main.myPlayer === self.whoAmI) {
                self.HealEffect(healLife, true);
            }

            if (healMana > 0) {
                self.AddBuff(94, Terraria.Player.manaSickTime, true, false);
                if (Terraria.Main.myPlayer === self.whoAmI) {
                    self.ManaEffect(healMana);
                }
            }

            if (ItemLoader.ConsumeItem(item, self)) {
                item.stack--;
            }

            if (item.stack <= 0) {
                Terraria.Item.TurnToAir(item)
            }
        });

        Terraria.Player.QuickBuff.hook((original, self) => {
            const item = self.QuickBuff_PickBestFoodItem();
            const result = original(self);
            if (item !== null && item.type < ItemLoader.MAX_VANILLA_ID) {
                return result;
            }

            const flag = self.cursed || self.CCed || self.dead || self.CountBuffs() === 22;
            if (flag) {
                return;
            }
        
            let legacySoundStyle = null;

            if (item !== null) {
                legacySoundStyle = item.UseSound;
                let buffTime = item.buffTime;
                if (buffTime === 0) {
                    buffTime = 3600;
                }
        
                self.AddBuff(item.buffType, buffTime, true, false);
                if (item.consumable && ItemLoader.ConsumeItem(item, self)) {
                    item.stack--;
                    if (item.stack <= 0) {
                        item.TurnToAir();
                    }
                }
            }
        
            if (self.CountBuffs() !== 22) {
                for (let i = 0; i < 58; i++) {
                    const item = self.inventory[i];
                    if (item.type < ItemLoader.MAX_VANILLA_ID) {
                        return result;
                    }
                    if (item.stack <= 0 || item.type <= 0 || item.buffType <= 0 || item.summon) {
                        continue;
                    }
                    let buffType = item.buffType;
                    let flag = CombinedLoader.CanUseItem(self, item) && self.QuickBuff_ShouldBotherUsingThisBuff(buffType);
                    if (item.mana > 0 && flag) {
                        if (CombinedLoader.CheckMana(item, self, -1, true, true)) {
                            self.manaRegenDelay = self.maxRegenDelay;
                        }
                    }

                    if (!flag) {
                        continue;
                    }

                    ItemLoader.UseItem(item, self);
                    legacySoundStyle = item.UseSound;
                    let buffTime = item.buffTime;
                    if (buffTime === 0) {
                        buffTime = 3600;
                    }
        
                    self.AddBuff(buffType, buffTime, true, false);
                    if (item.consumable && ItemLoader.ConsumeItem(item, self)) {
                        item.stack--;
                        if (item.stack <= 0) {
                            item.TurnToAir();
                        }
                    }

                    if (self.CountBuffs() === 22) {
                        break;
                    }
                }
            }

            if (legacySoundStyle !== null) {
                Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](legacySoundStyle, self.position);
            }
        });

        Terraria.Player.UpdateDyes.hook((original, self) => {
            original(self);

            PlayerLoader.UpdateDyes(self);
        });

        // Terraria.Player.ItemCheck_ApplyHoldStyle.hook((original, self, mountOffset, sItem, heldItemFrame) => {
        //     original(self, mountOffset, sItem, heldItemFrame);
        //     ItemLoader.HoldStyle(sItem, self);
        // });

        Terraria.Chest.SetupShop.hook((original, self, type) => {
            original(self, type);

            let nextSlot = 0;
            for (let i = 0; i < 40; i++) {
                const item = self.item[i];
                if (item.type > 0) {
                    nextSlot++;
                }
            }

            NPCLoader.SetupShop(type, self, nextSlot);
        });

        Terraria.NPC.ScaleStats_ApplyMultiplayerStats.hook((original, self, numPlayers, balance, boost, bossAdjustment) => {
            original(self, numPlayers, balance, boost, bossAdjustment);

            NPCLoader.ScaleExpertStats(self, numPlayers, balance);
        });

        Terraria.NPC.HitEffect.hook((original, self, hitDirection, dmg) => {
            original(self, hitDirection, dmg);

            NPCLoader.HitEffect(self, hitDirection, dmg);
        });

        ModHooks.isInitialized = true;
    }
}