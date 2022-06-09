import { ModItem } from "../ModItem.js";

import { Terraria } from "../ModImports.js";

import { ModHooks } from "../ModHooks.js";

import { ModTexture } from "../ModTexture.js"

import { ModLocalization } from "../ModLocalization.js";

import { GlobalItem } from "../GlobalItem.js";

export class ItemLoader {

    static RegisteredItems = [];

    static MAX_VANILLA_ID = Terraria.ID.ItemID.Count;

    static isModType(type) {
        return type >= ItemLoader.MAX_VANILLA_ID;
    }

    static isModItem(item) {
        return ItemLoader.isModType(item.type);
    }

    static getByName(name) {
        for (let item of ItemLoader.RegisteredItems) {
            if (item.constructor.name === name) {
                return item;
            }
        }
    }

    static getTypeByName(name) {
        return ItemLoader.getByName(name).Type;
    }

    static getModItem(type) {
        if (ItemLoader.isModType(type)) {
            for (let item of ItemLoader.RegisteredItems) {
                if (item.Type === type) {
                    return item;
                }
            }
        }
        return undefined;
    }

    static register(item) {
        ItemLoader.RegisteredItems.push(new item());
        ModHooks.initialize();
    }

    static InitializeRegisteredItems() {
        for (let item of ItemLoader.RegisteredItems) {
            ItemLoader.InitializeItem(item);
        }
    
        const SortlayerWhiteLists = Terraria.UI.ItemSorting._layerWhiteLists.entries;
        const len = SortlayerWhiteLists.length;
        for (let i = 0; i < len; i++) {
            let value = SortlayerWhiteLists[i].value;
            if (value != undefined) {
                for (let item of ItemLoader.RegisteredItems) {
                    value.Add(item.Type)
                }
            }
        }
    }

    static GeneralPrefix(item) {
        return item.maxStack === 1 && item.damage > 0 && item.ammo === 0 && !item.accessory;
    }

    static MeleePrefix(item) {
        return ModItem.isModItem(item) && this.GeneralPrefix(item) && item.melee && !item.noUseGraphic;
    }

    static WeaponPrefix(item) {
        return ModItem.isModItem(item) && this.GeneralPrefix(item) && item.melee && item.noUseGraphic;
    }

    static RangedPrefix(item) {
        return ModItem.isModItem(item) && this.GeneralPrefix(item) && item.ranged;
    }

    static MagicPrefix(item) {
        return ModItem.isModItem(item) && this.GeneralPrefix(item) && (item.magic || item.summon);
    }

    static InitializeItem(item) {
        item.Item = {};
        const itemName = item.constructor.name;
        item.Type = item.Item.type = item.Item.netID = tl.item.registerNew(itemName);

        const newItemNameTranslationIndex = Terraria.Lang._itemNameCache.length;
        Terraria.Lang._itemNameCache = Terraria.Lang._itemNameCache.cloneResized(newItemNameTranslationIndex + 1);
        Terraria.Lang._itemNameCache[newItemNameTranslationIndex] = ModLocalization.getTranslationItemName(itemName);

        const newItemTooltipTranslationIndex = Terraria.Lang._itemTooltipCache.length;
        Terraria.Lang._itemTooltipCache = Terraria.Lang._itemTooltipCache.cloneResized(newItemTooltipTranslationIndex + 1);
        Terraria.Lang._itemTooltipCache[newItemTooltipTranslationIndex] = ModLocalization.getTranslationItemTooltip(itemName);

        const itemTexture = new ModTexture(item.Texture, -1, item.FrameCount, item.TicksPerFrame);
        if (itemTexture.exists) {
            Terraria.GameContent.TextureAssets.Item[item.Type] = itemTexture.asset.asset;
        }

        const itemHeadTexture = new ModTexture(`${item.Texture}_Head`, 20);
        if (itemHeadTexture.exists) {
            const newHeadIndex = Terraria.GameContent.TextureAssets.ArmorHead.length;

            Terraria.GameContent.TextureAssets.ArmorHead = Terraria.GameContent.TextureAssets.ArmorHead.cloneResized(newHeadIndex + 1);
            Terraria.GameContent.TextureAssets.ArmorHead[newHeadIndex] = itemHeadTexture.asset.asset;

            Terraria.Item.headType = Terraria.Item.headType.cloneResized(newHeadIndex + 1);
            Terraria.Item.headType[newHeadIndex] = item.Type;

            item.Item.headSlot = newHeadIndex;

            Terraria.ID.ArmorIDs.Head.Sets.FrontToBackID = Terraria.ID.ArmorIDs.Head.Sets.FrontToBackID.cloneResized(newHeadIndex + 1);
            Terraria.ID.ArmorIDs.Head.Sets.FrontToBackID[newHeadIndex] = -1;
        }

        const itemBodyTexture = new ModTexture(`${item.Texture}_Body`);
        if (itemBodyTexture.exists) {
            const newBodyIndex = Terraria.GameContent.TextureAssets.ArmorBody.length;

            Terraria.ID.ArmorIDs.Body.Sets.UsesNewFramingCode = Terraria.ID.ArmorIDs.Body.Sets.UsesNewFramingCode.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.UsesNewFramingCode[newBodyIndex] = true;

            Terraria.GameContent.TextureAssets.ArmorBodyComposite = Terraria.GameContent.TextureAssets.ArmorBodyComposite.cloneResized(newBodyIndex + 1);
            Terraria.GameContent.TextureAssets.ArmorBodyComposite[newBodyIndex] = itemBodyTexture.asset.asset;

            Terraria.GameContent.TextureAssets.ArmorBody = Terraria.GameContent.TextureAssets.ArmorBody.cloneResized(newBodyIndex + 1);
            Terraria.GameContent.TextureAssets.ArmorBody[newBodyIndex] = itemBodyTexture.asset.asset;

            Terraria.GameContent.TextureAssets.FemaleBody = Terraria.GameContent.TextureAssets.FemaleBody.cloneResized(newBodyIndex + 1);
            Terraria.GameContent.TextureAssets.FemaleBody[newBodyIndex] = itemBodyTexture.asset.asset;

            Terraria.GameContent.TextureAssets.ArmorArm = Terraria.GameContent.TextureAssets.ArmorArm.cloneResized(newBodyIndex + 1);
            Terraria.GameContent.TextureAssets.ArmorArm[newBodyIndex] = itemBodyTexture.asset.asset;

            Terraria.Item.bodyType = Terraria.Item.bodyType.cloneResized(newBodyIndex + 1);
            Terraria.Item.bodyType[newBodyIndex] = item.Type;

            item.Item.bodySlot = newBodyIndex;

            Terraria.ID.ArmorIDs.Body.Sets.NeedsToDrawArm = Terraria.ID.ArmorIDs.Body.Sets.NeedsToDrawArm.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.NeedsToDrawArm[newBodyIndex] = true;

            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBack = Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBack.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBack[newBodyIndex] = -1;

            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBackFemale = Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBackFemale.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeBackFemale[newBodyIndex] = -1;

            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeFront = Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeFront.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.IncludedCapeFront[newBodyIndex] = -1;

            Terraria.ID.ArmorIDs.Body.Sets.showsShouldersWhileJumping = Terraria.ID.ArmorIDs.Body.Sets.showsShouldersWhileJumping.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.showsShouldersWhileJumping[newBodyIndex] = false;

            Terraria.ID.ArmorIDs.Body.Sets.shouldersAreAlwaysInTheBack = Terraria.ID.ArmorIDs.Body.Sets.shouldersAreAlwaysInTheBack.cloneResized(newBodyIndex + 1);
            Terraria.ID.ArmorIDs.Body.Sets.shouldersAreAlwaysInTheBack[newBodyIndex] = false;

            Terraria.ID.ArmorIDs.Body.Sets.IncludeCapeFrontAndBack = Terraria.ID.ArmorIDs.Body.Sets.IncludeCapeFrontAndBack.cloneResized(newBodyIndex + 1);
            let IncludeCapeFrontAndBackInfoObject = Terraria.ID.ArmorIDs.Body.Sets.IncludeCapeFrontAndBackInfo.new();
            IncludeCapeFrontAndBackInfoObject.backCape = -1;
            IncludeCapeFrontAndBackInfoObject.frontCape = -1;
            Terraria.ID.ArmorIDs.Body.Sets.IncludeCapeFrontAndBack[newBodyIndex] = IncludeCapeFrontAndBackInfoObject;
        }

        const itemLegsTexture = new ModTexture(`${item.Texture}_Legs`);
        if (itemLegsTexture.exists) {
            const newLegsIndex = Terraria.GameContent.TextureAssets.ArmorLeg.length;

            Terraria.GameContent.TextureAssets.ArmorLeg = Terraria.GameContent.TextureAssets.ArmorLeg.cloneResized(newLegsIndex + 1);
            Terraria.GameContent.TextureAssets.ArmorLeg[newLegsIndex] = itemLegsTexture.asset.asset;

            Terraria.Item.legType = Terraria.Item.legType.cloneResized(newLegsIndex + 1);
            Terraria.Item.legType[newLegsIndex] = item.Type;

            item.Item.legSlot = newLegsIndex;
        }

        const itemGlowTexture = new ModTexture(`${item.Texture}_Glow`);
        if (itemGlowTexture.exists) {
            const newGlowIndex = Terraria.GameContent.TextureAssets.GlowMask.length;
            Terraria.GameContent.TextureAssets.GlowMask = Terraria.GameContent.TextureAssets.GlowMask.cloneResized(newGlowIndex + 1);
            Terraria.GameContent.TextureAssets.GlowMask[newGlowIndex] = itemGlowTexture.asset.asset;
            item.Item.glowMask = newGlowIndex;
        }

        const itemShieldTexture = new ModTexture(`${item.Texture}_Shield`);
        if (itemShieldTexture.exists) {
            const newShieldIndex = Terraria.GameContent.TextureAssets.AccShield.length;
            Terraria.GameContent.TextureAssets.AccShield = Terraria.GameContent.TextureAssets.AccShield.cloneResized(newShieldIndex + 1);
            Terraria.GameContent.TextureAssets.AccShield[newShieldIndex] = itemShieldTexture.asset.asset;
            item.Item.shieldSlot = newShieldIndex;
        }

        const itemNeckTexture = new ModTexture(`${item.Texture}_Neck`);
        if (itemNeckTexture.exists) {
            const newNeckIndex = Terraria.GameContent.TextureAssets.AccNeck.length;
            Terraria.GameContent.TextureAssets.AccNeck = Terraria.GameContent.TextureAssets.AccNeck.cloneResized(newNeckIndex + 1);
            Terraria.GameContent.TextureAssets.AccNeck[newNeckIndex] = itemNeckTexture.asset.asset;
            item.Item.neckSlot = newNeckIndex;
        }

        const itemShoesTexture = new ModTexture(`${item.Texture}_Shoes`);
        if (itemShoesTexture.exists) {
            const newShoesIndex = Terraria.GameContent.TextureAssets.AccShoes.length;
            Terraria.GameContent.TextureAssets.AccShoes = Terraria.GameContent.TextureAssets.AccShoes.cloneResized(newShoesIndex + 1);
            Terraria.GameContent.TextureAssets.AccShoes[newShoesIndex] = itemShoesTexture.asset.asset;
            item.Item.shoeSlot = newShoesIndex;
        }

        const itemWaistTexture = new ModTexture(`${item.Texture}_Waist`);
        if (itemWaistTexture.exists) {
            const newWaistIndex = Terraria.GameContent.TextureAssets.AccWaist.length;
            Terraria.GameContent.TextureAssets.AccWaist = Terraria.GameContent.TextureAssets.AccWaist.cloneResized(newWaistIndex + 1);
            Terraria.GameContent.TextureAssets.AccWaist[newWaistIndex] = itemWaistTexture.asset.asset;
            item.Item.waistSlot = newWaistIndex;

            Terraria.ID.ArmorIDs.Waist.Sets.UsesTorsoFraming = Terraria.ID.ArmorIDs.Waist.Sets.UsesTorsoFraming.cloneResized(newWaistIndex + 1);
            Terraria.ID.ArmorIDs.Waist.Sets.UsesTorsoFraming[newWaistIndex] = false;
        }

        if (ItemLoader.getModItem(item.Type)?.IsQuestFish()) {
            const newAnglerQuestItemNetIDs = Terraria.Main.anglerQuestItemNetIDs.length;
            Terraria.Main.anglerQuestItemNetIDs = Terraria.Main.anglerQuestItemNetIDs.cloneResized(newAnglerQuestItemNetIDs + 1);
            Terraria.Main.anglerQuestItemNetIDs[newAnglerQuestItemNetIDs] = item.Type;
        }

        

        Terraria.ID.ItemID.Sets.ToolTipDamageMultiplier[item.Type] = 1;
        Terraria.ID.ItemID.Sets.CanGetPrefixes[item.Type] = true;
        Terraria.Item.cachedItemSpawnsByType[item.Type] = -1;
        Terraria.ID.ItemID.Sets.ExtractinatorMode[item.Type] = -1;

        const testItem = Terraria.Item.new();
        testItem['void .ctor()']();
        testItem['void SetDefaults(int Type)'](item.Type);

        const testItemName = `${tl.mod.uuid}_${item.constructor.name}`;

        Terraria.ID.ContentSamples.ItemsByType.Add(item.Type, testItem);
        Terraria.ID.ContentSamples.ItemPersistentIdsByNetIds.Add(item.Type, testItemName);
        Terraria.ID.ContentSamples.ItemNetIdsByPersistentIds.Add(testItemName, item.Type);

        Terraria.ID.ItemID.Search.Add(testItemName, item.Type);

        item.SetStaticDefaults();
        item.AddRecipes();
    }

    static AllowPrefix(item, pre) {
        let result = true;
        result &= ModItem.getModItem(item.type)?.AllowPrefix(pre);
        return result;
    }

    static HoldoutOffset(gravityDirection, itemType) {
        let result = {};
    
        const modItem = ItemLoader.getModItem(itemType);
        const modOffset = modItem?.HoldoutOffset();
    
        if (modOffset) {
            result.X = modOffset.X;
            result.Y = gravityDirection * modOffset.Y;
        }
    
        return result;
    }

    static UpdateAccessory(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UpdateAccessory(player);

        for (let globalItem of GlobalItem.RegisteredItem) {
            globalItem.UpdateAccessory(item, player);
        }
    }

    static UpdateArmorSet(player, head, body, legs) {
        const headItem = ModItem.getModItem(head.type);
        const bodyItem = ModItem.getModItem(body.type);
        const legsItem = ModItem.getModItem(legs.type);

        if (headItem?.IsArmorSet(headItem, bodyItem, legsItem)) {
            headItem?.UpdateArmorSet(player);
        }

        if (bodyItem?.IsArmorSet(headItem, bodyItem, legsItem)) {
            bodyItem?.UpdateArmorSet(player);
        }

        if (legsItem?.IsArmorSet(headItem, bodyItem, legsItem)) {
            legsItem?.UpdateArmorSet(player);
        }
    }

    static CanBurnInLava(item) {
        const canBurnInLava = null;
        return canBurnInLava ?? ModItem.getModItem(item.type)?.CanBurnInLava();
    }

    static UpdateInventory(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UpdateInventory(player);

        for (let globalItem of GlobalItem.RegisteredItem) {
            globalItem.UpdateInventory(item, player);
        }
    }

    static UpdateEquip(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UpdateEquip(player);

        for (let globalItem of GlobalItem.RegisteredItem) {
            globalItem.UpdateEquip(item, player);
        }
    }

    static UpdateVanity(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UpdateVanity(player);
    }

    static OnHitNPC(item, player, target, damage, knockBack, crit) {
        ModItem.getModItem(item.type)?.OnHitNPC(player, target, damage, knockBack, crit);
    }

    static AnglerChat(type) {
        let quest = {};

        const modItem = ItemLoader.getModItem(type);
        const modQuest = modItem?.AnglerQuestChat();

        if (modQuest) {
            quest.chat = modQuest.chat;
            quest.catchLocation = modQuest.catchLocation;

            if (quest.chat.length === 0 || quest.catchLocation.length === 0) {
                return null;
            }

            return `${quest.chat}\n\n(${quest.catchLocation})`;
        }
    }

    static IsAnglerQuestAvailable(itemID) {
        return !ModItem.getModItem(itemID)?.IsAnglerQuestAvailable();
    }

    static ExtractinatorUse(result, extractType) {
        result.type = 0;
        result.stack = 0;

        ModItem.getModItem(extractType)?.ExtractinatorUse(result);
    }

    static UseItem(item, player) {
        if (item.IsAir) {
            return false;
        }

        const result = null;
        return result ?? ModItem.getModItem(item.type)?.UseItem(player);
    }

    static UseStyle(item, player, heldItemFrame) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UseStyle(player, heldItemFrame);
    }

    static CanShoot(item, player) {
        return ModItem.getModItem(item.type)?.CanShoot(player) ?? true;
    }

    static UseTimeMultiplier(item, player) {
        if (item.IsAir) {
            return 1.0;
        }

        let multiplier = ModItem.getModItem(item.type)?.UseTimeMultiplier(player) ?? 1.0;
        return multiplier;
    }

    static UseSpeedMultiplier(item, player) {
        if (item.IsAir) {
            return 1.0;
        }

        let multiplier = ModItem.getModItem(item.type)?.UseSpeedMultiplier(player) ?? 1.0;
        return multiplier;
    }

    static UseAnimationMultiplier(item, player) {
        if (item.IsAir) {
            return 1.0;
        }

        let multiplier = ModItem.getModItem(item.type)?.UseAnimationMultiplier(player) ?? 1.0;
        return multiplier;
    }

    static UseAnimation(item, player) {
        ModItem.getModItem(item.type)?.UseAnimation(player);
    }

    static HoldItem(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.HoldItem(player);
    }

    static CanUseItem(item, player) {
        let flag = true;

        flag &= ModItem.getModItem(item.type)?.CanUseItem(player);
        return flag;
    }

    static OnConsumeItem(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.OnConsumeItem(player);
    }

    static ConsumeItem(item, player) {
        if (item.IsAir) {
            return true;
        }

        if (!ModItem.getModItem(item.type)?.ConsumeItem(player)) {
            return false;
        }

        this.OnConsumeItem(item, player);
        return true;
    }

    static ModifyManaCost(item, player, modifyMana) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.ModifyManaCost(player, modifyMana);
    }

    static OnConsumeMana(item, player, manaConsumed) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.OnConsumeMana(player, manaConsumed);
    }

    static OnMissingMana(item, player, neededMana) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.OnMissingMana(player, neededMana);
    }

    static GetHealLife(item, player, quickHeal, healValue) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.GetHealLife(player, quickHeal, healValue);
    }

    static GetHealMana(item, player, quickHeal, healValue) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.GetHealMana(player, quickHeal, healValue);
    }

    
    static HoldStyle(item, player, heldItemFrame) {
        if (item.IsAir || player.pulley || player.itemAnimation > 0) {
            return;
        }

        ModItem.getModItem(item.type)?.HoldStyle(player, heldItemFrame);
    }

    static ChoosePrefix(item, rand) {
        const pre = ModItem.getModItem(item.type)?.ChoosePrefix(rand);
        if (pre > 0) {
            return pre;
        }

        return -1;
    }

    static Shoot(item, player, position, velocity, type, damage, knockback, defaultResult = true) {
        return defaultResult && (ModItem.getModItem(item.type)?.Shoot(player, position, velocity, type, damage, knockback) ?? true);
    }

    static OpenVanillaBag(context, player, arg) {
        for (let globalItem of GlobalItem.RegisteredItem) {
            globalItem.OpenVanillaBag(context, player, arg);
        }
    }
}