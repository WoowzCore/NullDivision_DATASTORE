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
_G.AddEvent = function(ID, Handler){ _G.JAVA.AddEvent(ID, Handler) }

// Получает содержимое функции
_G.GetFunctionContent = function(Function){ return Function.toString() }