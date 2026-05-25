var i = 0
_G.SetEvent(_G.Enum.EventType.ClientTick, function(End){
    if(!End){ return }

    i++

    //_G.ApplyAnomaly(_G.Enum.AnomalyType.PlanetSize, _G.Enum.Planet.Moon, _G.DSin(i) * 3000)
    //_G.ApplyAnomaly(_G.Enum.AnomalyType.PlanetSize, _G.Enum.Planet.Sun, (1-_G.DSin(i)) * 3000)
})

_G.ApplyAnomaly(_G.Enum.AnomalyType.StarsVisible, true)
_G.ApplyAnomaly(_G.Enum.AnomalyType.PlanetVisible, _G.Enum.Planet.Moon, true)