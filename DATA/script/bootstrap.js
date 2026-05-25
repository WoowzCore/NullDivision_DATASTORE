// Отправляет сообщения в консоль
WL.Logger = {
    Info : function(Message){ WL.JAVA.Info (String(Message)) },
	Warn : function(Message){ WL.JAVA.Warn (String(Message)) },
	Error: function(Message){ WL.JAVA.Error(String(Message)) },

	// Всё равно отправляется в консоль, игнорируя Debug
	Anyway: function(Message){ WL.JAVA.Anyway(String(Message)) }
}

// ----------------------------------------------------------------------

// Добавляет обработчик ивента
WL.SetEvent = function(ID, Handler){ WL.JAVA.SetEvent(ID, Handler) }

// Вызывает аномалию
WL.ApplyAnomaly = function(ID){ WL.JAVA.ApplyAnomaly(ID, Array.prototype.slice.call(arguments, 1)); }

// Сбрасывает аномалию
WL.ResetAnomaly = function(ID){ WL.JAVA.ResetAnomaly(ID); }

// ----------------------------------------------------------------------

// Получает содержимое функции
WL.GetFunctionContent = function(Function){ return Function.toString() }

// Получает название клавиши
WL.KeyName = function(Key){ return WL.JAVA.KeyName(Key) }

// ----------------------------------------------------------------------

// Серверная сторона?
WL.ServerSide = function(){ return WL.JAVA.ServerSide() }

// Клиентская сторона?
WL.ClientSide = function(){ return WL.JAVA.ClientSide() }

// ----------------------------------------------------------------------

// Синус от 0 до 1
WL.DSin = function(V){ return (Math.sin(V) + 1) / 2 }

// Косинус от 0 до 1
WL.DCos = function(V){ return (Math.cos(V) + 1) / 2 }

// ----------------------------------------------------------------------

var __Random_Seed = Math.floor(Math.random() * 0x7fffffff)
var __ChangeSeed = true

WL.Random = {
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
		return Math.floor(WL.Random.Random() * (Max - Min)) + Min
	},

	// Случайное дробное число
	RandomFloat: function(Min, Max){
		if(Min >= Max){ return Max }
		return Min + WL.Random.Random() * (Max - Min)
	},

	// ----------------------------------------------------------------------

	// Получает случайный элемент из массива
	FromArray: function(Array){
		return Array[WL.Random.RandomInt(0, Array.length)]
	},

	// Получает случайный ключ из таблицы
	FromKey: function(Table){
		if(!Table){ return undefined }
		const Keys = Object.keys(Table)
		return WL.Random.FromArray(Keys)
	},

	// Получает случайный элемент из таблицы
	FromValue: function(Table){
		if(!Table){ return undefined }
		return Table[WL.Random.FromKey(Table)]
	},

	// Получает случайный ключ и элемент из таблицы
	FromEntry: function(Table){
		if(!Table){ return undefined }
		const Key = WL.Random.FromKey(Table)
		return [Key, Table[Key]]
	}
}

// ----------------------------------------------------------------------

// Создаёт ссылку на ресурс
WL.ResourceLocation = function(Namespace, Path){ return WL.JAVA.ResourceLocation(Namespace, Path) }

WL.World = {
	SetBlock: function(X, Y, Z, Block, Dimension){ WL.JAVA.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), Block, Dimension || WL.Constant.Dimension_Overworld) }
}