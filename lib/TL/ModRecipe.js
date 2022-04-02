import { Terraria } from "./ModImports.js";

export class ModRecipe {
    constructor() {
        this.numIngredients = 0;
        this.numTiles = 0;
    }

    SetResult(itemID, stack = 1) {
        Terraria.Recipe.currentRecipe.createItem['void SetDefaults(int Type)'](itemID);
        Terraria.Recipe.currentRecipe.createItem.stack = stack;
        tl.log(`SetResult: itemID: ${itemID}, stack: ${stack}`);
        return this;
    }

    AddIngredient(itemID, stack = 1) {
        if (this.numIngredients == 14) {
            return tl.log('Recipe already has maximum number of ingredients. 14 is the max.')
        }
        Terraria.Recipe.currentRecipe.requiredItem[this.numIngredients]['void SetDefaults(int Type)'](itemID);
        Terraria.Recipe.currentRecipe.requiredItem[this.numIngredients].stack = stack;
        this.numIngredients++;
        tl.log(`AddIngredient: index: ${this.numIngredients}, itemID: ${itemID}, stack: ${stack}`);
        return this;
    }

    AddTile(tileId) {
        if (this.numTiles == 14) {
            return tl.log('Recipe already has maximum number of tiles. 14 is the max.');
        }
        Terraria.Recipe.currentRecipe.requiredTile[this.numTiles] = tileId;
        this.numTiles++;
        tl.log(`AddTile: index: ${this.numTiles}, tileId: ${tileId}`);
        return this;
    }

    Register() {
        const newRecipeIndex = Terraria.Main.recipe.length;
        Terraria.Main.recipe = Terraria.Main.recipe.cloneResized(newRecipeIndex + 1);
        Terraria.Main.recipe[newRecipeIndex] = Terraria.Recipe.currentRecipe;

        const newAvailableRecipeIndex = Terraria.Main.availableRecipe.length;
        Terraria.Main.availableRecipe = Terraria.Main.recipe.cloneResized(newAvailableRecipeIndex + 1);

        Terraria.Recipe.AddRecipe();
        tl.log(`Register: newRecipeIndex: ${newRecipeIndex}, newAvailableRecipeIndex: ${newAvailableRecipeIndex}`);
        return this;
    }
}