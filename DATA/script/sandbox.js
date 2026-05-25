// ========== ДРЕВНИЙ КОСМОС ==========
// Мир постепенно заполняется древними структурами
// Редкие ивенты меняют всё вокруг

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
var cosmicTime = 0
var eventTimer = 0
var currentEvent = null
var eventDuration = 0
var structuresGenerated = 0
var ancientPower = 0

// Типы структур
var Structures = {
    ALTAR: 0,
    PILLAR: 1,
    CIRCLE: 2,
    PYRAMID: 3,
    SPIRAL: 4,
    CROSS: 5,
    DOME: 6,
    TOWER: 7
}

// Блоки для разных целей
var AncientBlocks = {
    core: ["minecraft:netherite_block", "minecraft:ancient_debris", "minecraft:crying_obsidian"],
    light: ["minecraft:glowstone", "minecraft:shroomlight", "minecraft:sea_lantern", "minecraft:redstone_lamp"],
    dark: ["minecraft:obsidian", "minecraft:blackstone", "minecraft:basalt", "minecraft:polished_blackstone_bricks"],
    colored: ["minecraft:gold_block", "minecraft:diamond_block", "minecraft:emerald_block", "minecraft:lapis_block", "minecraft:redstone_block"]
}

// Цвета для неба
var SkyColors = {
    normal: [0.5, 0.5, 0.5],
    dark: [0.1, 0.05, 0.2],
    blood: [0.8, 0.1, 0.1],
    cosmic: [0.1, 0.0, 0.3],
    gold: [0.9, 0.7, 0.1],
    void: [0.0, 0.0, 0.0]
}

// ========== ВИЗУАЛЬНЫЕ ЭФФЕКТЫ ==========
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    cosmicTime++

    // Пульсация древней энергии
    var pulse = _G.DSin(cosmicTime / 20) * 0.3 + 0.2
    var ancientGlow = _G.DSin(cosmicTime / 7) * 0.5 + 0.5

    // Небо меняется в зависимости от ивента
    var skyR = 0.2
    var skyG = 0.1
    var skyB = 0.4

    if(currentEvent !== null){
        switch(currentEvent){
            case "BLOOD_MOON":
                skyR = 0.8 + pulse
                skyG = 0.1
                skyB = 0.1
                break
            case "COSMIC_STORM":
                skyR = 0.3 + _G.DSin(cosmicTime / 3) * 0.3
                skyG = 0.1 + _G.DCos(cosmicTime / 5) * 0.2
                skyB = 0.6 + _G.DSin(cosmicTime / 4) * 0.3
                break
            case "ANCIENT_WAKE":
                skyR = 0.9
                skyG = 0.8
                skyB = 0.1
                break
            case "VOID_LEAK":
                skyR = 0.0
                skyG = 0.0
                skyB = 0.0
                break
            default:
                skyR = 0.2 + Math.sin(cosmicTime / 50) * 0.1
                skyG = 0.1 + Math.cos(cosmicTime / 50) * 0.1
                skyB = 0.4 + Math.sin(cosmicTime / 40) * 0.2
        }
    } else {
        skyR = 0.2 + Math.sin(cosmicTime / 100) * 0.1
        skyG = 0.1 + Math.cos(cosmicTime / 120) * 0.1
        skyB = 0.4 + Math.sin(cosmicTime / 80) * 0.2
    }

    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, skyR, skyG, skyB)

    // Размер солнца/луны зависит от древней силы
    var solarSize = 30 + ancientPower * 2
    var lunarSize = 25 + ancientPower * 1.5
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, solarSize)
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, lunarSize)

    // Искажение мира при высокой силе
    if(ancientPower > 5){
        var distortion = (ancientPower - 5) * 0.02
        _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset,
            Math.sin(cosmicTime / 10) * distortion,
            Math.cos(cosmicTime / 12) * distortion,
            Math.sin(cosmicTime / 15) * distortion
        )
    }

    // Эффект облаков
    var cloudSpeed = 0.5 + ancientPower * 0.1
    var cloudHeight = _G.DSin(cosmicTime / 30) * 10 - 5
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, cloudSpeed)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, cloudHeight)

    // Звёзды мерцают
    var starsVisible = currentEvent !== "COSMIC_STORM"
    _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, starsVisible)
})

// Энд небо для космической атмосферы
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, 16)
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTexture, _G.ResourceLocation(_G.Constant.TempID, "textures/cosmic_sky.png"))

// ========== ГЕНЕРАЦИЯ СТРУКТУР ==========

// Генерация алтаря
function GenerateAltar(x, y, z){
    var radius = 5
    // Круглое основание
    for(var i = -radius; i <= radius; i++){
        for(var j = -radius; j <= radius; j++){
            var dist = Math.sqrt(i*i + j*j)
            if(Math.floor(dist) === radius){
                _G.World.SetBlock(x + i, y, z + j, "minecraft:polished_blackstone_bricks")
            } else if(Math.floor(dist) === radius - 1){
                _G.World.SetBlock(x + i, y, z + j, "minecraft:gold_block")
            }
        }
    }
    // Центральный столб
    for(var h = 1; h <= 5; h++){
        _G.World.SetBlock(x, y + h, z, "minecraft:netherite_block")
    }
    // Кристалл на вершине
    _G.World.SetBlock(x, y + 6, z, "minecraft:glowstone")
    // Огненные столбы по углам
    var corners = [[-3, -3], [-3, 3], [3, -3], [3, 3]]
    for(var c = 0; c < corners.length; c++){
        var cx = corners[c][0]
        var cz = corners[c][1]
        for(var fh = 1; fh <= 3; fh++){
            _G.World.SetBlock(x + cx, y + fh, z + cz, "minecraft:magma_block")
        }
        _G.World.SetBlock(x + cx, y + 4, z + cz, "minecraft:campfire")
    }
}

// Генерация колонны
function GeneratePillar(x, y, z){
    var height = 8 + Math.floor(Math.random() * 5)
    var blockTypes = ["minecraft:obsidian", "minecraft:blackstone", "minecraft:basalt"]

    for(var h = 0; h < height; h++){
        var block = blockTypes[h % blockTypes.length]
        // Рунные кольца каждые 2 блока
        if(h % 2 === 0 && h > 0){
            for(var rx = -1; rx <= 1; rx++){
                for(var rz = -1; rz <= 1; rz++){
                    if(Math.abs(rx) === Math.abs(rz)) continue
                    _G.World.SetBlock(x + rx, y + h, z + rz, "minecraft:redstone_block")
                }
            }
        }
        _G.World.SetBlock(x, y + h, z, block)
    }
    // Вершина
    _G.World.SetBlock(x, y + height, z, "minecraft:beacon")
}

// Генерация круга
function GenerateCircle(x, y, z){
    var radius = 7 + Math.floor(Math.random() * 5)
    var blocks = ["minecraft:lapis_block", "minecraft:emerald_block", "minecraft:diamond_block"]
    var mainBlock = blocks[Math.floor(Math.random() * blocks.length)]

    // Круг
    for(var angle = 0; angle < 360; angle += 5){
        var rad = angle * Math.PI / 180
        var cx = x + Math.cos(rad) * radius
        var cz = z + Math.sin(rad) * radius
        _G.World.SetBlock(Math.floor(cx), y, Math.floor(cz), mainBlock)
    }
    // Руны внутри круга
    for(var r = 1; r <= 3; r++){
        var runeAngle = (cosmicTime * r + Math.random() * 360) % 360
        var radRune = runeAngle * Math.PI / 180
        var runeX = x + Math.cos(radRune) * (radius - r)
        var runeZ = z + Math.sin(radRune) * (radius - r)
        _G.World.SetBlock(Math.floor(runeX), y + 1, Math.floor(runeZ), "minecraft:glowstone")
    }
}

// Генерация пирамиды
function GeneratePyramid(x, y, z){
    var size = 4 + Math.floor(Math.random() * 4)
    for(var layer = 0; layer < size; layer++){
        var layerSize = size - layer
        var layerY = y + layer
        var blockLayer = layer % 2 === 0 ? "minecraft:gold_block" : "minecraft:diamond_block"

        for(var ix = -layerSize; ix <= layerSize; ix++){
            for(var iz = -layerSize; iz <= layerSize; iz++){
                if(Math.abs(ix) === layerSize || Math.abs(iz) === layerSize){
                    _G.World.SetBlock(x + ix, layerY, z + iz, blockLayer)
                }
            }
        }
    }
    // Кристалл на вершине
    _G.World.SetBlock(x, y + size, z, "minecraft:end_crystal")
}

// Генерация спирали
function GenerateSpiral(x, y, z){
    var radius = 10
    var turns = 2
    var blocks = ["minecraft:glowstone", "minecraft:sea_lantern", "minecraft:shroomlight"]

    for(var t = 0; t < turns * 360; t += 10){
        var rad = t * Math.PI / 180
        var r = (t / 360) * radius / turns
        var cx = x + Math.cos(rad) * r
        var cz = z + Math.sin(rad) * r
        var block = blocks[Math.floor(Math.random() * blocks.length)]
        _G.World.SetBlock(Math.floor(cx), y, Math.floor(cz), block)
        // Подсветка снизу
        _G.World.SetBlock(Math.floor(cx), y - 1, Math.floor(cz), "minecraft:redstone_block")
    }
}

// Генерация креста
function GenerateCross(x, y, z){
    var armLength = 6
    var armWidth = 2

    for(var arm = 0; arm < 4; arm++){
        var dx = arm === 0 ? 1 : arm === 1 ? -1 : 0
        var dz = arm === 2 ? 1 : arm === 3 ? -1 : 0

        for(var len = 1; len <= armLength; len++){
            for(var wid = -armWidth; wid <= armWidth; wid++){
                var ax = x + dx * len
                var az = z + dz * len
                if(dx !== 0){
                    az += wid
                } else {
                    ax += wid
                }
                _G.World.SetBlock(ax, y, az, "minecraft:iron_block")
                _G.World.SetBlock(ax, y + 1, az, "minecraft:redstone_block")
            }
        }
    }
    // Центр
    _G.World.SetBlock(x, y, z, "minecraft:netherite_block")
    _G.World.SetBlock(x, y + 1, z, "minecraft:beacon")
    _G.World.SetBlock(x, y + 2, z, "minecraft:dragon_head")
}

// Генерация купола
function GenerateDome(x, y, z){
    var radius = 6
    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            for(var iy = 0; iy <= radius; iy++){
                var dist3d = Math.sqrt(ix*ix + iz*iz + iy*iy)
                if(Math.floor(dist3d) === radius){
                    var block = iy === 0 ? "minecraft:obsidian" : "minecraft:glass"
                    _G.World.SetBlock(x + ix, y + iy, z + iz, block)
                }
            }
        }
    }
    // Внутренняя подсветка
    _G.World.SetBlock(x, y + 1, z, "minecraft:beacon")
    for(var light = 0; light < 4; light++){
        var angle = light * Math.PI * 2 / 4
        var lx = x + Math.cos(angle) * 3
        var lz = z + Math.sin(angle) * 3
        _G.World.SetBlock(Math.floor(lx), y + 2, Math.floor(lz), "minecraft:glowstone")
    }
}

// Генерация башни
function GenerateTower(x, y, z){
    var height = 10 + Math.floor(Math.random() * 8)
    var blocks = ["minecraft:blackstone", "minecraft:polished_blackstone_bricks", "minecraft:cracked_polished_blackstone_bricks"]

    for(var h = 0; h < height; h++){
        var block = blocks[h % blocks.length]
        var radius = 2
        if(h > height / 2) radius = 1

        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(Math.abs(ix) === radius || Math.abs(iz) === radius){
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }
    }
    // Шпиль
    for(var spire = 0; spire < 4; spire++){
        _G.World.SetBlock(x, y + height + spire, z, "minecraft:iron_bars")
    }
    _G.World.SetBlock(x, y + height + 4, z, "minecraft:end_rod")
}

// Выбор случайной структуры
function GenerateRandomStructure(x, y, z){
    var structureType = Math.floor(Math.random() * 7)
    var structureName = ""

    switch(structureType){
        case Structures.ALTAR:
            GenerateAltar(x, y, z)
            structureName = "Алтарь"
            break
        case Structures.PILLAR:
            GeneratePillar(x, y, z)
            structureName = "Колонна"
            break
        case Structures.CIRCLE:
            GenerateCircle(x, y, z)
            structureName = "Круг"
            break
        case Structures.PYRAMID:
            GeneratePyramid(x, y, z)
            structureName = "Пирамида"
            break
        case Structures.SPIRAL:
            GenerateSpiral(x, y, z)
            structureName = "Спираль"
            break
        case Structures.CROSS:
            GenerateCross(x, y, z)
            structureName = "Крест"
            break
        case Structures.DOME:
            GenerateDome(x, y, z)
            structureName = "Купол"
            break
        case Structures.TOWER:
            GenerateTower(x, y, z)
            structureName = "Башня"
            break
    }

    structuresGenerated++
    ancientPower = Math.min(ancientPower + 0.5, 10)

    return structureName
}

// ========== РЕДКИЕ ИВЕНТЫ ==========

var possibleEvents = [
    { name: "BLOOD_MOON", chance: 0.02, duration: 600, message: "§c§lКРОВАВАЯ ЛУНА ВОСХОДИТ!", effect: "blood" },
    { name: "COSMIC_STORM", chance: 0.015, duration: 400, message: "§d§lКОСМИЧЕСКАЯ БУРЯ ОБРУШИВАЕТСЯ!", effect: "storm" },
    { name: "ANCIENT_WAKE", chance: 0.01, duration: 500, message: "§6§lДРЕВНИЙ ОРУЖИЕ ПРОСЫПАЕТСЯ!", effect: "wake" },
    { name: "VOID_LEAK", chance: 0.008, duration: 300, message: "§8§lПРОБОЙ В БЕЗДНУ ОТКРЫТ!", effect: "void" },
    { name: "GOLDEN_ERA", chance: 0.012, duration: 450, message: "§e§lЗОЛОТОЙ ВЕК НАСТУПАЕТ!", effect: "golden" },
    { name: "STRUCTURE_SURGE", chance: 0.025, duration: 350, message: "§a§lДРЕВНИЕ СТРУКТУРЫ ПРОБУЖДАЮТСЯ!", effect: "surge" }
]

// Обработка ивентов
function TriggerEvent(eventData){
    if(currentEvent !== null) return

    currentEvent = eventData.name
    eventDuration = eventData.duration
    eventTimer = 0

    _G.Logger.Info("§l§m====================§r")
    _G.Logger.Info(eventData.message)
    _G.Logger.Info("§l§m====================§r")

    // Эффекты ивента
    switch(eventData.effect){
        case "blood":
            for(var i = 0; i < 100; i++){
                var x = (Math.random() - 0.5) * 100
                var z = (Math.random() - 0.5) * 100
                var y = 70 + Math.random() * 30
                _G.World.SetBlock(Math.floor(x), Math.floor(y), Math.floor(z), "minecraft:redstone_block")
            }
            break
        case "storm":
            for(var s = 0; s < 50; s++){
                var sx = (Math.random() - 0.5) * 150
                var sz = (Math.random() - 0.5) * 150
                _G.World.SetBlock(Math.floor(sx), 80, Math.floor(sz), "minecraft:lightning_rod")
            }
            break
        case "wake":
            ancientPower = Math.min(ancientPower + 3, 10)
            for(var w = 0; w < 5; w++){
                var wx = (Math.random() - 0.5) * 80
                var wz = (Math.random() - 0.5) * 80
                GenerateRandomStructure(Math.floor(wx), 70, Math.floor(wz))
            }
            break
        case "void":
            for(var v = 0; v < 200; v++){
                var vx = (Math.random() - 0.5) * 120
                var vz = (Math.random() - 0.5) * 120
                var vy = 60 + Math.random() * 40
                _G.World.SetBlock(Math.floor(vx), Math.floor(vy), Math.floor(vz), "minecraft:black_wool")
            }
            break
        case "golden":
            for(var g = 0; g < 150; g++){
                var gx = (Math.random() - 0.5) * 100
                var gz = (Math.random() - 0.5) * 100
                _G.World.SetBlock(Math.floor(gx), 71, Math.floor(gz), "minecraft:gold_block")
            }
            break
        case "surge":
            for(var u = 0; u < 10; u++){
                var ux = (Math.random() - 0.5) * 90
                var uz = (Math.random() - 0.5) * 90
                GenerateRandomStructure(Math.floor(ux), 70, Math.floor(uz))
            }
            break
    }
}

// ========== ОСНОВНОЙ ЛУП ==========

var generationCooldown = 0
var structureCount = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End){ return }

    // Таймер ивентов
    if(currentEvent !== null){
        eventTimer++
        if(eventTimer >= eventDuration){
            _G.Logger.Info("§7Ивент '" + currentEvent + "' закончился...")
            currentEvent = null
            eventDuration = 0
        }
    }

    // Генерация структур (каждые 5 тиков)
    generationCooldown++
    if(generationCooldown >= 5){
        generationCooldown = 0

        // Шанс на структуру
        if(Math.random() < 0.3){
            var x = (Math.random() - 0.5) * 100
            var z = (Math.random() - 0.5) * 100
            var y = 70 + Math.floor(Math.random() * 10)

            var structureType = GenerateRandomStructure(Math.floor(x), y, Math.floor(z))

            structureCount++

            if(Math.random() < 0.05){
                _G.Logger.Info("§7Найдена древняя структура: §f" + structureType)
            }
        }

        // Шанс на ивент (каждые 100 структур примерно)
        if(currentEvent === null && Math.random() < 0.005){
            var eventRoll = Math.random()
            var cumulative = 0

            for(var e = 0; e < possibleEvents.length; e++){
                cumulative += possibleEvents[e].chance
                if(eventRoll < cumulative){
                    TriggerEvent(possibleEvents[e])
                    break
                }
            }
        }

        // Периодические сообщения о состоянии
        if(structureCount > 0 && structureCount % 50 === 0 && Math.random() < 0.1){
            var stateMessages = [
                "§7Древняя сила растёт...",
                "§7Структуры пробуждаются по всему миру",
                "§7Космическая энергия усиливается",
                "§7Что-то надвигается..."
            ]
            _G.Logger.Info(stateMessages[structureCount / 50 % stateMessages.length])
        }
    }
})

// ========== ИНФОРМАЦИЯ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.Logger.Info("§8=== ДРЕВНИЙ КОСМОС ЗАВЕРШЁН ===")
        _G.Logger.Info("Сгенерировано структур: §f" + structureCount)
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyRender)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
    } else {
        _G.Logger.Info("§5§l=== ДРЕВНИЙ КОСМОС АКТИВИРОВАН ===")
        _G.Logger.Info("§7Мир наполняется древними структурами")
        _G.Logger.Info("§7Редкие ивенты меняют реальность")
        cosmicTime = 0
        structuresGenerated = 0
        structureCount = 0
        ancientPower = 0
    }
})

_G.Logger.Info("§5§l=== ДРЕВНИЙ КОСМОС НАЧИНАЕТСЯ ===")