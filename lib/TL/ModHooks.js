import { Terraria, Microsoft } from "./ModImports.js";


import { ModPlayer } from "./ModPlayer.js";

import { GlobalTile } from "./GlobalTile.js";

import { GlobalNPC } from "./GlobalNPC.js";

import { ModTexture } from "./ModTexture.js";

import { TileData } from "./TileData.js";

import { ModProjectile } from "./ModProjectile.js";

import { ItemLoader } from "./Loaders/ItemLoader.js";

export class ModHooks {
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
        })

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
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PreUpdate();
            }
            original(self, i);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PostUpdate();
            }
        })

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
        })

        Terraria.Item.Prefix.hook((original, self, pre) => {
            let result = original(self, pre);

            let allowPrefix = ItemLoader.AllowPrefix(self, pre);
            if (allowPrefix) {
                result = allowPrefix;
            }

            return result;
        })

        Terraria.Main.Initialize_AlmostEverything.hook((original, self) => {
            original(self);
            ItemLoader.InitializeRegisteredItems();
            ModProjectile.InitializeRegisteredProjectiles();
        })

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

        Terraria.Utils["Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)"].hook((original, tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY) => {
            const textureOverrideInfo = ModTexture.overrideFrames[tex._sourceLoadAsset];
            if (textureOverrideInfo != undefined && textureOverrideInfo != -1) {
                verticalFrames = textureOverrideInfo;
            }
            let result = original(tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY);
            return result;
        })


        Terraria.Item.GetDrawHitbox.hook((original, type, user) => {
            if (type >= ItemLoader.MAX_VANILLA_ID) {
                const texture = Terraria.GameContent.TextureAssets.Item[type].Value;
                const rectangle = Microsoft.Xna.Framework.Rectangle.new();
                rectangle.X = 0;
                rectangle.Y = 0;
                rectangle.Width = Microsoft.Xna.Framework.Graphics.Texture2D["int get_Width()"](texture);
                rectangle.Height = Microsoft.Xna.Framework.Graphics.Texture2D["int get_Height()"](texture);
                return rectangle;
            }
            return original(type, user);
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

        ModHooks.isInitialized = true;
    }
}