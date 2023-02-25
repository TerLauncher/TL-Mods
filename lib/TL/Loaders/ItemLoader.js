import { ModItem } from "../ModItem.js";

import { Terraria } from "../ModImports.js";

import { ModHooks } from "../ModHooks.js";

import { ModTexture } from "../ModTexture.js"

import { ModLocalization } from "../ModLocalization.js";

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

    static InitializeItem(item) {
        function cloneResizedSetLastItem(array, newSize, value) {
            const resized = array.cloneResized(newSize);
            resized[newSize - 1] = value;
            return resized;
        }

        function resizeArrayProperty(propertyHolder, propertyName, newSize, value) {
            propertyHolder[propertyName] = cloneResizedSetLastItem(propertyHolder[propertyName], newSize, value);
        }

        function addItemToArray(propertyHolder, propertyName, item) {
            const array = propertyHolder[propertyName];
            const arrayLength = array.length;
            propertyHolder[propertyName] = cloneResizedSetLastItem(array, arrayLength + 1, item);
        }

        function resizeTextureAssets(propertyName, newSize, value) {
            resizeArrayProperty(Terraria.GameContent.TextureAssets, propertyName, newSize, value);
        }

        function resizeTerrariaItem(propertyName, newSize, value) {
            resizeArrayProperty(Terraria.Item, propertyName, newSize, value);
        }

        item.Item = {};
        const itemName = item.constructor.name;
        item.Type = item.Item.type = item.Item.netID = tl.item.registerNew(itemName);
        tl.cheatMenu.addItemToCategory("mod", item.Type);

        addItemToArray(Terraria.Lang, "_itemNameCache", ModLocalization.getTranslationItemName(itemName));
        addItemToArray(Terraria.Lang, "_itemTooltipCache", ModLocalization.getTranslationItemTooltip(itemName));

        const itemTexture = new ModTexture(item.Texture);
        if (itemTexture.exists) {
            resizeTextureAssets("Item", item.Type + 1, itemTexture.asset.asset);
        }

        const itemHeadTexture = new ModTexture(`${item.Texture}_Head`, 20);
        if (itemHeadTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Head.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Head.Count = newSize;

            function resizeHeadSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Head.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("ArmorHead", newSize, itemHeadTexture.asset.asset);

            resizeHeadSet("FrontToBackID", -1);
            resizeHeadSet("PreventBeardDraw", false);
            resizeHeadSet("UseAltFaceHeadDraw", false);

            resizeTerrariaItem("headType", newSize, item.Type);

            item.Item.headSlot = newIndex;
        }

        const itemBodyTexture = new ModTexture(`${item.Texture}_Body`);
        if (itemBodyTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Body.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Body.Count = newSize;

            function resizeBodySet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Body.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("ArmorBodyComposite", newSize, itemBodyTexture.asset.asset);
            resizeTextureAssets("ArmorBody", newSize, itemBodyTexture.asset.asset);
            resizeTextureAssets("FemaleBody", newSize, itemBodyTexture.asset.asset);
            resizeTextureAssets("ArmorArm", newSize, itemBodyTexture.asset.asset);

            resizeBodySet("NeedsToDrawArm", true); // mb false needed
            resizeBodySet("IncludedCapeBack", -1);
            resizeBodySet("IncludedCapeBackFemale", -1);
            resizeBodySet("IncludedCapeFront", -1);
            resizeBodySet("UsesNewFramingCode", true); // mb false needed
            resizeBodySet("showsShouldersWhileJumping", false);
            resizeBodySet("shouldersAreAlwaysInTheBack", false);
            resizeBodySet("DisableHandOnAndOffAccDraw", false);
            resizeBodySet("DisableBeltAccDraw", false);

            let includeCapeFrontAndBackInfoObject = Terraria.ID.ArmorIDs.Body.Sets.IncludeCapeFrontAndBackInfo.new();
            includeCapeFrontAndBackInfoObject.backCape = -1;
            includeCapeFrontAndBackInfoObject.frontCape = -1;
            resizeBodySet("IncludeCapeFrontAndBack", includeCapeFrontAndBackInfoObject);

            resizeTerrariaItem("bodyType", newSize, item.Type);

            item.Item.bodySlot = newIndex;
        }

        const itemLegsTexture = new ModTexture(`${item.Texture}_Legs`);
        if (itemLegsTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Legs.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Legs.Count = newSize;

            function resizeLegsSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Legs.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("ArmorLeg", newSize, itemLegsTexture.asset.asset);

            resizeLegsSet("IncompatibleWithFrogLeg", false);

            resizeTerrariaItem("legType", newSize, item.Type);

            item.Item.legSlot = newIndex;
        }

        const itemGlowTexture = new ModTexture(`${item.Texture}_Glow`);
        if (itemGlowTexture.exists) {
            const newIndex = Terraria.GameContent.TextureAssets.GlowMask.length;
            const newSize = newIndex + 1;

            resizeTextureAssets("GlowMask", newSize, itemGlowTexture.asset.asset);

            item.Item.glowMask = newIndex;
        }

        const itemShieldTexture = new ModTexture(`${item.Texture}_Shield`);
        if (itemShieldTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Shield.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Shield.Count = newSize;

            resizeTextureAssets("AccShield", newSize, itemShieldTexture.asset.asset);

            item.Item.shieldSlot = newIndex;
        }

        const itemNeckTexture = new ModTexture(`${item.Texture}_Neck`);
        if (itemNeckTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Neck.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Neck.Count = newSize;

            resizeTextureAssets("AccNeck", newSize, itemNeckTexture.asset.asset);

            item.Item.neckSlot = newIndex;
        }

        const itemShoesTexture = new ModTexture(`${item.Texture}_Shoes`);
        if (itemShoesTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Shoe.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Shoe.Count = newSize;

            function resizeShoeSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Shoe.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("AccShoes", newSize, itemShoesTexture.asset.asset);

            resizeShoeSet("MaleToFemaleID", -1);

            item.Item.shoeSlot = newIndex;
        }

        const itemWaistTexture = new ModTexture(`${item.Texture}_Waist`);
        if (itemWaistTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Waist.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Waist.Count = newSize;

            function resizeWaistSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Waist.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("AccWaist", newSize, itemWaistTexture.asset.asset);

            resizeWaistSet("UsesTorsoFraming", false);
            resizeWaistSet("IsABelt", false);

            item.Item.waistSlot = newIndex;
        }

        const itemFaceTexture = new ModTexture(`${item.Texture}_Face`);
        if (itemFaceTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.Face.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.Face.Count = newSize;

            function resizeFaceSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.Face.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("AccFace", newSize, itemFaceTexture.asset.asset);

            resizeFaceSet("PreventHairDraw", false);
            resizeFaceSet("OverrideHelmet", false);
            resizeFaceSet("DrawInFaceUnderHairLayer", false);
            resizeFaceSet("DrawInFaceFlowerLayer", false);
            resizeFaceSet("DrawInFaceHeadLayer", false);
            resizeFaceSet("AltFaceHead", -1);

            item.Item.faceSlot = newIndex;
        }

        const itemHandsOnTexture = new ModTexture(`${item.Texture}_HandsOn`);
        if (itemHandsOnTexture.exists) {
            const newIndex = Terraria.ID.ArmorIDs.HandOn.Count;
            const newSize = newIndex + 1;
            Terraria.ID.ArmorIDs.HandOn.Count = newSize;

            function resizeHandOnSet(setName, lastValue) {
                resizeArrayProperty(Terraria.ID.ArmorIDs.HandOn.Sets, setName, newSize, lastValue);
            }

            resizeTextureAssets("AccHandsOnComposite", newSize, itemHandsOnTexture.asset.asset);

            resizeHandOnSet("UsesNewFramingCode", true); // false
            resizeHandOnSet("UsesOldFramingTexturesForWalking", false);

            item.Item.handOnSlot = newIndex;
        }

        if (ItemLoader.getModItem(item.Type)?.IsQuestFish()) {
            addItemToArray(Terraria.Main, "anglerQuestItemNetIDs", item.Type);
        }

        resizeArrayProperty(Terraria.ID.ItemID.Sets, "ToolTipDamageMultiplier", item.Type + 1, 1);
        resizeArrayProperty(Terraria.ID.ItemID.Sets, "CanGetPrefixes", item.Type + 1, true);
        resizeArrayProperty(Terraria.ID.ItemID.Sets, "ExtractinatorMode", item.Type + 1, -1);

        resizeTerrariaItem("cachedItemSpawnsByType", item.Type + 1, -1);

        const testItem = Terraria.Item.new();
        testItem['void .ctor()']();
        testItem['void SetDefaults(int Type)'](item.Type);

        const testItemName = `${tl.mod.uuid}_${item.constructor.name}`;

        Terraria.ID.ContentSamples.ItemsByType.Add(item.Type, testItem);
        Terraria.ID.ContentSamples.ItemPersistentIdsByNetIds.Add(item.Type, testItemName);
        Terraria.ID.ContentSamples.ItemNetIdsByPersistentIds.Add(testItemName, item.Type);

        Terraria.ID.ItemID.Search.Add(testItemName, item.Type);

        item.AddRecipes();
    }

    static AllowPrefix(self, pre) {
        let result = false;
        let itemType = self.type;
        if (itemType >= ItemLoader.MAX_VANILLA_ID) {
            let item = ItemLoader.getModItem(itemType);
            if (typeof item?.AllowPrefix === 'function') {
                result = item?.AllowPrefix(pre);
                if (pre == -3) {
                    result = true;
                }
            }
        }
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
    }

    static UpdateEquip(item, player) {
        if (item.IsAir) {
            return;
        }

        ModItem.getModItem(item.type)?.UpdateEquip(player);
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
}