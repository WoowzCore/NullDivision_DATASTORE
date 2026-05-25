var j = 0
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    j++

    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, _G.DSin(j/15), _G.DSin(j/10), _G.DSin(j/20))
})

_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, 1)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation(_G.Constant.TempID, "textures/test.png"))

var i = 0
_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End){ return }

    i++

    if(i <= 20){ return } i = 0

    var pos = [0, 81, 0]

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
        "minecraft:glowstone",
        "minecraft:tnt"
    ]

    _G.Logger.Info("GO " + _G.Random.Random())

    for(var j = 0; j < 5000; j++){
        var X = pos[0] + _G.Random.RandomInt(-dist, dist);
        var Y = pos[1] + _G.Random.RandomInt(-dist, dist);
        var Z = pos[2] + _G.Random.RandomInt(-dist, dist);

        _G.World.SetBlock(X, Y, Z, _G.Random.FromArray(blocks))
    }
})