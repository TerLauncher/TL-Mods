export const Terraria = {
    Player: new NativeClass('Terraria', 'Player'),
    Item: new NativeClass('Terraria', 'Item'),
    Projectile: new NativeClass('Terraria', 'Projectile'),
    NPC: new NativeClass('Terraria', 'NPC'),
    Main: new NativeClass('Terraria', 'Main'),
    WorldGen: new NativeClass('Terraria', 'WorldGen'),
    Lang: new NativeClass('Terraria', 'Lang'),
    Recipe: new NativeClass('Terraria', 'Recipe'),
    Tile: new NativeClass('Terraria', 'Tile'),
    TileData: new NativeClass('Terraria', 'TileData'),
    Utils: new NativeClass('Terraria', 'Utils'),
    Mount : new NativeClass('Terraria', 'Mount'),
    GetItemSettings: new NativeClass('Terraria', 'GetItemSettings'),
    ID: {
        NPCID: new NativeClass('Terraria.ID', 'NPCID'),
        SoundID: new NativeClass('Terraria.ID', 'SoundID'),
        ItemID: new NativeClass('Terraria.ID', 'ItemID'),
        TileID: new NativeClass('Terraria.ID', 'TileID'),
        ArmorIDs: new NativeClass('Terraria.ID', 'ArmorIDs'),
        ProjectileID: new NativeClass('Terraria.ID', 'ProjectileID'),
        ContentSamples: new NativeClass('Terraria.ID', 'ContentSamples'),
        AmmoID: new NativeClass('Terraria.ID', 'AmmoID'),
        MountID: new NativeClass('Terraria.ID', 'MountID'),
        ItemUseStyleID: new NativeClass('Terraria.ID', 'ItemUseStyleID'),
        ItemHoldStyleID: new NativeClass('Terraria.ID', 'ItemHoldStyleID')
    },
    Localization: {
        Language: new NativeClass('Terraria.Localization', 'Language'),
        LocalizedText: new NativeClass('Terraria.Localization', 'LocalizedText')
    },
    UI: {
        ItemTooltip: new NativeClass("Terraria.UI", "ItemTooltip"),
        ItemSorting: new NativeClass("Terraria.UI", "ItemSorting")
    },
    GameContent: {
        TextureAssets: new NativeClass('Terraria.GameContent', 'TextureAssets')
    },
    DataStructures: {
        PlayerDrawSet: new NativeClass('Terraria.DataStructures', 'PlayerDrawSet')
    },
    Audio: {
        SoundEngine : new NativeClass('Terraria.Audio', 'SoundEngine')
    },
}

export const Microsoft = {
    Xna: {
        Framework: {
            Vector2: new NativeClass('Microsoft.Xna.Framework', 'Vector2'),
            Rectangle: new NativeClass('Microsoft.Xna.Framework', 'Rectangle'),
            Graphics: {
                Texture2D: new NativeClass('Microsoft.Xna.Framework.Graphics', 'Texture2D'),
                SpriteEffects: new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteEffects'),
                Color: new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color')
            }
        }
    }
}

export const ReLogic = {
    Content: {
        Asset: new NativeClass('ReLogic.Content', 'Asset`1'),
        AssetState: new NativeClass('ReLogic.Content', 'AssetState')
    }
}

export const System = {
    Nullable: new NativeClass('System', 'Nullable`1')
}