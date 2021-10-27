## Готовые фрагменты кода TL Pro для Visual Studio Code 

<a href='https://hostingkartinok.com/show-image.php?id=3cc349b2a1ef6b1358944d08b425a880' title='imagehosting'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2021/10/3cc349b2a1ef6b1358944d08b425a880.gif' alt='Snippet.gif'  /></a>

## Установка

Вставьте файл по данному пути `C:\Users\%USERNAME%\AppData\Roaming\Code\User\snippets`

## Использование

Готовые фрагменты кода, которые помогут вам более продуктивно работать с разработкой модов TL Pro.

Этот файл содержит набор полезных фрагментов кода.

Вот полный список всех фрагментов:

## Classes

### [tlcClass] Terraria.Class

```javascript
const VariableName = new NativeClass('Namespace', 'ClassName');
```

### [tlcMain] Terraria.Main

```javascript
const Main = new NativeClass('Terraria', 'Main');
```

### [tlcPlayer] Terraria.Player

```javascript
const Player = new NativeClass('Terraria', 'Player');
```

### [tlcNPC] Terraria.NPC

```javascript
const NPC = new NativeClass('Terraria', 'NPC');
```

### [tlcNPCID] Terraria.ID.NPCID

```javascript
const NPCID = new NativeClass('Terraria.ID', 'NPCID');
```

### [tlcLang] Terraria.Lang

```javascript
const Lang = new NativeClass('Terraria', 'Lang');
```

### [tlcChest] Terraria.Chest

```javascript
const Chest = new NativeClass('Terraria', 'Chest');
```

### [tlcItem] Terraria.Item

```javascript
const Item = new NativeClass('Terraria', 'Item');
```

### [tlcItemID] Terraria.ID.ItemID

```javascript
const ItemID = new NativeClass('Terraria.ID', 'ItemID');
```

### [tlcRecipe] Terraria.Recipe

```javascript
const Recipe = new NativeClass('Terraria', 'Recipe');
```

### [tlcLanguage] Terraria.Localization.Language

```javascript
const Language = new NativeClass('Terraria.Localization', 'Language');
```

### [tlcLocalizedText] Terraria.Localization.LocalizedText

```javascript
const LocalizedText = new NativeClass('Terraria.Localization', 'LocalizedText');
```

### [tlcGameCulture] Terraria.Localization.GameCulture

```javascript
const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');
```

### [tlcWorldGen] Terraria.WorldGen

```javascript
const WorldGen = new NativeClass('Terraria', 'WorldGen');
```

### [tlcDD2Event] Terraria.GameContent.Events.DD2Event

```javascript
const DD2Event = new NativeClass('Terraria.GameContent.Events', 'DD2Event');
```

### [tlcProjectile] Terraria.Projectile

```javascript
const Projectile = new NativeClass('Terraria', 'Projectile');
```

### [tlcProjectileID] Terraria.ID.ProjectileID

```javascript
const ProjectileID = new NativeClass('Terraria.ID', 'ProjectileID');
```

### [tlcCollision] Terraria.Collision

```javascript
const Collision = new NativeClass('Terraria', 'Collision');
```

### [tlcGameShaders] Terraria.Graphics.Shaders.GameShaders

```javascript
const GameShaders = new NativeClass('Terraria.Graphics.Shaders', 'GameShaders');
```

### [tlcRectangle] Microsoft.Xna.Framework.Rectangle

```javascript
const Rectangle = new NativeClass('Microsoft.Xna.Framework', 'Rectangle');
```

### [tlcVector2] Microsoft.Xna.Framework.Vector2

```javascript
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
```

### [tlcColor] Microsoft.Xna.Framework.Graphics.Color

```javascript
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
```

### [tlcChatCommandProcessor] Terraria.Chat.ChatCommandProcessor

```javascript
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
```

### [tlcCombatText] Terraria.CombatText

```javascript
const CombatText = new NativeClass('Terraria', 'CombatText');
```

### [tlcNetMessage] Terraria.NetMessage

```javascript
const NetMessage = new NativeClass('Terraria', 'NetMessage');
```

### [tlcRecipeGroup] Terraria.RecipeGroup

```javascript
const RecipeGroup = new NativeClass('Terraria', 'RecipeGroup');
```

### [tlcTile] Terraria.Tile

```javascript
const Tile = new NativeClass('Terraria', 'Tile');
```

### [tlcAmmoID] Terraria.ID.AmmoID

```javascript
const AmmoID = new NativeClass('Terraria.ID', 'AmmoID');
```

### [tlcBuffID] Terraria.ID.BuffID

```javascript
const BuffID = new NativeClass('Terraria.ID', 'BuffID');
```

### [tlcDustID] Terraria.ID.DustID

```javascript
const DustID = new NativeClass('Terraria.ID', 'DustID');
```

### [tlcPrefixID] Terraria.ID.PrefixID

```javascript
const PrefixID = new NativeClass('Terraria.ID', 'PrefixID');
```

### [tlcTileID] Terraria.ID.TileID

```javascript
const TileID = new NativeClass('Terraria.ID', 'TileID');
```

### [tlcWallID] Terraria.ID.WallID

```javascript
const WallID = new NativeClass('Terraria.ID', 'WallID');
```

### [tlcLanguageManager] Terraria.Localization.LanguageManager

```javascript
const LanguageManager = new NativeClass('Terraria.Localization', 'LanguageManager');
```

## Hooks

### [tlhSetupRecipes] Recipe.SetupRecipes()

```javascript
Recipe.SetupRecipes.hook((original) => {
	original();
});
```

### [tlhProcessIncomingMessage] ChatCommandProcessor.ProcessIncomingMessage()

```javascript
ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);
});
```

### [tlhScaleStats_ApplyGameMode] NPC.ScaleStats_ApplyGameMode()

```javascript
NPC.ScaleStats_ApplyGameMode.hook((original, self, gameModeData) => {
	original(self, gameModeData);
});
```

### [tlhScaleStats_UseStrengthMultiplier] NPC.ScaleStats_UseStrengthMultiplier()

```javascript
NPC.ScaleStats_UseStrengthMultiplier.hook((original, self, strength) => {
	original(self, strength);
});
```

### [tlhSpawnNPC] NPC.SpawnNPC()

```javascript
NPC.SpawnNPC.hook((original) => {
	original();
});
```

### [tlhItemCheck] Player.ItemCheck()

```javascript
Player.ItemCheck.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhUpdate] Player.Update()

```javascript
Player.Update.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhDamage] Projectile.Damage()

```javascript
Projectile.Damage.hook((original, self) => {
	original(self);
});
```

### [tlhUpdate] Projectile.Update()

```javascript
Projectile.Update.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhItemCheck_MeleeHitNPCs] Player.ItemCheck_MeleeHitNPCs()

```javascript
Player.ItemCheck_MeleeHitNPCs.hook((original, self, sItem, itemRectangle, originalDamage, knockBack) => {
	original(self, sItem, itemRectangle, originalDamage, knockBack);
});
```

### [tlhOpenFishingCrate] Player.OpenFishingCrate()

```javascript
Player.OpenFishingCrate.hook((original, self, crateItemID) => {
	original(self, crateItemID);
});
```

### [tlhNPCLoot_DropItems] NPC.NPCLoot_DropItems()

```javascript
NPC.NPCLoot_DropItems.hook((original, self, closestPlayer) => {
	original(self, closestPlayer);
});
```

### [tlhUpdateBiomes] Player.UpdateBiomes()

```javascript
Player.UpdateBiomes.hook((original, self) => {
	original(self);
});
```

### [tlhUpdateEquips] Player.UpdateEquips()

```javascript
Player.UpdateEquips.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhStatusNPC] Projectile.StatusNPC()

```javascript
Projectile.StatusNPC.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhStatusPlayer] Projectile.StatusPlayer()

```javascript
Projectile.StatusPlayer.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhAffixName] Item.AffixName()

```javascript
Item.AffixName.hook((original, self) => {
	original(self);
});
```

### [tlhSetupShop] Chest.SetupShop()

```javascript
Chest.SetupShop.hook((original, self, type) => {
	original(self, type);
});
```

### [tlhUpdateArmorSets] Player.UpdateArmorSets()

```javascript
Player.UpdateArmorSets.hook((original, self, i) => {
	original(self, i);
});
```

### [tlhApplyEquipFunctional] Player.ApplyEquipFunctional()

```javascript
Player.ApplyEquipFunctional.hook((original, self, itemSlot, currentItem) => {
	original(self, itemSlot, currentItem);
});
```

### [tlhSetArmorEffectVisuals] Player.SetArmorEffectVisuals()

```javascript
Player.SetArmorEffectVisuals.hook((original, self, drawPlayer) => {
	original(self, drawPlayer);
});
```

### [tlhUpdateDead] Player.UpdateDead()

```javascript
Player.UpdateDead.hook((original, self) => {
	original(self);
});
```

### [tlhUpdateLifeRegen] Player.UpdateLifeRegen()

```javascript
Player.UpdateLifeRegen.hook((original, self) => {
	original(self);
});
```