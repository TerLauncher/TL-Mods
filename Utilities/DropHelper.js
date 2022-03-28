const Terraria = {
    Main: new NativeClass('Terraria', 'Main'),
    Item: new NativeClass('Terraria', 'Item'),
    Utils: new NativeClass('Terraria', 'Utils')
};

export class DropHelper {
    /**
     * Выпадаемый предмет с убитого НПС
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemFromNPC(npc, itemID, minQuantity = 1, maxQuantity = 0) {
        let stack = 0;

        if (maxQuantity <= minQuantity) {
            stack = minQuantity;
        } else {
            stack = Terraria.Main.rand['int Next(int minValue, int maxValue)'](minQuantity, maxQuantity + 1);
        }

        if (stack <= 0) {
            return 0;
        }

        Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
        (npc.position.X, npc.position.Y, npc.width, npc.height, itemID, stack, false, 0, false, false);

        return stack;
    }

    /**
     * Выпадаемый предмет с убитого НПС с определенным шансом
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {float} chance Шанс выпасть
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemFloatChanceFromNPC(npc, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (Terraria.Utils['float NextFloat(UnifiedRandom r)'](Terraria.Main.rand) > chance) {
            return 0;
        }

        return this.DropItemFromNPC(npc, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выпадаемый предмет с убитого НПС с определенным шансом
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {int} chance Шанс выпасть
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemFixedChanceFromNPC(npc, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (Terraria.Main.rand['int Next(int maxValue)'](chance) !== 0) {
            return 0;
        }

        return this.DropItemFromNPC(npc, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выпадаемый предмет с убитого НПС при выполнении нужного условия
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадет предмет
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemConditionFromNPC(npc, itemID, condition, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
		    return 0;
	    }

        return this.DropItemFromNPC(npc, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выпадаемый предмет с убитого НПС с определенным шансом при выполнении нужного условия
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадет предмет
     * @param {int} chance Шанс выпасть
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemConditionFixedChanceFromNPC(npc, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
		    return 0;
	    }

        return this.DropItemFixedChanceFromNPC(npc, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Выпадаемый предмет с убитого НПС с определенным шансом при выполнении нужного условия
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} itemID Выпадаемый предмет
     * @param {bool} condition Условие при котором выпадет предмет
     * @param {float} chance Шанс выпасть
     * @param {int} minQuantity Минимальное количество выпадаемого предмета
     * @param {int} maxQuantity Максимальное количество выпадаемого предмета
     * @returns {int} Общее количество выпадаемого предмета
     */
    static DropItemConditionFloatChanceFromNPC(npc, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
		    return 0;
	    }

        return this.DropItemFloatChanceFromNPC(npc, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Выдача предмета в инвентарь игрока
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemToPlayer(player, itemID, minQuantity = 1, maxQuantity = 0) {
        let stack = 0;

        if (maxQuantity <= minQuantity) {
            stack = minQuantity;
        } else {
            stack = Terraria.Main.rand['int Next(int minValue, int maxValue)'](minQuantity, maxQuantity + 1);
        }

        if (stack <= 0) {
            return 0;
        }

        player.QuickSpawnItem(itemID, stack);

        return stack;
    }

    /**
     * Выдача предмета в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {int} chance Шанс выдачи
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemFixedChanceToPlayer(player, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (Terraria.Main.rand['int Next(int maxValue)'](chance) !== 0) {
            return 0;
        }

        return this.DropItemToPlayer(player, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выдача предмета в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {float} chance Шанс выдачи
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemFloatChanceToPlayer(player, itemID, chance, minQuantity = 1, maxQuantity = 0) {
        if (Terraria.Utils['float NextFloat(UnifiedRandom r)'](Terraria.Main.rand) > chance) {
            return 0;
        }

        return this.DropItemToPlayer(player, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выдача предмета в инвентарь игрока при выполнении нужного условия
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {bool} condition Условие при котором будет происходить выдача предмета
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemConditionToPlayer(player, itemID, condition, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
            return 0;
        }

        return this.DropItemToPlayer(player, itemID, minQuantity, maxQuantity);
    }

    /**
     * Выдача предмета в инвентарь игрока с определенным шансом при выполнении нужного условия
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {bool} condition Условие при котором будет происходить выдача предмета
     * @param {float} chance Шанс выдачи
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemConditionFloatChanceToPlayer(player, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
            return 0;
        }

        return this.DropItemFloatChanceToPlayer(player, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Выдача предмета в инвентарь игрока с определенным шансом при выполнении нужного условия
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} itemID Выдаваемый предмет
     * @param {bool} condition Условие при котором будет происходить выдача предмета
     * @param {int} chance Шанс выдачи
     * @param {int} minQuantity Минимальное количество выдаваемого предмета
     * @param {int} maxQuantity Максимальное количество выдаваемого предмета
     * @returns {int} Общее количество выдаваемого предмета
     */
    static DropItemConditionFixedChanceToPlayer(player, itemID, condition, chance, minQuantity = 1, maxQuantity = 0) {
        if (!condition) {
            return 0;
        }

        return this.DropItemFixedChanceToPlayer(player, itemID, chance, minQuantity, maxQuantity);
    }

    /**
     * Выдача случайного предмета с массива предметов в инвентарь игрока
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {bool} Можно ли выдать игроку случайный предмет с массива предметов
     */
    static DropItemFromSetToPlayer(player, itemIDs) {
        if (itemIDs === undefined || itemIDs.length === 0) {
            return false;
        }

        let item = Terraria.Utils['int Next(UnifiedRandom random, IntRange range)'](Terraria.Main.rand, itemIDs.length);
        player.QuickSpawnItem(item, 1);

        return true;
    }

    /**
     * Выдача случайного предмета с массива предметов в инвентарь игрока при выполнении нужного условия
     * @param {Player} player Игрок, которому выдается предмет
     * @param {bool} condition Условие при котором будет происходить выдача предметов
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {bool} Можно ли выдать игроку случайный предмет с массива предметов при выполнении нужного условия
     */
    static DropItemFromSetConditionToPlayer(player, condition, itemIDs) {
        return condition && this.DropItemFromSetToPlayer(player, itemIDs);
    }

    /**
     * Выдача набора случайных предметов с массива предметов в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок, которому выдается предмет
     * @param {float} chance Шанс выдачи
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {int} Общее количество выдаваемых предметов с массива предметов
     */
    static DropEntireSetFloatChanceToPlayer(player, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            return 0;
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemFloatChanceToPlayer(player, itemIDs[i], chance);
        }

        return stack + (this.DropItemFromSetConditionToPlayer(player, stack <= 0, itemIDs) ? 1 : 0);
    }

    /**
     * Выдача набора случайных предметов с массива предметов в инвентарь игрока с определенным шансом
     * @param {Player} player Игрок, которому выдается предмет
     * @param {int} chance Шанс выдачи
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {int} Общее количество выдаваемых предметов с массива предметов
     */
    static DropEntireSetFixedChanceToPlayer(player, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            return 0;
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemFixedChanceToPlayer(player, itemIDs[i], chance);
        }

        return stack + (this.DropItemFromSetConditionToPlayer(player, stack <= 0, itemIDs) ? 1 : 0);
    }

    /**
     * Выпадение случайного предмета c массива предметов c убитого НПС
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int[]} itemIDs Массив выпадаемых предметов
     * @returns {bool} Может ли выпасть случайный предмет c массива предметов с убитого НПС
     */
    static DropItemFromSetFromNPC(npc, itemIDs) {
        if (itemIDs === undefined || itemIDs.length === 0) {
            return false;
        }

        let item = Terraria.Utils['int Next(UnifiedRandom random, IntRange range)'](Terraria.Main.rand, itemIDs.length);
        Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
        (npc.position.X, npc.position.Y, npc.width, npc.height, item, 1, false, 0, false, false);

        return true;
    }

    /**
     * Выпадение случайного предмета с массива предметов с убитого НПС при выполнении нужного условия
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {bool} condition Условие при котором выпадет предмет
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {bool} Может ли выпасть случайный предмет c массива предметов с убитого НПС при выполнении нужного условия
     */
    static DropItemFromSetConditionFromNPC(npc, condition, itemIDs) {
        return condition && this.DropItemFromSetFromNPC(npc, itemIDs);
    }

     /**
     * Выпадение набора случайных предметов с массива предметов с убитого НПС с определенным шансом
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {int} chance Шанс выпасть
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {int} Общее количество выпадаемых предметов с массива предметов с убитого НПС
     */
    static DropEntireSetFixedChanceFromNPC(npc, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            return 0;
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemFixedChanceFromNPC(npc, itemIDs[i], chance);
        }

        return stack + (this.DropItemFromSetConditionFromNPC(npc, stack <= 0, itemIDs) ? 1 : 0);
    }

    /**
     * Выпадение набора случайных предметов с массива предметов с убитого НПС с определенным шансом
     * @param {NPC} npc НПС с которого выпадает предмет
     * @param {float} chance Шанс выпасть
     * @param {int[]} itemIDs Массив выдаваемых предметов
     * @returns {int} Общее количество выпадаемых предметов с массива предметов с убитого НПС
     */
    static DropEntireSetFloatChanceFromNPC(npc, chance, itemIDs) {
        let stack = 0;

        if (itemIDs === undefined || itemIDs.length === 0) {
            return 0;
        }

        for (let i = 0; i < itemIDs.length; i++) {
            stack += this.DropItemFloatChanceFromNPC(npc, itemIDs[i], chance);
        }

        return stack + (this.DropItemFromSetConditionFromNPC(npc, stack <= 0, itemIDs) ? 1 : 0);
    }
}