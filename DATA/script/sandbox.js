// ========== ЭФФЕКТ "СХОЖДЕНИЕ МИРОВ" ==========

var time = 0
var chaosLevel = 0

// Небо пульсирует всеми цветами радуги
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    time++

    // Радужное небо (цикл RGB)
    var r = _G.DSin(time / 30)
    var g = _G.DSin((time + 40) / 30)
    var b = _G.DSin((time + 80) / 30)
    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, r, g, b)

    // Солнце и луна меняются в противофазе
    var sunSize = 20 + _G.DSin(time / 20) * 40
    var moonSize = 20 + _G.DCos(time / 20) * 40
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, sunSize)
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, moonSize)

    // Облака сходят с ума
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, 2 + _G.DSin(time / 10) * 3)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, _G.DSin(time / 25) * 20)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize, 5 + _G.DSin(time / 15) * 7, 1, 5 + _G.DCos(time / 15) * 7)

    // Искажение вершин (мир плавится)
    _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset,
        _G.DSin(time / 10) * 0.05,
        _G.DSin(time / 13) * 0.05,
        _G.DSin(time / 11) * 0.05
    )

    _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom,
        _G.DSin(time / 7) * 0.1,
        _G.DSin(time / 9) * 0.1,
        _G.DSin(time / 8) * 0.1
    )
})

// Включаем странное небо Энда
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, 8)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation(_G.Constant.TempID, "textures/test.png"))

// Звёзды исчезают
_G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, false)

// ========== ХАОТИЧЕСКАЯ ГЕНЕРАЦИЯ ==========

var spiralAngle = 0
var blocksList = [
    "minecraft:gold_block",
    "minecraft:diamond_block",
    "minecraft:emerald_block",
    "minecraft:redstone_block",
    "minecraft:lapis_block",
    "minecraft:obsidian",
    "minecraft:glowstone",
    "minecraft:tnt",
    "minecraft:magma_block",
    "minecraft:blue_ice"
]

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End){ return }

    chaosLevel++
    if(chaosLevel < 10){ return }
    chaosLevel = 0

    spiralAngle = (spiralAngle + 15) % 360

    // Центр хаоса
    var centerX = 0
    var centerZ = 0

    // Радиус увеличивается со временем
    var radius = (Math.floor(Date.now() / 5000) % 20) + 10
    var angleRad = spiralAngle * Math.PI / 180

    for(var i = 0; i < 300; i++){
        // Случайный радиус от 0 до максимума
        var r = Math.random() * radius
        var a = angleRad + (Math.random() - 0.5) * 1.5

        var X = centerX + Math.cos(a) * r
        var Z = centerZ + Math.sin(a) * r
        var Y = 70 + Math.random() * 40 // Случайная высота

        // Спиральная стена из блоков
        var block = blocksList[Math.floor(Math.random() * blocksList.length)]
        _G.World.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), block)
    }

    // Специальная спираль
    for(var s = 0; s < 100; s++){
        var t = (spiralAngle + s * 10) % 360
        var rad = t * Math.PI / 180
        var dist = (spiralAngle + s) % radius

        var X = centerX + Math.cos(rad) * dist
        var Z = centerZ + Math.sin(rad) * dist
        var Y = 70 + Math.sin(rad * 5) * 15

        _G.World.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), "minecraft:glowstone")
    }
})

_G.Logger.Info("=== ЭФФЕКТ 'СХОЖДЕНИЕ МИРОВ' АКТИВИРОВАН ===")
_G.Logger.Info("Небо пульсирует, мир искажается, растёт спираль хаоса")