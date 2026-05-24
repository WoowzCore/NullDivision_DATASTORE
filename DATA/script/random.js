var __Random_Seed = Math.floor(Math.random() * 0x7fffffff)

_G.Random = {
    // Установить сид
    SetSeed: function(Seed){
        __Random_Seed = Seed
    },

    // Случайное число от 0 до 1
    Random: function(ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        const __NewSeed = (__Random_Seed * 1103515245 + 12345) & 0x7fffffff;
        if(ChangeSeed){ __Random_Seed = __NewSeed }
        return __NewSeed / 0x7fffffff
    },

    // Случайное целое число
    RandomInt: function(Min, Max, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        return Math.floor(_G.Random.Random(ChangeSeed) * (Max - Min)) + Min
    },

    // Случайное дробное число
    RandomFloat: function(Min, Max, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        return Min + _G.Random.Random(ChangeSeed) * (Max - Min)
    },

    // ----------------------------------------------------------------------

    // Получает случайный элемент из массива
    FromArray: function(Array, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        if(!Array || Array.length === 0){ return undefined }
        return Array[_G.Random.RandomInt(0, Array.length, ChangeSeed)]
    },

    // Получает случайный ключ из таблицы
    FromKey: function(Table, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        if(!Table){ return undefined }
        var Keys = Object.keys(Table)
        return _G.Random.FromArray(Keys, ChangeSeed)
    },

    // Получает случайный элемент из таблицы
    FromValue: function(Table, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        if(!Table){ return undefined }
        return Table[_G.Random.FromKey(Table, ChangeSeed)]
    },

    // Получает случайный ключ и элемент из таблицы
    FromEntry: function(Table, ChangeSeed){
        if(ChangeSeed === undefined){ ChangeSeed = true; }

        if(!Table){ return undefined }
        var Key = _G.Random.FromKey(Table, ChangeSeed)
        return [Key, Table[Key]]
    }
}