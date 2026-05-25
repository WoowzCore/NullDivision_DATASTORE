// ========== ГЛАЗ БЕЗДНЫ ==========
// За игроком следит гигантское существо

var eyeTime = 0
var pulsePhase = 0
var lastX = 0
var lastZ = 0
var watchTier = 0

// ГЛАЗ В НЕБЕ
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    eyeTime++
    pulsePhase = (pulsePhase + 0.05) % (Math.PI * 2)

    // Пульсирующее небо (цвет крови)
    var redPulse = 0.5 + Math.sin(pulsePhase) * 0.3
    var darkPulse = 0.1 + Math.cos(pulsePhase * 0.7) * 0.1
    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, redPulse, darkPulse, darkPulse)

    // Глаз пульсирует в небе (луна становится глазом)
    var eyeSize = 25 + Math.sin(pulsePhase * 2) * 10
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, eyeSize)
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, 15)

    // Солнце и луна меняются цветами
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunVisible, eyeTime % 80 < 40)
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonVisible, true)

    // Искажение мира (дрожь страха)
    var shakeIntensity = watchTier * 0.03
    _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset,
        (Math.random() - 0.5) * shakeIntensity,
        (Math.random() - 0.5) * shakeIntensity,
        (Math.random() - 0.5) * shakeIntensity
    )

    // Облака сгущаются как туман
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, 0.2)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, -5)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize, 20, 3, 20)

    // Звёзды исчезают когда глаз смотрит
    var starsVisible = eyeTime % 120 < 60
    _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, starsVisible)

    // Каждые 10 секунд пугающий эффект
    if(eyeTime % 200 === 0){
        _G.Logger.Info("§cТы чувствуешь, что за тобой наблюдают...")
    }
})

// Включаем небо Энда для жуткого эффекта
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, 4)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation(_G.Constant.TempID, "textures/eye.png"))

// ========== СЛЕЖЕНИЕ ЗА ИГРОКОМ ==========
// На сервере создаются "следы" вокруг игрока

var spawnCooldown = 0
var watcherBlocks = [
    "minecraft:obsidian",
    "minecraft:crying_obsidian",
    "minecraft:blackstone",
    "minecraft:polished_blackstone_bricks",
    "minecraft:gilded_blackstone"
]

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End){ return }

    spawnCooldown++
    if(spawnCooldown < 5){ return }
    spawnCooldown = 0

    // Координаты игрока (0, 81, 0 - центр)
    var playerX = 0
    var playerZ = 0

    // Проверяем движется ли игрок
    var dx = Math.abs(playerX - lastX)
    var dz = Math.abs(playerZ - lastZ)
    lastX = playerX
    lastZ = playerZ

    // Уровень слежения растёт если игрок двигается
    if(dx > 1 || dz > 1){
        if(watchTier < 10) watchTier++
    } else {
        if(watchTier > 0) watchTier -= 0.1
    }

    // Радиус "глаза" в зависимости от уровня слежки
    var eyeRadius = 15 + watchTier * 2

    // Создаём "зрачок" из блоков
    for(var i = 0; i < 20; i++){
        var angle = Math.random() * Math.PI * 2
        var radius = 5 + Math.random() * eyeRadius

        var X = playerX + Math.cos(angle) * radius
        var Z = playerZ + Math.sin(angle) * radius
        var Y = 70 + Math.random() * 20

        var block = watcherBlocks[Math.floor(Math.random() * watcherBlocks.length)]
        _G.World.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), block)
    }

    // Создаём "зрачок" - концентрические круги
    for(var ring = 0; ring < 3; ring++){
        var ringRadius = 8 + ring * 3 + watchTier
        var segments = 30

        for(var s = 0; s < segments; s++){
            var segAngle = (s / segments) * Math.PI * 2 + Date.now() / 1000
            var X = playerX + Math.cos(segAngle) * ringRadius
            var Z = playerZ + Math.sin(segAngle) * ringRadius
            var Y = 71 + ring * 2

            _G.World.SetBlock(Math.floor(X), Math.floor(Y), Math.floor(Z), "minecraft:redstone_block")
        }
    }

    // Предупреждения при высоком уровне слежки
    if(watchTier > 7 && Math.random() < 0.1){
        var messages = [
            "§cОНО ВИДИТ ТЕБЯ...",
            "§cНЕ ОГЛЯДЫВАЙСЯ",
            "§cГЛАЗ НЕ СМОРГАЕТ",
            "§cОНО ЗДЕСЬ"
        ]
        var msg = messages[Math.floor(Math.random() * messages.length)]
        _G.Logger.Info(msg)
    }
})

// Сброс при перезагрузке JS
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.Logger.Info("=== ГЛАЗ БЕЗДНЫ ДЕАКТИВИРОВАН ===")
        // Сбрасываем аномалии
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        _G.ResetAnomaly(_G.Enum.Anomaly.MoonSize)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        _G.ResetAnomaly(_G.Enum.Anomaly.CloudSpeed)
        _G.ResetAnomaly(_G.Enum.Anomaly.StarsVisible)
    } else {
        _G.Logger.Info("=== ГЛАЗ БЕЗДНЫ АКТИВИРОВАН ===")
        eyeTime = 0
        watchTier = 0
    }
})

_G.Logger.Info("§c=== ГЛАЗ БЕЗДНЫ СМОТРИТ НА ТЕБЯ ===")