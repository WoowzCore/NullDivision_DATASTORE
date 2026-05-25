var i = 0
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    i++

    //_G.ApplyAnomaly(_G.Enum.AnomalyType.SunSize, i/10)
})

//_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
//_G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, 1, 1, 1)
//_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation(_G.Constant.TempID, "test.png"))