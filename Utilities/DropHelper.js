import {
    WrongDropItemArraySet,
    WrongDropItemChanceValue,
    WrongDropItemStack
} from './DropItemErrors.js';

const Terraria = {
    Main: new NativeClass('Terraria', 'Main'),
    Item: new NativeClass('Terraria', 'Item'),
    Utils: new NativeClass('Terraria', 'Utils')
};

export class DropHelper {
    /**
     * Дроп предмета с убитого НПС
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int} itemID Выпадаемый предмет
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemFromNPC(npc, itemID, minQuantity = 1, maxQuantity = 0) {
        let stack = 0;

        if (maxQuantity <= minQuantity) {
            stack = minQuantity;
        } else {
            stack = Terraria.Main.rand['int Next(int minValue, int maxValue)'](minQuantity, maxQuantity + 1);
        }

        if (stack <= 0) {
            throw new WrongDropItemStack('Минимальное количество не может быть 0', 'The minimum quantity can\'t be 0');
        }

        Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
        (npc.position.X, npc.position.Y, npc.width, npc.height, itemID, stack, false, 0, false, false);

        return stack;
    }

    /**
     * Дроп предмета с убитого НПС с определенным шансом
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int} itemID Выпадаемый предмет
     * @param {float} chance Шанс дропа - 0.25 = 25%, 0.3333 = 33.33%
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemChanceFromNPC(npc, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (chance > 1) {
            throw new WrongDropItemChanceValue('Невалидный шанс дропа. Шанс дропа не может быть больше 100%', 'Invalid drop chance. Drop chance can\'t be over 100%');
        }

        if (Terraria.Utils['float NextFloat(UnifiedRandom r)'](Terraria.Main.rand) > chance) {
            return 0;
        }

        return this.DropItemFromNPC(npc, itemID, minQuantity, maxQuantity);
    }

    /**
     * Дроп предмета с убитого НПС при выполнении условия
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemConditionFromNPC(npc, itemID, condition, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
		    return 0;
	    }

        return this.DropItemFromNPC(npc, itemID, minQuantity, maxQuantity);
    }

    /**
     * Дроп предмета с убитого НПС с определенным шансом при выполнении условия
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {int} chance Шанс дропа - 0.25 = 25%, 0.3333 = 33.33%
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemConditionChanceFromNPC(npc, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
		    return 0;
	    }

        return this.DropItemChanceFromNPC(npc, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Дроп предмета в инвентарь игрока
     * @param {Player} player Игрок
     * @param {int} itemID Выпадаемый предмет
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemToPlayer(player, itemID, minQuantity = 1, maxQuantity = 0) {
        let stack = 0;

        if (maxQuantity <= minQuantity) {
            stack = minQuantity;
        } else {
            stack = Terraria.Main.rand['int Next(int minValue, int maxValue)'](minQuantity, maxQuantity + 1);
        }

        if (stack <= 0) {
            throw new WrongDropItemStack('Минимальное количество не может быть 0', 'The minimum quantity can\'t be 0');
        }

        player.QuickSpawnItem(itemID, stack);

        return stack;
    }

    /**
     * Дроп предмета в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок
     * @param {int} itemID Выпадаемый предмет
     * @param {float} chance Шанс выдачи - 0.25 = 25%, 0.3333 = 33.33%
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemChanceToPlayer(player, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (chance > 1) {
            throw new WrongDropItemChanceValue('Невалидный шанс дропа. Шанс дропа не может быть больше 100%', 'Invalid drop chance. Drop chance can\'t be over 100%');
        }

        if (Terraria.Utils['float NextFloat(UnifiedRandom r)'](Terraria.Main.rand) > chance) {
            return 0;
        }

        return this.DropItemToPlayer(player, itemID, minQuantity, maxQuantity);
    }

    /**
     * Дроп предмета в инвентарь игрока при выполнении условия
     * @param {Player} player Игрок
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemConditionToPlayer(player, itemID, condition, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
            return 0;
        }

        return this.DropItemToPlayer(player, itemID, minQuantity, maxQuantity);
    }

    /**
     * Дроп предмета в инвентарь игрока с определенным шансом при выполнении условия
     * @param {Player} player Игрок
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {float} chance Шанс выдачи - 0.25 = 25%, 0.3333 = 33.33%
     * @param {int} [minQuantity=1] Минимальное количество предмета
     * @param {int} [maxQuantity=0] Максимальное количество предмета
     */
    static DropItemConditionChanceToPlayer(player, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
            return 0;
        }

        return this.DropItemChanceToPlayer(player, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Дроп случайного предмета в инвентарь игрока
     * @param {Player} player Игрок
     * @param {int[]} itemIDs Массив предметов
     */
    static DropItemFromSetToPlayer(player, itemIDs) {
        if (itemIDs === undefined || itemIDs.length === 0) {
            throw new WrongDropItemArraySet('Невалидный массив предметов. Массив не может быть пустой', 'Invalid items array. Array can\'t be empty');
        }

        const item = Terraria.Utils['int Next(UnifiedRandom random, IntRange range)'](Terraria.Main.rand, itemIDs.length);
        player.QuickSpawnItem(item, 1);

        return true;
    }

    /**
     * Дроп случайного предмета в инвентарь игрока при выполнении условия
     * @param {Player} player Игрок
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {int[]} itemIDs Массив предметов
     */
    static DropItemFromSetConditionToPlayer(player, condition, itemIDs) {
        return condition && this.DropItemFromSetToPlayer(player, itemIDs);
    }

    /**
     * Дроп случайных предметов в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок
     * @param {float} chance Шанс дропа
     * @param {int[]} itemIDs Массив предметов
     */
    static DropEntireSetChanceToPlayer(player, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            throw new WrongDropItemArraySet('Невалидный массив предметов. Массив не может быть пустой', 'Invalid items array. Array can\'t be empty');
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemChanceToPlayer(player, itemIDs[i], chance);
        }

        return stack;
    }

    /**
     * Дроп случайного предмета c убитого НПС
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int[]} itemIDs Массив предметов
     */
    static DropItemFromSetFromNPC(npc, itemIDs) {
        if (itemIDs === undefined || itemIDs.length === 0) {
            throw new WrongDropItemArraySet('Невалидный массив предметов. Массив не может быть пустой', 'Invalid items array. Array can\'t be empty');
        }

        const item = Terraria.Utils['int Next(UnifiedRandom random, IntRange range)'](Terraria.Main.rand, itemIDs.length);
        Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
        (npc.position.X, npc.position.Y, npc.width, npc.height, item, 1, false, 0, false, false);

        return true;
    }

    /**
     * Дроп случайного предмета c убитого НПС при выполнении условия
     * @param {NPC} npc Экземпляр класса НПС
     * @param {bool} condition Условие при котором выпадает предмет
     * @param {int[]} itemIDs Массив предметов
     */
    static DropItemFromSetConditionFromNPC(npc, condition, itemIDs) {
        return condition && this.DropItemFromSetFromNPC(npc, itemIDs);
    }

    /**
     * Дроп случайных предметов с убитого НПС с определенным шансом
     * @param {NPC} npc Экземпляр класса НПС
     * @param {float} chance Шанс дропа
     * @param {int[]} itemIDs Массив предметов
     */
    static DropEntireSetChanceFromNPC(npc, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            throw new WrongDropItemArraySet('Невалидный массив предметов. Массив не может быть пустой', 'Invalid items array. Array can\'t be empty');
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemChanceFromNPC(npc, itemIDs[i], chance);
        }

        return stack;
    }

    /**
     * Дроп набора предметов с убитого НПС
     * @param {NPC} npc Экземпляр класса НПС
     * @param {int[]} itemIDs Массив предметов
     */
    static DropFullItemSetFromNPC(npc, itemIDs) {
        if (itemIDs === undefined || itemIDs.length === 0) {
            throw new WrongDropItemArraySet('Невалидный массив предметов. Массив не может быть пустой', 'Invalid items array. Array can\'t be empty');
        }

        for (let i = 0; i < itemIDs.length; i++) {
            Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
            (npc.position.X, npc.position.Y, npc.width, npc.height, itemIDs[i], 1, false, 0, false, false);
        }

        return true;
    }

    /**
     * Дроп набора предметов с убитого НПС при выполнении нужного условия
     * @param {NPC} npc Экземпляр класса НПС
     * @param {bool} condition Условие при котором выпадает набор предметов
     * @param {int[]} itemIDs Массив предметов
     */
    static DropFullItemSetConditionFromNPC(npc, condition, itemIDs) {
        return condition && this.DropFullItemSetFromNPC(npc, itemIDs);
    }

    /**
     * Дроп набора предметов с убитого НПС с определенным шансом
     * @param {NPC} npc Экземпляр класса НПС
     * @param {float} chance Шанс дропа
     * @param {int[]} itemIDs Массив предметов
     */
    static DropFullItemSetChanceFromNPC(npc, chance, itemIDs) {
        if (chance > 1) {
            throw new WrongDropItemChanceValue('Невалидный шанс дропа. Шанс дропа не может быть больше 100%', 'Invalid drop chance. Drop chance can\'t be over 100%');
        }

        if (Terraria.Utils['float NextFloat(UnifiedRandom r)'](Terraria.Main.rand) > chance) {
            return 0;
        }

        return this.DropFullItemSetFromNPC(npc, itemIDs);
    }

    /**
     * Дроп набора предметов с убитого НПС с определенным шансом при выполнении нужного условия
     * @param {NPC} npc Экземпляр класса НПС
     * @param {bool} condition Условие при котором выпадает набор предметов
     * @param {float} chance Шанс дропа
     * @param {int[]} itemIDs Массив предметов
     */
     static DropFullItemSetConditionChanceFromNPC(npc, condition, chance, itemIDs) {
        return condition && this.DropFullItemSetChanceFromNPC(npc, itemIDs, chance);
    }
}