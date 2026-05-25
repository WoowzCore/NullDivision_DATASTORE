// Отправляет сообщения в консоль
_G.Logger = {
    Info : function(Message){ _G.JAVA.Info (String(Message)) },
	Warn : function(Message){ _G.JAVA.Warn (String(Message)) },
	Error: function(Message){ _G.JAVA.Error(String(Message)) },

	// Всё равно отправляется в консоль, игнорируя Debug
	Anyway: function(Message){ _G.JAVA.Anyway(String(Message)) }
}

// ----------------------------------------------------------------------

// Добавляет обработчик ивента
_G.SetEvent = function(ID, Handler){ _G.JAVA.SetEvent(ID, Handler) }

// Вызывает аномалию
_G.ApplyAnomaly = function(ID){ _G.JAVA.ApplyAnomaly(ID, Array.prototype.slice.call(arguments, 1)); }

// Сбрасывает аномалию
_G.ResetAnomaly = function(ID){ _G.JAVA.ResetAnomaly(ID); }

// ----------------------------------------------------------------------

// Получает содержимое функции
_G.GetFunctionContent = function(Function){ return Function.toString() }

// Получает название клавиши
_G.KeyName = function(Key){ return _G.JAVA.KeyName(Key) }

// ----------------------------------------------------------------------

// Серверная сторона?
_G.ServerSide = function(){ return _G.JAVA.ServerSide() }

// Клиентская сторона?
_G.ClientSide = function(){ return _G.JAVA.ClientSide() }

// ----------------------------------------------------------------------

// Синус от 0 до 1
_G.DSin = function(V){ return (Math.sin(V) + 1) / 2 }

// Косинус от 0 до 1
_G.DCos = function(V){ return (Math.cos(V) + 1) / 2 }

// ----------------------------------------------------------------------

var __Random_Seed = Math.floor(Math.random() * 0x7fffffff)
var __ChangeSeed = true

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
		if(__ChangeSeed){ __Random_Seed = (__Random_Seed * 1664525 + 1013904223) >>> 0 }

		var X = __Random_Seed
		X = (X ^ (X >>> 16)) * 0x85ebca6b
		X = (X ^ (X >>> 13)) * 0xc2b2ae35
		X =  X ^ (X >>> 16)

		return (X >>> 0) / 0x100000000
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

// ----------------------------------------------------------------------

// Создаёт ссылку на ресурс
_G.ResourceLocation = function(Namespace, Path){ return _G.JAVA.ResourceLocation(Namespace, Path) }

_G.World = {
	SetBlock: function(X, Y, Z, Block, Dimension){ _G.JAVA.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), Block, Dimension || _G.Constant.Dimension_Overworld) }
}