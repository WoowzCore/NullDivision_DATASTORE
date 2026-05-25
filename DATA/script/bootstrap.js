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

// Создаёт ссылку на ресурс
_G.ResourceLocation = function(Namespace, Path){ return _G.JAVA.ResourceLocation(Namespace, Path) }

_G.World = {
	SetBlock: function(X, Y, Z, Block, Dimension){ _G.JAVA.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), Block, Dimension || _G.Constant.Dimension_Overworld) }
}