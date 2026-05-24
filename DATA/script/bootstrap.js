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
_G.ApplyAnomaly = function(ID, Data){ _G.JAVA.ApplyAnomaly(ID, Data); }

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

_G.World = {
	SetBlock: function(X, Y, Z, Block, Dimension){ _G.JAVA.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), Block, Dimension || _G.Constant.Dimension_Overworld) }
}

// ----------------------------------------------------------------------

_G.New = {}

_G.New.Vec2 = function(X, Y){ return _G.JAVA.New_Vec2(X, Y, Z) }
_G.New.Vec3 = function(X, Y, Z){ return _G.JAVA.New_Vec3(X, Y, Z) }
_G.New.ResourceLocation = function(Namespace, Path){ return _G.JAVA.New_ResourceLocation(Namespace, Path) }
_G.New.Vector2f = function(X, Y){ return _G.JAVA.New_Vector2f(X, Y, Z) }
_G.New.Vector3f = function(X, Y, Z){ return _G.JAVA.New_Vector3f(X, Y, Z) }