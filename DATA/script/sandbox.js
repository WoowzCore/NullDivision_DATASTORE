var i = 0
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    i++

    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, _G.DSin(i/15), _G.DSin(i/10), _G.DSin(i/20))
})

_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, 10)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation("minecraft", "textures/block/dirt.png"))