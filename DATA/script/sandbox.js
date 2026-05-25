// ========== РАЗРЫВ РЕАЛЬНОСТИ ==========
// Реальность разрушается, мир сходит с ума
// НИЧЕГО НЕ БУДЕТ ПРЕЖНИМ

// ========== ГЛОБАЛЬНЫЙ ХАОС ==========
var realityBreak = 0
var insanityLevel = 0
var realityShifts = 0
var lastPanic = 0
var dimensionRift = 0
var entityWhispers = []
var fakeBlocks = []
var memoryLeak = []

// Типы безумных структур
var MadnessStructures = {
    FLESH_TREE: 0,
    EYE_WALL: 1,
    BLEEDING_ALTAR: 2,
    SCREAMING_PILLAR: 3,
    CORRUPTION_SPREAD: 4,
    VEIN_NETWORK: 5,
    TENTACLE: 6,
    MOUTH_FLOOR: 7,
    RIFT_PORTAL: 8,
    NIGHTMARE_SPIRE: 9
}

// Блоки безумия
var MadBlocks = {
    flesh: ["minecraft:nether_wart_block", "minecraft:crimson_hyphae", "minecraft:shroomlight", "minecraft:magma_block"],
    eyes: ["minecraft:sculk_sensor", "minecraft:calibrated_sculk_sensor", "minecraft:sculk_shrieker", "minecraft:ender_eye"],
    blood: ["minecraft:redstone_block", "minecraft:red_wool", "minecraft:crimson_planks", "minecraft:red_nether_bricks"],
    corruption: ["minecraft:sculk", "minecraft:sculk_vein", "minecraft:sculk_catalyst", "minecraft:bedrock"],
    organic: ["minecraft:honey_block", "minecraft:slime_block", "minecraft:sponge", "minecraft:wet_sponge"]
}

// Жуткие сообщения (шепот)
var Whispers = [
    "Ты не один...",
    "Оно смотрит изнутри",
    "Твоя кожа не твоя",
    "Развернись... МЕДЛЕННО",
    "Оно знает твоё имя",
    "В зеркале кто-то есть",
    "Твои глаза текут",
    "Не дыши",
    "Оно в стенах",
    "Смотри в небо... НЕ МОРГАЙ",
    "Твои кости звенят",
    "Кровь стучит в такт",
    "Оно имитирует тебя",
    "Ты забыл своё лицо",
    "Сделай шаг... ЕЩЁ",
    "Твоя тень живёт своей жизнью"
]

// Галлюцинации
var Hallucinations = [
    "Ты слышишь шаги за спиной?",
    "Кажется, кто-то дышит в стену",
    "Твоё отражение улыбнулось... странно",
    "Краем глаза ты видишь движение",
    "Чьи-то пальцы скребут по блокам",
    "В воздухе пахнет гнилью",
    "Ты чувствуешь чей-то взгляд",
    "Твоё имя произнесли шёпотом"
]

// ========== АБСОЛЮТНОЕ БЕЗУМИЕ (ВИЗУАЛ) ==========
_G.SetEvent(_G.Enum.Event.ClientTick, function(End){
    if(!End){ return }

    realityBreak++
    insanityLevel = Math.min(insanityLevel + 0.01, 100)
    dimensionRift = (dimensionRift + 1) % 360

    // СУМАСШЕДШЕЕ НЕБО
    var chaosR = Math.abs(Math.sin(realityBreak / 3)) * (0.5 + insanityLevel / 100)
    var chaosG = Math.abs(Math.cos(realityBreak / 5)) * (0.3 + insanityLevel / 150)
    var chaosB = Math.abs(Math.sin(realityBreak / 7)) * (0.8 + insanityLevel / 80)

    // Инверсия цвета при высоком безумии
    if(insanityLevel > 60){
        chaosR = 1 - chaosR
        chaosG = 1 - chaosG
        chaosB = 1 - chaosB
    }

    _G.ApplyAnomaly(_G.Enum.Anomaly.SkyColor, chaosR, chaosG, chaosB)

    // ДРУГИЕ ПЛАНЕТЫ СХОДЯТ С УМА
    var sunInsanity = 20 + Math.sin(realityBreak / 5) * (30 + insanityLevel)
    var moonInsanity = 15 + Math.cos(realityBreak / 7) * (40 + insanityLevel)
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunSize, Math.max(5, sunInsanity))
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonSize, Math.max(5, moonInsanity))

    // МЕРЦАНИЕ
    var sunVisible = Math.random() > (insanityLevel / 200)
    var moonVisible = Math.random() > (insanityLevel / 200)
    var starsVisible = Math.random() > (insanityLevel / 150)
    _G.ApplyAnomaly(_G.Enum.Anomaly.SunVisible, sunVisible)
    _G.ApplyAnomaly(_G.Enum.Anomaly.MoonVisible, moonVisible)
    _G.ApplyAnomaly(_G.Enum.Anomaly.StarsVisible, starsVisible)

    // ОБЛАКА СТАНОВЯТСЯ ПЛОТНЫМИ
    var cloudMadness = 1 + insanityLevel / 20
    var cloudHeightMadness = Math.sin(realityBreak / 5) * (20 + insanityLevel / 2) - 10
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSpeed, cloudMadness)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudHeight, cloudHeightMadness)
    _G.ApplyAnomaly(_G.Enum.Anomaly.CloudSize,
        10 + Math.sin(realityBreak / 3) * 10,
        5 + insanityLevel / 20,
        10 + Math.cos(realityBreak / 4) * 10)

    // ИСКАЖЕНИЕ РЕАЛЬНОСТИ (ДРОЖЬ СТРАХА)
    var distortionStrength = (insanityLevel / 30) * Math.sin(realityBreak / 3)
    _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset,
        (Math.sin(realityBreak / 2) + Math.random() - 0.5) * distortionStrength,
        (Math.cos(realityBreak / 3) + Math.random() - 0.5) * distortionStrength,
        (Math.sin(realityBreak / 4) + Math.random() - 0.5) * distortionStrength)

    _G.ApplyAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom,
        (Math.random() - 0.5) * distortionStrength * 2,
        (Math.random() - 0.5) * distortionStrength * 2,
        (Math.random() - 0.5) * distortionStrength * 2)

    // ПСИХОТИЧЕСКИЕ ЭФФЕКТЫ
    if(insanityLevel > 40){
        // Инверсия облаков
        if(insanityLevel > 70){
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)
            _G.ApplyAnomaly(_G.Enum.Anomaly.SkyEndTiles, Math.floor(insanityLevel / 5))
        }

        // Шепот в голове
        if(realityBreak % 300 === 0 && insanityLevel > 50){
            var whisper = Whispers[Math.floor(Math.random() * Whispers.length)]
            _G.Logger.Anyway("§8§o[" + whisper + "]")
        }

        // Галлюцинации
        if(realityBreak % 400 === 0 && insanityLevel > 30 && Math.random() < 0.3){
            var hallucination = Hallucinations[Math.floor(Math.random() * Hallucinations.length)]
            _G.Logger.Warn("§5§l" + hallucination)
        }
    }
})

// Энд небо для кошмара
_G.ApplyAnomaly(_G.Enum.Anomaly.SkyRender, _G.Enum.SkyRender.End)

// ========== СТРУКТУРЫ БЕЗУМИЯ ==========

// МЯСНОЕ ДЕРЕВО
function GenerateFleshTree(x, y, z){
    var height = 8 + Math.floor(Math.random() * 10)

    // Ствол
    for(var h = 0; h < height; h++){
        var block = MadBlocks.flesh[h % MadBlocks.flesh.length]
        _G.World.SetBlock(x, y + h, z, block)

        // Ветки-щупальца
        if(h > 3 && Math.random() < 0.3){
            var dirX = (Math.random() - 0.5) * 3
            var dirZ = (Math.random() - 0.5) * 3
            var tentacleLen = 2 + Math.floor(Math.random() * 4)
            for(var t = 0; t < tentacleLen; t++){
                _G.World.SetBlock(x + Math.floor(dirX * t), y + h - t, z + Math.floor(dirZ * t), "minecraft:crimson_hyphae")
            }
        }
    }
    // Глаза на дереве
    for(var e = 0; e < 5; e++){
        var eyeX = x + Math.floor((Math.random() - 0.5) * 3)
        var eyeZ = z + Math.floor((Math.random() - 0.5) * 3)
        var eyeY = y + 3 + Math.floor(Math.random() * (height - 3))
        _G.World.SetBlock(eyeX, eyeY, eyeZ, "minecraft:sculk_sensor")
    }
}

// СТЕНА ИЗ ГЛАЗ
function GenerateEyeWall(x, y, z){
    var width = 10 + Math.floor(Math.random() * 10)
    var height = 5 + Math.floor(Math.random() * 5)

    for(var wx = 0; wx < width; wx++){
        for(var wy = 0; wy < height; wy++){
            var block = MadBlocks.eyes[(wx + wy) % MadBlocks.eyes.length]
            _G.World.SetBlock(x + wx, y + wy, z, block)

            // Кровь на стене
            if(Math.random() < 0.2){
                _G.World.SetBlock(x + wx, y + wy, z + 1, "minecraft:redstone_block")
            }
        }
    }
}

// КРОВАВЫЙ АЛТАРЬ
function GenerateBleedingAltar(x, y, z){
    // Алтарь из плоти
    for(var ax = -2; ax <= 2; ax++){
        for(var az = -2; az <= 2; az++){
            if(Math.abs(ax) === 2 || Math.abs(az) === 2){
                _G.World.SetBlock(x + ax, y, z + az, "minecraft:crimson_planks")
                _G.World.SetBlock(x + ax, y + 1, z + az, "minecraft:red_wool")
            }
        }
    }
    // Центральный орган
    _G.World.SetBlock(x, y + 1, z, "minecraft:sculk_shrieker")
    _G.World.SetBlock(x, y + 2, z, "minecraft:ender_chest")
    _G.World.SetBlock(x, y + 3, z, "minecraft:dragon_egg")

    // Кровь течет
    for(var b = 0; b < 20; b++){
        var bloodX = x + Math.floor((Math.random() - 0.5) * 6)
        var bloodZ = z + Math.floor((Math.random() - 0.5) * 6)
        _G.World.SetBlock(bloodX, y, bloodZ, "minecraft:red_nether_bricks")
    }
}

// КРИЧАЩАЯ КОЛОННА
function GenerateScreamingPillar(x, y, z){
    var height = 12 + Math.floor(Math.random() * 8)

    for(var h = 0; h < height; h++){
        // Рот на колонне
        if(h % 3 === 0){
            _G.World.SetBlock(x + 1, y + h, z, "minecraft:jack_o_lantern")
            _G.World.SetBlock(x - 1, y + h, z, "minecraft:jack_o_lantern")
            _G.World.SetBlock(x, y + h, z + 1, "minecraft:jack_o_lantern")
            _G.World.SetBlock(x, y + h, z - 1, "minecraft:jack_o_lantern")
        }
        _G.World.SetBlock(x, y + h, z, "minecraft:polished_blackstone_bricks")

        // Кровь
        if(Math.random() < 0.3){
            _G.World.SetBlock(x + Math.floor((Math.random() - 0.5) * 2), y + h, z + Math.floor((Math.random() - 0.5) * 2), "minecraft:redstone_block")
        }
    }
}

// РАСПРОСТРАНЕНИЕ КОРРУПЦИИ
function GenerateCorruptionSpread(x, y, z, radius){
    var blocks = MadBlocks.corruption
    for(var ix = -radius; ix <= radius; ix++){
        for(var iz = -radius; iz <= radius; iz++){
            if(Math.abs(ix) + Math.abs(iz) <= radius){
                if(Math.random() < 0.5){
                    _G.World.SetBlock(x + ix, y, z + iz, blocks[Math.floor(Math.random() * blocks.length)])
                    // Коррупция прорастает вверх
                    if(Math.random() < 0.2){
                        _G.World.SetBlock(x + ix, y + 1, z + iz, "minecraft:sculk_vein")
                    }
                }
            }
        }
    }
}

// ВЕНЫ ИЗ ПЛОТИ
function GenerateVeinNetwork(x, y, z){
    var length = 15 + Math.floor(Math.random() * 20)
    var currentX = x
    var currentZ = z
    var direction = Math.floor(Math.random() * 4)

    for(var v = 0; v < length; v++){
        var block = MadBlocks.organic[v % MadBlocks.organic.length]
        _G.World.SetBlock(currentX, y, currentZ, block)

        // Вены расширяются
        if(Math.random() < 0.3){
            _G.World.SetBlock(currentX + 1, y, currentZ, block)
            _G.World.SetBlock(currentX - 1, y, currentZ, block)
            _G.World.SetBlock(currentX, y, currentZ + 1, block)
            _G.World.SetBlock(currentX, y, currentZ - 1, block)
        }

        // Изменение направления
        if(Math.random() < 0.4){
            direction = (direction + Math.floor(Math.random() * 3) - 1 + 4) % 4
        }

        switch(direction){
            case 0: currentX++; break
            case 1: currentX--; break
            case 2: currentZ++; break
            case 3: currentZ--; break
        }
    }
}

// ЩУПАЛЬЦЕ
function GenerateTentacle(x, y, z){
    var height = 6 + Math.floor(Math.random() * 8)
    var wobble = 0

    for(var h = 0; h < height; h++){
        wobble += (Math.random() - 0.5) * 0.5
        var offsetX = Math.floor(Math.sin(wobble) * 2)
        var offsetZ = Math.floor(Math.cos(wobble) * 2)
        _G.World.SetBlock(x + offsetX, y + h, z + offsetZ, "minecraft:crimson_hyphae")

        // Присоски
        if(Math.random() < 0.3){
            _G.World.SetBlock(x + offsetX + 1, y + h, z + offsetZ, "minecraft:shroomlight")
        }
    }
    // Присоска на конце
    _G.World.SetBlock(x + Math.floor(Math.sin(wobble) * 2), y + height, z + Math.floor(Math.cos(wobble) * 2), "minecraft:sculk_sensor")
}

// ПОЛ ИЗ РТОВ
function GenerateMouthFloor(x, y, z){
    var radius = 8

    for(var mx = -radius; mx <= radius; mx++){
        for(var mz = -radius; mz <= radius; mz++){
            if(Math.sqrt(mx*mx + mz*mz) <= radius){
                if(Math.random() < 0.2){
                    _G.World.SetBlock(x + mx, y, z + mz, "minecraft:jack_o_lantern")
                } else {
                    _G.World.SetBlock(x + mx, y, z + mz, "minecraft:crimson_planks")
                }
            }
        }
    }
}

// РАЗРЫВ РЕАЛЬНОСТИ (ПОРТАЛ)
function GenerateRiftPortal(x, y, z){
    var radius = 5

    // Круг из черных блоков
    for(var angle = 0; angle < 360; angle += 5){
        var rad = angle * Math.PI / 180
        var px = x + Math.cos(rad) * radius
        var pz = z + Math.sin(rad) * radius
        _G.World.SetBlock(Math.floor(px), y, Math.floor(pz), "minecraft:bedrock")
        _G.World.SetBlock(Math.floor(px), y + 1, Math.floor(pz), "minecraft:crying_obsidian")
    }

    // Внутренность портала
    for(var ix = -radius + 1; ix <= radius - 1; ix++){
        for(var iz = -radius + 1; iz <= radius - 1; iz++){
            if(ix*ix + iz*iz <= (radius-1)*(radius-1)){
                _G.World.SetBlock(x + ix, y, z + iz, "minecraft:end_portal_frame")
                _G.World.SetBlock(x + ix, y + 1, z + iz, "minecraft:end_portal")
                _G.World.SetBlock(x + ix, y + 2, z + iz, "minecraft:end_portal")
            }
        }
    }
}

// БАШНЯ КОШМАРА
function GenerateNightmareSpire(x, y, z){
    var height = 15 + Math.floor(Math.random() * 15)

    for(var h = 0; h < height; h++){
        var radius = 3 - Math.floor(h / 5)
        if(radius < 1) radius = 1

        for(var ix = -radius; ix <= radius; ix++){
            for(var iz = -radius; iz <= radius; iz++){
                if(ix*ix + iz*iz <= radius*radius){
                    var block = h % 2 === 0 ? "minecraft:blackstone" : "minecraft:crying_obsidian"
                    _G.World.SetBlock(x + ix, y + h, z + iz, block)
                }
            }
        }

        // Глаза на башне
        if(h % 4 === 0 && radius > 1){
            _G.World.SetBlock(x + radius, y + h, z, "minecraft:sculk_sensor")
            _G.World.SetBlock(x - radius, y + h, z, "minecraft:sculk_sensor")
            _G.World.SetBlock(x, y + h, z + radius, "minecraft:sculk_sensor")
            _G.World.SetBlock(x, y + h, z - radius, "minecraft:sculk_sensor")
        }
    }
}

// ВЫБОР СТРУКТУРЫ БЕЗУМИЯ
function GenerateMadStructure(x, y, z){
    var type = Math.floor(Math.random() * 10)
    var name = ""

    switch(type){
        case MadnessStructures.FLESH_TREE:
            GenerateFleshTree(x, y, z)
            name = "МЯСНОЕ ДЕРЕВО"
            break
        case MadnessStructures.EYE_WALL:
            GenerateEyeWall(x, y, z)
            name = "СТЕНА ИЗ ГЛАЗ"
            break
        case MadnessStructures.BLEEDING_ALTAR:
            GenerateBleedingAltar(x, y, z)
            name = "КРОВАВЫЙ АЛТАРЬ"
            break
        case MadnessStructures.SCREAMING_PILLAR:
            GenerateScreamingPillar(x, y, z)
            name = "КРИЧАЩАЯ КОЛОННА"
            break
        case MadnessStructures.CORRUPTION_SPREAD:
            GenerateCorruptionSpread(x, y, z, 5 + Math.floor(Math.random() * 8))
            name = "РАСПРОСТРАНЕНИЕ КОРРУПЦИИ"
            break
        case MadnessStructures.VEIN_NETWORK:
            GenerateVeinNetwork(x, y, z)
            name = "ВЕНЫ ИЗ ПЛОТИ"
            break
        case MadnessStructures.TENTACLE:
            GenerateTentacle(x, y, z)
            name = "ЩУПАЛЬЦЕ"
            break
        case MadnessStructures.MOUTH_FLOOR:
            GenerateMouthFloor(x, y, z)
            name = "ПОЛ ИЗ РТОВ"
            break
        case MadnessStructures.RIFT_PORTAL:
            GenerateRiftPortal(x, y, z)
            name = "РАЗРЫВ РЕАЛЬНОСТИ"
            break
        case MadnessStructures.NIGHTMARE_SPIRE:
            GenerateNightmareSpire(x, y, z)
            name = "БАШНЯ КОШМАРА"
            break
    }

    return name
}

// ========== КОШМАРНЫЕ ИВЕНТЫ ==========

var NightmareEvents = [
    { name: "§c§lПЛОТЬ ПРОСЫПАЕТСЯ", chaos: 20, message: "Земля становится живой!", effect: "flesh" },
    { name: "§5§lТЫСЯЧА ГЛАЗ", chaos: 25, message: "Всё видит что-то древнее", effect: "eyes" },
    { name: "§4§lКРОВОТОЧЕНИЕ", chaos: 30, message: "Мир истекает кровью", effect: "bleed" },
    { name: "§0§lБЕЗДНА ЗОВЁТ", chaos: 35, message: "Что-то тянет тебя вниз", effect: "void" },
    { name: "§8§lКОШМАР СТАНОВИТСЯ ЯВЬЮ", chaos: 40, message: "Твои страхи обретают форму", effect: "nightmare" },
    { name: "§1§lШЕПОТ В ГОЛОВЕ", chaos: 15, message: "Голоса становятся громче", effect: "whispers" },
    { name: "§d§lИСКАЖЕНИЕ", chaos: 45, message: "Реальность трещит по швам", effect: "distortion" },
    { name: "§6§lПЛОТЬ И КРОВЬ", chaos: 50, message: "Мир превращается в орган", effect: "organic" }
]

function TriggerNightmare(eventData){
    _G.Logger.Error("§l§m====================§r")
    _G.Logger.Error(eventData.name)
    _G.Logger.Error("§7" + eventData.message)
    _G.Logger.Error("§l§m====================§r")

    insanityLevel = Math.min(insanityLevel + eventData.chaos, 100)

    switch(eventData.effect){
        case "flesh":
            for(var f = 0; f < 50; f++){
                var fx = (Math.random() - 0.5) * 100
                var fz = (Math.random() - 0.5) * 100
                GenerateFleshTree(Math.floor(fx), 70, Math.floor(fz))
            }
            break
        case "eyes":
            for(var e = 0; e < 100; e++){
                var ex = (Math.random() - 0.5) * 80
                var ez = (Math.random() - 0.5) * 80
                _G.World.SetBlock(Math.floor(ex), 71, Math.floor(ez), "minecraft:sculk_sensor")
            }
            break
        case "bleed":
            for(var b = 0; b < 200; b++){
                var bx = (Math.random() - 0.5) * 120
                var bz = (Math.random() - 0.5) * 120
                var by = 70 + Math.floor(Math.random() * 10)
                _G.World.SetBlock(Math.floor(bx), by, Math.floor(bz), "minecraft:redstone_block")
            }
            break
        case "void":
            for(var v = 0; v < 50; v++){
                var vx = (Math.random() - 0.5) * 100
                var vz = (Math.random() - 0.5) * 100
                GenerateRiftPortal(Math.floor(vx), 70, Math.floor(vz))
            }
            break
        case "nightmare":
            for(var n = 0; n < 30; n++){
                var nx = (Math.random() - 0.5) * 90
                var nz = (Math.random() - 0.5) * 90
                GenerateMadStructure(Math.floor(nx), 70, Math.floor(nz))
            }
            break
        case "whispers":
            for(var w = 0; w < 10; w++){
                setTimeout(function(){
                    var whisper = Whispers[Math.floor(Math.random() * Whispers.length)]
                    _G.Logger.Anyway("§8§o" + whisper)
                }, w * 1000)
            }
            break
        case "distortion":
            for(var d = 0; d < 50; d++){
                var dx = (Math.random() - 0.5) * 150
                var dz = (Math.random() - 0.5) * 150
                GenerateTentacle(Math.floor(dx), 70, Math.floor(dz))
            }
            break
        case "organic":
            for(var o = 0; o < 40; o++){
                var ox = (Math.random() - 0.5) * 100
                var oz = (Math.random() - 0.5) * 100
                GenerateVeinNetwork(Math.floor(ox), 70, Math.floor(oz))
            }
            break
    }
}

// ========== СЕРВЕРНЫЙ ХАОС ==========

var nightmareTimer = 0
var structureTimer = 0
var eventChanceTimer = 0

_G.SetEvent(_G.Enum.Event.ServerTick, function(End){
    if(!End){ return }

    nightmareTimer++
    structureTimer++
    eventChanceTimer++

    // Генерация структур БЕЗУМИЯ (каждый тик при высоком безумии)
    if(insanityLevel > 20 && structureTimer >= 2){
        structureTimer = 0

        var x = (Math.random() - 0.5) * 120
        var z = (Math.random() - 0.5) * 120
        var y = 70 + Math.floor(Math.random() * 15)

        var structure = GenerateMadStructure(Math.floor(x), y, Math.floor(z))

        if(Math.random() < 0.02){
            _G.Logger.Warn("§5Появилось: §f" + structure)
        }
    }

    // КОШМАРНЫЕ ИВЕНТЫ
    if(nightmareTimer >= 100){
        nightmareTimer = 0

        var eventRoll = Math.random()
        var eventTriggered = false

        // Шанс ивента растет с безумием
        var eventChance = 0.1 + (insanityLevel / 500)

        if(Math.random() < eventChance){
            var eventIndex = Math.floor(Math.random() * NightmareEvents.length)
            TriggerNightmare(NightmareEvents[eventIndex])
            eventTriggered = true
        }

        // Случайные панические сообщения
        if(!eventTriggered && insanityLevel > 30 && Math.random() < 0.3){
            var panicMessages = [
                "§4§lТЫ ЗАБЫЛ СВОЁ ИМЯ",
                "§5§lОНО В ТВОЕЙ ГОЛОВЕ",
                "§0§lНЕ ОБОРАЧИВАЙСЯ",
                "§c§lТВОЯ КРОВЬ КИПИТ",
                "§8§lМИР РАЗРУШАЕТСЯ"
            ]
            _G.Logger.Error(panicMessages[Math.floor(Math.random() * panicMessages.length)])
        }

        // Предупреждения о безумии
        if(insanityLevel > 80 && Math.random() < 0.2){
            _G.Logger.Error("§c§lРЕАЛЬНОСТЬ РАЗРЫВАЕТСЯ НА ЧАСТИ!")
        }
    }

    // Автоматическое повышение безумия со временем
    if(eventChanceTimer >= 600){
        eventChanceTimer = 0
        if(insanityLevel < 100){
            insanityLevel = Math.min(insanityLevel + 5, 100)
            _G.Logger.Warn("§5Безумие растёт... (" + Math.floor(insanityLevel) + "%)")
        }
    }
})

// ========== СБРОС ПРИ ПЕРЕЗАГРУЗКЕ ==========
_G.SetEvent(_G.Enum.Event.JSReload, function(End){
    if(End){
        _G.Logger.Info("§8=== РАЗРЫВ РЕАЛЬНОСТИ ЗАКРЫТ ===")
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyColor)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexOffset)
        _G.ResetAnomaly(_G.Enum.Anomaly.BufferBuilderVertexRandom)
        _G.ResetAnomaly(_G.Enum.Anomaly.CloudSize)
        _G.ResetAnomaly(_G.Enum.Anomaly.SkyRender)
    } else {
        _G.Logger.Error("§c§l=== РАЗРЫВ РЕАЛЬНОСТИ АКТИВИРОВАН ===")
        _G.Logger.Error("§4§lРЕАЛЬНОСТЬ БОЛЬШЕ НЕ СТАБИЛЬНА")
        _G.Logger.Error("§5§lТЫ СОШЁЛ С УМА?")
        realityBreak = 0
        insanityLevel = 0
    }
})

_G.Logger.Error("§c§l=== РАЗРЫВ РЕАЛЬНОСТИ НАЧИНАЕТСЯ ===")
_G.Logger.Error("§4§lТЫ БУДЕШЬ МОЛИТЬ О ПОЩАДЕ")