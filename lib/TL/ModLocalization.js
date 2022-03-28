import { ModHooks } from "./ModHooks.js";
import { Terraria } from "./ModImports.js";

export class ModLocalization {
    static register(localization) {
        for (let key of Object.keys(localization)) {
            tl.translation.add(key, tl.file.read(localization[key]));
        }
        ModHooks.initialize();
    }

    static getTranslationProjectileName(projectileName) {
        return this.getTranslation(`ProjectileName.${projectileName}`);
    }

    static getTranslationItemName(itemName) {
        return this.getTranslation(`ItemName.${itemName}`);
    }

    static getTranslationItemTooltip(itemName) {
        return Terraria.UI.ItemTooltip.FromLanguageKey(ModLocalization.getLanguageID(), `ItemTooltip.${itemName}`);
    }

    static getTranslation(key) {
        return Terraria.Localization.Language.GetText(key);
    }

    static getTranslationString(key) {
        return Terraria.Localization.Language['string GetTextValue(string key)'](key);
    }

    static getLanguageID() {
        return Terraria.Localization.Language.ActiveCulture.CultureInfo.cultureID;
    }
}