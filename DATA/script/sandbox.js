
/*var i = 0
_G.AddEvent(_G.Enum.EventType.ServerTick, function(End){
	if(!End){ return }

	i++
	if(i > 100){
		i = 0

		_G.Logger.Info("GOOOOOOOO!!!!!!!")


	}
})*/

/*_G.AddEvent(_G.Enum.EventType.ServerInit, function(){
	_G.World.SetBlock(-247, 64, 317, "minecraft:diamond_block")
})*/

_G.SetEvent(_G.Enum.EventType.BeforeJSReload, function(){
    _G.Logger.Info("HI AND WELCOME")
})

_G.SetEvent(_G.Enum.EventType.KeyPress, function(Key, ScanCode, Modifiers){

})

_G.SetEvent(_G.Enum.EventType.KeyRelease, function(Key, ScanCode, Modifiers){

})

_G.SetEvent(_G.Enum.EventType.KeyRepeat, function(Key, ScanCode, Modifiers){

})