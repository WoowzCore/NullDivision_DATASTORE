
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

var i = 0
_G.SetEvent(_G.Enum.EventType.ServerTick, function(End){
    if(!End){ return }

    // 6 73 -3

    i++

    if(i <= 20){ return } i = 0

    var pos = [6, 73, -3]

    var dist = 70

    var blocks = [
        "minecraft:gold_block",
        "minecraft:diamond_block",
        "minecraft:emerald_block",
        "minecraft:iron_block",
        "minecraft:coal_block",
        "minecraft:redstone_block",
        "minecraft:lapis_block",
        "minecraft:netherite_block",
        "minecraft:obsidian",
        "minecraft:ancient_debris",
        "minecraft:glowstone"
    ]

    _G.Logger.Info("GO " + _G.Random.Random())

    for(var j = 0; j < 5000; j++){
        var X = pos[0] + _G.Random.RandomInt(-dist, dist);
        var Y = pos[1] + _G.Random.RandomInt(-dist, dist);
        var Z = pos[2] + _G.Random.RandomInt(-dist, dist);

        if(j == 1){
            _G.Logger.Info("X " + X + " Y " + Y + " Z " + Z)
        }

        _G.World.SetBlock(X, Y, Z, _G.Random.FromArray(blocks))
    }
})