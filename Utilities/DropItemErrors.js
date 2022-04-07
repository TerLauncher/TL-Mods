const Terraria = {
    Localization: {
        GameCulture: new NativeClass('Terraria.Localization', 'GameCulture')
    }
}

export class WrongDropItemStack extends Error {
    constructor(rusMessage, engMessage) {
        if (Terraria.Localization.GameCulture.FromCultureName(Terraria.Localization.GameCulture.CultureName.Russian).IsActive) {
            super(rusMessage);
        } else {
            super(engMessage);
        }
        this.name = 'WrongDropItemStack';
    }
}

export class WrongDropItemChanceValue extends Error {
    constructor(rusMessage, engMessage) {
        if (Terraria.Localization.GameCulture.FromCultureName(Terraria.Localization.GameCulture.CultureName.Russian).IsActive) {
            super(rusMessage);
        } else {
            super(engMessage);
        }
        this.name = 'WrongDropItemChanceValue';
    }
}

export class WrongDropItemArraySet extends Error {
    constructor(rusMessage, engMessage) {
        if (Terraria.Localization.GameCulture.FromCultureName(Terraria.Localization.GameCulture.CultureName.Russian).IsActive) {
            super(rusMessage);
        } else {
            super(engMessage);
        }
        this.name = 'WrongDropItemArraySet';
    }
}
