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
// (Ивент : Enum.Event), (Функция : Function)
WL.SetEvent = function(ID, Handler){ WL.JAVA.SetEvent(ID, Handler) }

// Вызывает аномалию
// (Аномалия : Enum.Anomaly), (Аргументы : ...)
WL.ApplyAnomaly = function(ID){ WL.JAVA.ApplyAnomaly(ID, Array.prototype.slice.call(arguments, 1)) }

// Сбрасывает аномалию
// (Аномалия : Enum.Anomaly)
WL.ResetAnomaly = function(ID){ WL.JAVA.ResetAnomaly(ID) }

// ----------------------------------------------------------------------

// Получает содержимое функции
// (Функция : Function)
// (Содержимое функции : String)
WL.GetFunctionContent = function(Function){ return Function.toString() }

// Получает название клавиши
// (Клавиша : Enum.Key)
// return (Название клавиши : String)
WL.KeyName = function(Key){ return WL.JAVA.KeyName(Key) }

// Переводит строку
// (Ключ : String)
// return (Переведённый ключ : String)
WL.Translate = function(Key){ return WL.JAVA.Translate(Key) }

// ----------------------------------------------------------------------

// Серверная сторона?
// return (Серверная сторона? : boolean)
WL.ServerSide = function(){ return WL.JAVA.ServerSide() }

// Клиентская сторона?
// return (Клиентская сторона? : boolean)
WL.ClientSide = function(){ return WL.JAVA.ClientSide() }

// Регистрирует объект (ВЫЗЫВАТЬ ТОЛЬКО В ИВЕНТЕ Enum.Event.Register)
// (Информация об объекте : ?)
// return (Успешно? : boolean)
WL.Register = function(Info){ return WL.JAVA.Register(Info) }

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
	// return (Случайное число от 0 до 1 : double)
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

// Это сущность?
// (Сущность? : String)
// return (Это сущность? : boolean)
WL.IsEntity = function(Entity){ return WL.JAVA.ThatEntity(Entity) }

// Это игрок?
// (Игрок? : String)
// return (Это игрок? : boolean)
WL.IsPlayer = function(Player){ return WL.JAVA.ThatPlayer(Player) }

// Это живая сущность?
// (Живая сущность? : String)
// return (Это живая сущность? : boolean)
WL.IsLivingEntity = function(Player){ return WL.JAVA.ThatLivingEntity(Player) }

WL.World = {
	// Устанавливает блок
	// (X : int), (Y : int), (Z : int), (Блок : String), (В каком измерении? [minecraft:overworld] : String)
	SetBlock: function(X, Y, Z, Block, Dimension){ WL.JAVA.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), Block, Dimension || WL.Constant.Dimension_Overworld) },

	// Создаёт взрыв
	// (X : int), (Y : int), (Z : int), (Сила взрыва : float), (В каком измерении? [minecraft:overworld] : String)
	Explode: function(X, Y, Z, Power, Dimension){ WL.JAVA.Explode(X, Y, Z, Power, Dimension || WL.Constant.Dimension_Overworld) }
}

WL.Entity = {
	// Убивает сущность
	// (Сущность : String)
	// return (Успешно? : boolean)
	Kill: function(Entity){ return WL.JAVA.Kill(Entity) },

	// Сущность живая?
	// (Сущность : String)
	// return (Живая? : boolean)
	Alive: function(Entity){ return WL.JAVA.Alive(Entity) },

	// Сущность мёртвая?
	// (Сущность : String)
	// return (Живая? : boolean)
	Dead: function(Entity){ return WL.JAVA.Dead(Entity) },

	// Телепортирует сущность
	// (Сущность : String), (X : double), (Y : double), (Z : double)
	// return (Успешно? : boolean)
	Teleport: function(Entity, X, Y, Z){ return WL.JAVA.Teleport(Entity, X, Y, Z) },

	// Меняет измерение у сущности (Если X,Y,Z == -5152,-5153,-5154, тогда не менять позицию)
	// (Сущность : String), (Измерение : String), (X [-5152] : double), (Y [-5153] : double), (Z [-5154] : double)
	// return (Успешно? : boolean)
	SwitchDimension: function(Entity, Dimension, X, Y, Z){ return WL.JAVA.SwitchDimension(Entity, Dimension, X || -5152, Y || -5153, Z || -5154) },

	// Получает позицию сущности
	// (Сущность : String)
	// return (X (при ошибке -1) : double), (Y (при ошибке -1) : double), (Z (при ошибке -1) : double)
	GetPosition: function(Entity){ return WL.JAVA.GetPosition(Entity) },

	// Получает поворот сущности
	// (Сущность : String)
	// return (X поворот (Pitch) (при ошибке -1) : float), (Y (Yaw) поворот (при ошибке -1) : float)
	GetRotation: function(Entity){ return WL.JAVA.GetRotation(Entity) },

	// Устанавливает поворот сущности
	// (Сущность : String), (X поворот (Pitch) : float), (Y (Yaw) поворот : float)
	// return (Успешно? : boolean)
	SetRotation: function(Entity, XRotation, YRotation){ return WL.JAVA.SetRotation(Entity, XRotation, YRotation) },

	// Получает здоровье сущности
	// (Живая сущность : String)
	// return (Здоровье (при ошибке -1) : float)
	GetHealth: function(Entity){ return WL.JAVA.GetHealth(Entity) },

	// Устанавливает здоровье сущности
	// (Живая сущность : String)
	// return (Успешно? : boolean), (Здоровье [Entity.GetMaxHealth(Health)] : float)
	SetHealth: function(Entity, Health){ return WL.JAVA.SetHealth(Entity, Health || WL.Entity.GetMaxHealth(Health)) },

	// Получает максимальное здоровье сущности
	// (Живая сущность : String)
	// return (Максимальное здоровье (при ошибке -1) : float)
	GetMaxHealth: function(Entity){ return WL.JAVA.GetMaxHealth(Entity) },

	// Спавнит сущность
	// (ID сущности : String), (X : double), (Y : double), (Z : double), (Измерение [minecraft:overworld] : String)
	// return (Сущность (при ошибке null) : String/null)
	Spawn: function(ID, X, Y, Z, Dimension){ return WL.JAVA.Spawn(ID, X, Y, Z, Dimension || WL.Constant.Dimension_Overworld) },

	// Получает имя сущности
	// (Сущность : String)
	// return (Сырое имя сущности : String)
	GetName: function(Entity){ return WL.JAVA.GetName(Entity) },

	// Получает измерение, в котором находится сущность
	// (Сущность : String)
	// return (Измерение : String)
	GetDimension: function(Entity){ return WL.JAVA.GetDimension(Entity) }
}

// ----------------------------------------------------------------------

// Выполняет команду на стороне сервера
// (Команда : String)
// return (Ошибка, если есть : String/null)
WL.ExecuteCommand = function(Command){ return WL.JAVA.ExecuteCommand(Command) }