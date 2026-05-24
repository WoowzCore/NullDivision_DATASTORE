var __Random_Seed = Math.floor(Math.random() * 0x7fffffff)
var __ChangeSeed = true

const LCG_MULTIPLIER = 1664525
const LCG_INCREMENT  = 1013904223
const LCG_MODULUS    = 0x100000000

_G.Random = {
    // Установить сид
    SetSeed: function(Seed){
        __Random_Seed = Seed >>> 0
    },

    // Изменять сид?
    SetChangeSeed: function(ChangeSeed){
        __ChangeSeed = ChangeSeed
    },

    // Случайное число от 0 до 1
    Random: function(){
        if(__ChangeSeed){ __Random_Seed = (__Random_Seed * LCG_MULTIPLIER + LCG_INCREMENT) >>> 0 }

        var X = __Random_Seed
        X = (X ^ (X >>> 16)) * 0x85ebca6b
        X = (X ^ (X >>> 13)) * 0xc2b2ae35
        X =  X ^ (X >>> 16)

        return (X >>> 0) / LCG_MODULUS
    },

    // Случайное целое число
    RandomInt: function(Min, Max){
        if(Min >= Max){ return Max }
        return Math.floor(_G.Random.Random() * (Max - Min)) + Min
    },

    // Случайное дробное число
    RandomFloat: function(Min, Max){
        if(Min >= Max){ return Max }
        return Min + _G.Random.Random() * (Max - Min)
    },

    // ----------------------------------------------------------------------

    // Получает случайный элемент из массива
    FromArray: function(Array){
        return Array[_G.Random.RandomInt(0, Array.length)]
    },

    // Получает случайный ключ из таблицы
    FromKey: function(Table){
        if(!Table){ return undefined }
        const Keys = Object.keys(Table)
        return _G.Random.FromArray(Keys)
    },

    // Получает случайный элемент из таблицы
    FromValue: function(Table){
        if(!Table){ return undefined }
        return Table[_G.Random.FromKey(Table)]
    },

    // Получает случайный ключ и элемент из таблицы
    FromEntry: function(Table){
        if(!Table){ return undefined }
        const Key = _G.Random.FromKey(Table)
        return [Key, Table[Key]]
    }
}